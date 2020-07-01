interface npmlist {
  name: string;
  version: string;
  dependencies: object;
}

interface ArrayOfObject {
  [key: string]: any;
}

interface packagejson {
  dependencies?: ArrayOfObject;
  devDependencies?: ArrayOfObject;
  /**
   * @link https://docs.npmjs.com/misc/scripts
   * * prepublish: Run BEFORE the package is packed and published, as well as on local npm install without any arguments. (See below)
   * * prepare: Run both BEFORE the package is packed and published, on local npm install without any arguments, and when installing git dependencies (See below). This is run AFTER prepublish, but BEFORE prepublishOnly.
   * * prepublishOnly: Run BEFORE the package is prepared and packed, ONLY on npm publish. (See below.)
   * * prepack: run BEFORE a tarball is packed (on npm pack, npm publish, and when installing git dependencies)
   * * postpack: Run AFTER the tarball has been generated and moved to its final destination.
   * * publish, postpublish: Run AFTER the package is published.
   * *
   * *
   * * preuninstall, uninstall: Run BEFORE the package is uninstalled.
   * * postuninstall: Run AFTER the package is uninstalled.
   * *
   * * version: Run AFTER bumping the package version, but BEFORE commit.
   * * postversion: Run AFTER bumping the package version, and AFTER commit.
   * * pretest, test, posttest: Run by the npm test command.
   * * prestop, stop, poststop: Run by the npm stop command.
   * *
   * *
   * *
   */
  scripts?: {
    /**
     * test: Run by the npm test command.
     */
    test: string;
    /**
     * preversion: Run BEFORE bumping the package version.
     */
    preversion?: string;
    /**
     * prestart: Run by the npm start command.
     */
    prestart?: string;
    /**
     * poststart: Run by the npm start command.
     */
    poststart?: string;
    /**
     * start: Run by the npm start command.
     */
    start?: string;
    /**
     * preinstall: Run BEFORE the package is installed
     */
    preinstall?: string;
    /**
     * install, postinstall: Run AFTER the package is installed.
     */
    postinstall?: string;
    /**
     * postrestart: Run by the npm restart command. Note: npm restart will run the stop and start scripts if no restart script is provided.
     */
    postrestart?: string;
    /**
     * restart: Run by the npm restart command. Note: npm restart will run the stop and start scripts if no restart script is provided.
     */
    restart?: string;
    /**
     * prerestart: Run by the npm restart command. Note: npm restart will run the stop and start scripts if no restart script is provided.
     */
    prerestart?: string;
    /**
     * shrinkwrap: Run by the npm shrinkwrap command.
     */
    shrinkwrap?: string;
    /**
     * shrinkwrap: Run by the npm shrinkwrap command.
     */
    preshrinkwrap?: string;
    /**
     * postshrinkwrap: Run by the npm shrinkwrap command.
     */
    postshrinkwrap?: string;
    /**
     * install, postinstall: Run AFTER the package is installed.
     */
    install?: string;
  };
  repository?: ArrayOfObject;
  author?: ArrayOfObject;
  bugs?: ArrayOfObject;
  maintainer?: ArrayOfObject;
  [prop: string]: any;
}

interface Error {
  code: string;
  name: string;
  message: string;
  stack?: string;
}
