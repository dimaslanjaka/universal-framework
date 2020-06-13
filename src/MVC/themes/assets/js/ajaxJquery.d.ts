/// <reference types="jquery" />
declare var AJAX: any;
declare var dumpAjax: boolean;
declare var indicatorAjax: boolean;
declare const ajaxIDLoader: string;
declare var ajaxManager: ObjectConstructorAjax;
declare function getWindow(): Window & typeof globalThis;
declare function ajaxRun(url: string, method: string, data: object, success: Function, failed: Function, complete: Function): void;
declare function successAjax(res: any, success: string | Function): void;
declare function ajx(settings: JQueryAjaxSettings, success: null | Function, failed: null | Function, complete: null | Function): JQuery.jqXHR<any>;
