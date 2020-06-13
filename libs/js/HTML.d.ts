interface createElementOpt {
  childs: any[];
  /**
   * Tag name to be created
   */
  'tagName': string;
  /**
   * Add classname
   */
  'className': string;
  /**
   * Some attributes ?
   */
  'attributes': { attributes: { [str: string]: any } };
  /**
   * InnerText ?
   */
  'text': string;
  /**
   * InnerHTML ?
   */
  'html': string;
  /**
   * Some options
   */
  'options': { attributes: any[], childs: [] }
}


/**
 * Create element helper
 * * if you use without tagName you will get a document fragment
 * @example
 * document.body.appendChild(createElement({
  tagName: "div",
  className: "my-class",
  text: "Blah blah",
  attributes: {
    "id": "element id",
    "data-truc": "value"
  },
  childs: [{ `recursif call` }]
}))
 */
declare function createElement(params: createElementOpt);

declare class html {
  create(options: createElementOpt): createElement;
}