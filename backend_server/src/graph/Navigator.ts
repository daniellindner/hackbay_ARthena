const Graph = require("graph.js/dist/graph.full.js");

import { UserMap, WaypointData, MachineData, MachineState } from "../types/Types";

export class Navigator {
    private graph: any
    constructor() {
        this.graph = new Graph();
    };

    public generateGraph(UserMap: any): boolean {
        const map: UserMap = UserMap as UserMap;
        try {
            // Add all waypoints
            map.waypoints.forEach((waypoint: WaypointData) => {
                this.graph.addVertex(waypoint.id, { x: waypoint.x, y: waypoint.y, z: waypoint.z, isMachine: waypoint.isMachine, isExit: waypoint.isExit });
            });

            // Add all machines
            map.machines.forEach((machine: MachineData) => {
                this.graph.addVertex(machine.id, <MachineState>{ error: "none" });
            });

            // Add edges
            map.waypoints.forEach((waypoint: WaypointData) => {
                if (this.graph.hasVertex(waypoint.id)) {
                    // Go over all children and create an edge to its parent
                    waypoint.children.forEach((id: Number) => {
                        this.graph.addNewEdge(waypoint.id, id);
                    });
                } else {
                    throw Error("HWEL");
                };
            });
            return true;
        } catch (e) {
            console.log(e)
            return false;
        };
    };

    public get map(): Object {
        return this.graph.toJSON();
    }

    public getNearestNeighbor(position: [number,number,number]): number {
        let lowestDistance = 100000;
        let nearestNode = 0;
        let waypoints = <any>[];
        for (var it = this.graph.vertices(), kv; !(kv = it.next()).done;) {
            var key   = kv.value[0],
                value = kv.value[1];
            if (value["x"] && value["y"] && value["z"]) {
                waypoints.push({id: key, value: value});
            };
            // iterates over all vertices of the graph
        };

        waypoints.forEach((waypoint: any) => {
            const tmpDist: number = Math.abs(waypoint.value.x - position[0]) + Math.abs(waypoint.value.y - position[1]);
            if (tmpDist < lowestDistance) {
                lowestDistance = tmpDist;
                nearestNode = waypoint.id;
            };
        });

        return nearestNode;
    };

    public lookupQuickestExit(position: any): string {
        const from = this.getNearestNeighbor(position);


        
        return JSON.stringify({ this: "is the map now" });
    };

    private descentParse(startNode: number): number {
        for (let it = this.graph.verticesFrom(startNode), kv; !(kv = it.next()).done;) {
            // iterates over all outgoing vertices of the `from` vertex
            var to = kv.value[0],
                vertexValue = kv.value[1]
            if (vertexValue["isExit"]) {
                return to;
            } else {
                this.descentParse(to);
                break;
            };
        };
    };
}