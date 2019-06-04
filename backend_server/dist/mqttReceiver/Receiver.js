"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const mqtt_1 = require("mqtt");
class MessageReceiver extends events_1.EventEmitter {
    constructor() {
        super();
        this.client = mqtt_1.connect("mqtt://localhost");
        this.setup();
        this.setupEventHandeler();
    }
    ;
    setup() {
        this.client.on("connect", () => {
            this.client.subscribe("machine_events/mainnet", (err) => {
                if (!err) {
                    console.log("Successfully subscribed to message channel");
                    this.emit("ready");
                }
                ;
            });
        });
    }
    ;
    setupEventHandeler() {
        this.client.on("message", (topic, payload) => {
            const message = payload.toString();
            this.emit("event", message);
        });
    }
    ;
}
exports.MessageReceiver = MessageReceiver;
;
