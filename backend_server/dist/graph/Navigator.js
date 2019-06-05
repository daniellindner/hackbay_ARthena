"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Graph = require("graph.js/dist/graph.full.js");
class Navigator {
    constructor() {
        this.graph = new Graph();
    }
    ;
    get map() {
        return this.graph.toJSON();
    }
    ;
    generateGraph(UserMap) {
        const map = UserMap;
        try {
            // Add all waypoints
            map.Waypoints.forEach((waypoint) => {
                this.graph.addVertex(waypoint.id, { x: waypoint.x, y: waypoint.y, z: waypoint.z, isMachine: waypoint.is_machine, isExit: waypoint.is_exit });
            });
            // Add all machines
            map.Machines.forEach((machine) => {
                this.graph.addVertex(machine.id, { error: machine.ErrorState });
                machine.waypoint_ids.forEach((id) => {
                    this.graph.addNewEdge(id, machine.id, 100000);
                });
            });
            // Add edges
            map.Waypoints.forEach((waypoint) => {
                if (this.graph.hasVertex(waypoint.id)) {
                    // Go over all children and create an edge to its parent
                    waypoint.children.forEach((id) => {
                        this.graph.addNewEdge(waypoint.id, id, this.calculateDistance(waypoint.id, id));
                    });
                }
                else {
                    throw Error("How are we getting here");
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
    lookupQuickestExit(position) {
        const from = this.getNearestNeighbor(position);
        const escapeStrategy = this.propagateGraph(from);
        return JSON.stringify({ map: escapeStrategy });
    }
    ;
    calculateDistance(pos1, pos2) {
        const xDist = Math.pow(this.graph.vertexValue(pos1).x - this.graph.vertexValue(pos2).x, 2);
        const yDist = Math.pow(this.graph.vertexValue(pos1).y - this.graph.vertexValue(pos2).y, 2);
        return Math.sqrt(xDist + yDist);
    }
    ;
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
    updateState(id, state) {
        this.graph.setVertex(id, { error: state });
    }
    ;
    areSourrundingMachinesOk(node) {
        for (let it = this.graph.verticesFrom(node), kv; !(kv = it.next()).done;) {
            // iterates over all outgoing vertices of the `from` vertex
            var to = kv.value[0], vertexValue = kv.value[1], edgeValue = kv.value[2];
            if (vertexValue["error"] !== undefined && vertexValue["error"] !== "none") {
                return false;
            }
            ;
        }
        ;
        return true;
    }
    ;
    propagateGraph(startNode) {
        let exitFound = false;
        let path = [];
        let currentNode = startNode;
        path.push(currentNode);
        while (!exitFound) {
            currentNode = this.getNextNeighbor(currentNode);
            if (this.graph.vertexValue(currentNode).isExit === true) {
                exitFound = true;
            }
            ;
            path.push(currentNode);
        }
        ;
        return path;
    }
    ;
    // Check all touching vertices whether they are machines and if their state is ok
    // Return the shortest path
    getNextNeighbor(startNode) {
        let nearestNode = 0;
        let shortestEdge = 100000;
        for (let it = this.graph.verticesFrom(startNode), kv; !(kv = it.next()).done;) {
            // iterates over all outgoing vertices of the `from` vertex
            var to = kv.value[0], vertexValue = kv.value[1], edgeValue = kv.value[2];
            // IF it is an exit, we just leave
            if (vertexValue["isExit"]) {
                return to;
            }
            else {
                // Is this the new shortest path to freedom?
                if (edgeValue < shortestEdge && this.areSourrundingMachinesOk(to)) {
                    nearestNode = to;
                }
            }
            ;
        }
        ;
        return nearestNode;
    }
    ;
}
exports.Navigator = Navigator;
