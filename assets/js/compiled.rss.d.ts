declare function parse_url(url: any): any;
declare function parse_query(url_string: any, name: any): string;
declare function millisToMinutesAndSeconds(millis: any): string;
declare var MD5: any;
declare var restartCache: string;
declare var request: any;
declare var localDataKey: string;
declare var localData: {
    get: () => any;
};
declare var localCache: {
    /**
     * timeout for cache in millis
     * @type {number}
     */
    timeout: number;
    /**
     * @type {{_: number, data: {}}}
     **/
    data: {
        _: number;
        data: {};
    };
    remove: (url: any) => void;
    exist: (url: any) => boolean;
    get: (url: any) => any;
    set: (url: any, cachedData: any, callback: any) => void;
};
declare var ajid: any;
declare var run_ajid: any;
declare var dataLabel: JQuery<HTMLElement>;
