"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Navigator_1 = require("./Navigator");
const navigator = new Navigator_1.Navigator();
const map = {
    waypoints: [
        { id: 1, children: [2, 4], isExit: false, isMachine: false, x: 241, y: 912, z: 123 },
        { id: 2, children: [1, 3], isExit: false, isMachine: true, x: 161, y: 112, z: 123 },
        { id: 3, children: [2, 4], isExit: false, isMachine: false, x: 1472, y: 123, z: 123 },
        { id: 4, children: [1, 3], isExit: false, isMachine: false, x: 70, y: 80, z: 123 }
    ],
    machines: [
        { id: 11, state: { error: "none" }, waypoints: [1, 2, 3], x: 123, y: 123, z: 123 }
    ],
    user: { x: 1.24, y: 3.21, z: 1.23 }
};
navigator.generateGraph(map);
console.log(navigator.getNearestNeighbor([243, 123, 0]));
console.log(navigator.map);
