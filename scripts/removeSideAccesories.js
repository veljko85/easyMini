function removeSideAccesories(a, b, c, d, e) {
  a.style.display = "none";
  for (let i = 0; i < b.length; i++) {
    b[i].style.display = "none";
  }
  c.style.display = "none";
  d.style.display = "none";
  e.style.display = "none";
  document.getElementsByClassName("accTitle")[0].innerHTML =
    "ausgewählter Zaun";
}
