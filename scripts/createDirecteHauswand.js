function createDirecteHauswand(
  concreteMat,
  fenceBoards,
  sturmankersVorderseite,
  rightPosts,
  leftPosts,
  directeHauswandMeshes,
  directeHauswandMeshesRight,
  fenceBoardMat,
  fencePostMat,
  concreteMat,
  smallBoardsArr,
  silberMat,
  anthrazitMat,
  fencesArr,
  addFenceSings,
  selectedMat,
  setDayNight,
  setLightColor,
  glow,
  singsWar,
  singsDel,
  leds,
  ledParts,
  setActivnesStyle,
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
  var directeHauswandMeshRight = BABYLON.MeshBuilder.CreateBox(
    "directeHauswandMeshRight",
    {
      height: 2,
      width: 0.2,
      depth: 0.25,
    }
  );

  directeHauswandMeshRight.position.x =
    directeHauswandMeshRight.position.x + 0.1;
  //   directeHauswandMeshRight.position.z = 0.05;
  directeHauswandMeshRight.rotation.x = Math.PI / 2;
  directeHauswandMeshRight.material = concreteMat;
  directeHauswandMeshRight.isVisible = false;
  directeHauswandMeshes.push(directeHauswandMeshRight);
  directeHauswandMeshesRight.push(directeHauswandMeshRight);

  directeHauswandMeshRight.actionManager = new BABYLON.ActionManager(scene);

  directeHauswandMeshRight.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickTrigger,
      function () {
        if (directeHauswandMeshRight.material.id != "selectedMat") {
          removeSideAccesories(
            sideAccesories,
            deleteAccesorie,
            addFenceAcc,
            editPost,
            addNewFenceToSide
          );
          addDefaultMaterial(
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
          );
          directeHauswandMeshRight.material = selectedMat;
          sideAccesories.style.display = "block";
          deleteAccesorie[0].style.display = "block";
          addNewFenceToSide.style.display = "none";
          //set day when select sturmanker
          setDayNight(0.6, 0.8, 0.7);
          setLightColor(4);
          glow.intensity = 0;
          singsWar.forEach((elm) => {
            elm.isVisible = false;
          });
          singsDel.forEach((elm) => {
            elm.isVisible = false;
          });
          //set activnes of led when sturamnker is selected
          aaa = 0;
          leds.forEach((elm) => {
            if (elm.isVisible) {
              aaa += 1;
            }
          });
          aaa > 0
            ? setActivnesStyle(ledParts, 6, 1, "active-text-color")
            : setActivnesStyle(ledParts, 6, 0, "active-text-color");
        } else {
          directeHauswandMeshRight.material = concreteMat;
          sideAccesories.style.display = "none";
          deleteAccesorie[0].style.display = "none";
          addFenceAcc.style.display = "none";
        }
      }
    )
  );
}
