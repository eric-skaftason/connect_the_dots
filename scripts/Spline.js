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

            if (Math.abs(x - node.x) <= this.nodeHitboxRadius && Math.abs(y - node.y) <= this.nodeHitboxRadius) return node;
        }

        return null;
    }

    getNodes() {
        return this.#nodes;
    }

    getSelectedNode() {
        for (const node of this.#nodes) {
            if (node.selected === true) return node;
        }

        return null;
    }

    deselectAllNodes() {
        for (const node of this.#nodes) {
            node.selected = false;
        }
    }

    // return an array with coordinate points to fill when rendering
    getSplineData() {

    }
}


export { Spline };