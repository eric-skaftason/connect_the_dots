class Node {

}

class Spline {

    #nodes = [];

    constructor() {
        this.nodeHitboxRadius = 5;

        this.initDebugNodes();
    }

    initDebugNodes() {
        this.#nodes.push({x: 59, y: 99, selected: false});
        this.#nodes.push({x: 159, y: 299, selected: false});
    }

    // prioritise nodes added last
    getLastNodeInHitbox(x, y) {
        if (this.#nodes.length === 0) return null;
        
        for (let i = this.#nodes.length - 1; i >= 0; i--) {
            const node = this.#nodes[i];

            if (Math.abs(node.x - x) <= this.nodeHitboxRadius && Math.abs(node.y - y) <= this.nodeHitboxRadius) return node;
        }

        return null;
    }

    getNodes() {
        return this.#nodes;
    }

    // return an array with coordinate points to fill when rendering
    getSplineData() {

    }
}


export { Spline };