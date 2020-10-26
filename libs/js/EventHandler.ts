/** Add one or more listeners to an element
 * @param element - DOM element to add listeners to
 * @param eventNames - space separated list of event names, e.g. 'click change'
 * @param listener - function to attach for each event as a listener
 */
function setEventListener(
  element: HTMLElement,
  eventNames: "click" | "mouseover" | "submit" | "change",
  listener: EventListenerObject | Function | any
) {
  eventNames.split(" ").forEach(function (e) {
    //element.addEventListener(e, listener, false);
    if (element.attachEvent) {
      if (e == "click") {
        e = "onclick";
      }
      element.attachEvent(e, listener);
    } else if (element.addEventListener) {
      element.addEventListener(e, listener, false);
    } else {
      console.error("cannot attach event to FAB wrapper");
    }
  });
}
