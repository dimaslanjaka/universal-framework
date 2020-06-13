interface String {
    match(matcher: {
        [Symbol.match](string: string): RegExpMatchArray | null;
    }): RegExpMatchArray | null;
    replace(searchValue: {
        [Symbol.replace](string: string, replaceValue: string): string;
    }, replaceValue: string): string;
    replace(searchValue: {
        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
    }, replacer: (substring: string, ...args: any[]) => string): string;
    search(searcher: {
        [Symbol.search](string: string): number;
    }): number;
    split(splitter: {
        [Symbol.split](string: string, limit?: number): string[];
    }, limit?: number): string[];
    parse_url: () => {
        protocol: string;
        host: string;
        hostname: string;
        port: string;
        pathname: string;
        search: string;
        searchObject: {};
        hash: string;
        protohost: string;
    };
    CSS: () => void;
    hexE: () => string;
    hexD: () => string;
    capitalize: () => string;
}
interface Window {
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): void;
}
