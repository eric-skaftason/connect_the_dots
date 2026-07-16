import { Renderer } from "./Renderer.js";

const canvas = document.querySelector('#canvas');

const renderer = new Renderer(canvas, 400, 400);

const pixel_stream = (() => {
    let pixel_stream = [];
    for (let i = 0; i < 400 * 400; i++) {
        const rgb = [255, 255, 0];
        pixel_stream.push(rgb);
    }

    return pixel_stream;
})();

renderer.render(pixel_stream);