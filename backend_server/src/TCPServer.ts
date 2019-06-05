import { MessageReceiver } from "./mqttReceiver/Receiver";
import { Navigator } from "./graph/Navigator";
import { Server } from "./server/Server";
import { UserMap, ErrorState } from "./types/Types";

const backend: MessageReceiver = new MessageReceiver();
const navigator: Navigator = new Navigator();

const server: Server = new Server(navigator, backend, 8000);

const map: UserMap = {
    Waypoints: [
        { id: 1, children: [2, 4], is_exit: true, is_machine: false, x: 1, y: 1, z: 1.5 },
        { id: 2, children: [1, 3], is_exit: false, is_machine: true, x: 4, y: 1, z: 2 },
        { id: 3, children: [2, 4], is_exit: false, is_machine: false, x: 4, y: 5, z: 1 },
        { id: 4, children: [1, 3], is_exit: false, is_machine: false, x: 1, y: 5, z: 3 }
    ],
    Machines: [
        {id: 11, ErrorState: ErrorState.NONE, waypoint_ids: [4], x: 5, y: 1, z: 5}
    ],
    User: { x: 4.1, y: 5.2, z: 1.23 },
    Help: true
}


server.injectMap(map);
server.printMap();
server.setup();