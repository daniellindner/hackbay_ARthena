import * as net from "net";

import { Navigator } from "../graph/Navigator";
import { validateClientMap } from "../util/validateClientMap"
import { MessageReceiver } from "../mqttReceiver/Receiver";

export class Server extends net.Server {
    private navigator: Navigator;
    private backend: MessageReceiver;
    private port: number;

    constructor(navigator: Navigator,backendReceiver: MessageReceiver, port?: number) {
        super();
        this.port = port || 8000;
        this.navigator = navigator;
        this.backend = backendReceiver;
    };

    public setup(): void {
        this.setupConnectionListener();
        this.setupErrorListener();
        this.setupCloseListener();
        this.listen(this.port, () => {
            console.log(`Server bound on port ${this.port} and ready!`);
        });
    };

    // Ignore this, just use to catch close events and not throw etc.
    private setupCloseListener(): void {
        this.on("close", (hadError: boolean) => {
            if (hadError) {
                // Implement retransmission logic once needed, for now fuck it
            } else {
                console.log("yhea quit")
                // Client disconnected, we dont care
            };
        });
    };

    // Just to catch error and not disturb production
    private setupErrorListener(): void {
        this.on("error", (err: Error) => {
            console.log(`Error occured durning normal execution: ${err.message}`);
        });
    };

    private setupConnectionListener(): void {
        this.on("connection", (connection: net.Socket) => {
            console.log("have connection")
            this.handleConnection(connection);
        });
    };

    private handleConnection(connection: net.Socket): void {
        // Implement first map transmission
        connection.once("data", (buffer: Buffer) => {
            console.log("got data")
            const stringified: string = buffer.toString();
            const jsonified: Object = JSON.parse(stringified);
            const valid: boolean = validateClientMap(jsonified);
            if (valid) {
                this.navigator.generateGraph(jsonified);
            } else {
                connection.write(JSON.stringify(
                    { error: "message invalid" }
                ));
            };
        });

        // Handle help requests from user
        connection.on("data", (buffer: Buffer) => {
            this.handleUserMessage(connection, buffer.toString());
        });

        // Handle event from broker
        this.backend.on("event", (message: string) => {
            console.log(`Message from broker received: ${message}`);
            connection.write(JSON.stringify(message));
        });
    };

    private handleUserMessage(connection: net.Socket, message: string): void {
        // Check message type at later point, not needed for mvp
        // isMessageOk(message) => true etc.
        // Just print for now, later we call something like this:
        const path: any = this.navigator.lookupQuickestExit({help: "me"});
        connection.write(`${path.toString()}\n`);
    };
};