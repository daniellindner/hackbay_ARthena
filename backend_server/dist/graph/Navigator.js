"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Graph = require("graph.js/dist/graph.full.js");
class Navigator {
    constructor() {
        this.graph = new Graph();
    }
    ;
    generateGraph(UserMap) {
        const map = UserMap;
        try {
            // Add all waypoints
            map.waypoints.forEach((waypoint) => {
                this.graph.addVertex(waypoint.id, { x: waypoint.x, y: waypoint.y, z: waypoint.z, isMachine: waypoint.isMachine, isExit: waypoint.isExit });
            });
            // Add all machines
            map.machines.forEach((machine) => {
                this.graph.addVertex(machine.id, { error: "none" });
            });
            // Add edges
            map.waypoints.forEach((waypoint) => {
                if (this.graph.hasVertex(waypoint.id)) {
                    // Go over all children and create an edge to its parent
                    waypoint.children.forEach((id) => {
                        this.graph.addNewEdge(waypoint.id, id);
                    });
                }
                else {
                    throw Error("HWEL");
                }
                ;
            });
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
        ;
    }
    ;
    get map() {
        return this.graph.toJSON();
    }
    getNearestNeighbor(position) {
        let lowestDistance = 100000;
        let nearestNode = 0;
        let waypoints = [];
        for (var it = this.graph.vertices(), kv; !(kv = it.next()).done;) {
            var key = kv.value[0], value = kv.value[1];
            if (value["x"] && value["y"] && value["z"]) {
                waypoints.push({ id: key, value: value });
            }
            ;
            // iterates over all vertices of the graph
        }
        ;
        waypoints.forEach((waypoint) => {
            const tmpDist = Math.abs(waypoint.value.x - position[0]) + Math.abs(waypoint.value.y - position[1]);
            if (tmpDist < lowestDistance) {
                lowestDistance = tmpDist;
                nearestNode = waypoint.id;
            }
            ;
        });
        return nearestNode;
    }
    ;
    lookupQuickestExit(position) {
        const from = this.getNearestNeighbor(position);
        for (let it = this.graph.verticesFrom(from), kv; !(kv = it.next()).done;) {
            var to = kv.value[0], vertexValue = kv.value[1];
            // iterates over all outgoing vertices of the `from` vertex
        }
        return JSON.stringify({ this: "is the map now" });
    }
    ;
}
exports.Navigator = Navigator;
