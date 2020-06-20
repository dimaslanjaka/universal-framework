declare class log {
    constructor(...arg: string[] | null);
    static chalk(): any;
    static success(msg: string): any;
    static error(msg: string): any;
    /**
     * Generate Random Hex Color
     */
    static hexColor(): string;
    /**
     * Indicator rainbow
     */
    static enable_rainbow: boolean;
    static rainbow: (want: boolean) => void;
    /**
     * console.log
     */
    static log(...arg: any[]): void;
}
export default log;
