class Input {
    constructor(canvas, scale_factor, onInput) {
        this.canvas = canvas;

        this.scale_factor = scale_factor;

        // callback function
        this.onInput = onInput;

        this.canvas.addEventListener('click', (event) => this.onClick(event));
    }

    getXYFromEvent(event) {
        const rect = this.canvas.getBoundingClientRect();

        const canvas_x = (event.clientX - rect.left) / this.scale_factor;
        const canvas_y = (event.clientY - rect.top) / this.scale_factor;

        return [Math.floor(canvas_x), Math.floor(canvas_y)];
    }


    onClick(event) {
        const click_pos = this.getXYFromEvent(event);
        
        this.onInput({
            type: "click",
            x: click_pos[0],
            y: click_pos[1]
        });


    }
}

export { Input };