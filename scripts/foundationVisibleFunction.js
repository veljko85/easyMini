function foundationVisibilty(
  foundationStarts,
  foundations,
  a,
  foundationStartsVord,
  foundationsVord,
  b,
  foundationStartsRuck,
  foundationsRuck,
  c,
  i
) {
  foundationStarts[i].isVisible = a;
  foundations[i].isVisible = a;
  foundationStartsVord[i].isVisible = b;
  foundationsVord[i].isVisible = b;
  foundationStartsRuck[i].isVisible = c;
  foundationsRuck[i].isVisible = c;
}
