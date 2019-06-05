"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Navigator_1 = require("./Navigator");
const Types_1 = require("../types/Types");
const navigator = new Navigator_1.Navigator();
const map = {
    Waypoints: [
        { id: 1, children: [2, 4], is_exit: true, is_machine: false, x: 1, y: 1, z: 1.5 },
        { id: 2, children: [1, 3], is_exit: false, is_machine: true, x: 4, y: 1, z: 2 },
        { id: 3, children: [2, 4], is_exit: false, is_machine: false, x: 4, y: 5, z: 1 },
        { id: 4, children: [1, 3], is_exit: false, is_machine: false, x: 1, y: 5, z: 3 }
    ],
    Machines: [
        { id: 11, ErrorState: Types_1.ErrorState.NONE, waypoint_ids: [4], x: 5, y: 1, z: 5 }
    ],
    User: { x: 4.1, y: 5.2, z: 1.23 },
    Help: true
};
navigator.generateGraph(map);
console.log("Mapping serialized: ", navigator.map);
console.log("Escape strategy: ", navigator.lookupQuickestExit([map.User.x, map.User.y, map.User.z]));
navigator.updateState(11, Types_1.ErrorState.HAZARD);
console.log("Escape strategy: ", navigator.lookupQuickestExit([map.User.x, map.User.y, map.User.z]));
