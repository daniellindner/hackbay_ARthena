export interface UserMap {
    Waypoints: Array<WaypointData>;
    Machines: Array<MachineData>;
    User: UserData;
    Help: boolean;
}

export interface WaypointData extends BaseData {
    id: number;
    children: Array<number>;
    is_exit: boolean;
    is_machine: boolean;
};

export interface UserData extends BaseData {

};

export interface MachineData extends BaseData {
    id: number;
    waypoint_ids: Array<number>;
    ErrorState: ErrorState;
};


export interface BaseData {
    x: number;
    y: number;
    z: number;
};

export enum ErrorState {
    MAINTAINENCE="maintainence",
    DANGER="danger",
    HAZARD="hazard",
    NONE="none"
};

export interface BrokerEvent {
    id: number;
    state: ErrorState;
}

export interface HelpRequest {
    x: number;
    y: number;
    z: number;
}