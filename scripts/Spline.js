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
        this.nodeHitboxRadius = 1;

        this.enforce_function_mapping = true; // prevents multiple nodes per one x-value
        this.max_x_shift = 2; // max shift in +/- x direction to search for a valid space if the x value of a proposed new node is invalid

        this.initDebugNodes();
    }

    initDebugNodes() {
        const node1 = new Node(59, 99);
        this.#nodes.push(node1);

        const node2 = new Node(159, 109);
        this.#nodes.push(node2);

        this.connectNodes(node1, node2, "linear");
    }

    searchForValidX(current_x) {
        if (!this.isXOccupied(current_x)) {
            return current_x;
        }

        // Search outwards up to max_x_shift limit
        for (let offset = 1; offset <= this.max_x_shift; offset++) {
            let check_right = current_x + offset;
            let check_left = current_x - offset;

            // check if right is valid
            if (check_right < this.width && !this.isXOccupied(check_right)) {
                return check_right;
            }

            // check if left is valid
            if (check_left >= 0 && !this.isXOccupied(check_left)) {
                return check_left;
            }
        }

        return null; 
    }

    // Quick helper method to keep your loop clean
    isXOccupied(x) {
        for (const node of this.#nodes) {
            if (x === node.x) {
                return true;
            }
        }
        return false;
    }


    createNode(x, y) {
        if (this.enforce_function_mapping) {
            if (this.isXOccupied(x)) {
                x = this.searchForValidX(x);
                if (x === null) return console.warn("Cannot create node: Invalid x-value provided; could not find safe x-value within max_x_shift limit.");
            }
        }

        const node = new Node(x, y);
        this.#nodes.push(node);
    }

    moveNode(node, x, y) {
        if (this.enforce_function_mapping && this.isXOccupied(x)) {
            x = this.searchForValidX(x);
            if (x === null) return console.warn("Cannot move node: Invalid x-value provided; could not find safe x-value within max_x_shift limit.");
        }

        node.x = x;
        node.y = y;
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

    clear() {
        this.#nodes = [];
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
    }

    connectNodesMutually(node1, node2) {        
        node1.connections.push({to: node2, type: "linear"});
        node2.connections.push({to: node1, type: "linear"});
    }

    // return an array with coordinate points to fill when rendering
    getSplineData() {

    }
}


export { Spline };