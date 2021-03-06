function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

function enload() {
  removeClass(document.getElementsByClassName('loading')[0], 'd-none');
}

function disload() {
  addClass(document.getElementsByClassName('loading')[0], 'd-none');
}

document.onreadystatechange = function() {
  switch (document.readyState) {
    case 'complete':
      disload();
      break;
    case 'interactive':
      enload();
      break;
    case 'loading':
      enload();
      break;
  }
}

