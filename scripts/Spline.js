class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.selected = false;

        this.connections = [];
    }
}

class Spline {

    #nodes = [];

    constructor() {
        this.nodeHitboxRadius = 5;

        this.initDebugNodes();
    }

    initDebugNodes() {
        const node1 = new Node(59, 99);
        this.#nodes.push(node1);

        const node2 = new Node(159, 109);
        this.#nodes.push(node2);

        this.connectNodes(node1, node2, "linear");
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

    connectNodes(node1, node2) {        
        node1.connections.push({to: node2, type: "linear"});
        node2.connections.push({to: node1, type: "linear"});
    }

    // return an array with coordinate points to fill when rendering
    getSplineData() {

    }
}


export { Spline };