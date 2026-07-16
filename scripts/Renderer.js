class Renderer {    
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = width;
        this.height = height;

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        
    }

    getXYByPixelStreamIndex(index) {
        const x = index % this.width;
        const y = Math.floor(index / 400);

        return [x, y];
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