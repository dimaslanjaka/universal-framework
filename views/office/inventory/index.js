const randomColor = Math.floor(Math.random() * 16777215).toString(16);
const randbg = $(".rand-bg-color");
if (randbg.length) {
  randbg.style.backgroundColor = "#" + randomColor;
}
