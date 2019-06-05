const Graph = require("graph.js/dist/graph.full.js");

import { UserMap, WaypointData, MachineData, ErrorState } from "../types/Types";

export class Navigator {
    private graph: any
    constructor() {
        this.graph = new Graph();
    };

    public get map(): Object {
        return this.graph.toJSON();
    };

    public checkMachineOrDiscard(id: number): boolean {
        try {
            const node: any = this.graph.vertexValue(id);
            if (node["error"] !== undefined ) {
                return true;
            };
        } catch (e) {
            console.log(e.message);
        };
        return false;
    };

    public generateGraph(UserMap: any): boolean {
        const map: UserMap = UserMap as UserMap;
        try {
            // Add all waypoints
            map.Waypoints.forEach((waypoint: WaypointData) => {
                this.graph.addVertex(waypoint.id, { x: waypoint.x, y: waypoint.y, z: waypoint.z, isMachine: waypoint.is_machine, isExit: waypoint.is_exit });
            });

            // Add all machines
            map.Machines.forEach((machine: MachineData) => {
                this.graph.addVertex(machine.id, <Object>{ error: machine.ErrorState });
                machine.waypoint_ids.forEach((id: number) => {
                    this.graph.addNewEdge(id, machine.id, 100000);
                })
            });

            // Add edges
            map.Waypoints.forEach((waypoint: WaypointData) => {
                if (this.graph.hasVertex(waypoint.id)) {
                    // Go over all children and create an edge to its parent
                    waypoint.children.forEach((id: number) => {
                        this.graph.addNewEdge(waypoint.id, id, this.calculateDistance(waypoint.id, id));
                    });
                } else {
                    throw Error("How are we getting here");
                };
            });
            return true;
        } catch (e) {
            console.log(e)
            return false;
        };
    };

    public lookupQuickestExit(position: [number, number, number]): string {
        const from = this.getNearestNeighbor(position);
        const escapeStrategy = this.propagateGraph(from);

        return JSON.stringify({ map: escapeStrategy });
    };

    private calculateDistance(pos1: number, pos2: number): number {
        const xDist: number = Math.pow(this.graph.vertexValue(pos1).x - this.graph.vertexValue(pos2).x, 2);
        const yDist: number = Math.pow(this.graph.vertexValue(pos1).y - this.graph.vertexValue(pos2).y, 2);
        return Math.sqrt(xDist + yDist);
    };

    private getNearestNeighbor(position: [number, number, number]): number {
        let lowestDistance = 100000;
        let nearestNode = 0;
        let waypoints = <any>[];

        // iterates over all vertices of the graph
        for (var it = this.graph.vertices(), kv; !(kv = it.next()).done;) {
            var key = kv.value[0],
                value = kv.value[1];
            if (value["x"] && value["y"] && value["z"]) {
                waypoints.push({ id: key, value: value });
            };
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

    public updateState(id: number, state: ErrorState): void {
        try {
            this.graph.setVertex(id, {machine: true, error: state});
        } catch (e) {
            console.log(e.message);
        };
    }; 

    private areSourrundingMachinesOk(node: number): boolean {
        for (let it = this.graph.verticesFrom(node), kv; !(kv = it.next()).done;) {
            // iterates over all outgoing vertices of the `from` vertex
            var to = kv.value[0],
                vertexValue = kv.value[1]

            if (vertexValue["error"] !== undefined && vertexValue["error"] !== "none") {
                return false;
            };
        };

        return true;
    };

    private propagateGraph(startNode: number): Array<number> {
        let exitFound: boolean = false;
        let path: Array<number> = [];
        let currentNode: number = startNode;
        path.push(currentNode);

        while (!exitFound) {
            currentNode = this.getNextNeighbor(currentNode);
            try {
                if (this.graph.vertexValue(currentNode).isExit === true) {
                    exitFound = true;
                };
            } catch (e) {
                console.log(e);
            };
            path.push(currentNode);
        };
        return path;
    };

    // Check all touching vertices whether they are machines and if their state is ok
    // Return the shortest path
    private getNextNeighbor(startNode: number): number {
        let nearestNode: number = 0;
        let shortestEdge: number = 100000;
        for (let it = this.graph.verticesFrom(startNode), kv; !(kv = it.next()).done;) {
            // iterates over all outgoing vertices of the `from` vertex
            var to = kv.value[0],
                vertexValue = kv.value[1],
                edgeValue = kv.value[2]
            // IF it is an exit, we just leave
            if (vertexValue["isExit"]) {
                return to;
            } else {
                // Is this the new shortest path to freedom?
                if (edgeValue < shortestEdge && this.areSourrundingMachinesOk(to)) {
                    nearestNode = to;
                }
            };
        };
        return nearestNode;
    };
}