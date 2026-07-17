import { Compute } from "./Compute.js";

class Renderer {    
    constructor(canvas, width, height, scale_factor, style_config) {

        const default_style_config = {
            bg_colour: [42, 43, 50],
            node_colour: [79, 195, 247],
            line_colour: [255, 183, 77],
            tangent_colour: [168, 178, 193],
            handle_colour: [220, 224, 230],

            node_rendered_radius: 5
        }

        this.style_config = {
            ...default_style_config,
            ...style_config
        };

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = width;
        this.height = height;

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        this.scale_factor = scale_factor;

        canvas.style.width = `${width * this.scale_factor}px`;
        canvas.style.height = `${height * this.scale_factor}px`;

        this.ctx.imageSmoothingEnabled = false;
        this.canvas.style.imageRendering = "pixelated";
        
    }

    getPixelStreamIndexByXY(x, y) {
        return y * this.width + x;
    }

    getXYByPixelStreamIndex(index) {
        const x = index % this.width;
        const y = Math.floor(index / this.width);

        return [x, y];
    }

    generateSolidPixelStreamRGB(r, g, b) {
        let pixel_stream = [];
        for (let i = 0; i < this.width * this.height; i++) {
            const rgb = [r, g, b];
            pixel_stream.push(rgb);
        }

        return pixel_stream;
    }

    generatePixelStream(spline) {
        let pixel_stream = this.generateSolidPixelStreamRGB(...this.style_config.bg_colour);

        const nodes = spline.getNodes();

        // 1. Compute nodes & connections
        for (const node of nodes) {
            let min_x = node.x - this.style_config.node_rendered_radius;
            let min_y = node.y - this.style_config.node_rendered_radius;

            let max_x = node.x + this.style_config.node_rendered_radius;
            let max_y = node.y + this.style_config.node_rendered_radius;

            if (min_x < 0) min_x = 0;
            if (min_y < 0) min_y = 0;

            if (max_x >= this.width) max_x = this.width - 1;
            if (max_y >= this.width) max_y = this.height - 1;


            // Add connection(s) if applicable
            for (const connection of node.connections) {
                if (connection.type === "linear") {
                    const connected_node = connection.to;
                    
                    // Check if line is vertical
                    if (connected_node.x === node.x) {
                        for (let y = connected_node.y; y <= node.y; y++) {
                            const stream_index = this.getPixelStreamIndexByXY(node.x, y);
                            pixel_stream[stream_index] = this.style_config.line_colour;
                        }
                    } else {
                        const line_points = Compute.generateLinePoints(connected_node.x, connected_node.y, node.x, node.y);

                        for (const point of line_points) {
                            const stream_index = this.getPixelStreamIndexByXY(...point);
                            pixel_stream[stream_index] = this.style_config.line_colour;
                        }
                        
                    }

                    
                }
            }

            // Fill node; iterate through pixels to fill
            for (let x = min_x; x <= max_x; x++) {
                for (let y = min_y; y <= max_y; y++) {
                    const stream_index = this.getPixelStreamIndexByXY(x, y);
                    const node_colour = node.selected ? this.style_config.highlight_colour : this.style_config.node_colour;
                    pixel_stream[stream_index] = node_colour;
                }
            }

        }

        // 

        return pixel_stream;
    }

    render(pixel_stream) {
        for (let i = 0; i < pixel_stream.length; i++) {
            const rgb = pixel_stream[i];
            
            this.ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

            const [x, y] = this.getXYByPixelStreamIndex(i);

            this.ctx.fillRect(x, y, 1, 1);
        }
    }


}

export { Renderer };