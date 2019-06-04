import { EventEmitter } from "events";
import { connect, MqttClient } from "mqtt";

export class MessageReceiver extends EventEmitter {
    private client: MqttClient; 
    
    constructor() {
        super();
        this.client = connect("mqtt://localhost");
        this.setup();
        this.setupEventHandeler();
    };

    private setup(): void {
        this.client.on("connect", () => {
            this.client.subscribe("machine_events/mainnet", (err: Error) => {
                if (!err) {
                    console.log("Successfully subscribed to message channel");
                    this.emit("ready");
                };
            })
        });
    };

    private setupEventHandeler(): void {
        this.client.on("message", (topic: string, payload: Buffer) => {
            const message: string = payload.toString();
            this.emit("event", message);
        });
    };
};