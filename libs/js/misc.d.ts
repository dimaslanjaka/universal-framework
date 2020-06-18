declare namespace JQuery {
  type TypeOrArray<T> = T | T[];
  type Node = Element | Text | Comment | Document | DocumentFragment;

  /**
   * The PlainObject type is a JavaScript object containing zero or more key-value pairs. The plain object is, in other words, an Object object. It is designated "plain" in jQuery documentation to distinguish it from other kinds of JavaScript objects: for example, null, user-defined arrays, and host objects such as document, all of which have a typeof value of "object."
   *
   * **Note**: The type declaration of PlainObject is imprecise. It includes host objects and user-defined arrays which do not match jQuery's definition.
   */
  interface PlainObject<T = any> {
    [key: string]: T;
  }

  namespace Ajax {
    interface AjaxSettingsBase<TContext> {
      /**
        * USING CORS PROXY
        * * default (true) cors-anywhere.herokuapp.com
        */
      proxy?: boolean | string;
      /**
       * Dump ajax request using toastr
       */
      dump?: boolean;
      /**
       * Show loading Icon ajax
       * * default false
       */
      indicator?: boolean;
      /**
       * Silent from toastr after ajax success
       */
      silent?: boolean;
    }
  }
}