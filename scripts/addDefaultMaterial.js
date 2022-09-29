function addDefaultMaterial(
  fenceBoards,
  sturmankersVorderseite,
  rightPosts,
  leftPosts,
  directeHauswandMeshes,
  fenceBoardMat,
  fencePostMat,
  concreteMat,
  smallBoardsArr,
  silberMat,
  anthrazitMat,
  fencesArr,
  addFenceSings,
  grauMat,
  braunMat,
  sandMat,
  woodMaterials,
  topBoards,
  rankelements,
  rightWoodPosts,
  woodTopParts,
  gardoFenceBoards
) {
  //boards materials
  // fenceBoards.forEach((elm) => {
  //   elm.forEach((elmInside) => {
  //     elmInside.material = fenceBoardMat;
  //   });
  // });
  //sturmankers material
  sturmankersVorderseite.forEach((elm) => {
    elm.material = fencePostMat;
  });
  //posts material
  rightPosts.forEach((elm) => {
    elm.material = fencePostMat;
  });
  leftPosts.forEach((elm) => {
    elm.material = fencePostMat;
  });
  //hauswand material
  directeHauswandMeshes.forEach((elm) => {
    elm.material = concreteMat;
  });
  //boards material single
  for (let i = 0; i < fencesArr.length; i++) {
    if (fencesArr[i].boardCol == "grau") {
      fenceBoards[i].forEach((elm) => {
        elm.material = grauMat;
      });
    } else if (fencesArr[i].boardCol == "anthrazit") {
      fenceBoards[i].forEach((elm) => {
        elm.material = anthrazitMat;
      });
    } else if (fencesArr[i].boardCol == "braun") {
      fenceBoards[i].forEach((elm) => {
        elm.material = braunMat;
      });
    } else if (fencesArr[i].boardCol == "sand") {
      fenceBoards[i].forEach((elm) => {
        elm.material = sandMat;
      });
    }
  }
  //small fence material
  for (let i = 0; i < smallBoardsArr.length; i++) {
    if (fencesArr[i].smBoaCol == "silber") {
      smallBoardsArr[i].material = silberMat;
    } else {
      smallBoardsArr[i].material = anthrazitMat;
    }
  }
  addFenceSings.forEach((elm) => {
    elm.isVisible = false;
  });
  //gardo fence material
  topBoards.forEach((elm) => {
    elm.material = woodMaterials[0];
  });
  rankelements.forEach((elm) => {
    elm.material = woodMaterials[0];
  });
  rightWoodPosts.forEach((elm) => {
    elm.material = woodMaterials[0];
  });
  woodTopParts.forEach((elm) => {
    elm.material = woodMaterials[0];
  });
  gardoFenceBoards.forEach((elm) => {
    elm.forEach((element) => {
      element.material = woodMaterials[0];
    });
  });
}
