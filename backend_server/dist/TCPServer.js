"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Receiver_1 = require("./mqttReceiver/Receiver");
const Navigator_1 = require("./graph/Navigator");
const Server_1 = require("./server/Server");
const Types_1 = require("./types/Types");
const backend = new Receiver_1.MessageReceiver();
const navigator = new Navigator_1.Navigator();
const server = new Server_1.Server(navigator, backend, 8000);
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
server.injectMap(map);
server.printMap();
server.setup();
