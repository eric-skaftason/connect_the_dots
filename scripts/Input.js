class Input {
    constructor(canvas, onInput) {
        this.canvas = canvas;

        // callback function
        this.onInput = onInput;

        this.canvas.addEventListener('click', (event) => this.onClick(event));
    }

    getXYFromEvent(event) {
        const rect = this.canvas.getBoundingClientRect();

        const canvas_x = event.clientX - rect.left;
        const canvas_y = event.clientY - rect.top;

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