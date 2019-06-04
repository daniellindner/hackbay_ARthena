"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Receiver_1 = require("./mqttReceiver/Receiver");
const Navigator_1 = require("./graph/Navigator");
const Server_1 = require("./server/Server");
const backend = new Receiver_1.MessageReceiver();
const navigator = new Navigator_1.Navigator();
const server = new Server_1.Server(navigator, backend, 8000);
server.setup();
