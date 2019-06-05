import { MQTTServer } from "./server/MqttServer";
import { Navigator } from "./graph/Navigator";
import { MessageReceiver } from "./mqttReceiver/Receiver";
import { MessageSender } from "./mqttReceiver/Sender";
import { UserMap, ErrorState } from "./types/Types";

const navigator = new Navigator();
const backend = new MessageReceiver();
const backendHelp = new MessageSender();

const mqttServer = new MQTTServer(navigator, backend, backendHelp);

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
};

mqttServer.setup();
mqttServer.injectMap(map);