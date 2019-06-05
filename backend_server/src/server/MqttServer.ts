import { MessageReceiver } from "../mqttReceiver/Receiver";
import { BrokerEvent, HelpRequest, UserMap } from "../types/Types";
import { Navigator } from "../graph/Navigator";
import { MessageSender } from "../mqttReceiver/Sender";

export class MQTTServer {
    private navigator: Navigator;
    private backend: MessageReceiver;
    private backendHelp: MessageSender;

    constructor(navigator: Navigator, backendReceiver: MessageReceiver, backendSender: MessageSender) {
        this.navigator = navigator;
        this.backend = backendReceiver;
        this.backendHelp = backendSender;
    };

    public injectMap(map: UserMap): void {
        this.navigator.generateGraph(map);
    };
    
    public printMap():void {
        console.log(this.navigator.map);
    };

    public setup(): void {
        this.setupBackendEventListener();
        this.setupBackendPathListener();
    };

    private setupBackendEventListener(): void {
        this.backend.on("event", (message: string) => {
            console.log("Received message from broker: ", message);
            const update: BrokerEvent = JSON.parse(message);
            if (this.navigator.checkMachineOrDiscard(update.id)) {
                this.navigator.updateState(update.id, update.state);
                console.log("Updated map");
            } else {
                console.log("Discarding message");
            };
        });
    };

    private setupBackendPathListener(): void {
        this.backendHelp.on("helpRequest", (message: string) => {
            console.log("Received help request from broker: ", message);
            const update: any = JSON.parse(message);
            if (this.isHelpRequest(update)) {
                const map: string = this.navigator.lookupQuickestExit([update.x, update.y, update.z]);
                this.backendHelp.publishMap(map);
            } else {
                // Got map
            }
        });
    }

    private isHelpRequest(msg: Object): boolean {
        const hasKeys: boolean = [
            msg.hasOwnProperty("x"),
            msg.hasOwnProperty("y"),
            msg.hasOwnProperty("z"),
        ].every((boolean) =>{ return boolean });

        return hasKeys;
    };
}