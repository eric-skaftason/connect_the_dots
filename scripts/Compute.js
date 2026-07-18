class Compute {
    static #lagrangeInterpolation(points, sample_x) {
        // e.g. points = [[2, 4], [88, 97], [103, 37], ...]

        const n = points.length;
        let sum = 0;

        for (let i = 0; i < n; i++) {
            let term_i = points[i].y;

            const xi = points[i].x;

            for (let j = 0; j < n; j++) {
                const xj = points[j].x;

                if (j !== i) term_i = term_i * (sample_x - xj) / (xi - xj);
            }

            sum += term_i;
        }

        return sum;
    }

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

    // given_nodes must be ordered by x-value
    static generatePolynomialPoints(given_nodes) {
        if (given_nodes.length === 0) return [];

        const min_x = given_nodes[0].x;
        const max_x = given_nodes[given_nodes.length - 1].x;

        let points = [];

        for (let sample_x = min_x; sample_x <= max_x; sample_x++) {
            const y = Math.round(this.#lagrangeInterpolation(given_nodes, sample_x));

            points.push([sample_x, y]);
        }

        return points;
    }


    static generateCosineInterpolationPoints(x1, y1, x2, y2) {
        // mu = interpolation factor [0, 1] -> how close to each end

        let points = [];

        const dx_total = x2 - x1;

        for (let sample_x = x1; sample_x <= x2; sample_x++) {

            const dx = x2 - sample_x;
            const mu = 1 - dx / dx_total

            const y = y1 + (y2 - y1) * (1 - Math.cos(Math.PI * mu)) / 2;

            points.push([sample_x, Math.round(y)]);
        }

        return points;
    }

}

export { Compute };