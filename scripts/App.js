import { Spline } from "./Spline.js";
import { Renderer } from "./Renderer.js";
import { Input } from "./Input.js";

class App {
    constructor() {
        const style_config = {
            node_colour: [79, 195, 247],
            line_colour: [255, 183, 77],
            tangent_colour: [168, 178, 193],
            handle_colour: [220, 224, 230],
            highlight_colour: [244, 67, 54]
        }

        const scale_factor = 2;


        this.canvas = document.querySelector('#canvas');
        this.spline = new Spline();
        this.renderer = new Renderer(canvas, 400, 300, scale_factor, style_config);
        this.input = new Input(this.canvas, scale_factor, (data) => this.onInput(data));

        this.renderer.render(this.renderer.generateSolidPixelStreamRGB(42, 43, 50));
    }


    onInput(input_data) {
        if (input_data.type === "click") return this.onClick(input_data);
    }

    onClick(input_data) {
        const previously_selected_node = this.spline.getSelectedNode();
        if (previously_selected_node) {
            previously_selected_node.x = input_data.x;
            previously_selected_node.y = input_data.y;
            
            this.spline.deselectAllNodes();

            const pixel_stream = this.renderer.generatePixelStream(this.spline);
            this.renderer.render(pixel_stream);
            return;
        }

        // newly hit node (may be selected or deselected)
        const hitNode = this.spline.getLastNodeInHitbox(input_data.x, input_data.y);

        if (hitNode !== null) {
            hitNode.selected = !hitNode.selected;
        } else {
            this.spline.deselectAllNodes();
        }

        const pixel_stream = this.renderer.generatePixelStream(this.spline);
        this.renderer.render(pixel_stream);
        
    }
}

export { App };