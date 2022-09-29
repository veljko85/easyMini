function intersectArrowSignsFence(
  fakeFences,
  newFenceForwardSigns,
  newFenceRightSigns,
  newFenceLeftSigns,
  newFenceBackSigns,
  activeFence,
  addFenceSings
) {
  setTimeout(() => {
    for (let i = 0; i < fakeFences.length; i++) {
      if (fakeFences[i].name == "fakeFence") {
        if (typeof activeFence == "number") {
          if (
            fakeFences[i].intersectsMesh(
              newFenceForwardSigns[activeFence],
              true
            )
          ) {
            newFenceForwardSigns[activeFence].isVisible = false;
          }
          if (
            fakeFences[i].intersectsMesh(newFenceRightSigns[activeFence], true)
          ) {
            newFenceRightSigns[activeFence].isVisible = false;
          }
          if (
            fakeFences[i].intersectsMesh(newFenceLeftSigns[activeFence], true)
          ) {
            newFenceLeftSigns[activeFence].isVisible = false;
          }
          if (
            fakeFences[i].intersectsMesh(newFenceBackSigns[activeFence], true)
          ) {
            newFenceBackSigns[activeFence].isVisible = false;
          }
        }
        if (fakeFences[i].intersectsMesh(addFenceSings[0], true)) {
          addFenceSings[0].isVisible = false;
        }
        if (fakeFences[i].intersectsMesh(addFenceSings[1], true)) {
          addFenceSings[1].isVisible = false;
        }
      }
    }
  }, 0);
}
