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
    User: { x: 4.1, y: 5.2, z: 1.23 }
};
const testMap = {
    "User": {
        "x": 2.25,
        "y": 1.0,
        "z": 0.8500000238418579
    },
    "Machines": [
        {
            "x": -4.0,
            "y": 0.0,
            "z": 1.0,
            "id": 0,
            "ErrorState": Types_1.ErrorState.NONE,
            "waypoint_ids": [
                2
            ]
        }
    ],
    "Waypoints": [
        {
            "x": -0.7699999809265137,
            "y": 0.0,
            "z": 9.350000381469727,
            "id": 1,
            "children": [
                0,
                2,
                4
            ],
            "is_exit": false,
            "is_machine": true
        },
        {
            "x": -0.9200000762939453,
            "y": 0.0,
            "z": 17.09000015258789,
            "id": 0,
            "children": [
                1,
                4
            ],
            "is_exit": true,
            "is_machine": false
        },
        {
            "x": 5.75,
            "y": 0.0,
            "z": 8.920000076293946,
            "id": 4,
            "children": [
                0,
                4
            ],
            "is_exit": false,
            "is_machine": false
        },
        {
            "x": 6.090000152587891,
            "y": 0.0,
            "z": 2.440000057220459,
            "id": 4,
            "children": [
                4,
                3
            ],
            "is_exit": false,
            "is_machine": false
        },
        {
            "x": -0.5400000214576721,
            "y": 0.0,
            "z": 1.659999966621399,
            "id": 2,
            "children": [
                1,
                3,
                4
            ],
            "is_exit": false,
            "is_machine": true
        },
        {
            "x": -0.550000011920929,
            "y": 0.0,
            "z": -6.590000152587891,
            "id": 3,
            "children": [
                2,
                4
            ],
            "is_exit": true,
            "is_machine": false
        }
    ]
};
navigator.generateGraph(map);
console.log("Mapping serialized: ", navigator.map);
console.log("Escape strategy: ", navigator.lookupQuickestExit([map.User.x, map.User.y, map.User.z]));
navigator.updateState(11, Types_1.ErrorState.HAZARD);
console.log("Escape strategy: ", navigator.lookupQuickestExit([map.User.x, map.User.y, map.User.z]));
