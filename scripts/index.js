//MODAL SECTION FADE
let modalFade = document.getElementById("modal-fade");
let modalContent = document.getElementsByClassName("modal-content");
let onSturmanker = document.getElementById("on-sturmanker");
let modalCloseBtn = document.getElementsByClassName("modal-close-btn");
let modalVerSchBtn = document.getElementsByClassName("modal-ver-sch-btn");
let onLedSturmanker = document.getElementById("on-led-sturmanker");
let ledSturBtn = document.getElementById("ledStur-btn");
let sturLedBtn = document.getElementById("sturLed-btn");

for (let i = 0; i < modalCloseBtn.length; i++) {
  modalCloseBtn[i].addEventListener("click", () => {
    modalFade.style.display = "none";
    for (let i = 0; i < modalContent.length; i++) {
      modalContent[i].style.display = "none";
    }
  });
}
for (let i = 0; i < modalVerSchBtn.length; i++) {
  modalVerSchBtn[i].addEventListener("click", () => {
    modalFade.style.display = "none";
    for (let i = 0; i < modalContent.length; i++) {
      modalContent[i].style.display = "none";
    }
  });
}

//viero img modal fade settings
let onInlayInfo = document.getElementById("on-inlay-info");
let vieroImg = document.getElementById("viero-img");
vieroImg.onclick = () => {
  modalFade.style.display = "block";
  onInlayInfo.style.display = "block";
};

// ACCESORIES SECTION*****************************************************************************************
let sideAccesories = document.getElementById("side-accesories");
let deleteImgAccesories = document.getElementsByClassName(
  "delete-img-accesories"
);
let deleteAccesorie = document.getElementsByClassName("del-acc");
let sideAccCloseBtn = document.getElementsByClassName(
  "side-accesories-close-btn"
);
let addFenceAcc = document.getElementById("add-fence-acc");
let addNewFenceToSide = document.getElementById("addNewFenceToSide");
let openFenceSlider = document.getElementById("open-fence-slider");
let fenceSliderSection = document.getElementById("fence-slider");
let fenceSliderOpen = false;
function closeSliderContainer() {
  openFenceSlider.style.color = "#333333";
  openFenceSlider.children[2].innerHTML = "+";
  fenceSliderSection.style.display = "none";
  fenceSliderOpen = false;
}
openFenceSlider.onclick = () => {
  if (!fenceSliderOpen) {
    openFenceSlider.style.color = "#3967ff";
    openFenceSlider.children[2].innerHTML = "-";
    fenceSliderSection.style.display = "block";
    fenceSliderOpen = true;
  } else {
    closeSliderContainer();
  }
};
// fence size slider

// var slider = document.getElementById("fenceSlider");
// // var output = document.getElementById("fenceSliderOutput");
// // output.innerHTML = slider.value;

// slider.oninput = function () {
//   // output.innerHTML = this.value;
//   console.log(slider.value);
// };
// slider.onchange = () => {
//   console.log(slider.value);
// };
var pipsSlider = document.getElementById("slider-pips");
var sliderMin = document.getElementById("slider-min");
var sliderPlus = document.getElementById("slider-plus");
var confirmSliderSize = document.getElementById("confirm-slider-size");

noUiSlider.create(pipsSlider, {
  connect: [true, false],
  tooltips: [wNumb({ decimals: 0, postfix: " cm" })],
  range: {
    min: 0,
    max: 180,
  },
  start: [180],

  pips: { mode: "values", values: [0, 90, 180], density: 100 },
});
var pips = pipsSlider.querySelectorAll(".noUi-value");
function clickOnPip() {
  let value = Number(pipsSlider.getAttribute("data-value"));

  pipsSlider.noUiSlider.set(value);
}

for (var i = 0; i < pips.length; i++) {
  pips[i].addEventListener("click", clickOnPip);
}
var valueOfSlider;
pipsSlider.noUiSlider.on("update", function () {
  valueOfSlider = Math.round(Number(pipsSlider.noUiSlider.get()));
  sliderMin.onclick = () => {
    pipsSlider.noUiSlider.set(valueOfSlider - 1);
  };
  sliderPlus.onclick = () => {
    pipsSlider.noUiSlider.set(valueOfSlider + 1);
  };
  if (valueOfSlider < 10) {
    pipsSlider.noUiSlider.set(10);
  }
});

let easyFenceSliderOpt = {
  range: {
    min: 0,
    max: 180,
  },

  pips: { mode: "values", values: [0, 90, 180], density: 100 },
};

let smallRomSliderOpt = {
  range: {
    min: 0,
    max: 60,
  },
  pips: { mode: "values", values: [0, 30, 60], density: 100 },
};

let bigRomSliderOpt = {
  range: {
    min: 61,
    max: 180,
  },
  pips: { mode: "values", values: [61, 120, 180], density: 100 },
};

//ADD FENCE
//add fence activnes

