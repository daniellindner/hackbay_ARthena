const graph = require("graph.js/dist/graph.full.js");

export class Navigator {
    private graph: any;
    constructor() {
        this.graph = new Graph();
    };

    public generateGraph(map: Object): boolean {
        try {
            return true;
        } catch {
            return false;
        };
    };

    public updateGraph(node: string, status: string): void {
        if (this.graph.hasVertex(node)) {
            this.graph.setVertex(node, status);
        } else {
            return;
        };
    };

    public lookupQuickestExit(position: any): any {
        return JSON.stringify({map: "this is the map for now!"});
    };
}