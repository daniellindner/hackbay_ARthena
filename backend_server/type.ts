interface MachineInfo {
 
    type: number;
    machineId:string;
    position:Array<2>;
    state:number;
    edge_Length:number;
    
}

interface exitInfo {

    type: number;
    exitId:string;
    position:Array<2>;
    state:number;
    edge_Length:number;

}

interface WorkerInfo {

    type:number;
    workerId:string;
    position:Array<2>;
 
}

interface ExitRoute {

    type:number;
    position:Array<Array<2>>;

}