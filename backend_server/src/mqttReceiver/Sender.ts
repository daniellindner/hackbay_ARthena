import { EventEmitter } from "events";
import { connect, MqttClient } from "mqtt";

export class MessageSender extends EventEmitter {
    private client: MqttClient; 
    
    constructor() {
        super();
        this.client = connect("mqtt://localhost", {
            username: "mqtt_broker",
            password: "hallo123"
        });
        this.setup();
        this.setupEventHandeler();
    };

    private setup(): void {
        this.client.on("connect", () => {
            this.client.subscribe("machine_events/help", (err: Error) => {
                if (!err) {
                    console.log("Successfully subscribed to help channel");
                    this.emit("ready");
                };
            })
        });
    };

    private setupEventHandeler(): void {
        this.client.on("message", (topic: string, payload: Buffer) => {
            const message: string = payload.toString();
            this.emit("helpRequest", message);
        });
    };

    public publishMap(map: string): void {
        this.client.publish("machine_events/help", map);
    };
};