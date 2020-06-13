declare function storage(): {
    get: (key: string) => any;
    set: (key: string, value: string) => void;
    has: (key: string) => boolean;
    extend: (key: string, value: string) => void;
    remove: (key: string) => void;
};
declare var STORAGE: {
    get: (key: string) => any;
    set: (key: string, value: string) => void;
    has: (key: string) => boolean;
    extend: (key: string, value: string) => void;
    remove: (key: string) => void;
};
