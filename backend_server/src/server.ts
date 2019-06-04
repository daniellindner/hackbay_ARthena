import { MessageReceiver } from "./mqttReceiver/Receiver";
import { Navigator } from "./graph/Navigator";
import { Server } from "./server/Server";

const backend: MessageReceiver = new MessageReceiver();
const navigator: Navigator = new Navigator();

const server: Server = new Server(navigator, backend, 8000);
server.setup();