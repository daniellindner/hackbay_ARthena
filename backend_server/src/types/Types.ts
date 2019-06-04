export interface UserMap {
    waypoints: Array<WaypointData>;
    machines: Array<MachineData>;
    user: UserData;
}

export interface WaypointData extends BaseData {
    id: Number;
    children: Array<Number>;
    isExit: boolean;
    isMachine: boolean;
};

export interface UserData extends BaseData {

};

export interface MachineData extends BaseData {
    id: Number;
    waypoints: Array<Number>;
    state: MachineState;
};

export interface MachineState {
    error: String;
};

export interface BaseData {
    x: Number;
    y: Number;
    z: Number;
};