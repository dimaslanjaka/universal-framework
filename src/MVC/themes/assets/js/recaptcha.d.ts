declare function recaptcha(): {
    gexec_count: number;
    key: string;
    js: (url: string, callback: Function) => void;
    set_key: (key: string) => void;
    start: () => void;
    init: () => void;
    retry_count: number;
    exec: (action: any, retry: any, callback: any) => void;
    insert: (token: string) => void;
    distribute_token: (token: string) => void;
    get: () => string;
    reCaptcha_buttons: (reCaptcha_disable: boolean, callback: Function) => void;
};
declare var reCaptcha: {
    gexec_count: number;
    key: string;
    js: (url: string, callback: Function) => void;
    set_key: (key: string) => void;
    start: () => void;
    init: () => void;
    retry_count: number;
    exec: (action: any, retry: any, callback: any) => void;
    insert: (token: string) => void;
    distribute_token: (token: string) => void;
    get: () => string;
    reCaptcha_buttons: (reCaptcha_disable: boolean, callback: Function) => void;
};
