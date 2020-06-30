/**
 * Skeleton class
 * @requires ../css/skeleton.css
 */
class skeleton {
  /**
   * Lock skeleton
   */
  static lock() {
    var skel = this.objects();
    var len = skel ? skel.length : 0;
    for (var i = 0; i < len; i++) {
      skel[i].classList.add("skel");
    }
  }

  /**
   * Object of skeletonable element
   */
  static objects() {
    return document.querySelectorAll(
      ".card-image,.card-title,h1,img,p,h2,h3,h4,h5"
    );
  }

  /**
   * Release skeleton
   */
  static release() {
    var skel = this.objects();
    var len = skel ? skel.length : 0;
    for (var i = 0; i < len; i++) {
      skel[i].classList.remove("skel");
    }
  }
}
