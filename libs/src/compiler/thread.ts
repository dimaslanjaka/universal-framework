import filemanager from "./filemanager";
import process from "./process";

export class thread {
    private static root_folder = filemanager.join(process.root, "tmp", "thread");
    /**
     * Run single thread
     * @param name
     * @param callback
     * @example
     * thread.single('nameThread', function(nameThread){
     * // ... your codes here
     * thread.remove(nameThread); // <--- remove thread name
     * })
     */
    static async single(name: string, callback: (arg0: string) => any) {
        const lockfile = filemanager.join(thread.root_folder, name);
        if (!filemanager.exist(lockfile)) {
            filemanager.mkfile(lockfile, new Date().toISOString());
            await callback(name);
        }
    }

    /**
     * Remove thread name
     * @param name
     */
    static remove(name: string) {
        const lockfile = filemanager.join(thread.root_folder, name);
        filemanager.unlink(lockfile);
    }
}
