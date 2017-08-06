
//"declare" require so typescript wont complain about our webpack stuff, and webpack can still import/find it
declare const require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

//make sure typescript knows about our fancy (ha) communication strategies
interface Window {
    DATA: string;
    __REACT_WEB_VIEW_BRIDGE: any;
}
