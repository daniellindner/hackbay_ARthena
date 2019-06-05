"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const mqtt_1 = require("mqtt");
class MessageSender extends events_1.EventEmitter {
    constructor() {
        super();
        this.client = mqtt_1.connect("mqtt://localhost", {
            username: "mqtt_broker",
            password: "hallo123"
        });
        this.setup();
        this.setupEventHandeler();
    }
    ;
    setup() {
        this.client.on("connect", () => {
            this.client.subscribe("machine_events/help", (err) => {
                if (!err) {
                    console.log("Successfully subscribed to help channel");
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
            this.emit("helpRequest", message);
        });
    }
    ;
    publishMap(map) {
        this.client.publish("machine_events/help", map);
    }
    ;
}
exports.MessageSender = MessageSender;
;
