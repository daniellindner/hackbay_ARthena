"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graph = require("graph.js/dist/graph.full.js");
class Navigator {
    constructor() {
        this.graph = new Graph();
    }
    ;
    generateGraph(map) {
        try {
            return true;
        }
        catch (_a) {
            return false;
        }
        ;
    }
    ;
    updateGraph(node, status) {
        if (this.graph.hasVertex(node)) {
            this.graph.setVertex(node, status);
        }
        else {
            return;
        }
        ;
    }
    ;
    lookupQuickestExit(position) {
        return JSON.stringify({ map: "this is the map for now!" });
    }
    ;
}
exports.Navigator = Navigator;
