class Compute {
    static lerp([start_x, start_y, end_x, end_y], sample_x) {
        const dx = end_x - start_x;
        const dy = end_y - start_y;

        const slope = dy / dx;

        const b = start_y - slope * start_x;

        const sampled_value = slope * sample_x + b;

        return Math.round(sampled_value);
    }

    // Bresenham's line algorithm
    static generateLinePoints(x1, y1, x2, y2) {
        const points = [];

        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);

        // sx -> step in x direction
        let sx = x1 < x2 ? 1 : -1;
        let sy = y1 < y2 ? 1 : -1;

        let err = dx - dy;

        while (true) {
            points.push([x1, y1]);

            if (x1 === x2 && y1 === y2) {
                break;
            }

            const e2 = err * 2;

            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }

            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }

        return points;
    }
}

export { Compute };