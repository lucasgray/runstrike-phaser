//"declare modules" so typescript wont complain about our webpack stuff
declare module "*!png" {
    const content: string;
    export default content;
}

//make sure typescript knows about our fancy (ha) communication strategies
interface Window {
    DATA: string;
    __REACT_WEB_VIEW_BRIDGE: any;
}
