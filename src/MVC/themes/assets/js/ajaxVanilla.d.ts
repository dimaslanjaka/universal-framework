declare function ajax(): typeof ajax;
declare namespace ajax {
    function x(): any;
    function send(url: any, callback: any, method: any, data: any, async: any): void;
    function get(url: any, data: any, callback: any, async: any): void;
    function post(url: any, data: any, callback: any, async: any): void;
}
