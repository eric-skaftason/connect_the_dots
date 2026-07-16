import { Spline } from "./Spline.js";
import { Renderer } from "./Renderer.js";
import { Input } from "./Input.js";

class App {
    constructor() {
        const style_config = {
            node_colour: [79, 195, 247],
            line_colour: [255, 183, 77],
            tangent_colour: [168, 178, 193],
            handle_colour: [220, 224, 230]
        }


        this.canvas = document.querySelector('#canvas');
        this.spline = new Spline();
        this.renderer = new Renderer(canvas, 400, 400, style_config);
        this.input = new Input(this.canvas, (data) => this.onInput(data));

        this.renderer.render(this.renderer.generateSolidPixelStreamRGB(42, 43, 50));
    }


    onInput(input_data) {
        if (input_data.type === "click") return this.onClick(input_data);
    }

    onClick(input_data) {
        const hitNode = this.spline.getLastNodeInHitbox(input_data.x, input_data.y);

        if (hitNode !== null) {
            console.log(hitNode);
        }

        const pixel_stream = this.renderer.generatePixelStream(this.spline);
        this.renderer.render(pixel_stream);
        
    }
}

export { App };