const Graph = require("graph.js/dist/graph.full.js");

export class Navigator {
    private graph: any
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

    public lookupQuickestExit(position: any): any {
        return JSON.stringify({map: "this is the map for now!"});
    };
}