//CANVAS********************************************************************************************************************
var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};
//CREATE SCENE
var createScene = function () {
  // SCENE
  var scene = new BABYLON.Scene(engine);

  //CAMERA
  cameraBabylon();

  //LIGHTS
  let lights = [];
  let lightsLite = [];
  let lightsHavy = [];
  // let lightsLed = [];
  let lightColors = [
    "#ff0000",
    "#198754",
    "#ffc107",
    "#0d6efd",
    "#ffffff",
    "#0dcaf0",
    "#f70767",
    "#ff7400",
    "#7B00F7",
    "#7C7C02",
  ];
  lightsBabylon(lightsLite, lightsHavy, lights);
  //set lights color
  lights.forEach((elm) => {
    elm.diffuse = elm.specular = BABYLON.Color3.FromHexString(lightColors[4]);
  });

  //SKY
  var skyBoxes = [];
  addSkyBox(skyBoxes);

  // GROUND
  createGround();
  ////////////////////////////////////////////////

  //FENCE COLORS
  fenceBoardsColors = ["#8c8c8c", "#474747", "#836953", "#ece6d6"];
  fencePartsColors = ["#e6e6e6", "#474747"];

  //FENCE BORDS MATERIAL
  var fenceBoardMat = new BABYLON.StandardMaterial("fencePartMat", scene);
  fenceBoardMat.diffuseColor = BABYLON.Color3.FromHexString(
    fenceBoardsColors[0]
  );
  fenceBoardMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

  //SMALL BOARDS MATERIAL
  var smallBoardsMat = new BABYLON.StandardMaterial("fencePartMat", scene);
  smallBoardsMat.diffuseColor = BABYLON.Color3.FromHexString(
    fencePartsColors[0]
  );
  smallBoardsMat.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);

  var smallBoardsMatDark = new BABYLON.StandardMaterial("fencePartMat", scene);
  smallBoardsMatDark.diffuseColor = BABYLON.Color3.FromHexString(
    fencePartsColors[1]
  );
  smallBoardsMatDark.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);

  // //FENCE POSTS MATERIAL
  var fencePostMat = new BABYLON.StandardMaterial("fencePartMat", scene);
  fencePostMat.diffuseColor = BABYLON.Color3.FromHexString(fencePartsColors[1]);

  //FENCE START AND END MATERIALS
  var fenceStartEndMat = new BABYLON.StandardMaterial("fencePartMat", scene);
  fenceStartEndMat.diffuseColor = BABYLON.Color3.FromHexString(
    fencePartsColors[1]
  );
  fenceStartEndMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

  var inlaysMat = new BABYLON.StandardMaterial("inlaysMat", scene);
  inlaysMat.diffuseColor = BABYLON.Color3.FromHexString(fencePartsColors[1]);
  inlaysMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

  //FENCE LAISNE MATERIALS
  var laisneMat = new BABYLON.StandardMaterial("laisneMat", scene);
  laisneMat.diffuseColor = BABYLON.Color3.FromHexString(fencePartsColors[0]);
  laisneMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

  //FENCE POST CAP MATERIALS
  var capMat = new BABYLON.StandardMaterial("capMat", scene);
  capMat.diffuseColor = BABYLON.Color3.FromHexString("#202020");
  capMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

  //LED MATERIALS
  var glow = new BABYLON.GlowLayer("glow", scene);
  glow.intensity = 0.8;
  var ledMat = new BABYLON.StandardMaterial("ledMat", scene);
  ledMat.diffuseColor = ledMat.emissiveColor = BABYLON.Color3.FromHexString(
    lightColors[4]
  );

  //ROOT SRAF MATERIAL
  var rootMat = new BABYLON.StandardMaterial("rootMat", scene);
  rootMat.diffuseColor = BABYLON.Color3.FromHexString("#b4b4b4");

  //CONCRETE MATERIAL
  let concreteMat = new BABYLON.StandardMaterial("dirHausMat", scene);
  concreteMat.diffuseTexture = new BABYLON.Texture("img/concrete.jpg", scene);
  concreteMat.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  concreteMat.backFaceCulling = false;

  //FOUNDATION MATERIAL
  var foundationMat = new BABYLON.StandardMaterial("rootMat", scene);
  foundationMat.diffuseColor = BABYLON.Color3.FromHexString("#ffffff");
  foundationMat.alpha = 0.5;

  //SINGS MATEIALS AD TEXTURES
  //delete sign
  var signmatDel = new BABYLON.StandardMaterial("signmatOne", scene);
  var signTexDel = new BABYLON.Texture("img/deleteOn64.png", scene);
  signTexDel.hasAlpha = true;
  signmatDel.useAlphaFromDiffuseTexture = true;
  signmatDel.backFaceCulling = false;
  signmatDel.diffuseTexture = signTexDel;
  //warnin sign
  var signmatWar = new BABYLON.StandardMaterial("signmatWar", scene);
  var signTexWar = new BABYLON.Texture("img/warning.png", scene);
  signTexWar.hasAlpha = true;
  signTexWar.useAlphaFromDiffuseTexture = true;
  signmatWar.backFaceCulling = false;
  signmatWar.diffuseTexture = signTexWar;

  //ADD NEW FENCE SING MATERIAL
  const addNewFenceMeshMat = new BABYLON.StandardMaterial("addNewFenceMesh");
  addNewFenceMeshMat.diffuseTexture = new BABYLON.Texture("img/arrow.png");
  addNewFenceMeshMat.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  // addNewFenceMeshMat.diffuseColor = new BABYLON.Vector4(1,0,0,1);
  addNewFenceMeshMat.backFaceCulling = false;

  const addNewFenceMeshMatAct = new BABYLON.StandardMaterial(
    "addNewFenceMeshMatAct"
  );
  addNewFenceMeshMatAct.diffuseTexture = new BABYLON.Texture(
    "img/arrowActive.png"
  );
  addNewFenceMeshMatAct.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  // addNewFenceMeshMat.diffuseColor = new BABYLON.Vector4(1,0,0,1);
  addNewFenceMeshMatAct.backFaceCulling = false;

  //MATERIAL FOR SELECTION
  var selectedMat = new BABYLON.StandardMaterial("selectedMat", scene);
  selectedMat.diffuseColor = BABYLON.Color3.FromHexString("#C10000");
  selectedMat.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);

  //FENCE VARIABLES
  var rightPostCaps = [];
  var fenceBoards = [];
  var smallBoardsArr = [];
  var startParts = [];
  var endParts = [];
  var laisnes = [];
  var inlays = [];
  var leftPosts = [];
  var rightPosts = [];
  var allPosts = [];
  var roots = [];
  var rightRoots = [];
  var singsDel = [];
  var singsDelRight = [];
  var singsWar = [];
  var singsWarRight = [];
  var leds = [];
  var ledsRight = [];
  var ledsOn = 0;
  var foundationStarts = [];
  var foundationStartsRight = [];
  var foundations = [];
  var foundationsRight = [];
  var sturmankersRuckseite = [];
  var sturRuckseiteSrafs = [];
  var sturmankersRuckseiteRight = [];
  var sturmankersVorderseite = [];
  var sturVorderseiteSrafs = [];
  var sturmankersVorderseiteRight = [];
  var foundationStartsVord = [];
  var foundationsVord = [];
  var foundationStartsRuck = [];
  var foundationsRuck = [];
  var directeHauswandMeshes = [];
  var directeHauswandMeshesRight = [];
  var newFenceForwardSigns = [];
  var newFenceRightSigns = [];
  var newFenceLeftSigns = [];
  var newFenceBackSigns = [];
  var addFenceSings = [];
  var fencesArr = [];
  var fakeFronts = [];
  var fakeBacks = [];
  var fakeFences = [];
  var wholeFences = [];

  //FUNCTONS TO GET AND SET ABSOLUTE POSTIOIONS
  var getAbsPosX = (mesh) => {
    return mesh.getAbsolutePosition().x;
  };
  var getAbsPosZ = (mesh) => {
    return mesh.getAbsolutePosition().z;
  };
  var setAbsPosX = (mesh, newXPos) => {
    return mesh.setAbsolutePosition(
      new BABYLON.Vector3(
        newXPos,
        mesh.getAbsolutePosition().y,
        mesh.getAbsolutePosition().z
      )
    );
  };

  //CHANCHING SIZE ON SLIDER
  //function to change position and scale of fence
  function changePosAndScaleFence(valueToCount, activeFence) {
    if (valueToCount > 15) {
      fenceScale = valueToCount / 180;
    } else {
      fenceScale = 0.08;
    }
    fenceSize = 1.8 * fenceScale;

    firstX = getAbsPosX(rightPosts[activeFence]);
    firstZ = getAbsPosZ(rightPosts[activeFence]);

    fenceBoards[activeFence].forEach((elm) => {
      elm.scaling.x = fenceScale;
      elm.position.x = -0.9 + fenceSize / 2;
    });

    laisnes[activeFence].forEach((elm) => {
      elm.scaling.x = fenceScale;
      elm.position.x = -0.9 + fenceSize / 2;
    });

    startParts[activeFence].scaling.x =
      endParts[activeFence].scaling.x =
      inlays[activeFence][0].scaling.x =
        fenceScale;
    inlays[activeFence][2].scaling.x = fenceScale;
    startParts[activeFence].position.x =
      endParts[activeFence].position.x =
      inlays[activeFence][0].position.x =
        -0.9 + fenceSize / 2;
    inlays[activeFence][2].position.x = -0.9 + fenceSize / 2;

    smallBoardsArr[activeFence].scaling.x = fenceScale;
    smallBoardsArr[activeFence].position.x = -0.9 + fenceSize / 2;
    rightPosts[activeFence].position.x = -0.9 + fenceSize;
    rightPostCaps[activeFence].position.x = rightPosts[activeFence].position.x;

    foundationsRight[activeFence].setAbsolutePosition(
      new BABYLON.Vector3(
        getAbsPosX(rightPosts[activeFence]),
        foundationsRight[activeFence].position.y,
        getAbsPosZ(rightPosts[activeFence])
      )
    );

    newFenceForwardSigns[activeFence].setAbsolutePosition(
      new BABYLON.Vector3(
        getAbsPosX(rightPosts[activeFence]) + 0.3,
        newFenceForwardSigns[activeFence].position.y,
        getAbsPosZ(rightPosts[activeFence])
      )
    );

    newFenceRightSigns[activeFence].setAbsolutePosition(
      new BABYLON.Vector3(
        getAbsPosX(rightPosts[activeFence]),
        newFenceRightSigns[activeFence].position.y,
        getAbsPosZ(rightPosts[activeFence]) - 0.3
      )
    );

    newFenceLeftSigns[activeFence].setAbsolutePosition(
      new BABYLON.Vector3(
        getAbsPosX(rightPosts[activeFence]),
        newFenceLeftSigns[activeFence].position.y,
        getAbsPosZ(rightPosts[activeFence]) + 0.3
      )
    );

    newFenceBackSigns[activeFence].setAbsolutePosition(
      new BABYLON.Vector3(
        getAbsPosX(rightPosts[activeFence]) - 0.3,
        newFenceBackSigns[activeFence].position.y,
        getAbsPosZ(rightPosts[activeFence])
      )
    );

    secondX = getAbsPosX(rightPosts[activeFence]);
    secondZ = getAbsPosZ(rightPosts[activeFence]);

    //set this fence obj size
    fencesArr[activeFence].size = valueToCount;
  }

  //confirm change on slider
  confirmSliderSize.onclick = () => {
    changePosAndScaleFence(valueOfSlider, activeFence);
    positionChildrenOnParentSizeChange();
  };

  function scaleToOtherFencesToDo(i) {
    foundationsRight[i].position.x =
      foundationsRight[i].position.x - (firstX - secondX);
    foundationsRight[i].position.z =
      foundationsRight[i].position.z - (firstZ - secondZ);

    wholeFences[i].position.x = wholeFences[i].position.x - (firstX - secondX);
    wholeFences[i].position.z = wholeFences[i].position.z - (firstZ - secondZ);

    newFenceForwardSigns[i].position.x =
      newFenceForwardSigns[i].position.x - (firstX - secondX);
    newFenceForwardSigns[i].position.z =
      newFenceForwardSigns[i].position.z - (firstZ - secondZ);

    newFenceRightSigns[i].position.x =
      newFenceRightSigns[i].position.x - (firstX - secondX);
    newFenceRightSigns[i].position.z =
      newFenceRightSigns[i].position.z - (firstZ - secondZ);

    newFenceLeftSigns[i].position.x =
      newFenceLeftSigns[i].position.x - (firstX - secondX);
    newFenceLeftSigns[i].position.z =
      newFenceLeftSigns[i].position.z - (firstZ - secondZ);

    newFenceBackSigns[i].position.x =
      newFenceBackSigns[i].position.x - (firstX - secondX);
    newFenceBackSigns[i].position.z =
      newFenceBackSigns[i].position.z - (firstZ - secondZ);
  }

  function positionChildrenOnParentSizeChange() {
    for (let i = 0; i < fencesArr[activeFence].children.length; i++) {
      a = fencesArr[activeFence].children[i];
      scaleToOtherFencesToDo(a);
      recursiveToChildrenPositionChange(a);
    }
  }
  function recursiveToChildrenPositionChange(a) {
    if (fencesArr[a].children.length > 0) {
      fencesArr[a].children.forEach((elm) => {
        scaleToOtherFencesToDo(elm);
        recursiveToChildrenPositionChange(elm);
      });
    }
  }

  //MAIN POST MESH
  createMainPost(
    capMat,
    leftPosts,
    createMainPostSigns,
    fakeFences,
    newFenceForwardSigns,
    newFenceRightSigns,
    newFenceLeftSigns,
    newFenceBackSigns,
    activeFence,
    roots,
    fencePostMat,
    concreteMat,
    foundationStarts,
    foundationMat,
    foundations,
    signmatDel,
    singsDel,
    signmatWar,
    singsWar,
    leds,
    ledMat,
    lights,
    sturmankersVorderseite,
    sturVorderseiteSrafs,
    sturmankersRuckseite,
    sturRuckseiteSrafs,
    rootMat,
    fenceBoards,
    rightPosts,
    directeHauswandMeshes,
    fenceBoardMat,
    selectedMat,
    smallBoardsArr,
    smallBoardsMat,
    smallBoardsMatDark,
    fencesArr,
    addFenceSings,
    allPosts,
    fakeFronts,
    fakeBacks,
    foundationStartsVord,
    foundationsVord,
    foundationStartsRuck,
    foundationsRuck,
    setDayNight,
    setLightColor,
    glow,
    0
  );

  function NewFence(id, type, smBoaCol, size, inlays, children) {
    this.id = id;
    this.type = type;
    this.smBoaCol = smBoaCol;
    this.size = size;
    this.inlays = inlays;
    this.children = children;
  }

  // fencesArr.push(new NewFence(1, "easyFence", 180, false));
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //LOAD FENCE MESH
  var fenceIdCount = -1;
  var activeFence = false;
  var createRightFence = (posX, posZ, rotY, type, smCol, inlaysOnOff) =>
    BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "mesh/",
      "easyFenceRightPartComb.glb"
    ).then((result) => {
      var fence = result.meshes[0];
      fence.rotationQuaternion = null;

      fence.position.x = posX;
      fence.position.z = posZ;
      fence.rotation.y = rotY;

      //function to active fence
      function toActiveFence() {
        //set this active fence
        for (let j = 0; j < rightPosts.length; j++) {
          if (rightPosts[j].material.id == "selectedMat") {
            activeFence = j;
          }
        }
        sideAccesories.style.display = "block";
        addFenceAcc.style.display = "block";

        //set delete fence image and text
        deleteFenceOn(activeFence);
        //delete fence
        deleteFencePart.onclick = () => {
          if (activeFence > 0) {
            deleteFence(activeFence);

            recursiveToChildrenDelete(activeFence);
            fakeFences.forEach((element) => {
              console.log(element.name);
            });
          }
        };

        //set inlays activnces style and fence obj inleys
        if (inlaysOn == 1) {
          changeFence[1].style.display = "flex";
          if (fencesArr[activeFence].inlays == 1) {
            setActivnesStyle(changeFence, 0, 1);
          }
        } else {
          changeFence[1].style.display = "none";
        }

        //set value of slider and slider to this fence
        if (fencesArr[activeFence].type == "easyRomBig")
          pipsSlider.noUiSlider.updateOptions(bigRomSliderOpt);
        if (fencesArr[activeFence].type == "easyRomSmall")
          pipsSlider.noUiSlider.updateOptions(smallRomSliderOpt);
        if (fencesArr[activeFence].type == "easyFence")
          pipsSlider.noUiSlider.updateOptions(easyFenceSliderOpt);
        pipsSlider.noUiSlider.set(fencesArr[activeFence].size);
        closeSliderContainer();
        //set signs visibility baste on intesection with fances
        newFenceForwardSigns[activeFence].isVisible = true;
        newFenceRightSigns[activeFence].isVisible = true;
        newFenceLeftSigns[activeFence].isVisible = true;
        newFenceBackSigns[activeFence].isVisible = true;
        intersectArrowSignsFence(
          fakeFences,
          newFenceForwardSigns,
          newFenceRightSigns,
          newFenceLeftSigns,
          newFenceBackSigns,
          activeFence,
          addFenceSings
        );
        for (let i = 0; i < directeHauswandMeshesRight.length; i++) {
          if (directeHauswandMeshesRight[i].isVisible) {
            newFenceForwardSigns[activeFence].isVisible = false;
            newFenceRightSigns[activeFence].isVisible = false;
            newFenceLeftSigns[activeFence].isVisible = false;
            newFenceBackSigns[activeFence].isVisible = false;
          }
        }

        //set activnes of active fence settings

        if (
          fencesArr[activeFence].type == "easyFence" &&
          fencesArr[activeFence].inlays == 0
        )
          setActivnesStyle(changeFence, 0, 0);
        if (
          fencesArr[activeFence].type == "easyRomBig" &&
          fencesArr[activeFence].smBoaCol == "silber"
        )
          setActivnesStyle(changeFence, 0, 2);
        if (
          fencesArr[activeFence].type == "easyRomBig" &&
          fencesArr[activeFence].smBoaCol == "anthrazit"
        )
          setActivnesStyle(changeFence, 0, 3);
        if (
          fencesArr[activeFence].type == "easyRomSmall" &&
          fencesArr[activeFence].smBoaCol == "silber"
        )
          setActivnesStyle(changeFence, 0, 4);
        if (
          fencesArr[activeFence].type == "easyRomSmall" &&
          fencesArr[activeFence].smBoaCol == "anthrazit"
        )
          setActivnesStyle(changeFence, 0, 5);

        //deactivate arrows
        activeArrow = false;
        activeArrowSide = false;
        addFenceSings.forEach((elm) => {
          elm.material = addNewFenceMeshMat;
        });
        addNewFenceToSide.style.display = "none";

        setDayNight(0.6, 0, 0.7);
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
      }

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
                  addFenceAcc
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
                  smallBoardsMat,
                  smallBoardsMatDark,
                  fencesArr,
                  addFenceSings
                );
                result.meshes[1].material =
                  result.meshes[2].material =
                  result.meshes[3].material =
                  result.meshes[9].material =
                  result.meshes[10].material =
                  result.meshes[11].material =
                  result.meshes[12].material =
                  result.meshes[13].material =
                  result.meshes[14].material =
                  result.meshes[15].material =
                    selectedMat;
                //function for fence activnes
                toActiveFence();
              } else {
                closeSliderContainer();
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
                  smallBoardsMat,
                  smallBoardsMatDark,
                  fencesArr,
                  addFenceSings
                );

                singsDel.forEach((elm) => {
                  elm.isVisible = false;
                });
                //turn off add new sings
                newFenceForwardSigns[activeFence].isVisible = false;
                newFenceRightSigns[activeFence].isVisible = false;
                newFenceLeftSigns[activeFence].isVisible = false;
                newFenceBackSigns[activeFence].isVisible = false;

                //turn of active fence
                setTimeout(() => {
                  activeFence = false;
                }, 100);

                //console.log(activeFence);
              }
            }
          )
        );
      }

      //POST CAP
      let rightPostCap = result.meshes[8];
      rightPostCap.material = capMat;
      rightPostCaps.push(rightPostCap);

      //BOARDS
      var newBoarsdArr = new Array(
        result.meshes[2],
        result.meshes[9],
        result.meshes[10],
        result.meshes[11],
        result.meshes[12],
        result.meshes[13],
        result.meshes[14],
        result.meshes[15]
      );
      newBoarsdArr.forEach((elm) => {
        elm.material = fenceBoardMat;
      });

      fenceBoards.push(newBoarsdArr);

      //BOARDS SMALL
      let smallBoards = result.meshes[1];
      smallBoards.isVisible = false;
      smallBoards.material = smallBoardsMat;
      smallBoardsArr.push(smallBoards);

      //fake fence for intersection
      let fakeFence = new BABYLON.MeshBuilder.CreateBox(
        "fakeFence",
        { width: 1.7, height: 1.8, depth: 0.05 },
        scene
      );
      fakeFence.position = new BABYLON.Vector3(
        getAbsPosX(smallBoards),
        0.9,
        getAbsPosZ(smallBoards)
      );
      fakeFence.addRotation(0, rotY, 0);
      fakeFences.push(fakeFence);
      fakeFence.isVisible = false;
      smallBoards.addChild(fakeFence);

      //START AND END PARTS
      let startPart = result.meshes[7];
      startParts.push(startPart);
      let endPart = result.meshes[6];
      endParts.push(endPart);
      startPart.material = endPart.material = fenceStartEndMat;

      //INLAYS
      // fenceBoards[6].isVisible = false;
      let inlaysViero = result.meshes[24];
      inlaysViero.isVisible = false;

      let inlaysAstro = result.meshes[23];
      inlaysAstro.isVisible = false;

      let inlaysSnow = result.meshes[22];
      inlaysSnow.isVisible = false;
      inlaysSnow.material = inlaysMat;

      var newInlaysArr = new Array(inlaysViero, inlaysAstro, inlaysSnow);
      inlays.push(newInlaysArr);

      if (inlaysOnOff == 1) {
        newBoarsdArr[6].isVisible = false;
        inlaysViero.isVisible = true;
        inlaysSnow.isVisible = true;
      }

      //LAISNE
      let laisneOrg = result.meshes[16];
      laisneOrg.isVisible = false;
      laisneOrg.material = laisneMat;
      var newLaisnesArr = new Array();
      setTimeout(() => {
        for (let i = 0; i < 7; i++) {
          var laisne = laisneOrg.clone("laisne");
          laisne.material = laisneMat;
          laisne.isVisible = false;
          //check if laisnes are active to show them
          if (checkboxActive[i]) {
            if (smallBoards.isVisible == false) {
              laisne.isVisible = true;
            }
            laisne.position.y = newBoarsdArr[i].position.y + 0.22 / 2 + 0.005;

            startPart.position.y += 0.01;

            if (i < 6) {
              inlaysViero.position.y += 0.01;
              inlaysSnow.position.y += 0.01;
            }

            for (let j = i; j < 7; j++) {
              newBoarsdArr[j + 1].position.y += 0.01;
            }
          }

          /////////////////
          newLaisnesArr.push(laisne);
        }
      }, 0);

      laisnes.push(newLaisnesArr);

      //POSTS
      let rightPost = result.meshes[3];

      rightPosts.push(rightPost);
      allPosts.push(rightPost);
      rightPost.material = fencePostMat;

      //post roots
      let rightRoot0 = result.meshes[4];
      let rightRoot1 = result.meshes[5];

      roots.push(rightRoot0, rightRoot1);
      var newRootsArr = new Array(rightRoot0, rightRoot1);
      rightRoots.push(newRootsArr);

      roots.forEach((elm) => {
        elm.material = rootMat;
      });

      //create foundation start
      let foundationRightStart = new BABYLON.MeshBuilder.CreateGround(
        "foundationRightStart",
        { width: 0.4, height: 0.4 },
        scene
      );
      foundationRightStart.position = new BABYLON.Vector3(
        result.meshes[3].getAbsolutePosition().x,
        0.0001,
        result.meshes[3].getAbsolutePosition().z
      );
      foundationRightStart.material = concreteMat;

      foundationStarts.push(foundationRightStart);
      foundationStartsRight.push(foundationRightStart);

      //create foundation
      let foundationRight = new BABYLON.MeshBuilder.CreateBox(
        "foundationRight",
        { width: 0.4, height: 0.5, depth: 0.4 },
        scene
      );
      foundationRight.position = new BABYLON.Vector3(
        result.meshes[3].getAbsolutePosition().x,
        -0.5 / 2,
        result.meshes[3].getAbsolutePosition().z
      );
      foundationRight.material = foundationMat;

      foundations.push(foundationRight);
      foundationsRight.push(foundationRight);

      //PLANE TO HOLD DELETE SIGN
      var signPlaneDelRight = BABYLON.MeshBuilder.CreatePlane(
        "signPlaneDelRight",
        {
          height: 0.4,
          width: 0.4,
        }
      );
      signPlaneDelRight.position = new BABYLON.Vector3(
        getAbsPosX(rightPost),
        2.2,
        getAbsPosZ(rightPost)
      );
      signPlaneDelRight.addRotation(0, rotY, 0);
      signPlaneDelRight.material = signmatDel;
      signPlaneDelRight.isVisible = false;
      singsDel.push(signPlaneDelRight);
      singsDelRight.push(signPlaneDelRight);

      for (let i = 0; i < singsDel.length; i++) {
        singsDel[i].actionManager = new BABYLON.ActionManager(scene);
        singsDel[i].actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function () {
              onDelete(i);
            }
          )
        );
      }

      //PLANE TO HOLD WARNING SIGN
      var signPlaneWarRight = BABYLON.MeshBuilder.CreatePlane(
        "signPlaneWarRight",
        {
          height: 0.4,
          width: 0.4,
        }
      );
      signPlaneWarRight.position = new BABYLON.Vector3(
        getAbsPosX(rightPost),
        2.2,
        getAbsPosZ(rightPost)
      );
      signPlaneWarRight.addRotation(0, rotY, 0);
      signPlaneWarRight.material = signmatWar;
      signPlaneWarRight.isVisible = false;
      singsWar.push(signPlaneWarRight);
      singsWarRight.push(signPlaneWarRight);

      for (let i = 0; i < singsWar.length; i++) {
        singsWar[i].actionManager = new BABYLON.ActionManager(scene);
        singsWar[i].actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function () {
              modalFade.style.display = "block";
              onLedSturmanker.style.display = "block";
              if (leds[i].isVisible) {
                ledSturBtn.style.display = "block";
                sturLedBtn.style.display = "none";
              } else {
                sturLedBtn.style.display = "block";
                ledSturBtn.style.display = "none";
              }
              ledSturBtn.onclick = () => {
                ledSturOnClick(ledSturBtn, i, false);
                strurmOn = true;
                ledsOn -= 1;
                sturmankerOnOff(true, i);
                if (ledsOn < 1) {
                  setActivnesStyle(ledParts, 6, 0);
                }
              };

              sturLedBtn.onclick = () => {
                ledSturOnClick(sturLedBtn, i, true);
                ledsOn += 1;
                // lightsLed[i].intensity = 0.5;
                sturmankerOnOff(false, i);
                foundationVisibilty(
                  foundationStarts,
                  foundations,
                  true,
                  foundationStartsVord,
                  foundationsVord,
                  false,
                  foundationStartsRuck,
                  foundationsRuck,
                  false,
                  i
                );
                //set activnes of sturmanker parts
                var sturNum = 0;
                for (let i = 0; i < sturmankersVorderseite.length; i++) {
                  if (sturmankersVorderseite[i].isVisible) {
                    sturNum += 1;
                  } else if (sturmankersRuckseite[i].isVisible) {
                    sturNum += 1;
                  }
                }
                if (sturNum < 1) {
                  setActivnesStyle(sturmankerCon, 10, 1);
                  strurmOn = false;
                } else {
                  strurmOn = true;
                }
              };
              var warSingsOn;
              modalVerSchBtn[4].onclick = () => {
                singsWar[i].isVisible = false;
                singsWar.forEach((elm) => {
                  if (elm.isVisible) warSingsOn = true;
                });
                if (!strurmOn && !warSingsOn) {
                  setActivnesStyle(sturmankerCon, 10, 1);
                  strurmOn = false;
                }
                if (ledsOn < 1 && !warSingsOn) {
                  setActivnesStyle(ledParts, 6, 0);
                }
              };
            }
          )
        );
      }

      //LEDS
      let rightLed = result.meshes[21];
      leds.push(rightLed);
      ledsRight.push(rightLed);

      rightLed.material = ledMat;

      rightLed.isVisible = false;

      //spot light for led
      // var light6 = new BABYLON.SpotLight(
      //   "spotLight6",
      //   new BABYLON.Vector3(getAbsPosX(rightPost), 1, getAbsPosZ(rightPost)),
      //   new BABYLON.Vector3(0, -1, 0),
      //   Math.PI,
      //   1,
      //   scene
      // );

      // lights.push(light6);
      // lightsLed.push(light6);

      // //set led lights intensity
      // lightsLed.forEach((elm) => {
      //   elm.intensity = 1;
      // });

      //STRUMANKER
      let rightStrVord = result.meshes[19];
      rightStrVord.isVisible = false;

      let rightStrVordSraf = result.meshes[20];
      rightStrVordSraf.isVisible = false;

      sturmankersVorderseite.push(rightStrVord);
      sturVorderseiteSrafs.push(rightStrVordSraf);

      let rightVords = new Array(rightStrVord, rightStrVordSraf);
      sturmankersVorderseiteRight.push(rightVords);

      //create foundation start for front stunmankwer
      let foundationVordStart = new BABYLON.MeshBuilder.CreateGround(
        "foundationVordStart",
        { width: 0.4, height: 0.7 },
        scene
      );

      foundationVordStart.position = new BABYLON.Vector3(0, 0.13, 0.01);
      foundationVordStart.rotation.x = Math.PI / 2;
      foundationVordStart.material = concreteMat;
      foundationVordStart.parent = rightRoot0;
      foundationStartsVord.push(foundationVordStart);
      foundationVordStart.isVisible = false;
      //create foundation for front stunmankwer
      let foundationVord = new BABYLON.MeshBuilder.CreateBox(
        "foundationVord",
        { width: 0.4, height: 0.7, depth: 0.5 },
        scene
      );
      foundationVord.material = foundationMat;
      foundationVord.position = new BABYLON.Vector3(0, 0.13, 0.262);
      foundationVord.parent = rightRoot0;
      foundationsVord.push(foundationVord);
      foundationVord.isVisible = false;

      ///sturmanker Ruck
      let rightStrRuck = result.meshes[17];
      rightStrRuck.isVisible = false;

      let rightStrRuckSraf = result.meshes[18];
      rightStrRuckSraf.isVisible = false;

      sturmankersRuckseite.push(rightStrRuck);
      sturRuckseiteSrafs.push(rightStrRuckSraf);

      let rightRucks = new Array(rightStrRuck, rightStrRuckSraf);
      sturmankersRuckseiteRight.push(rightRucks);

      //create foundation start for back stunmankwer
      let foundationRuckStart = new BABYLON.MeshBuilder.CreateGround(
        "foundationRuckStart",
        { width: 0.4, height: 0.7 },
        scene
      );
      foundationRuckStart.position = new BABYLON.Vector3(0, -0.13, 0.01);
      foundationRuckStart.rotation.x = Math.PI / 2;
      foundationRuckStart.material = concreteMat;
      foundationRuckStart.parent = rightRoot0;
      foundationStartsRuck.push(foundationRuckStart);
      foundationRuckStart.isVisible = false;

      //create foundation for back stunmankwer
      let foundationRuck = new BABYLON.MeshBuilder.CreateBox(
        "foundationRuck",
        { width: 0.4, height: 0.7, depth: 0.5 },
        scene
      );
      foundationRuck.material = foundationMat;
      foundationRuck.position = new BABYLON.Vector3(0, -0.13, 0.262);
      foundationRuck.parent = rightRoot0;
      foundationsRuck.push(foundationRuck);
      foundationRuck.isVisible = false;

      //set material
      rightStrVord.material = rightStrRuck.material = fencePostMat;
      //set sraf material
      rightStrVordSraf.material = rightStrRuckSraf.material = rootMat;

      //cerate fake strumanker
      let fakeFront = new BABYLON.MeshBuilder.CreateBox(
        "fakeFront",
        { width: 0.01, height: 0.3, depth: 0.3 },
        scene
      );
      fakeFront.parent = rightStrVord;
      fakeFronts.push(fakeFront);
      fakeFront.isVisible = false;
      let fakeBack = new BABYLON.MeshBuilder.CreateBox(
        "fakeBack",
        { width: 0.01, height: 0.3, depth: 0.3 },
        scene
      );
      fakeBack.parent = rightStrRuck;
      fakeBacks.push(fakeBack);
      fakeBack.isVisible = false;

      //SET NEW FENCE SAME POST SIZE AS THE OTHER
      if (befePfostenSize == 1) setbefePfosten(1.2, 0.7717, false, 1, -0.5 / 2);
      if (befePfostenSize == 2)
        setbefePfosten(1.475, 0.511, false, 1.8, -0.9 / 2);

      //CREATE DIRECTE HAUSWAND
      createDirecteHauswand(
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
        smallBoardsMat,
        smallBoardsMatDark,
        fencesArr,
        addFenceSings,
        selectedMat,
        setDayNight,
        setLightColor,
        glow,
        singsWar,
        singsDel,
        leds,
        ledParts
      );
      directeHauswandMeshesRight[directeHauswandMeshesRight.length - 1].parent =
        rightPostCap;

      //    INTESECTION FUNCTION
      intersectionFunction(
        fakeFronts,
        fakeFences,
        sturmankersVorderseite,
        sturVorderseiteSrafs,
        leds,
        singsDel,
        singsWar,
        fakeBacks,
        sturmankersRuckseite,
        sturRuckseiteSrafs,
        foundationStarts,
        foundations,
        foundationStartsVord,
        foundationsVord,
        foundationStartsRuck,
        foundationsRuck
      );

      //CREATE SINGS FUNCTION
      createNewFenceSign();

      rightPostCap.addChild(foundationRightStart);
      // rightPostCap.addChild(foundationRight);
      rightPostCap.addChild(signPlaneWarRight);
      rightPostCap.addChild(signPlaneDelRight);
      rightPostCap.addChild(foundationRightStart);
      rightPostCap.addChild(rightLed);
      // rightPostCap.addChild(
      //   directeHauswandMeshesRight[directeHauswandMeshesRight.length - 1]
      // );
      rightPostCap.addChild(rightStrVord);
      rightPostCap.addChild(rightStrVordSraf);
      rightPostCap.addChild(rightStrRuck);
      rightPostCap.addChild(rightStrRuckSraf);
      rightPostCap.addChild(rightRoot0);
      rightPostCap.addChild(rightRoot1);

      if (type == "easyRomBig" && smCol == "silber") {
        smallBoards.isVisible = true;
        smallBoards.material = smallBoardsMat;
        newBoarsdArr.forEach((elm) => {
          elm.isVisible = false;
        });
        startPart.isVisible = endPart.isVisible = false;
      }
      if (type == "easyRomSmall" && smCol == "silber") {
        smallBoards.isVisible = true;
        smallBoards.material = smallBoardsMat;
        newBoarsdArr.forEach((elm) => {
          elm.isVisible = false;
        });
        startPart.isVisible = endPart.isVisible = false;

        smallBoards.scaling.x = smallBoards.scaling.x * 0.33;
        smallBoards.position.x = smallBoards.position.x - 0.6;
        rightPost.position.x = rightPost.position.x - 1.2;

        rightPostCap.position.x = rightPostCap.position.x - 1.2;
        foundationRight.position.x = getAbsPosX;
        foundationRight.setAbsolutePosition(
          new BABYLON.Vector3(
            getAbsPosX(rightPost),
            foundationRight.position.y,
            getAbsPosZ(rightPost)
          )
        );

        newFenceForwardSigns[
          newFenceForwardSigns.length - 1
        ].setAbsolutePosition(
          new BABYLON.Vector3(
            getAbsPosX(rightPost) + 0.3,
            newFenceForwardSigns[newFenceForwardSigns.length - 1].position.y,
            getAbsPosZ(rightPost)
          )
        );

        newFenceRightSigns[newFenceRightSigns.length - 1].setAbsolutePosition(
          new BABYLON.Vector3(
            getAbsPosX(rightPost),
            newFenceRightSigns[newFenceRightSigns.length - 1].position.y,
            getAbsPosZ(rightPost) - 0.3
          )
        );

        newFenceLeftSigns[newFenceLeftSigns.length - 1].setAbsolutePosition(
          new BABYLON.Vector3(
            getAbsPosX(rightPost),
            newFenceLeftSigns[newFenceLeftSigns.length - 1].position.y,
            getAbsPosZ(rightPost) + 0.3
          )
        );

        newFenceBackSigns[newFenceBackSigns.length - 1].setAbsolutePosition(
          new BABYLON.Vector3(
            getAbsPosX(rightPost) - 0.3,
            newFenceBackSigns[newFenceBackSigns.length - 1].position.y,
            getAbsPosZ(rightPost)
          )
        );
      }

      if (type == "easyRomBig" && smCol == "anthrazit") {
        smallBoards.isVisible = true;
        smallBoards.material = smallBoardsMatDark;
        newBoarsdArr.forEach((elm) => {
          elm.isVisible = false;
        });
        startPart.isVisible = endPart.isVisible = false;
      }
      if (type == "easyRomSmall" && smCol == "anthrazit") {
        smallBoards.isVisible = true;
        smallBoards.material = smallBoardsMatDark;
        newBoarsdArr.forEach((elm) => {
          elm.isVisible = false;
        });
        startPart.isVisible = endPart.isVisible = false;

        smallBoards.scaling.x = smallBoards.scaling.x * 0.33;
        smallBoards.position.x = smallBoards.position.x - 0.6;
        rightPost.position.x = rightPost.position.x - 1.2;

        rightPostCap.position.x = rightPostCap.position.x - 1.2;
        foundationRight.position.x = getAbsPosX;
        foundationRight.setAbsolutePosition(
          new BABYLON.Vector3(
            getAbsPosX(rightPost),
            foundationRight.position.y,
            getAbsPosZ(rightPost)
          )
        );

        newFenceForwardSigns[
          newFenceForwardSigns.length - 1
        ].setAbsolutePosition(
          new BABYLON.Vector3(
            getAbsPosX(rightPost) + 0.3,
            newFenceForwardSigns[newFenceForwardSigns.length - 1].position.y,
            getAbsPosZ(rightPost)
          )
        );

        newFenceRightSigns[newFenceRightSigns.length - 1].setAbsolutePosition(
          new BABYLON.Vector3(
            getAbsPosX(rightPost),
            newFenceRightSigns[newFenceRightSigns.length - 1].position.y,
            getAbsPosZ(rightPost) - 0.3
          )
        );

        newFenceLeftSigns[newFenceLeftSigns.length - 1].setAbsolutePosition(
          new BABYLON.Vector3(
            getAbsPosX(rightPost),
            newFenceLeftSigns[newFenceLeftSigns.length - 1].position.y,
            getAbsPosZ(rightPost) + 0.3
          )
        );

        newFenceBackSigns[newFenceBackSigns.length - 1].setAbsolutePosition(
          new BABYLON.Vector3(
            getAbsPosX(rightPost) - 0.3,
            newFenceBackSigns[newFenceBackSigns.length - 1].position.y,
            getAbsPosZ(rightPost)
          )
        );
      }

      //CREATE OBJ FOR FENCE
      fenceIdCount += 1;
      fenceId = fenceIdCount;

      fenceType = type;

      smallBoardsDefaultCol = smCol;
      if (type == "easyRomSmall") {
        fenceSizeObj = 60;
      } else {
        fenceSizeObj = 180;
      }
      fenceInlays = inlaysOnOff;
      childrenThis = [];

      fencesArr.push(
        new NewFence(
          fenceId,
          fenceType,
          smallBoardsDefaultCol,
          fenceSizeObj,
          fenceInlays,
          childrenThis
        )
      );
      console.log(fencesArr);
      wholeFences.push(fence);
      if (fenceId > 0 && typeof activeFence != "boolean") {
        fencesArr[activeFence].children.push(fenceId);
      }
      // //
      //END OF MESH
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    });

  //createRightFence(posX, posZ, rotY, type, smCol, inlaysOnOff)

  //CREATE DEFAULT FENCE
  createRightFence(0.9, 0, 0, "easyFence", "silber", 0);

  let addNewFenceNormal = document.getElementById("new-fence-normal");
  addNewFenceNormal.onclick = () => {
    createNewFence(
      createRightFence,
      activeArrowSide,
      rightPosts,
      leftPosts,
      activeArrow,
      fencePostMat,
      addFenceSings,
      addNewFenceMeshMat,
      sideAccesories,
      addNewFenceToSide,
      newFenceInlays,
      newStub,
      unselect,
      singsDel,
      "easyFence",
      "silber",
      0
    );
  };
  let newFenceInlays = document.getElementById("newFenceInlays");
  newFenceInlays.onclick = () => {
    createNewFence(
      createRightFence,
      activeArrowSide,
      rightPosts,
      leftPosts,
      activeArrow,
      fencePostMat,
      addFenceSings,
      addNewFenceMeshMat,
      sideAccesories,
      addNewFenceToSide,
      newFenceInlays,
      newStub,
      unselect,
      singsDel,
      "easyFence",
      "silber",
      inlaysOn
    );
  };

  let newFenceRomBigSilber = document.getElementById("newFenceRomBigSilber");
  newFenceRomBigSilber.onclick = () => {
    createNewFence(
      createRightFence,
      activeArrowSide,
      rightPosts,
      leftPosts,
      activeArrow,
      fencePostMat,
      addFenceSings,
      addNewFenceMeshMat,
      sideAccesories,
      addNewFenceToSide,
      newFenceInlays,
      newStub,
      unselect,
      singsDel,
      "easyRomBig",
      "silber",
      0
    );
  };

  let newFenceRomBigAnthrazit = document.getElementById(
    "newFenceRomBigAnthrazit"
  );
  newFenceRomBigAnthrazit.onclick = () => {
    createNewFence(
      createRightFence,
      activeArrowSide,
      rightPosts,
      leftPosts,
      activeArrow,
      fencePostMat,
      addFenceSings,
      addNewFenceMeshMat,
      sideAccesories,
      addNewFenceToSide,
      newFenceInlays,
      newStub,
      unselect,
      singsDel,
      "easyRomBig",
      "anthrazit",
      0
    );
  };

  let newFenceRomSmallSilber = document.getElementById(
    "newFenceRomSmallSilber"
  );
  newFenceRomSmallSilber.onclick = () => {
    createNewFence(
      createRightFence,
      activeArrowSide,
      rightPosts,
      leftPosts,
      activeArrow,
      fencePostMat,
      addFenceSings,
      addNewFenceMeshMat,
      sideAccesories,
      addNewFenceToSide,
      newFenceInlays,
      newStub,
      unselect,
      singsDel,
      "easyRomSmall",
      "silber",
      0
    );
  };

  let newFenceRomSmallAnthrazit = document.getElementById(
    "newFenceRomSmallAnthrazit"
  );
  newFenceRomSmallAnthrazit.onclick = () => {
    createNewFence(
      createRightFence,
      activeArrowSide,
      rightPosts,
      leftPosts,
      activeArrow,
      fencePostMat,
      addFenceSings,
      addNewFenceMeshMat,
      sideAccesories,
      addNewFenceToSide,
      newFenceInlays,
      newStub,
      unselect,
      singsDel,
      "easyRomSmall",
      "anthrazit",
      0
    );
  };

  let newStub = document.getElementById("newStub");
  newStub.onclick = () => {
    directeHauswandMeshesRight[activeFence].isVisible = true;
    rightPosts[activeArrow].material = fencePostMat;
    rightPosts[activeArrow].scaling.z = 1;
    rightPosts[activeArrow].position.y = 0.962;
    rightRoots[activeFence].forEach((elm) => {
      elm.isVisible = false;
    });
    foundationStartsRight[activeFence].isVisible = false;
    foundationVisibilty(
      foundationStarts,
      foundations,
      false,
      foundationStartsVord,
      foundationsVord,
      false,
      foundationStartsRuck,
      foundationsRuck,
      false,
      activeFence + 1
    );
    activeArrow = false;
    activeArrowSide = false;
    addFenceSings.forEach((elm) => {
      elm.material = addNewFenceMeshMat;
    });
    sideAccesories.style.display = "none";
    addNewFenceToSide.style.display = "none";
    newFenceInlays.style.display = "none";
    newStub.style.display = "none";
    unselect();
    singsDel.forEach((elm) => {
      elm.isVisible = false;
    });
  };

  //ADD NEW FENCE SIDE BAR SETTINGS
  function addNewFenceSideBar() {
    sideAccesories.style.display = "none";
    for (let j = 0; j < deleteAccesorie.length; j++) {
      deleteAccesorie[j].style.display = "none";
    }
    addFenceAcc.style.display = "none";
    // unselect();
    sideAccesories.style.display = "block";
    addNewFenceToSide.style.display = "block";
    if (inlaysOn == 1) {
      newFenceInlays.style.display = "block";
    } else {
      newFenceInlays.style.display = "none";
    }
    if (
      !sturmankersVorderseite[activeFence + 1].isVisible &&
      !leds[activeFence + 1].isVisible
    ) {
      if (activeArrowSide == 1) {
        if (!newFenceBackSigns[activeFence].isVisible) {
          if (fencesArr[activeFence].children > 0) {
            newStub.style.display = "none";
          } else {
            newStub.style.display = "block";
          }
        } else {
          newStub.style.display = "none";
        }
      }
      if (activeArrowSide == 4) {
        if (!newFenceForwardSigns[activeFence].isVisible) {
          if (fencesArr[activeFence].children > 0) {
            newStub.style.display = "none";
          } else {
            newStub.style.display = "block";
          }
        } else {
          newStub.style.display = "none";
        }
      }
      if (activeArrowSide == 2) {
        if (!newFenceLeftSigns[activeFence].isVisible) {
          if (fencesArr[activeFence].children > 0) {
            newStub.style.display = "none";
          } else {
            newStub.style.display = "block";
          }
        } else {
          newStub.style.display = "none";
        }
      }
      if (activeArrowSide == 3) {
        if (!newFenceRightSigns[activeFence].isVisible) {
          if (fencesArr[activeFence].children > 0) {
            newStub.style.display = "none";
          } else {
            newStub.style.display = "block";
          }
        } else {
          newStub.style.display = "none";
        }
      }
    } else {
      newStub.style.display = "none";
    }
  }

  //CREATE SINGS FUNCTION
  var activeArrow = false;
  var activeArrowSide = false;
  function createNewFenceSign() {
    //FRONT SIGN
    const addNewFenceMesh = BABYLON.MeshBuilder.CreateCylinder(
      "addNewFenceMesh",
      {
        height: 0.01,
        diameter: 0.3,
      }
    );
    addNewFenceMesh.material = addNewFenceMeshMat;
    addNewFenceMesh.position = new BABYLON.Vector3(
      rightPosts[rightPosts.length - 1].getAbsolutePosition().x + 0.3,
      1,
      rightPosts[rightPosts.length - 1].getAbsolutePosition().z
    );
    addNewFenceMesh.addRotation(Math.PI / 2, 0, 0);

    newFenceForwardSigns.push(addNewFenceMesh);
    //CREATE FENCE FORWARD
    for (let i = 0; i < newFenceForwardSigns.length; i++) {
      newFenceForwardSigns[i].actionManager = new BABYLON.ActionManager(scene);
      newFenceForwardSigns[i].actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            activeArrow = i;
            activeArrowSide = 1;
            addNewFenceSideBar();
            addFenceSings.forEach((elm) => {
              elm.material = addNewFenceMeshMat;
            });
            newFenceForwardSigns[i].material = addNewFenceMeshMatAct;
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
              smallBoardsMat,
              smallBoardsMatDark,
              fencesArr,
              addFenceSings
            );
            newFenceForwardSigns[i].isVisible = true;
            newFenceRightSigns[i].isVisible = true;
            newFenceLeftSigns[i].isVisible = true;
            newFenceBackSigns[i].isVisible = true;
            intersectArrowSignsFence(
              fakeFences,
              newFenceForwardSigns,
              newFenceRightSigns,
              newFenceLeftSigns,
              newFenceBackSigns,
              activeFence,
              addFenceSings
            );
            rightPosts[i].material = selectedMat;
          }
        )
      );
    }

    //RIGHT SIGHN
    var addNewFenceMeshRight = addNewFenceMesh.clone("addNewFenceMeshRight");
    addNewFenceMeshRight.position = new BABYLON.Vector3(
      rightPosts[rightPosts.length - 1].getAbsolutePosition().x,
      1,
      rightPosts[rightPosts.length - 1].getAbsolutePosition().z - 0.3
    );
    addNewFenceMeshRight.addRotation(0, 0, -Math.PI / 2);
    newFenceRightSigns.push(addNewFenceMeshRight);
    //CREATE FENCE RIGHT
    for (let i = 0; i < newFenceRightSigns.length; i++) {
      newFenceRightSigns[i].actionManager = new BABYLON.ActionManager(scene);
      newFenceRightSigns[i].actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            activeArrow = i;
            activeArrowSide = 2;
            addNewFenceSideBar();
            addFenceSings.forEach((elm) => {
              elm.material = addNewFenceMeshMat;
            });
            newFenceRightSigns[i].material = addNewFenceMeshMatAct;
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
              smallBoardsMat,
              smallBoardsMatDark,
              fencesArr,
              addFenceSings
            );
            newFenceForwardSigns[i].isVisible = true;
            newFenceRightSigns[i].isVisible = true;
            newFenceLeftSigns[i].isVisible = true;
            newFenceBackSigns[i].isVisible = true;
            intersectArrowSignsFence(
              fakeFences,
              newFenceForwardSigns,
              newFenceRightSigns,
              newFenceLeftSigns,
              newFenceBackSigns,
              activeFence,
              addFenceSings
            );
            rightPosts[i].material = selectedMat;
          }
        )
      );
    }

    //LEFT SIGHN
    var addNewFenceMeshLeft = addNewFenceMesh.clone("addNewFenceMeshLeft");
    addNewFenceMeshLeft.position = new BABYLON.Vector3(
      rightPosts[rightPosts.length - 1].getAbsolutePosition().x,
      1,
      rightPosts[rightPosts.length - 1].getAbsolutePosition().z + 0.3
    );
    addNewFenceMeshLeft.addRotation(0, 0, Math.PI / 2);
    newFenceLeftSigns.push(addNewFenceMeshLeft);
    //CREATE FENCE RIGHT
    for (let i = 0; i < newFenceLeftSigns.length; i++) {
      newFenceLeftSigns[i].actionManager = new BABYLON.ActionManager(scene);
      newFenceLeftSigns[i].actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            activeArrow = i;
            activeArrowSide = 3;
            addNewFenceSideBar();
            addFenceSings.forEach((elm) => {
              elm.material = addNewFenceMeshMat;
            });
            newFenceLeftSigns[i].material = addNewFenceMeshMatAct;
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
              smallBoardsMat,
              smallBoardsMatDark,
              fencesArr,
              addFenceSings
            );
            newFenceForwardSigns[i].isVisible = true;
            newFenceRightSigns[i].isVisible = true;
            newFenceLeftSigns[i].isVisible = true;
            newFenceBackSigns[i].isVisible = true;
            intersectArrowSignsFence(
              fakeFences,
              newFenceForwardSigns,
              newFenceRightSigns,
              newFenceLeftSigns,
              newFenceBackSigns,
              activeFence,
              addFenceSings
            );
            rightPosts[i].material = selectedMat;
          }
        )
      );
    }

    //BACK SIGHN
    var addNewFenceMeshBack = addNewFenceMesh.clone("addNewFenceMeshBack");
    addNewFenceMeshBack.position = new BABYLON.Vector3(
      rightPosts[rightPosts.length - 1].getAbsolutePosition().x - 0.3,
      1,
      rightPosts[rightPosts.length - 1].getAbsolutePosition().z
    );
    addNewFenceMeshBack.addRotation(0, Math.PI, 0);
    newFenceBackSigns.push(addNewFenceMeshBack);
    //CREATE FENCE BACK
    for (let i = 0; i < newFenceBackSigns.length; i++) {
      newFenceBackSigns[i].actionManager = new BABYLON.ActionManager(scene);
      newFenceBackSigns[i].actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            activeArrow = i;
            activeArrowSide = 4;
            addNewFenceSideBar();
            addFenceSings.forEach((elm) => {
              elm.material = addNewFenceMeshMat;
            });
            newFenceBackSigns[i].material = addNewFenceMeshMatAct;
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
              smallBoardsMat,
              smallBoardsMatDark,
              fencesArr,
              addFenceSings
            );
            newFenceForwardSigns[i].isVisible = true;
            newFenceRightSigns[i].isVisible = true;
            newFenceLeftSigns[i].isVisible = true;
            newFenceBackSigns[i].isVisible = true;
            intersectArrowSignsFence(
              fakeFences,
              newFenceForwardSigns,
              newFenceRightSigns,
              newFenceLeftSigns,
              newFenceBackSigns,
              activeFence,
              addFenceSings
            );
            rightPosts[i].material = selectedMat;
          }
        )
      );
    }

    addFenceSings.push(
      addNewFenceMesh,
      addNewFenceMeshRight,
      addNewFenceMeshLeft,
      addNewFenceMeshBack
    );
    addFenceSings.forEach((elm) => {
      elm.isVisible = false;
    });
    //////////////////
  }

  function createMainPostSigns() {
    //RIGHT SIGHN MAIN POST
    const addNewFenceMeshRightMain = BABYLON.MeshBuilder.CreateCylinder(
      "addNewFenceMeshRightMain",
      {
        height: 0.01,
        diameter: 0.3,
      }
    );
    addNewFenceMeshRightMain.material = addNewFenceMeshMat;
    addNewFenceMeshRightMain.position = new BABYLON.Vector3(
      leftPosts[0].getAbsolutePosition().x,
      1,
      leftPosts[0].getAbsolutePosition().z - 0.3
    );
    addNewFenceMeshRightMain.addRotation(Math.PI / 2, 0, -Math.PI / 2);
    // newFenceRightSigns.push(addNewFenceMeshRightMain);
    //CREATE FENCE RIGHT MAIN POST

    addNewFenceMeshRightMain.actionManager = new BABYLON.ActionManager(scene);
    addNewFenceMeshRightMain.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function () {
          activeArrow = false;
          activeArrowSide = 5;
          addNewFenceSideBar();
          addFenceSings.forEach((elm) => {
            elm.material = addNewFenceMeshMat;
          });
          addNewFenceMeshRightMain.material = addNewFenceMeshMatAct;
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
            smallBoardsMat,
            smallBoardsMatDark,
            fencesArr,
            addFenceSings
          );
          addNewFenceMeshRightMain.isVisible = true;
          addNewFenceMeshLeftMain.isVisible = true;
          // newFenceRightSigns[i].isVisible = true;
          // newFenceLeftSigns[i].isVisible = true;
          // newFenceBackSigns[i].isVisible = true;
          // intersectArrowSignsFence(
          //   fakeFences,
          //   newFenceForwardSigns,
          //   newFenceRightSigns,
          //   newFenceLeftSigns,
          //   newFenceBackSigns,
          //   activeFence,
          //   addFenceSings
          // );
          // rightPosts[i].material = selectedMat;
        }
      )
    );

    //RIGHT SIGHN MAIN POST
    const addNewFenceMeshLeftMain = BABYLON.MeshBuilder.CreateCylinder(
      "addNewFenceMeshLeftMain",
      {
        height: 0.01,
        diameter: 0.3,
      }
    );
    addNewFenceMeshLeftMain.material = addNewFenceMeshMat;
    addNewFenceMeshLeftMain.position = new BABYLON.Vector3(
      leftPosts[0].getAbsolutePosition().x,
      1,
      leftPosts[0].getAbsolutePosition().z + 0.3
    );
    addNewFenceMeshLeftMain.addRotation(Math.PI / 2, 0, Math.PI / 2);
    // newFenceRightSigns.push(addNewFenceMeshLeftMain);
    //CREATE FENCE RIGHT MAIN POST

    addNewFenceMeshLeftMain.actionManager = new BABYLON.ActionManager(scene);
    addNewFenceMeshLeftMain.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function () {
          activeArrow = false;
          activeArrowSide = 6;
          addNewFenceSideBar();
          addFenceSings.forEach((elm) => {
            elm.material = addNewFenceMeshMat;
          });
          addNewFenceMeshLeftMain.material = addNewFenceMeshMatAct;
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
            smallBoardsMat,
            smallBoardsMatDark,
            fencesArr,
            addFenceSings
          );
          addNewFenceMeshRightMain.isVisible = true;
          addNewFenceMeshLeftMain.isVisible = true;
          // newFenceRightSigns[i].isVisible = true;
          // newFenceLeftSigns[i].isVisible = true;
          // newFenceBackSigns[i].isVisible = true;
          // intersectArrowSignsFence(
          //   fakeFences,
          //   newFenceForwardSigns,
          //   newFenceRightSigns,
          //   newFenceLeftSigns,
          //   newFenceBackSigns,
          //   activeFence,
          //   addFenceSings
          // );
          // rightPosts[i].material = selectedMat;
        }
      )
    );

    addFenceSings.push(addNewFenceMeshRightMain, addNewFenceMeshLeftMain);
  }
  setTimeout(() => {
    console.log(addFenceSings);
  }, 1000);

  //TO DELETE FUNCTION for sturmanker led
  function onDelete(i) {
    leds[i].isVisible = false;
    singsDel[i].isVisible = false;
    ledsOn -= 1;
    // lightsLed[i].intensity = 0;
    if (ledsOn < 1) {
      //set to ohne on led lights
      //set html
      lightSettings.style.display = "none";
      lightColorSet.style.display = "none";
      //set babylon
      leds.forEach((elm) => {
        elm.isVisible = false;
      });
      setDayNight(0.6, 0, 0.7);
      ledColNum = 4;
      setLightColor(ledColNum);
      setLedColor(ledColNum);
      setActivnesStyle(ledParts, 6, 0);
    }
  }
  //LED STURMANKER FUNCTION
  function ledSturOnClick(a, i, b) {
    modalFade.style.display = "none";
    onLedSturmanker.style.display = "none";
    a.style.display = "none";
    leds[i].isVisible = b;
    singsWar[i].isVisible = false;
  }

  //LED STURMANKER FUNCTION
  function sturmankerOnOff(a, i) {
    if (vorderseiteOn) {
      sturmankersVorderseite[i].isVisible = a;
      sturVorderseiteSrafs[i].isVisible = a;
      foundationVisibilty(
        foundationStarts,
        foundations,
        false,
        foundationStartsVord,
        foundationsVord,
        true,
        foundationStartsRuck,
        foundationsRuck,
        false,
        i
      );
    }
    if (ruckseiteOn) {
      sturmankersRuckseite[i].isVisible = a;
      sturRuckseiteSrafs[i].isVisible = a;
      foundationVisibilty(
        foundationStarts,
        foundations,
        false,
        foundationStartsVord,
        foundationsVord,
        false,
        foundationStartsRuck,
        foundationsRuck,
        true,
        i
      );
    }
  }

  //ADD LAISNE ON FENCE - 3
  let createLaisne = (laisnePos) => {
    laisnes.forEach((elmL) => {
      elmL[laisnePos].isVisible = true;
      fenceBoards.forEach((elmB) => {
        elmL[laisnePos].position.y =
          elmB[laisnePos].position.y + 0.22 / 2 + 0.005;
      });
    });
    if (laisnePos < 6) {
      inlays.forEach((elm) => {
        elm[0].position.y += 0.01;
        elm[2].position.y += 0.01;
      });
    }
    for (let i = laisnePos; i < 7; i++) {
      fenceBoards.forEach((elmB) => {
        elmB[i + 1].position.y += 0.01;
      });

      if (i < 6) {
        laisnes.forEach((elmL) => {
          if (checkboxActive[i + 1]) {
            elmL[i + 1].position.y += 0.01;
          }
        });
      }
    }
    startParts.forEach((elm) => {
      elm.position.y += 0.01;
    });
    for (let i = 0; i < laisnes.length; i++) {
      if (smallBoardsArr[i].isVisible) {
        laisnes[i].forEach((elm) => {
          elm.isVisible = false;
        });
      }
    }
  };

  //REMOVE LAISNE FROM FENCE
  let disposeLaisne = (laisnePos) => {
    laisnes.forEach((elmL) => {
      elmL[laisnePos].isVisible = false;
    });
    if (laisnePos < 6) {
      inlays.forEach((elm) => {
        elm[0].position.y -= 0.01;
        elm[2].position.y -= 0.01;
      });
    }
    for (let i = laisnePos; i < 7; i++) {
      fenceBoards.forEach((elmB) => {
        elmB[i + 1].position.y -= 0.01;
      });
      if (i < 6) {
        laisnes.forEach((elmL) => {
          if (checkboxActive[i + 1]) {
            elmL[i + 1].position.y -= 0.01;
          }
        });
      }
    }
    startParts.forEach((elm) => {
      elm.position.y -= 0.01;
    });
  };

  //SET NUMBER ON BEGINING
  let setNum = document.getElementsByClassName("set-num");
  for (let i = 0; i < setNum.length; i++) {
    setNum[i].innerHTML = i + 1;
  }

  //SET TITLE ACTIVNESS
  let clickableMainSec = document.getElementsByClassName(
    "set-part-click-title"
  );
  for (let i = 0; i < clickableMainSec.length; i++) {
    clickableMainSec[i].onclick = () => {
      // for (let j = 0; j < clickableMainSec.length; j++) {
      //   if (clickableMainSec[j].className == "set-part-click-title clicked") {
      //     clickableMainSec[j].className = clickableMainSec[i].className.replace(
      //       " clicked",
      //       " not-clicked"
      //     );
      //     clickableMainSec[j].className == "set-part-click-title not-clicked";
      //     clickableMainSec[j].children[2].innerHTML = "+";
      //     clickableMainSec[j].nextElementSibling.style.height = 0;
      //   }
      // }
      if (clickableMainSec[i].className != "set-part-click-title clicked") {
        clickableMainSec[i].className = clickableMainSec[i].className.replace(
          " not-clicked",
          " clicked"
        );
        clickableMainSec[i].children[2].innerHTML = "-";
        clickableMainSec[i].nextElementSibling.style.height = "auto";
      } else if (
        clickableMainSec[i].className == "set-part-click-title clicked"
      ) {
        clickableMainSec[i].className = clickableMainSec[i].className.replace(
          " clicked",
          " not-clicked"
        );
        clickableMainSec[i].children[2].innerHTML = "+";
        clickableMainSec[i].nextElementSibling.style.height = 0;
      }

      //set activnes on leds parts to turn of led
      if (i != 5) {
        setActivnesStyle(ledDayNight, 8, 0);
        for (let i = 0; i < leds.length; i++) {
          setDayNight(0.6, 0, 0.7);
          setLightColor(4);
          setLedColor(ledColNum);
          glow.intensity = 0;
          singsDel[i].isVisible = false;
        }
      }
    };
  }

  //FUNCTION TO SET COLOR AND MATERIAL - 1, 2, 3, 5
  function setPartsAndconf(parts, changable, matCol) {
    for (let i = 0; i < parts.length; i++) {
      //set colors in badge
      parts[i].children[0].children[0].style.backgroundColor = matCol[i];
      parts[i].addEventListener("click", () => {
        //change fence color
        changable.diffuseColor = BABYLON.Color3.FromHexString(matCol[i]);
      });
    }
  }

  //SET ACTIVNES
  //ACTIVE CHECKMARK

  let checkMark = "&#10003";
  //set activness style
  function setActivnesStyle(parts, partNum, i) {
    //change active singhts
    var currentActCol = document.getElementsByClassName("active-text-color");
    //add remove active chackmark
    currentActCol[partNum].children[2].innerHTML = "";
    parts[i].children[2].innerHTML = checkMark;
    //change active color
    currentActCol[partNum].className = currentActCol[partNum].className.replace(
      " active-text-color",
      ""
    );
    parts[i].className += " active-text-color";
  }

  function setActivnes(parts, partNum) {
    for (let i = 0; i < parts.length; i++) {
      parts[i].addEventListener("click", () => {
        setActivnesStyle(parts, partNum, i);
      });
    }
  }
  //SET TOGGLE ACTIVNES
  let togAct = false;
  function setToggleActivnes(parts, partNum) {
    for (let i = 0; i < parts.length; i++) {
      parts[i].addEventListener("click", () => {
        var currentActCol =
          document.getElementsByClassName("active-text-color");
        if (!togAct) {
          parts[i].className += " active-text-color";
          parts[i].children[2].innerHTML = checkMark;
          togAct = true;
        } else {
          currentActCol[partNum].className = currentActCol[
            partNum
          ].className.replace(" active-text-color", "");
          parts[i].children[2].innerHTML = "";
          togAct = false;
        }
      });
    }
  }

  //1 SET MAIN FARBE FUNCIONALITY
  let mainFarbeParts = document.getElementsByClassName("set-part-main-farbe");
  setPartsAndconf(mainFarbeParts, fenceBoardMat, fenceBoardsColors);
  setActivnes(mainFarbeParts, 1);

  //2 SET START UND AVBSCH
  let startUndAbschParts = document.getElementsByClassName(
    "set-part-start-und-absch"
  );
  setPartsAndconf(startUndAbschParts, fenceStartEndMat, fencePartsColors);
  setActivnes(startUndAbschParts, 2);

  //3 DESIGNlLEISTEN AUS ALUMINIUM
  let designleistensMat = document.getElementsByClassName(
    "set-part-designleisten-aus-aluminium-act-col"
  );
  setPartsAndconf(designleistensMat, laisneMat, fencePartsColors);
  setActivnes(designleistensMat, 3);
  //DESIGNELEISTEN CHECH BOX TO ACTIVE
  let designleistens = document.getElementsByClassName(
    "set-part-designleisten-aus-aluminium"
  );
  if (designleistens.length > 0) {
    let actCol = "#3967ff";
    let transperent = "transparent";
    let empty = "";
    function addLaisnes(a, b, c, d, i) {
      designleistens[i].children[0].children[0].style.backgroundColor = a;
      designleistens[i].children[0].children[0].innerHTML = b;
      checkboxActive[i] = c;
      d;
    }
    var checkboxActive = [false, false, false, false, false, false, false];
    for (let i = 0; i < designleistens.length; i++) {
      designleistens[i].addEventListener("click", () => {
        if (!checkboxActive[i]) {
          addLaisnes(actCol, checkMark, true, createLaisne(i), i);
        } else {
          addLaisnes(transperent, empty, false, disposeLaisne(i), i);
        }
      });
    }
  }
  //4 SET DESIGN - INLAYS
  //set activnes
  let designInlays = document.getElementsByClassName(
    "set-activnes-design-inlays"
  );
  setActivnes(designInlays, 4);
  //first inlay setings
  let designInlaysFirst = document.getElementsByClassName(
    "first-set-design-inlays-color"
  );
  setPartsAndconf(designInlaysFirst, inlaysMat, fencePartsColors);
  // //second inlay setings
  // let designInlaysSecond = document.getElementsByClassName(
  //   "second-set-design-inlays-color"
  // );
  // setPartsAndconf(designInlaysSecond, inlaysMat, fencePartsColors);
  // //third inlay setings
  // let designInlaysThird = document.getElementsByClassName(
  //   "third-set-design-inlays-color"
  // );
  // setPartsAndconf(designInlaysThird, inlaysMat, fencePartsColors);
  //inlays show or not
  function inlaysFunction(a, b) {
    if (!activeFence) {
      inlays.forEach((elmI) => {
        elmI[0].isVisible = b;
        elmI[2].isVisible = b;
      });
      fenceBoards.forEach((elmF) => {
        elmF[6].isVisible = a;
      });
      for (let i = 0; i < inlays.length; i++) {
        inlays[i][0].material.albedoColor = inlays[i][2].material.diffuseColor;
      }
      for (let i = 0; i < fenceBoards.length; i++) {
        if (smallBoardsArr[i].isVisible) {
          fenceBoards[i][6].isVisible = false;
          inlays[i][0].isVisible = false;
          inlays[i][2].isVisible = false;
        } else {
          fencesArr[i].inlays = 1;
        }
      }
    } else {
      fenceBoards[activeFence].forEach((elm) => {
        elm.isVisible = a;
      });
      inlays[activeFence].forEach((elm) => {
        elm.isVisible = b;
      });
    }
    // inlays[1].isVisible = c;
    // inlays[2].isVisible = d;
  }
  var inlaysOn = 0;
  if (designInlays.length > 0) {
    for (let i = 0; i < designInlays.length; i++) {
      designInlays[i].addEventListener("click", () => {
        if (i == 0) {
          inlaysFunction(true, false);
          inlaysOn = 0;
        } else if (i == 1 || i == 2) {
          inlaysFunction(false, true);
          inlaysOn = 1;
          // } else if (i == 3 || i == 4) {
          //   inlaysFunction(false, false, true, false);
          // } else if (i == 5 || i == 6) {
          //   inlaysFunction(false, false, false, true);
        }
      });
    }
  }

  //5 SET FARBE PFOSTEN
  let fencePostsParts = document.getElementsByClassName(
    "set-part-farbe-pfosten"
  );
  setPartsAndconf(fencePostsParts, fencePostMat, fencePartsColors);
  setActivnes(fencePostsParts, 5);

  //6 SET LED
  let ledParts = document.getElementsByClassName("set-part-led");
  setActivnes(ledParts, 6);
  let lightSettings = document.getElementById("light-settings");
  let lightColorSet = document.getElementById("light-color-settings");
  //set day night
  function setDayNight(a, b, c) {
    lightsHavy.forEach((elm) => {
      elm.intensity = a;
    });
    // lightsLed.forEach((elm) => {
    //   elm.intensity = b;
    // });
    skyBoxes[0].material.luminance = c;
    // if (directeHauswandMesh.isVisible) lightsLed[0].intensity = 0;
  }
  //set lights color
  function setLightColor(lightNum) {
    lightsHavy.forEach((elm) => {
      elm.diffuse = elm.specular = BABYLON.Color3.FromHexString(
        lightColors[lightNum]
      );
    });
  }

  var ledColNum = 4;
  function setLedColor(lightNum) {
    // lightsLed.forEach((elm) => {
    //   elm.diffuse = elm.specular = BABYLON.Color3.FromHexString(
    //     lightColors[lightNum]
    //   );
    // });
    ledMat.diffuseColor = ledMat.emissiveColor = BABYLON.Color3.FromHexString(
      lightColors[lightNum]
    );
  }

  if (ledParts.length > 0) {
    var colorLedOn = false;
    ledParts[0].addEventListener("click", () => {
      colorLedOn = false;
      //set html
      lightSettings.style.display = "none";
      lightColorSet.style.display = "none";
      //set babylon
      leds.forEach((elm) => {
        elm.isVisible = false;
      });
      setDayNight(0.6, 0, 0.7);
      ledColNum = 4;
      setLightColor(ledColNum);
      setLedColor(ledColNum);
      singsDel.forEach((elm) => {
        elm.isVisible = false;
      });
      //set leds num to 0
      ledsOn = 0;
      singsWar.forEach((elm) => {
        elm.isVisible = false;
      });
    });
    ledParts[1].addEventListener("click", () => {
      intersectionFunction(
        fakeFronts,
        fakeFences,
        sturmankersVorderseite,
        sturVorderseiteSrafs,
        leds,
        singsDel,
        singsWar,
        fakeBacks,
        sturmankersRuckseite,
        sturRuckseiteSrafs,
        foundationStarts,
        foundations,
        foundationStartsVord,
        foundationsVord,
        foundationStartsRuck,
        foundationsRuck
      );

      singsWar.forEach((elm) => {
        elm.isVisible = false;
      });
      colorLedOn = true;
      //set html
      lightSettings.style.display = "block";
      lightColorSet.style.display = "block";
      //set babylon
      glow.intensity = 0.8;
      for (let i = 0; i < sturmankersVorderseite.length; i++) {
        if (
          sturmankersVorderseite[i].isVisible ||
          sturmankersRuckseite[i].isVisible
        ) {
          strurmOn = true;
        }
      }
      if (!strurmOn) {
        leds.forEach((elm) => {
          elm.isVisible = true;
        });
        ledsOn = leds.length;
        singsDel.forEach((elm) => {
          elm.isVisible = true;
        });
        ledColNum = 0;
        setLightColor(ledColNum);
        setLedColor(ledColNum);
        setDayNight(0.2, 0.5, 1.15);
      } else {
        singsWar.forEach((elm) => {
          elm.isVisible = false;
        });
        //set warning sings to visible if sturmanker is visible
        for (let i = 0; i < sturmankersVorderseite.length; i++) {
          if (
            sturmankersVorderseite[i].isVisible ||
            sturmankersRuckseite[i].isVisible
          ) {
            singsWar[i].isVisible = true;
          }
          if (
            !sturmankersVorderseite[i].isVisible &&
            !sturmankersRuckseite[i].isVisible
          ) {
            leds[i].isVisible = true;
          }
        }
        setDayNight(0.2, 0, 1.15);
        setLightColor(4);
        setLedColor(0);
        //set leds on lights on
        // for (let i = 0; i < leds.length; i++) {
        //   if (leds[i].isVisible) {
        //     lightsLed[i].intensity = 0.5;
        //   }
        // }
      }
      setActivnesStyle(ledDayNight, 8, 2);
      //set active color to first
      //html
      var currentActColLig = document.getElementsByClassName(
        "active-color-light-contaier"
      );
      //change active color
      currentActColLig[0].className = currentActColLig[0].className.replace(
        " active-color-light-contaier",
        ""
      );
      colorLightContainer[0].className += " active-color-light-contaier";
      if (directeHauswandMesh.isVisible) {
        leds[0].isVisible = false;
        singsDel[0].isVisible = false;
      }
      for (let i = 0; i < directeHauswandMeshesRight.length; i++) {
        if (directeHauswandMeshesRight[i].isVisible) {
          ledsRight[i].isVisible = false;
          singsDel[i + 1].isVisible = false;
        }
      }
    });

    ledParts[2].addEventListener("click", () => {
      intersectionFunction(
        fakeFronts,
        fakeFences,
        sturmankersVorderseite,
        sturVorderseiteSrafs,
        leds,
        singsDel,
        singsWar,
        fakeBacks,
        sturmankersRuckseite,
        sturRuckseiteSrafs,
        foundationStarts,
        foundations,
        foundationStartsVord,
        foundationsVord,
        foundationStartsRuck,
        foundationsRuck
      );
      singsWar.forEach((elm) => {
        elm.isVisible = false;
      });
      colorLedOn = false;
      //set html
      lightSettings.style.display = "block";
      lightColorSet.style.display = "none";
      //set babylon
      glow.intensity = 0.8;
      for (let i = 0; i < sturmankersVorderseite.length; i++) {
        if (
          sturmankersVorderseite[i].isVisible ||
          sturmankersRuckseite[i].isVisible
        ) {
          strurmOn = true;
        }
      }
      console.log(strurmOn);
      if (!strurmOn) {
        leds.forEach((elm) => {
          elm.isVisible = true;
        });
        ledsOn = leds.length;
        singsDel.forEach((elm) => {
          elm.isVisible = true;
        });
        setDayNight(0.2, 0.5, 1.15);
      } else {
        singsWar.forEach((elm) => {
          elm.isVisible = false;
        });
        //set warning sings to visible if sturmanker is visible
        for (let i = 0; i < sturmankersVorderseite.length; i++) {
          if (
            sturmankersVorderseite[i].isVisible ||
            sturmankersRuckseite[i].isVisible
          ) {
            singsWar[i].isVisible = true;
          }
          if (
            !sturmankersVorderseite[i].isVisible &&
            !sturmankersRuckseite[i].isVisible
          ) {
            leds[i].isVisible = true;
          }
        }
        setDayNight(0.2, 0, 1.15);
        for (let i = 0; i < leds.length; i++) {
          if (leds[i].isVisible) {
            // lightsLed[i].intensity = 0.5;
          }
        }
      }
      ledColNum = 4;
      setLightColor(4);
      setLedColor(4);
      setActivnesStyle(ledDayNight, 8, 2);
      if (directeHauswandMesh.isVisible) {
        leds[0].isVisible = false;
        singsDel[0].isVisible = false;
      }
      for (let i = 0; i < directeHauswandMeshesRight.length; i++) {
        if (directeHauswandMeshesRight[i].isVisible) {
          ledsRight[i].isVisible = false;
          singsDel[i + 1].isVisible = false;
        }
      }
    });
    //set if delete sings are visible
    let ledDeleteOnOff = document.getElementsByClassName("set-delete-on-off");
    setActivnes(ledDeleteOnOff, 7);

    for (let i = 0; i < ledDeleteOnOff.length; i++) {
      ledDeleteOnOff[0].addEventListener("click", () => {
        singsDel.forEach((elm) => {
          elm.isVisible = true;
        });
      });
      ledDeleteOnOff[1].addEventListener("click", () => {
        singsDel.forEach((elm) => {
          elm.isVisible = false;
        });
      });
    }
    //set day and night
    var ledDayNight = document.getElementsByClassName("set-day-night");
    setActivnes(ledDayNight, 8);

    function setDayNightOff(a, b, c, d, e) {
      setDayNight(a, b, e);
      setLightColor(c);
      setLedColor(ledColNum);
      glow.intensity = d;
    }

    for (let i = 0; i < ledDayNight.length; i++) {
      ledDayNight[0].addEventListener("click", () => {
        setDayNightOff(0.6, 0, 4, 0, 0.7);
        lightColorSet.style.display = "none";
      });
      ledDayNight[1].addEventListener("click", () => {
        setDayNightOff(0.6, 0, 4, 0.8, 0.7);
        if (colorLedOn) lightColorSet.style.display = "block";
      });
      ledDayNight[2].addEventListener("click", () => {
        setDayNightOff(0.2, 0.5, ledColNum, 0.8, 1.15);
        if (colorLedOn) lightColorSet.style.display = "block";
      });
    }
    //set colors
    let colorLightContainer = document.getElementsByClassName(
      "color-light-container"
    );
    for (let i = 0; i < colorLightContainer.length; i++) {
      colorLightContainer[i].style.backgroundColor = lightColors[i];
      colorLightContainer[i].addEventListener("click", () => {
        //html
        var currentActColLig = document.getElementsByClassName(
          "active-color-light-contaier"
        );
        //change active color
        currentActColLig[0].className = currentActColLig[0].className.replace(
          " active-color-light-contaier",
          ""
        );
        colorLightContainer[i].className += " active-color-light-contaier";
        //babylon
        ledColNum = i;
        setLightColor(ledColNum);
        setLedColor(ledColNum);
      });
    }
  }

  //7 DUBINSKI STUB Befestigungsmethode Pfosten
  let befePfostenParts = document.getElementsByClassName(
    "set-part-befe-pfosten"
  );
  setActivnes(befePfostenParts, 9);

  function setbefePfosten(a, b, c, d, e) {
    //post roots
    roots.forEach((elm) => {
      elm.isVisible = c;
    });
    if (!directeHauswandMesh.isVisible) {
      leftPosts[0].scaling.y = a;
      leftPosts[0].position.y = b;
      rightPosts.forEach((elm) => {
        elm.scaling.z = a;
        elm.position.y = b;
      });
      if (sturmankersVorderseite[0].isVisible) {
        foundationVisibilty(
          foundationStarts,
          foundations,
          false,
          foundationStartsVord,
          foundationsVord,
          true,
          foundationStartsRuck,
          foundationsRuck,
          false,
          0
        );
      } else if (sturmankersRuckseite[0].isVisible) {
        foundationVisibilty(
          foundationStarts,
          foundations,
          false,
          foundationStartsVord,
          foundationsVord,
          false,
          foundationStartsRuck,
          foundationsRuck,
          true,
          0
        );
      } else {
        foundationVisibilty(
          foundationStarts,
          foundations,
          true,
          foundationStartsVord,
          foundationsVord,
          false,
          foundationStartsRuck,
          foundationsRuck,
          false,
          0
        );
      }
    } else {
      rightPosts.forEach((elm) => {
        elm.scaling.z = a;
        elm.position.y = b;
      });
      roots[0].isVisible = false;
      roots[1].isVisible = false;
      foundations[0].isVisible = false;
      foundationsVord[0].isVisible = false;
      foundationsRuck[0].isVisible = false;
    }
    //foundation
    for (let i = 1; i < foundations.length; i++) {
      foundations[i].scaling.y = d;
      foundationsVord[i].scaling.z = d;
      foundationsRuck[i].scaling.z = d;

      foundations[i].position.y = e;
      foundationsVord[i].position.z = -e;
      foundationsRuck[i].position.z = -e;
    }
    foundations[0].scaling.y = d;
    foundations[0].position.y = e;

    // foundationsVord[0].scaling.z = 1;
    // foundationsRuck[0].scaling.z = 1;
    foundationsVord[0].scaling.y = d;
    foundationsRuck[0].scaling.y = d;

    foundationsVord[0].position.y = e;
    foundationsRuck[0].position.y = e;

    //if hauswand is visible on other posts
    for (let i = 0; i < directeHauswandMeshesRight.length; i++) {
      if (directeHauswandMeshesRight[i].isVisible) {
        rightPosts[i].scaling.z = 1;
        rightPosts[i].position.y = 0.962;
        rightRoots[i].forEach((elm) => {
          elm.isVisible = false;
        });
      }
    }
  }
  var befePfostenSize = 0;
  if (befePfostenParts.length > 0) {
    befePfostenParts[0].addEventListener("click", () => {
      setbefePfosten(1, 0.962, true, 1, -0.5 / 2);
      befePfostenSize = 0;
    });
    befePfostenParts[1].addEventListener("click", () => {
      setbefePfosten(1.2, 0.7717, false, 1, -0.5 / 2);
      befePfostenSize = 1;
    });
    befePfostenParts[2].addEventListener("click", () => {
      setbefePfosten(1.475, 0.511, false, 1.8, -0.9 / 2);
      befePfostenSize = 2;
    });
  }

  //8 STURMANKER
  let sturmankerCon = document.getElementsByClassName("sturmanker-con");
  setActivnes(sturmankerCon, 10);
  function setSturmanker(a, b, c, d, e) {
    for (let i = 0; i < leds.length; i++) {
      if (!leds[i].isVisible) {
        sturmankersRuckseite[i].isVisible = a;
        sturRuckseiteSrafs[i].isVisible = a;
        sturmankersVorderseite[i].isVisible = b;
        sturVorderseiteSrafs[i].isVisible = b;

        foundationVisibilty(
          foundationStarts,
          foundations,
          c,
          foundationStartsVord,
          foundationsVord,
          d,
          foundationStartsRuck,
          foundationsRuck,
          e,
          i
        );
      }
    }
    if (directeHauswandMesh.isVisible) {
      sturmankersRuckseite[0].isVisible = false;
      sturRuckseiteSrafs[0].isVisible = false;
      sturmankersVorderseite[0].isVisible = false;
      sturVorderseiteSrafs[0].isVisible = false;
    }
  }
  if (sturmankerCon.length > 0) {
    var vorderseiteOn = false;
    var ruckseiteOn = false;
    var strurmOn = false;

    function sturmankerFunction(a, b, c, d, e, f, g) {
      //display onstrumanker if led is not on
      if (ledsOn < 1) {
        modalFade.style.display = "block";
        onSturmanker.style.display = "block";
        setSturmanker(a, b, c, d, e);
        strurmOn = true;
        setDayNight(0.6, 0, 0.7);
      } else {
        singsWar.forEach((elm) => {
          elm.isVisible = false;
        });
        for (let i = 0; i < leds.length; i++) {
          setDayNight(0.6, 0, 0.7);
          setLightColor(4);
          // setLedColor(ledColNum);
          glow.intensity = 0;
          //set sings
          if (leds[i].isVisible) {
            singsWar[i].isVisible = true;
          } else {
            setSturmanker(a, b, c, d, e);
          }
          singsDel[i].isVisible = false;
        }
        //set activnes on leds parts to turn of led
        setActivnesStyle(ledDayNight, 8, 0);
      }
      //set wich one is activ
      vorderseiteOn = f;
      ruckseiteOn = g;
      for (let i = 0; i < directeHauswandMeshesRight.length; i++) {
        if (directeHauswandMeshesRight[i].isVisible) {
          sturmankersVorderseiteRight[i].forEach((elm) => {
            elm.isVisible = false;
          });
          sturmankersRuckseiteRight[i].forEach((elm) => {
            elm.isVisible = false;
          });
          foundationVisibilty(
            foundationStarts,
            foundations,
            false,
            foundationStartsVord,
            foundationsVord,
            false,
            foundationStartsRuck,
            foundationsRuck,
            false,
            i + 1
          );
        }
      }
    }
    sturmankerCon[0].addEventListener("click", () => {
      intersectionFunction(
        fakeFronts,
        fakeFences,
        sturmankersVorderseite,
        sturVorderseiteSrafs,
        leds,
        singsDel,
        singsWar,
        fakeBacks,
        sturmankersRuckseite,
        sturRuckseiteSrafs,
        foundationStarts,
        foundations,
        foundationStartsVord,
        foundationsVord,
        foundationStartsRuck,
        foundationsRuck
      );
      singsWar.forEach((elm) => {
        elm.isVisible = false;
      });
      sturmankerFunction(true, false, false, false, true, false, true);
      //select stur
      sturSelectionFun(
        sturmankersRuckseite,
        sturRuckseiteSrafs,
        foundationStarts,
        foundations
      );
    });
    sturmankerCon[1].addEventListener("click", () => {
      setSturmanker(false, false, true, false, false);
      //turn off warnig sings
      singsWar.forEach((elm) => {
        elm.isVisible = false;
      });
      //set wich one is active
      vorderseiteOn = false;
      ruckseiteOn = false;
      strurmOn = false;
      for (let i = 0; i < directeHauswandMeshesRight.length; i++) {
        if (directeHauswandMeshesRight[i].isVisible) {
          foundationVisibilty(
            foundationStarts,
            foundations,
            false,
            foundationStartsVord,
            foundationsVord,
            false,
            foundationStartsRuck,
            foundationsRuck,
            false,
            i + 1
          );
        }
      }
    });
    sturmankerCon[2].addEventListener("click", () => {
      intersectionFunction(
        fakeFronts,
        fakeFences,
        sturmankersVorderseite,
        sturVorderseiteSrafs,
        leds,
        singsDel,
        singsWar,
        fakeBacks,
        sturmankersRuckseite,
        sturRuckseiteSrafs,
        foundationStarts,
        foundations,
        foundationStartsVord,
        foundationsVord,
        foundationStartsRuck,
        foundationsRuck
      );
      singsWar.forEach((elm) => {
        elm.isVisible = false;
      });
      sturmankerFunction(false, true, false, true, false, true, false);
      //select stur
      sturSelectionFun(
        sturmankersVorderseite,
        sturVorderseiteSrafs,
        foundationStarts,
        foundations
      );
    });
  }
  // to select sturmanker
  let selectedStur;
  let selectedSraf;
  let selectedFoundStart;
  let selectedFound;
  function sturSelectionFun(a, b, c, d) {
    for (let i = 0; i < a.length; i++) {
      a[i].actionManager = new BABYLON.ActionManager(scene);
      a[i].actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            if (a[i].material.id != "selectedMat") {
              removeSideAccesories(
                sideAccesories,
                deleteAccesorie,
                addFenceAcc
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
                smallBoardsMat,
                smallBoardsMatDark,
                fencesArr,
                addFenceSings
              );
              a.forEach((elm) => {
                elm.material = fencePostMat;
              });
              a[i].material = selectedMat;
              selectedStur = a[i];
              selectedSraf = b[i];
              selectedFoundStart = c[i];
              selectedFound = d[i];
              sideAccesories.style.display = "block";
              deleteAccesorie[1].style.display = "block";
              addNewFenceToSide.style.display = "none";
              //set day when select sturmanker
              setDayNight(0.6, 0, 0.7);
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
                ? setActivnesStyle(ledParts, 6, 1)
                : setActivnesStyle(ledParts, 6, 0);
            } else {
              a.forEach((elm) => {
                elm.material = fencePostMat;
              });
              sideAccesories.style.display = "none";
              deleteAccesorie[1].style.display = "none";
            }
          }
        )
      );
    }
  }

  //to delete sturmanker
  deleteImgAccesories[1].addEventListener("click", () => {
    sideAccesories.style.display = "none";
    deleteAccesorie[1].style.display = "none";
    addFenceAcc.style.display = "none";
    selectedStur.isVisible = false;
    selectedSraf.isVisible = false;
    if (sturmankersVorderseite.includes(selectedStur)) {
      foundationVisibilty(
        foundationStarts,
        foundations,
        true,
        foundationStartsVord,
        foundationsVord,
        false,
        foundationStartsRuck,
        foundationsRuck,
        false,
        sturmankersVorderseite.indexOf(selectedStur)
      );
    } else {
      foundationVisibilty(
        foundationStarts,
        foundations,
        true,
        foundationStartsVord,
        foundationsVord,
        false,
        foundationStartsRuck,
        foundationsRuck,
        false,
        sturmankersRuckseite.indexOf(selectedStur)
      );
    }

    selectedStur.material = fencePostMat;
    //set activnes of sturmanker parts
    var sturNum2 = 0;
    for (let i = 0; i < sturmankersVorderseite.length; i++) {
      if (sturmankersVorderseite[i].isVisible) {
        sturNum2 += 1;
      } else if (sturmankersRuckseite[i].isVisible) {
        sturNum2 += 1;
      }
    }
    if (sturNum2 < 1) {
      setActivnesStyle(sturmankerCon, 10, 1);
      strurmOn = false;
    }
  });

  //9 BETONSKI STUB SA STRANE
  let directeHauswand = document.getElementsByClassName(
    "set-part-direkte-hauswand"
  );
  setToggleActivnes(directeHauswand, 11);

  var directeHauswandMesh = BABYLON.MeshBuilder.CreateBox(
    "directeHauswandMesh",
    {
      height: 2,
      width: 0.2,
      depth: 0.25,
    }
  );
  directeHauswandMesh.position = new BABYLON.Vector3(-0.1, 1, 0);
  directeHauswandMesh.material = concreteMat;
  directeHauswandMesh.isVisible = false;

  function setHauswand(a, b, c, d, e, f) {
    directeHauswandMesh.isVisible = a;
    leftPosts[0].scaling.y = b;
    leftPosts[0].position.y = c;
    if (roots[3].isVisible && !directeHauswandMesh.isVisible) {
      roots[0].isVisible = roots[1].isVisible = true;
    } else if (
      (roots[3].isVisible && directeHauswandMesh.isVisible) ||
      (!roots[3].isVisible && !directeHauswandMesh.isVisible) ||
      (!roots[3].isVisible && directeHauswandMesh.isVisible)
    ) {
      roots[0].isVisible = roots[1].isVisible = false;
    }
    foundationVisibilty(
      foundationStarts,
      foundations,
      d,
      foundationStartsVord,
      foundationsVord,
      e,
      foundationStartsRuck,
      foundationsRuck,
      f,
      0
    );
    // foundationStarts[0].isVisible = foundations[0].isVisible = d;
  }

  directeHauswandMesh.actionManager = new BABYLON.ActionManager(scene);
  directeHauswandMeshes.push(directeHauswandMesh);
  directeHauswandMesh.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickTrigger,
      function () {
        if (directeHauswandMesh.material.id != "selectedMat") {
          removeSideAccesories(sideAccesories, deleteAccesorie, addFenceAcc);
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
            smallBoardsMat,
            smallBoardsMatDark,
            fencesArr,
            addFenceSings
          );
          directeHauswandMesh.material = selectedMat;
          sideAccesories.style.display = "block";
          deleteAccesorie[0].style.display = "block";
          addNewFenceToSide.style.display = "none";
          singsDel[0].isVisible = false;
          //set day when select sturmanker
          setDayNight(0.6, 0, 0.7);
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
            ? setActivnesStyle(ledParts, 6, 1)
            : setActivnesStyle(ledParts, 6, 0);
        } else {
          directeHauswandMesh.material = concreteMat;
          sideAccesories.style.display = "none";
          deleteAccesorie[0].style.display = "none";
          addFenceAcc.style.display = "none";
        }
      }
    )
  );

  deleteImgAccesories[0].addEventListener("click", () => {
    sideAccesories.style.display = "none";
    deleteAccesorie[0].style.display = "none";
    addFenceAcc.style.display = "none";
    if (directeHauswandMeshes[0].material.id == "selectedMat") {
      addRemoveHauswand();
      directeHauswandMesh.material = concreteMat;
      var currentActCol = document.getElementsByClassName("active-text-color");
      if (!togAct) {
        directeHauswand[0].className += " active-text-color";
        directeHauswand[0].children[2].innerHTML = checkMark;
        togAct = true;
      } else {
        currentActCol[11].className = currentActCol[11].className.replace(
          " active-text-color",
          ""
        );
        directeHauswand[0].children[2].innerHTML = "";
        togAct = false;
      }
    }
    for (let i = 0; i < directeHauswandMeshesRight.length; i++) {
      if (directeHauswandMeshesRight[i].material.id == "selectedMat") {
        directeHauswandMeshesRight[i].material = concreteMat;
        directeHauswandMeshesRight[i].isVisible = false;
        foundationStartsRight[i].isVisible = true;
        foundationVisibilty(
          foundationStarts,
          foundations,
          true,
          foundationStartsVord,
          foundationsVord,
          false,
          foundationStartsRuck,
          foundationsRuck,
          false,
          i + 1
        );
        if (befePfostenSize == 0) {
          rightPosts[i].scaling.z = 1;
          rightPosts[i].position.y = 0.962;
          rightRoots[i].forEach((elm) => {
            elm.isVisible = true;
          });
          foundations[i + 1].scaling.y = 1;
          foundations[i + 1].position.y = -0.5 / 2;
        }
        if (befePfostenSize == 1) {
          rightPosts[i].scaling.z = 1.2;
          rightPosts[i].position.y = 0.7717;
          foundations[i + 1].scaling.y = 1;
          foundations[i + 1].position.y = -0.5 / 2;
        }
        if (befePfostenSize == 2) {
          rightPosts[i].scaling.z = 1.475;
          rightPosts[i].position.y = 0.511;
          foundations[i + 1].scaling.y = 1.8;
          foundations[i + 1].position.y = -0.9 / 2;
        }
      }
    }
  });

  function addRemoveHauswand() {
    if (!directeHauswandMesh.isVisible) {
      setHauswand(true, 1, 0.962, false, false, false);
      sturmankersRuckseite[0].isVisible = false;
      sturRuckseiteSrafs[0].isVisible = false;
      sturmankersVorderseite[0].isVisible = false;
      sturVorderseiteSrafs[0].isVisible = false;
      leds[0].isVisible = false;
      // lightsLed[0].intensity = 0;
    } else {
      setHauswand(
        false,
        rightPosts[0].scaling.z,
        rightPosts[0].position.y,
        true,
        false,
        false
      );
      // foundationStarts[0].scaling.z = foundations[0].scaling.z = 1;
      // foundationStarts[0].position.z = foundations[0].position.z = 0;
      directeHauswandMesh.material = concreteMat;
    }
  }

  if (directeHauswand.length > 0) {
    directeHauswand[0].addEventListener("click", () => {
      addRemoveHauswand();
    });
  }

  //SET MATERIALS TO RECIVE MORE THEN 4 LIGHTS
  scene.materials.forEach(function (mtl) {
    mtl.maxSimultaneousLights = 100;
  });

  // ACCESORIES SECTION FUNCTIONS*****************************************************************************************
  function unselect() {
    // sideAccesories.style.width = 0;
    sideAccesories.style.display = "none";
    for (let j = 0; j < deleteAccesorie.length; j++) {
      deleteAccesorie[j].style.display = "none";
    }
    addFenceAcc.style.display = "none";
    closeSliderContainer();
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
      smallBoardsMat,
      smallBoardsMatDark,
      fencesArr,
      addFenceSings
    );
    addFenceSings;
    setTimeout(() => {
      activeFence = false;
    }, 100);

    //console.log(activeFence);
  }
  function accCloseButFun(clickable) {
    if (typeof clickable.length == "number") {
      for (let i = 0; i < clickable.length; i++) {
        clickable[i].addEventListener("click", () => {
          unselect();
        });
      }
    } else {
      clickable.addEventListener("click", () => {
        unselect();
      });
    }
  }

  //set activnes for add fence
  let changeFence = document.getElementsByClassName(
    "set-activnes-change-fence"
  );
  setActivnes(changeFence, 0);

  //close add new fence accesoire when close button
  accCloseButFun(sideAccCloseBtn);

  //first small board fence colors setings
  let smallBoardsFirst = document.getElementsByClassName(
    "first-set-add-fence-color"
  );

  //second small board fence colors setings
  let smallBoardsSecond = document.getElementsByClassName(
    "second-set-add-fence-color"
  );
  //function to change fence
  function changeFenceFunction(a, b, c, d, e, f, g) {
    fenceBoards[activeFence].forEach((elm) => {
      elm.isVisible = a;
    });
    startParts[activeFence].isVisible = endParts[activeFence].isVisible = a;

    smallBoardsArr[activeFence].isVisible = b;

    changePosAndScaleFence(c, activeFence);
    positionChildrenOnParentSizeChange();
    fencesArr[activeFence].type = d;
    fencesArr[activeFence].smBoaCol = e;
    fencesArr[activeFence].size = c;
    fencesArr[activeFence].inlays = g;
    if (fencesArr[activeFence].inlays == 0) {
      inlays[activeFence][0].isVisible = false;
      inlays[activeFence][2].isVisible = false;
    }
    // }
    if (fencesArr[activeFence].inlays == 1) {
      inlays[activeFence][0].isVisible = true;
      inlays[activeFence][2].isVisible = true;
      fenceBoards[activeFence][6].isVisible = false;
    }

    //set inlays to ohne
    aaa = 0;
    inlays.forEach((elm) => {
      if (elm[0].isVisible) {
        aaa += 1;
      }
      if (aaa < 1) {
        setActivnesStyle(designInlays, 4, 0);
        inlaysOn = 0;
      }

      console.log(aaa);
    });
    //set laisnes
    for (let i = 0; i < laisnes[activeFence].length; i++) {
      if (checkboxActive[i]) {
        laisnes[activeFence][i].isVisible = f;
      }
    }
  }

  changeFence[0].addEventListener("click", () => {
    changeFenceFunction(true, false, 180, "easyFence", "silber", true, 0);
    console.log(fencesArr[activeFence]);
  });
  changeFence[1].addEventListener("click", () => {
    changeFenceFunction(true, false, 180, "easyFence", "silber", true, 1);
    console.log(fencesArr[activeFence]);
  });
  changeFence[2].addEventListener("click", () => {
    changeFenceFunction(false, true, 180, "easyRomBig", "silber", false, 0);
    console.log(fencesArr[activeFence]);
  });
  changeFence[3].addEventListener("click", () => {
    changeFenceFunction(false, true, 180, "easyRomBig", "anthrazit", false, 0);
    console.log(fencesArr[activeFence]);
  });
  changeFence[4].addEventListener("click", () => {
    changeFenceFunction(false, true, 60, "easyRomSmall", "silber", false, 0);
    console.log(fencesArr[activeFence]);
  });
  changeFence[5].addEventListener("click", () => {
    changeFenceFunction(false, true, 60, "easyRomSmall", "anthrazit", false, 0);
    console.log(fencesArr[activeFence]);
  });
  //close side
  accCloseButFun(changeFence);

  //DELETE FENCE
  let deleteFencePart = document.getElementById("set-part-fence-acc-del");

  function deleteFenceOn(a) {
    if (a > 0) {
      deleteFencePart.children[0].children[0].style.backgroundImage =
        "url('img/deleteRound.png')";
      deleteFencePart.children[1].innerHTML = "Löschen";
    } else {
      deleteFencePart.children[0].children[0].style.backgroundImage =
        "url('img/deleteRoundNo.png')";
      deleteFencePart.children[1].innerHTML = "Der erste Zaun";
    }
  }
  function deleteFence(fence) {
    wholeFences[fence].dispose();
    foundationsRight[fence].dispose();
    fakeFences[fence].name = "disposedFakeFence";
    newFenceForwardSigns[fence].dispose();
    newFenceRightSigns[fence].dispose();
    newFenceLeftSigns[fence].dispose();
    newFenceBackSigns[fence].dispose();
  }
  function recursiveToChildrenDelete(a) {
    if (fencesArr[a].children.length > 0) {
      if (
        wholeFences[a].rotation.y !=
        wholeFences[fencesArr[a].children[0]].rotation.y
      ) {
        fencesArr[a].children.forEach((elm) => {
          deleteFence(elm);
          recursiveToChildrenDelete(elm);
        });
      }
    }
  }
  //     foundationsRight[elm].position.x =
  //       foundationsRight[elm].position.x - 1.8;
  //     // foundationsRight[elm].position.z =
  //     //   foundationsRight[elm].position.z - (firstZ - secondZ);

  //     wholeFences[elm].position.x = wholeFences[elm].position.x - 1.8;
  //     // wholeFences[elm].position.z =
  //     //   wholeFences[elm].position.z - (firstZ - secondZ);

  //     newFenceForwardSigns[elm].position.x =
  //       newFenceForwardSigns[elm].position.x - 1.8;
  //     // newFenceForwardSigns[elm].position.z =
  //     //   newFenceForwardSigns[elm].position.z - (firstZ - secondZ);

  //     newFenceRightSigns[elm].position.x =
  //       newFenceRightSigns[elm].position.x - 1.8;
  //     // newFenceRightSigns[elm].position.z =
  //     //   newFenceRightSigns[elm].position.z - (firstZ - secondZ);

  //     newFenceLeftSigns[elm].position.x =
  //       newFenceLeftSigns[elm].position.x - 1.8;
  //     // newFenceLeftSigns[elm].position.z =
  //     //   newFenceLeftSigns[elm].position.z - (firstZ - secondZ);

  //     newFenceBackSigns[elm].position.x =
  //       newFenceBackSigns[elm].position.x - 1.8;
  //     // newFenceBackSigns[elm].position.z =
  //     //   newFenceBackSigns[elm].position.z - (firstZ - secondZ);
  accCloseButFun(deleteFencePart);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //END OF SCENE
  return scene;
};
