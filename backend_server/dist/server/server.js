"use strict";
<<<<<<< HEAD
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const net = __importStar(require("net"));
const validateClientMap_1 = require("../util/validateClientMap");
class Server extends net.Server {
    constructor(navigator, backendReceiver, port) {
        super();
        this.port = port || 8000;
        this.navigator = navigator;
        this.backend = backendReceiver;
    }
    ;
    setup() {
        this.setupConnectionListener();
        this.setupErrorListener();
        this.setupCloseListener();
        this.listen(this.port, () => {
            console.log(`Server bound on port ${this.port} and ready!`);
        });
    }
    ;
    // Ignore this, just use to catch close events and not throw etc.
    setupCloseListener() {
        this.on("close", (hadError) => {
            if (hadError) {
                // Implement retransmission logic once needed, for now fuck it
            }
            else {
                console.log("yhea quit");
                // Client disconnected, we dont care
            }
            ;
        });
    }
    ;
    // Just to catch error and not disturb production
    setupErrorListener() {
        this.on("error", (err) => {
            console.log(`Error occured durning normal execution: ${err.message}`);
        });
    }
    ;
    setupConnectionListener() {
        this.on("connection", (connection) => {
            console.log("have connection");
            this.handleConnection(connection);
        });
    }
    ;
    handleConnection(connection) {
        // Implement first map transmission
        connection.once("data", (buffer) => {
            console.log("got data");
            const stringified = buffer.toString();
            const jsonified = JSON.parse(stringified);
            const valid = validateClientMap_1.validateClientMap(jsonified);
            if (valid) {
                this.navigator.generateGraph(jsonified);
            }
            else {
                connection.write(JSON.stringify({ error: "message invalid" }));
            }
            ;
        });
        // Handle help requests from user
        connection.on("data", (buffer) => {
            this.handleUserMessage(connection, buffer.toString());
        });
        // Handle event from broker
        this.backend.on("event", (message) => {
            console.log(`Message from broker received: ${message}`);
            this.navigator.updateGraph(message, "error");
            connection.write(JSON.stringify(message));
        });
    }
    ;
    handleUserMessage(connection, message) {
        // Check message type at later point, not needed for mvp
        // isMessageOk(message) => true etc.
        // Just print for now, later we call something like this:
        const path = this.navigator.lookupQuickestExit({ help: "me" });
        connection.write(`${path.toString()}\n`);
    }
    ;
}
exports.Server = Server;
;
=======
const net = require('net');
const server = net.createServer((c) => {
    // 'connection' listener
    console.log('client connected');
    c.on('end', () => {
        console.log('client disconnected');
    });
    c.write('hello\r\n');
    setInterval(() => {
        c.write(`${JSON.stringify({ this: "is a test" })}\n`);
    }, 2000);
    c.on("data", (data) => {
        console.log(data.toString());
    });
});
server.on('error', (err) => {
    console.log(err);
});
server.listen(9000, () => {
    console.log('server bound');
});
>>>>>>> 51f5b203ce7b22d993517215a95ffbc73324fabb
