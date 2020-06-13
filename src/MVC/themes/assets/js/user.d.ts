/// <reference types="jquery" />
declare class user {
    constructor();
    key: string;
    all(): undefined | object;
    get(key: String): any;
    fetch(callback: Function): JQuery.jqXHR<any>;
}
interface Window {
    user: user;
}
declare const userc: user;
