var loadGardoFence = (
  posX,
  posZ,
  rotY,
  gardoFenceBoards,
  woodMaterials,
  topBoards,
  rankelements,
  metalParts,
  rightMetalParts,
  rootMat,
  smallMetalParts,
  rightSmallMetalParts,
  allWoodPosts,
  rightWoodPosts,
  woodTopParts,
  activeFence,
  removeSideAccesories,
  addDefaultMaterial,
  selectedMat,
  newFenceForwardSigns,
  newFenceRightSigns,
  newFenceLeftSigns,
  newFenceBackSigns,
  cameraTargetMesh,
  cameraTarget,
  ground,
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
  deleteFenceOn,
  deleteFencePart,
  delFenFun,
  deleteFence,
  checkPostIntersecting,
  fakePosts,
  allPosts,
  rightRoots,
  intersectedPosts,
  intersectedPostsMain,
  sturmankersRuckseite,
  intersectArrowSignsFence,
  fakeFences,
  addNewFenceToSide,
  activeArrow,
  activeArrowSide,
  addNewFenceMeshMat,
  wholeFences,
  rightPost,
  fenceId,
  setActiveFenceOnCombineFences,
  pipsSlider,
  noUiSlider,
  easyFenceSliderOpt,
  closeSliderContainer,
  setDayNight,
  setLightColor,
  glow,
  singsWar,
  leds,
  singsDel,
  setActivnesStyle,
  sturmankerCon,
  lightSettings,
  lightColorSet,
  ledColNum,
  setLedColor,
  ledParts,
  addEasyFenceAcc,
  addGardoFenceAcc,
  changeFenceGardo,
  setPhostenAct
) =>
  BABYLON.SceneLoader.ImportMeshAsync("", "mesh/", "gardoRightCombo2.glb").then(
    (result) => {
      var fenceGardo = result.meshes[0];
      fenceGardo.rotationQuaternion = null;
      fenceGardo.position.x = posX;
      fenceGardo.position.z = posZ;
      fenceGardo.rotation.y = rotY;

      // for (let i = 0; i < result.meshes.length; i++) {
      //   console.log(i, result.meshes[i].name);
      // }
      function toActiveFence() {
        //set this active fence
        for (let j = 0; j < rightPosts.length; j++) {
          if (rightPosts[j].material.id == "selectedMat") {
            activeFence = j;
          }
        }
        sideAccesories.style.display = "block";
        addFenceAcc.style.display = "block";
        addEasyFenceAcc.style.display = "none";
        addGardoFenceAcc.style.display = "block";
        //set changnig size to none when rankelement is on
        if (fencesArr[activeFence].type == "gardoRank") {
          addFenceAcc.children[0].style.display = "none";
        } else {
          addFenceAcc.children[0].style.display = "block";
        }
        //set height of fence
        if (topBoard.isVisible) {
          setPhostenAct(h85, h76);
        } else {
          setPhostenAct(h76, h85);
        }

        //set delete fence image and text
        deleteFenceOn(activeFence);
        //delete fence
        deleteFencePart.onclick = () => {
          if (activeFence > 0) {
            delFenFun(activeFence);
            deleteFence(activeFence);
            checkPostIntersecting(
              fakePosts,
              allPosts,
              rightRoots,
              intersectedPosts,
              intersectedPostsMain,
              fencesArr
            );
            //set activnes of led when deleted led
            ledsOn = 0;
            leds.forEach((elm) => {
              if (elm.isVisible) {
                ledsOn += 1;
              }
            });
            if (ledsOn == 0) {
              //set to ohne on led lights
              //set html
              lightSettings.style.display = "none";
              lightColorSet.style.display = "none";
              //set babylon
              leds.forEach((elm) => {
                elm.isVisible = false;
              });
              setDayNight(0.6, 0.8, 0.7);
              ledColNum = 4;
              setLightColor(ledColNum);
              setLedColor(ledColNum);
              setActivnesStyle(ledParts, 6, 0, "active-text-color");
            }

            //set activnes of sturmanker parts
            sturNum = 0;
            for (let i = 0; i < sturmankersVorderseite.length; i++) {
              if (sturmankersVorderseite[i].isVisible) {
                sturNum += 1;
              } else if (sturmankersRuckseite[i].isVisible) {
                sturNum += 1;
              }
            }
            if (sturNum < 1) {
              setActivnesStyle(sturmankerCon, 10, 1, "active-text-color");
              strurmOn = false;
            } else {
              strurmOn = true;
            }
          }
        };
        //set value of slider and slider to this fence
        // if (
        //   fencesArr[activeFence].type == "gardoFence" ||
        //   fencesArr[activeFence].type == "gardoHalf"
        // ) {
        pipsSlider.noUiSlider.updateOptions(easyFenceSliderOpt);
        pipsSlider.noUiSlider.set(fencesArr[activeFence].size);
        closeSliderContainer();
        // }
        //set signs visibility baste on intesection with fances
        // if (fencesArr[activeFence].children.length < 2) {

        newFenceForwardSigns[activeFence].isVisible = true;
        newFenceRightSigns[activeFence].isVisible = true;
        newFenceLeftSigns[activeFence].isVisible = true;
        newFenceBackSigns[activeFence].isVisible = true;
        // }
        intersectArrowSignsFence(
          fakeFences,
          newFenceForwardSigns,
          newFenceRightSigns,
          newFenceLeftSigns,
          newFenceBackSigns,
          activeFence,
          addFenceSings
        );

        //set activnes of active fence settings
        if (fencesArr[activeFence].type == "gardoFence")
          setActivnesStyle(
            changeFenceGardo,
            0,
            0,
            "active-text-color-gardo-change"
          );
        if (fencesArr[activeFence].type == "gardoHalf")
          setActivnesStyle(
            changeFenceGardo,
            0,
            1,
            "active-text-color-gardo-change"
          );
        if (fencesArr[activeFence].type == "gardoRank")
          setActivnesStyle(
            changeFenceGardo,
            0,
            2,
            "active-text-color-gardo-change"
          );

        //deactivate arrows
        activeArrow = false;
        activeArrowSide = false;
        addFenceSings.forEach((elm) => {
          elm.material = addNewFenceMeshMat;
        });
        addNewFenceToSide.style.display = "none";
        //set day night
        setDayNight(0.6, 0.8, 0.7);
        setLightColor(4);
        glow.intensity = 0;
        singsWar.forEach((elm) => {
          elm.isVisible = false;
        });
        for (let i = 0; i < allPosts.length; i++) {
          if (leds[i].isVisible) {
            singsDel[i].isVisible = true;
          }
        }
        //single edits exit options on all
        // for (let i = 0; i < clickablePartSingleFence.length; i++) {
        //   if (
        //     clickablePartSingleFence[i].className ==
        //     "set-part-click-title-single clicked"
        //   ) {
        //     clickablePartSingleFence[i].className = clickablePartSingleFence[
        //       i
        //     ].className.replace(" clicked", " not-clicked");
        //     clickablePartSingleFence[i].children[1].innerHTML = "+";
        //     clickablePartSingleFence[i].nextElementSibling.style.height = 0;
        //   }
        // }
        cameraTargetMesh(cameraTarget, wholeFences[activeFence]);
        console.log(fencesArr[activeFence]);
      }
      //BOARDS
      var newBoarsdArr = new Array(
        result.meshes[3],
        result.meshes[4],
        result.meshes[5],
        result.meshes[6],
        result.meshes[7],
        result.meshes[8],
        result.meshes[9],
        result.meshes[10],
        result.meshes[11],
        result.meshes[12],
        result.meshes[13],
        result.meshes[14],
        result.meshes[15],
        result.meshes[16],
        result.meshes[17],
        result.meshes[18]
      );

      gardoFenceBoards.push(newBoarsdArr);
      woodMaterials.push(scene.getMaterialByID("Wood-Velja"));

      let topBoard = newBoarsdArr[15].clone("newBoard");
      topBoard.position.y = newBoarsdArr[15].position.y + 0.102;
      topBoard.isVisible = false;
      topBoards.push(topBoard);

      //INLAYS
      let rankelement = result.meshes[2];
      rankelement.position.y -= 0.09;
      rankelement.isVisible = false;
      rankelements.push(rankelement);

      //METAL PART TO HOLD WOOD POST
      let rightMetalPart0 = result.meshes[20];
      let rightMetalPart1 = result.meshes[21];
      //   rightMetalPart0.position.z = rightMetalPart1.position.z += 1;
      rightMetalPart0.position.y = rightMetalPart1.position.y += 0.19;
      rightMetalPart0.material = rightMetalPart1.material = rootMat;
      var newMetPartsArr = new Array(rightMetalPart0, rightMetalPart1);
      newMetPartsArr.forEach((elm) => {
        elm.isVisible = false;
      });
      metalParts.push(newMetPartsArr);
      rightMetalParts.push(newMetPartsArr);

      //SMALL METAL PART TO HOLD WOOD POST
      let rightSmallMetalPartFront = result.meshes[24];
      let rightSmallMetalPartBack = result.meshes[22];
      let rightSmallMetalPartBoth = result.meshes[23];
      rightSmallMetalPartFront.material =
        rightSmallMetalPartBack.material =
        rightSmallMetalPartBoth.material =
          rootMat;
      var newSmallMetPartsArr = new Array(
        rightSmallMetalPartFront,
        rightSmallMetalPartBack,
        rightSmallMetalPartBoth
      );
      newSmallMetPartsArr.forEach((elm) => {
        elm.isVisible = false;
      });
      smallMetalParts.push(newSmallMetPartsArr);
      rightSmallMetalParts.push(newSmallMetPartsArr);

      //WOOD POST
      let rightWoodPost = result.meshes[19];
      rightWoodPost.position.z = 0;
      rightWoodPost.isVisible = false;
      allWoodPosts.push(rightWoodPost);
      rightWoodPosts.push(rightWoodPost);

      //   if (postType == 1) {
      //     rightWoodPost.isVisible = false;
      //     newMetPartsArr.forEach((elm) => {
      //       elm.isVisible = false;
      //     });
      //   }
      //WOOD TOP PART
      let woodTopPart = result.meshes[1];
      woodTopParts.push(woodTopPart);

      //add selected to mesh
      for (let i = 0; i < result.meshes.length; i++) {
        result.meshes[i].actionManager = new BABYLON.ActionManager(scene);
        result.meshes[i].actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function () {
              if (result.meshes[i].material.id != "selectedMat") {
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
                result.meshes[1].material =
                  result.meshes[3].material =
                  result.meshes[4].material =
                  result.meshes[5].material =
                  result.meshes[6].material =
                  result.meshes[7].material =
                  result.meshes[8].material =
                  result.meshes[9].material =
                  result.meshes[10].material =
                  result.meshes[11].material =
                  result.meshes[12].material =
                  result.meshes[13].material =
                  result.meshes[14].material =
                  result.meshes[15].material =
                  result.meshes[16].material =
                  result.meshes[17].material =
                  result.meshes[18].material =
                  result.meshes[19].material =
                  result.meshes[2].material =
                  topBoard.material =
                  rightPost.material =
                    selectedMat;
                //function for fence activnes
                toActiveFence();
                setActiveFenceOnCombineFences();
              } else {
                // closeSliderContainer();
                sideAccesories.style.display = "none";
                addFenceAcc.style.display = "none";
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

                // singsDel.forEach((elm) => {
                //   elm.isVisible = false;
                // });
                //turn off add new sings
                newFenceForwardSigns[activeFence].isVisible = false;
                newFenceRightSigns[activeFence].isVisible = false;
                newFenceLeftSigns[activeFence].isVisible = false;
                newFenceBackSigns[activeFence].isVisible = false;
                cameraTargetMesh(cameraTarget, ground);
                //turn of active fence
                setTimeout(() => {
                  activeFence = false;
                }, 100);
              }
            }
          )
        );
      }

      fencesArr[fenceId].gardoParts = {
        woodTopPart: woodTopPart,
        boards: newBoarsdArr,
        woodPost: rightWoodPost,
        smallMetalParts: newSmallMetPartsArr,
        metalParts: newMetPartsArr,
        rankelement: rankelement,
        topBoard: topBoard,
      };
      fencesArr[fenceId].fenceGardo = fenceGardo;
    }
  );
