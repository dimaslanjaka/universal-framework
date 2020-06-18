interface HTMLScriptElement extends HTMLElement {
  onreadystatechange(): void;
  async: boolean;
}

interface HTMLElement extends Element, DocumentAndElementEventHandlers, ElementCSSInlineStyle, ElementContentEditable, GlobalEventHandlers, HTMLOrSVGElement {
  mozMatchesSelector: (selectors: string) => boolean;
  msMatchesSelector: (selectors: string) => boolean;
}