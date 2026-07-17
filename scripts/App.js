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

        const scale_factor = 4;

        const width = 200;
        const height = 150;

        document.querySelector(".demo_wrapper").style.width = `${width * scale_factor}px`;

        this.click_mode = "default";

        this.canvas = document.querySelector('#canvas');
        this.spline = new Spline();
        this.renderer = new Renderer(canvas, width, height, scale_factor, style_config);
        this.input = new Input(this.canvas, scale_factor, (data) => this.onInput(data));

        this.renderer.render(this.renderer.generateSolidPixelStreamRGB(42, 43, 50));

        this.initMenu();
    }

    render(overlay) {
        const pixel_stream = this.renderer.generatePixelStream(this.spline, overlay);
        this.renderer.render(pixel_stream);
    }

    initMenu() {
        /*
        document.querySelector("#render").addEventListener('click', () => {
            this.render();
        });
        */

        const addNodeEle = document.querySelector("#add_node");
        addNodeEle.addEventListener('click', () => {
            if (addNodeEle.classList.contains('selected')) {
                addNodeEle.classList.remove('selected');
                this.click_mode = "default";
            } else {
                addNodeEle.classList.add('selected');
                this.click_mode = "add_node"
            }
        });

        document.querySelector("#del_node").addEventListener('click', () => {
            const selected_node = this.spline.getSelectedNode();

            if (selected_node) {
                this.spline.deleteNode(selected_node);
                this.render();
            }
            
        });


        document.querySelector("#clear").addEventListener('click', () => {
            this.spline.clear();
            this.render();
        });


        // Line connections
        document.querySelector("#linear").addEventListener('click', () => {
            this.spline.connectLinear();
            this.render();
        });

        document.querySelector("#polynomial").addEventListener('click', () => {
            this.spline.clearConnections();
            this.render("polynomial");
        });


        
    }


    onInput(input_data) {
        if (input_data.type === "click") return this.onClick(input_data);
    }

    onClick(input_data) {
        const previously_selected_node = this.spline.getSelectedNode();
        if (previously_selected_node) {
            // Move node
            this.spline.moveNode(previously_selected_node, input_data.x, input_data.y);
            
            // previously_selected_node.x = input_data.x;
            // previously_selected_node.y = input_data.y;
            
            this.spline.deselectAllNodes();

            this.render();
            return;
        }

        // Add node (if applicable)

        if (this.click_mode === "add_node") {
            this.spline.createNode(input_data.x, input_data.y);
            this.render();

            // Get out of add node mode
            document.querySelector("#add_node").classList.remove('selected');
            this.click_mode = "default";

            return;
        }


        // Compute node selection

        // newly hit node (may be selected or deselected)
        const hitNode = this.spline.getLastNodeInHitbox(input_data.x, input_data.y);

        if (hitNode !== null) {
            hitNode.selected = !hitNode.selected;
        } else {
            this.spline.deselectAllNodes();
        }

        this.render();
        
    }
}

export { App };