"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MQTTServer {
    constructor(navigator, backendReceiver, backendSender) {
        this.navigator = navigator;
        this.backend = backendReceiver;
        this.backendHelp = backendSender;
    }
    ;
    injectMap(map) {
        this.navigator.generateGraph(map);
    }
    ;
    printMap() {
        console.log(this.navigator.map);
    }
    ;
    setup() {
        this.setupBackendEventListener();
        this.setupBackendPathListener();
    }
    ;
    setupBackendEventListener() {
        this.backend.on("event", (message) => {
            console.log("Received message from broker: ", message);
            const update = JSON.parse(message);
            if (this.navigator.checkMachineOrDiscard(update.id)) {
                this.navigator.updateState(update.id, update.state);
                console.log("Updated map");
            }
            else {
                console.log("Discarding message");
            }
            ;
        });
    }
    ;
    setupBackendPathListener() {
        this.backendHelp.on("helpRequest", (message) => {
            console.log("Received help request from broker: ", message);
            const update = JSON.parse(message);
            if (this.isHelpRequest(update)) {
                const map = this.navigator.lookupQuickestExit([update.x, update.y, update.z]);
                this.backendHelp.publishMap(map);
            }
            else {
                // Got map
            }
        });
    }
    isHelpRequest(msg) {
        const hasKeys = [
            msg.hasOwnProperty("x"),
            msg.hasOwnProperty("y"),
            msg.hasOwnProperty("z"),
        ].every((boolean) => { return boolean; });
        return hasKeys;
    }
    ;
}
exports.MQTTServer = MQTTServer;
