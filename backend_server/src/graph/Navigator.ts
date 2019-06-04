export class Navigator {
    constructor() {

    };

    public generateGraph(map: Object): boolean {
        try {
            return true;
        } catch {
            return false;
        };
    };

    public lookupQuickestExit(position: any): any {
        return JSON.stringify({map: "this is the map for now!"});
    };
}