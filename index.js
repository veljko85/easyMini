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

//FOR LOADING
BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
  if (document.getElementById("customLoadingScreenDiv")) {
    // Do not add a loading screen if there is already one
    document.getElementById("customLoadingScreenDiv").style.display = "initial";
    return;
  }
};
//lottie
let animItem = bodymovin.loadAnimation({
  wrapper: document.getElementById("lottieWraper"),
  animType: "svg",
  loop: true,
  // rendererSettings: {
  //   progressiveLoad: false,
  //   preserveAspectRatio: "xMidYMid meet",
  //   viewBoxSize: "10 10 10 10",
  // },
  path: "https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/loading.json",
});
animItem.resize();
animItem.addEventListener("DOMLoaded", function () {
  animItem.playSegments(
    [
      [0, 100],
      [32, 100],
    ],
    true
  );
});

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function () {
  document.getElementById("customLoadingScreenDiv").style.display = "none";
  // console.log("scene is now loaded");
};
//end of loading

//CREATE SCENE ///////////////////////////////////////////////////
var createScene = function () {
  // for loading
  engine.displayLoadingUI();

  // SCENE
  var scene = new BABYLON.Scene(engine);

  //CAMERA
  var cameraTarget = new BABYLON.MeshBuilder.CreateBox(
    "cameraTarget",
    { width: 0.2, height: 0.2, depth: 0.2 },
    scene
  );
  cameraTarget.position = new BABYLON.Vector3(0.9, 1, 0);
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    0,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  cameraTarget.isVisible = false;
  // var camera = new BABYLON.FreeCamera(
  //   "camera1",
  //   new BABYLON.Vector3(0, 5, -10),
  //   scene
  // );
  camera.attachControl(canvas, true);
  camera.setPosition(new BABYLON.Vector3(0.9, 1.5, -4.1));
  // camera.setTarget(new BABYLON.Vector3(0.9, 1, 0));
  camera.wheelPrecision = 300;
  camera.target = cameraTarget;

  camera.lowerRadiusLimit = 2;
  // camera.upperRadiusLimit = 50;

  // camera.lowerBetaLimit = 0;
  camera.upperBetaLimit = 1.9;
  //ENVIROMENT
  scene.environmentTexture = new BABYLON.CubeTexture(
    "enviorment/env.env",
    scene
  );
  scene.environmentIntensity = 0.8;

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
  // createGround();
  var ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 1, height: 1 },
    scene
  );
  ground.scaling.x = 2.3;
  ground.scaling.z = 0.5;
  ground.position = new BABYLON.Vector3(0.9, 0, 0);
  var grassMaterial = new BABYLON.StandardMaterial("grassMaterial", scene);
  grassMaterial.diffuseTexture = new BABYLON.Texture("img/grass.jpg", scene);
  grassMaterial.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  grassMaterial.diffuseTexture.uScale = 4.6; // width / height
  grassMaterial.diffuseTexture.vScale = 1;
  ground.material = grassMaterial;
  ////////////////////////////////////////////////
  function groundChange(x, z) {
    ground.scaling.x = x;
    ground.scaling.z = z;

    // ground.position = new BABYLON.Vector3(0.9, 0, -0.9);
  }

  //SET TEXTURE FOR SHOWING SIZE
  //gound text X
  var groundTextX = BABYLON.MeshBuilder.CreateGround(
    "groundTextX",
    { width: 1, height: 0.5, subdivisions: 25 },
    scene
  );
  var groundTextX2 = BABYLON.MeshBuilder.CreateGround(
    "groundTextX",
    { width: 1, height: 0.5, subdivisions: 25 },
    scene
  );
  groundTextX2.rotation.y = Math.PI;
  //Create dynamic texture
  // var textureResolution = 512;
  var textureGroundX = new BABYLON.DynamicTexture(
    "dynamic texture",
    { width: 512, height: 256 },
    scene
  );
  var textureContextX = textureGroundX.getContext();

  var materialGroundX = new BABYLON.StandardMaterial("Mat", scene);
  materialGroundX.diffuseTexture = textureGroundX;
  materialGroundX.diffuseTexture.hasAlpha = true;
  groundTextX.material = materialGroundX;
  groundTextX2.material = materialGroundX;
  textX = 191;
  //Add text to dynamic texture
  var font = "120px Arial";
  textureGroundX.drawText(
    textX + "cm",
    null,
    null,
    font,
    "black",
    "transparent",
    true,
    true
  );

  //gound text Z
  var groundTextZ = BABYLON.MeshBuilder.CreateGround(
    "groundTextZ",
    { width: 1, height: 0.5, subdivisions: 25 },
    scene
  );
  groundTextZ.rotation.y = Math.PI / 2;
  var groundTextZ2 = BABYLON.MeshBuilder.CreateGround(
    "groundTextZ",
    { width: 1, height: 0.5, subdivisions: 25 },
    scene
  );
  groundTextZ2.rotation.y = -Math.PI / 2;
  //Create dynamic texture

  var textureGroundZ = new BABYLON.DynamicTexture(
    "dynamic texture",
    { width: 512, height: 256 },
    scene
  );
  var textureContextZ = textureGroundZ.getContext();

  var materialGroundZ = new BABYLON.StandardMaterial("Mat", scene);
  materialGroundZ.diffuseTexture = textureGroundZ;
  materialGroundZ.diffuseTexture.hasAlpha = true;
  groundTextZ.material = materialGroundZ;
  groundTextZ2.material = materialGroundZ;
  textZ = 7;
  //Add text to dynamic texture
  // var font = "120px Arial";
  textureGroundZ.drawText(
    textZ + "cm",
    null,
    null,
    font,
    "black",
    "transparent",
    true,
    true
  );

  /////////////////////////////////////////////////////////////////////////////////////////

  //FENCE COLORS
  fenceBoardsColors = ["#8c8c8c", "#474747", "#836953", "#ece6d6"];
  fencePartsColors = ["#e6e6e6", "#474747"];

  //ALL MATERIALS COLORS
  var grauMat = new BABYLON.StandardMaterial("grauMat", scene);
  grauMat.diffuseColor = BABYLON.Color3.FromHexString(fenceBoardsColors[0]);

  var anthrazitMat = new BABYLON.StandardMaterial("anthrazitMat", scene);
  anthrazitMat.diffuseColor = BABYLON.Color3.FromHexString(
    fenceBoardsColors[1]
  );

  var braunMat = new BABYLON.StandardMaterial("braunMat", scene);
  braunMat.diffuseColor = BABYLON.Color3.FromHexString(fenceBoardsColors[2]);

  var sandMat = new BABYLON.StandardMaterial("sandMat", scene);
  sandMat.diffuseColor = BABYLON.Color3.FromHexString(fenceBoardsColors[3]);

  var silberMat = new BABYLON.StandardMaterial("silberMat", scene);
  silberMat.diffuseColor = BABYLON.Color3.FromHexString(fencePartsColors[0]);

  grauMat.specularColor =
    anthrazitMat.specularColor =
    braunMat.specularColor =
    sandMat.specularColor =
      // silberMat.specularColor =
      new BABYLON.Color3(0.1, 0.1, 0.1);

  //FENCE BORDS MATERIAL
  var fenceBoardMat = new BABYLON.StandardMaterial("fenceBoardMat", scene);
  fenceBoardMat.diffuseColor = BABYLON.Color3.FromHexString(
    fenceBoardsColors[0]
  );
  fenceBoardMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

  // //FENCE POSTS MATERIAL
  var fencePostMat = new BABYLON.StandardMaterial("fencePostMat", scene);
  fencePostMat.diffuseColor = BABYLON.Color3.FromHexString(fencePartsColors[1]);

  //FENCE START AND END MATERIALS
  var fenceStartEndMat = new BABYLON.StandardMaterial(
    "fenceStartEndMat",
    scene
  );
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
  let concreteMat = new BABYLON.StandardMaterial("concreteMat", scene);
  concreteMat.diffuseTexture = new BABYLON.Texture("img/concrete.jpg", scene);
  concreteMat.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  concreteMat.backFaceCulling = false;

  //FOUNDATION MATERIAL
  var foundationMat = new BABYLON.StandardMaterial("foundationMat", scene);
  foundationMat.diffuseColor = BABYLON.Color3.FromHexString("#ffffff");
  foundationMat.alpha = 0.5;

  //SINGS MATEIALS AD TEXTURES
  //delete sign
  var signmatDel = new BABYLON.StandardMaterial("signmatDel", scene);
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
  const addNewFenceMeshMat = new BABYLON.StandardMaterial("addNewFenceMeshMat");
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
  // selectedMat.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);

  //rotate sign
  var signmatRot = new BABYLON.StandardMaterial("signmatRot", scene);
  var signTexRot = new BABYLON.Texture("img/deleteRound.png", scene);
  signTexRot.hasAlpha = true;
  signTexRot.useAlphaFromDiffuseTexture = true;
  signmatRot.backFaceCulling = false;
  signmatRot.diffuseTexture = signTexRot;

  //FENCE VARIABLES
  var leftPostCaps = [];
  var rightPostCaps = [];
  var rightPostCapClones = [];
  var fenceBoards = [];
  var smallBoardsArr = [];
  var startParts = [];
  var endParts = [];
  var laisnes = [];
  var inlaysMaterials = [];
  var inlays = [];
  var leftPosts = [];
  var rightPosts = [];
  var allPosts = [];
  var fakePosts = [];
  var intersectedPosts = [];
  var intersectedPostsMain = [];
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
  var singsDelete = [];

  //gardo
  var gardoFenceBoards = [];
  var topBoards = [];
  var metalParts = [];
  var rightMetalParts = [0];
  var smallMetalParts = [];
  var rightSmallMetalParts = [0];
  var rankelements = [];
  var allWoodPosts = [];
  var rightWoodPosts = [0];
  var woodMaterials = [];
  var woodTopParts = [];

  //FUNCTONS TO GET AND SET ABSOLUTE POSTIOIONS
  var getAbsPosX = (mesh) => {
    mesh.computeWorldMatrix(true);
    return mesh.getAbsolutePosition().x;
  };
  var getAbsPosY = (mesh) => {
    mesh.computeWorldMatrix(true);
    return mesh.getAbsolutePosition().y;
  };
  var getAbsPosZ = (mesh) => {
    mesh.computeWorldMatrix(true);
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
  //FUNCTIONS OTHER
  function setActiveFenceOnCombineFences() {
    for (let j = 0; j < rightPosts.length; j++) {
      if (rightPosts[j].material.id == "selectedMat") {
        activeFence = j;
      }
    }
  }

  //CHANCHING SIZE ON SLIDER
  //function to change position and scale of fence
  function changePosAndScaleFence(valueToCount, activeFence) {
    // if (valueToCount > 15) {
    fenceScale = valueToCount / 180;
    // } else {
    //   fenceScale = 0.08;
    // }
    fenceSize = 1.8 * fenceScale;

    firstX = getAbsPosX(rightPosts[activeFence]);
    firstZ = getAbsPosZ(rightPosts[activeFence]);

    fenceBoards[activeFence].forEach((elm) => {
      elm.scaling.x = fenceScale;
      elm.position.x = -0.9 + fenceSize / 2 - 0.01;
    });

    laisnes[activeFence].forEach((elm) => {
      elm.scaling.x = fenceScale;
      elm.position.x = -0.9 + fenceSize / 2 - 0.01;
    });

    startParts[activeFence].scaling.x =
      endParts[activeFence].scaling.x =
      inlays[activeFence][0].scaling.x =
        fenceScale;
    inlays[activeFence][2].scaling.x = fenceScale;
    startParts[activeFence].position.x = endParts[activeFence].position.x =
      -0.9 + fenceSize / 2 - 0.01;
    inlays[activeFence][0].position.x = inlays[activeFence][2].position.x =
      -0.9 + fenceSize / 2 - 0.02;

    smallBoardsArr[activeFence].scaling.x = fenceScale;
    smallBoardsArr[activeFence].position.x = -0.9 + fenceSize / 2 - 0.01;
    rightPosts[activeFence].position.x = -0.9 + fenceSize;
    rightPostCaps[activeFence].position.x = rightPosts[activeFence].position.x;

    foundationsRight[activeFence].setAbsolutePosition(
      new BABYLON.Vector3(
        getAbsPosX(rightPosts[activeFence]),
        foundationsRight[activeFence].position.y,
        getAbsPosZ(rightPosts[activeFence])
      )
    );
    //GARDO FENCE
    if (
      fencesArr[activeFence].type == "gardoFence" ||
      fencesArr[activeFence].type == "gardoHalf" ||
      fencesArr[activeFence].type == "gardoRank"
    ) {
      fencesArr[activeFence].gardoParts.woodTopPart.scaling.x =
        fenceScale * 0.84;
      fencesArr[activeFence].gardoParts.woodTopPart.position.x =
        -0.9 + fenceSize / 2 - 0.01;

      fencesArr[activeFence].gardoParts.boards.forEach((elm) => {
        elm.scaling.x = fenceScale;
        elm.position.x = -0.9 + fenceSize / 2 - 0.01;
      });

      fencesArr[activeFence].gardoParts.woodPost.position.x =
        rightPosts[activeFence].position.x;

      fencesArr[activeFence].gardoParts.smallMetalParts.forEach((elm) => {
        elm.position.x = rightPosts[activeFence].position.x;
      });

      fencesArr[activeFence].gardoParts.metalParts.forEach((elm) => {
        elm.setAbsolutePosition(
          new BABYLON.Vector3(
            getAbsPosX(rightPosts[activeFence]),
            getAbsPosY(elm),
            getAbsPosZ(rightPosts[activeFence])
          )
        );
      });

      fencesArr[activeFence].gardoParts.topBoard.scaling.x = fenceScale;
      fencesArr[activeFence].gardoParts.topBoard.position.x =
        -0.9 + fenceSize / 2 - 0.01;
    }

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

  function scaleToOtherFencesToDo(i) {
    foundationsRight[i].position.x =
      foundationsRight[i].position.x - (firstX - secondX);
    foundationsRight[i].position.z =
      foundationsRight[i].position.z - (firstZ - secondZ);

    wholeFences[i].position.x = wholeFences[i].position.x - (firstX - secondX);
    wholeFences[i].position.z = wholeFences[i].position.z - (firstZ - secondZ);

    //gardo fence
    if (
      fencesArr[i].type == "gardoFence" ||
      fencesArr[i].type == "gardoHalf" ||
      fencesArr[i].type == "gardoRank"
    ) {
      fencesArr[i].fenceGardo.position.x =
        fencesArr[i].fenceGardo.position.x - (firstX - secondX);
      fencesArr[i].fenceGardo.position.z =
        fencesArr[i].fenceGardo.position.z - (firstZ - secondZ);
    }

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

  function positionChildrenOnParentSizeChange(activeFence) {
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

  //MAIN POST MESH //////////////////////////////////////////////////////////////////////////
  BABYLON.SceneLoader.ImportMeshAsync("", "mesh/", "mainPost.glb").then(
    (result) => {
      var mainPost = result.meshes[0];
      mainPost.rotationQuaternion = null;
      mainPost.scaling = new BABYLON.Vector3(1.01, 1, 1.01);
      mainPost.addRotation(0, Math.PI, 0);

      //SET POSITION
      scene.getNodeByName("post-root-left").position.x =
        scene.getNodeByName("sturmanker-left-front").position.x =
        scene.getNodeByName("sturmanker-left-rear").position.x =
          0;
      for (let i = 0; i < result.meshes.length; i++) {
        result.meshes[i].position.x = 0;
      }
      //POST CAP
      let leftPostCap = scene.getMeshByName("post-cap-left");
      leftPostCap.material = capMat;
      leftPostCaps.push(leftPostCap);

      //POSTS
      let leftPost = scene.getMeshByName("post-left");
      leftPost.addRotation(0, Math.PI, 0);
      leftPosts.push(leftPost);
      allPosts.push(leftPost);
      leftPost.material = fencePostMat;

      //cerate fake rigth post
      let fakePost = new BABYLON.MeshBuilder.CreateBox(
        "fakePost",
        { width: 0.05, height: 2.1, depth: 0.05 },
        scene
      );
      fakePost.parent = leftPost;
      fakePosts.push(fakePost);
      fakePost.isVisible = false;

      createMainPostSigns();
      //add selected to mesh
      leftPost.actionManager = new BABYLON.ActionManager(scene);
      leftPost.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            if (
              leftPost.material.id != "selectedMat" &&
              leftPost.scaling.x == 1
            ) {
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
              activeFence = false;
              leftPost.material = selectedMat;
              addFenceSings[0].isVisible = true;
              addFenceSings[1].isVisible = true;
              intersectArrowSignsFence(
                fakeFences,
                newFenceForwardSigns,
                newFenceRightSigns,
                newFenceLeftSigns,
                newFenceBackSigns,
                activeFence,
                addFenceSings
              );
              singsDelete.forEach((elm) => {
                elm.isVisible = false;
              });
            } else {
              leftPost.material = fencePostMat;
              addFenceSings[0].isVisible = false;
              addFenceSings[1].isVisible = false;
            }
          }
        )
      );

      // onHover(leftPost, "Edit Post");

      //post roots
      let leftRoot0 = scene.getMeshByName("post-root-left_primitive0");
      let leftRoot1 = scene.getMeshByName("post-root-left_primitive1");
      roots.push(leftRoot0, leftRoot1);

      //create foundation start
      let foundationLeftStart = new BABYLON.MeshBuilder.CreateGround(
        "foundationLeftStart",
        { width: 0.4, height: 0.4 },
        scene
      );
      foundationLeftStart.position = new BABYLON.Vector3(
        leftPost.position.x,
        0.0001,
        0
      );
      foundationLeftStart.material = concreteMat;
      foundationStarts.push(foundationLeftStart);

      //create foundation
      let foundationLeft = new BABYLON.MeshBuilder.CreateBox(
        "foundationLeft",
        { width: 0.4, height: 0.5, depth: 0.4 },
        scene
      );
      foundationLeft.position.x = foundationLeftStart.position.x;
      foundationLeft.position.y = -0.5 / 2;
      foundationLeft.material = foundationMat;

      foundations.push(foundationLeft);

      //PLANE TO HOLD DELETE SIGN
      var signPlaneDelLeft = BABYLON.MeshBuilder.CreatePlane(
        "signPlaneDelLeft",
        {
          height: 0.4,
          width: 0.4,
        }
      );
      signPlaneDelLeft.position = new BABYLON.Vector3(
        leftPost.position.x,
        2.2,
        0
      );
      signPlaneDelLeft.isVisible = false;
      signPlaneDelLeft.material = signmatDel;
      singsDel.push(signPlaneDelLeft);

      //PLANE TO HOLD WARNING SIGN
      var signPlaneWarLeft = BABYLON.MeshBuilder.CreatePlane(
        "signPlaneWarLeft",
        {
          height: 0.4,
          width: 0.4,
        }
      );
      signPlaneWarLeft.position = new BABYLON.Vector3(
        leftPost.position.x,
        2.2,
        0
      );
      signPlaneWarLeft.isVisible = false;
      signPlaneWarLeft.material = signmatWar;
      singsWar.push(signPlaneWarLeft);

      //LEDS
      let leftLed = scene.getMeshByName("led-left");

      leds.push(leftLed);

      leftLed.material = ledMat;

      leftLed.isVisible = false;
      //STRUMANKER
      //VORD ***************
      let leftStrVord = scene.getMeshByName("sturmanker-left-front_primitive0");
      leftStrVord.isVisible = false;

      let leftStrVordSraf = scene.getMeshByName(
        "sturmanker-left-front_primitive1"
      );
      leftStrVordSraf.isVisible = false;

      sturmankersVorderseite.push(leftStrVord);
      sturVorderseiteSrafs.push(leftStrVordSraf);

      //create foundation start for front stunmankwer
      let foundationVordStart = new BABYLON.MeshBuilder.CreateGround(
        "foundationVordStart",
        { width: 0.4, height: 0.7 },
        scene
      );

      foundationVordStart.position = new BABYLON.Vector3(0, -0.01, 0.13);
      foundationVordStart.material = concreteMat;
      foundationVordStart.parent = leftRoot0;
      foundationStartsVord.push(foundationVordStart);
      foundationVordStart.isVisible = false;

      //create foundation for front stunmankwer
      let foundationVord = new BABYLON.MeshBuilder.CreateBox(
        "foundationVord",
        { width: 0.4, height: 0.5, depth: 0.7 },
        scene
      );
      foundationVord.material = foundationMat;
      foundationVord.position = new BABYLON.Vector3(0, -0.262, 0.13);
      foundationVord.parent = leftRoot0;
      foundationsVord.push(foundationVord);
      foundationVord.isVisible = false;

      // RUCK **********
      let leftStrRuck = scene.getMeshByName("sturmanker-left-rear_primitive0");
      leftStrRuck.isVisible = false;

      let leftStrRuckSraf = scene.getMeshByName(
        "sturmanker-left-rear_primitive1"
      );
      leftStrRuckSraf.isVisible = false;

      sturmankersRuckseite.push(leftStrRuck);
      sturRuckseiteSrafs.push(leftStrRuckSraf);

      //create foundation start for back stunmankwer
      let foundationRuckStart = new BABYLON.MeshBuilder.CreateGround(
        "foundationRuckStart",
        { width: 0.4, height: 0.7 },
        scene
      );
      foundationRuckStart.position = new BABYLON.Vector3(0, -0.01, -0.13);
      foundationRuckStart.material = concreteMat;
      foundationRuckStart.parent = leftRoot0;
      foundationStartsRuck.push(foundationRuckStart);
      foundationRuckStart.isVisible = false;

      //create foundation for back stunmankwer
      let foundationRuck = new BABYLON.MeshBuilder.CreateBox(
        "foundationRuck",
        { width: 0.4, height: 0.5, depth: 0.7 },
        scene
      );
      foundationRuck.material = foundationMat;
      foundationRuck.position = new BABYLON.Vector3(0, -0.262, -0.13);
      foundationRuck.parent = leftRoot0;
      foundationsRuck.push(foundationRuck);
      foundationRuck.isVisible = false;

      //set material
      leftStrVord.material = leftStrRuck.material = fencePostMat;
      //set sraf material
      leftStrVordSraf.material = leftStrRuckSraf.material = rootMat;

      //cerate fake strumanker
      let fakeFront = new BABYLON.MeshBuilder.CreateBox(
        "foundationRight",
        { width: 0.01, height: 0.3, depth: 0.3 },
        scene
      );
      fakeFront.parent = leftStrVord;
      fakeFronts.push(fakeFront);
      fakeFront.isVisible = false;

      let fakeBack = new BABYLON.MeshBuilder.CreateBox(
        "foundationRight",
        { width: 0.01, height: 0.3, depth: 0.3 },
        scene
      );
      fakeBack.parent = leftStrRuck;
      fakeBacks.push(fakeBack);
      fakeBack.isVisible = false;
    }

    //END OF MAIN POST////////////////////////////////////////////////////////////////////////////////////////////////////////
  );

  function NewFence(
    id,
    type,
    boardCol,
    startUndAbschCol,
    smBoaCol,
    size,
    inlays,
    children,
    laisnes,
    laisnesCol,
    numOfBoards
  ) {
    this.id = id;
    this.type = type;
    this.boardCol = boardCol;
    this.startUndAbschCol = startUndAbschCol;
    this.smBoaCol = smBoaCol;
    this.size = size;
    this.inlays = inlays;
    this.children = children;
    this.laisnes = laisnes;
    this.laisnesCol = laisnesCol;
    this.numOfBoards = numOfBoards;
  }
  //array for coordinates
  let fencesCoordinates = [];

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //LOAD FENCE MESH
  var fenceIdCount = -1;
  var activeFence = false;
  var createRightFence = (posX, posZ, rotY, type, smCol, inlaysOnOff) =>
    BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "mesh/",
      "easyFenceRightPartComb2.glb"
    ).then((result) => {
      var fence = result.meshes[0];
      fence.rotationQuaternion = null;

      fence.position.x = posX;
      fence.position.z = posZ;
      fence.rotation.y = rotY;
      wholeFences.push(fence);

      //function to active fence
      function toActiveFence() {
        //set this active fence
        for (let j = 0; j < rightPosts.length; j++) {
          if (rightPosts[j].material.id == "selectedMat") {
            activeFence = j;
          }
        }
        singsDelete.forEach((elm) => {
          elm.isVisible = false;
        });
        if (activeFence > 0) singsDelete[activeFence].isVisible = true;
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

        //deactivate arrows
        activeArrow = false;
        activeArrowSide = false;
        addFenceSings.forEach((elm) => {
          elm.material = addNewFenceMeshMat;
        });
        cameraTargetMesh(cameraTarget, wholeFences[activeFence]);
        console.log(fencesArr[activeFence]);
      }

      //add selected to mesh
      for (let i = 0; i < result.meshes.length; i++) {
        result.meshes[i].actionManager = new BABYLON.ActionManager(scene);
        result.meshes[i].actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function () {
              if (result.meshes[i].material.id != "selectedMat") {
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
                singsDelete[activeFence].isVisible = false;
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
      //POST CAP
      let rightPostCap = result.meshes[8];
      rightPostCap.material = capMat;
      rightPostCaps.push(rightPostCap);

      let rightPostCapClone = rightPostCap.clone("rightPostCapClone");
      rightPostCapClone.position.y = 0.052;
      rightPostCapClone.isVisible = false;
      rightPostCapClones.push(rightPostCapClone);
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
      let boardColObj;
      newBoarsdArr.forEach((elm) => {
        elm.position.x -= 0.01;
        elm.material = fenceBoardMat;
        if (allBoardsCol == 0) {
          elm.material = grauMat;
          boardColObj = "grau";
        }
        if (allBoardsCol == 1) {
          elm.material = anthrazitMat;
          boardColObj = "anthrazit";
        }
        if (allBoardsCol == 2) {
          elm.material = braunMat;
          boardColObj = "braun";
        }
        if (allBoardsCol == 3) {
          elm.material = sandMat;
          boardColObj = "sand";
        }
      });

      fenceBoards.push(newBoarsdArr);

      //BOARDS SMALL
      let smallBoards = result.meshes[1];
      smallBoards.position.x -= 0.01;
      smallBoards.isVisible = false;
      smallBoards.material = silberMat;
      smallBoardsArr.push(smallBoards);

      //fake fence for intersection
      let fakeFence = new BABYLON.MeshBuilder.CreateBox(
        "fakeFence",
        { width: 1.7, height: 1.8, depth: 0.05 },
        scene
      );
      fakeFence.position = new BABYLON.Vector3(
        getAbsPosX(smallBoards) - 0.01,
        0.9,
        getAbsPosZ(smallBoards)
      );
      fakeFence.addRotation(0, rotY, 0);
      fakeFences.push(fakeFence);

      fakeFence.isVisible = false;
      smallBoards.addChild(fakeFence);

      //START AND END PARTS
      let startPart = result.meshes[7];
      startPart.position.x -= 0.01;
      startParts.push(startPart);
      let endPart = result.meshes[6];
      endPart.position.x -= 0.01;
      endParts.push(endPart);
      // startPart.material = endPart.material = fenceStartEndMat;
      if (startUndAbschMat == 0) {
        startPart.material = endPart.material = silberMat;
        startUndAbschColObj = "silber";
      }
      if (startUndAbschMat == 1) {
        startPart.material = endPart.material = anthrazitMat;
        startUndAbschColObj = "anthrazit";
      }

      //INLAYS
      // fenceBoards[6].isVisible = false;
      let inlaysViero = result.meshes[24];
      inlaysViero.position.x -= 0.02;
      inlaysViero.isVisible = false;

      inlaysMaterials.push(inlaysViero.material);

      let inlaysAstro = result.meshes[23];
      inlaysAstro.position.x -= 0.02;
      inlaysAstro.isVisible = false;

      let inlaysSnow = result.meshes[22];
      inlaysSnow.position.x -= 0.02;
      inlaysSnow.isVisible = false;
      inlaysSnow.material = inlaysMat;

      var newInlaysArr = new Array(inlaysViero, inlaysAstro, inlaysSnow);
      inlays.push(newInlaysArr);

      if (inlaysOnOff > 1) {
        newBoarsdArr[6].isVisible = false;
        inlaysViero.isVisible = true;
        inlaysSnow.isVisible = true;
      }

      //LAISNE
      let laisneOrg = result.meshes[16];
      laisneOrg.position.x -= 0.01;
      laisneOrg.isVisible = false;
      laisneOrg.material = laisneMat;
      if (laisnesMat == 1) {
        laisneOrg.material = anthrazitMat;
        laisnesColObj = "anthrazit";
      }
      if (laisnesMat == 0) {
        laisneOrg.material = silberMat;
        laisnesColObj = "silber";
      }
      var newLaisnesArr = new Array();

      laisnes.push(newLaisnesArr);

      var editPost = document.getElementById("editPost");
      //POSTS
      let rightPost = result.meshes[3];

      rightPosts.push(rightPost);
      allPosts.push(rightPost);

      //cerate fake rigth post
      let fakePost = new BABYLON.MeshBuilder.CreateBox(
        "fakePost",
        { width: 0.05, height: 0.05, depth: 2.1 },
        scene
      );
      fakePost.parent = rightPost;
      fakePosts.push(fakePost);
      fakePost.isVisible = false;

      checkPostIntersecting(
        fakePosts,
        allPosts,
        rightRoots,
        intersectedPosts,
        intersectedPostsMain,
        fencesArr
      );

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
        getAbsPosX(result.meshes[3]),
        0.0001,
        getAbsPosZ(result.meshes[3])
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
        getAbsPosX(result.meshes[3]),
        -0.5 / 2,
        getAbsPosZ(result.meshes[3])
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
                  setActivnesStyle(ledParts, 6, 0, "active-text-color");
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
                  setActivnesStyle(sturmankerCon, 10, 1, "active-text-color");
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
                  setActivnesStyle(sturmankerCon, 10, 1, "active-text-color");
                  strurmOn = false;
                }
                if (ledsOn < 1 && !warSingsOn) {
                  setActivnesStyle(ledParts, 6, 0, "active-text-color");
                }
              };
            }
          )
        );
      }

      //PLANE TO HOLD DELETE SIGN
      var signDelete = BABYLON.MeshBuilder.CreatePlane("signDelete", {
        height: 0.4,
        width: 0.4,
      });
      signDelete.position = new BABYLON.Vector3(
        getAbsPosX(result.meshes[2]),
        2.1,
        getAbsPosZ(result.meshes[2])
      );
      signDelete.addRotation(0, rotY, 0);
      signDelete.material = signmatRot;
      signDelete.isVisible = false;
      result.meshes[2].addChild(signDelete);
      singsDelete.push(signDelete);

      signDelete.actionManager = new BABYLON.ActionManager(scene);
      signDelete.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            console.log("delete this");
            //delete fence
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
            }
          }
        )
      );

      //LEDS
      let rightLed = result.meshes[21];
      leds.push(rightLed);
      ledsRight.push(rightLed);

      rightLed.material = ledMat;

      rightLed.isVisible = false;

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
      foundationVordStart.rotation.x = -Math.PI / 2;
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

      //INTERSECTION FUNCTION
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

      rightPostCap.addChild(rightPostCapClone);
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
        smallBoards.material = silberMat;
        newBoarsdArr.forEach((elm) => {
          elm.isVisible = false;
        });
        startPart.isVisible = endPart.isVisible = false;
      }
      if (type == "easyRomSmall" && smCol == "silber") {
        smallBoards.isVisible = true;
        smallBoards.material = silberMat;
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
        smallBoards.material = anthrazitMat;
        newBoarsdArr.forEach((elm) => {
          elm.isVisible = false;
        });
        startPart.isVisible = endPart.isVisible = false;
      }
      if (type == "easyRomSmall" && smCol == "anthrazit") {
        smallBoards.isVisible = true;
        smallBoards.material = anthrazitMat;
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

      boardCol = boardColObj;

      startUndAbschCol = startUndAbschColObj;

      smallBoardsDefaultCol = smCol;
      if (type == "easyRomSmall") {
        fenceSizeObj = 60;
      } else {
        fenceSizeObj = 180;
      }

      fenceInlays = inlaysOnOff;

      childrenThis = [];

      laisnesThis = [];

      laisnesCol = laisnesColObj;

      // for (let i = 0; i < checkboxActive.length; i++) {
      //   laisnesThis.push(checkboxActive[i]);
      // }
      numOfBoards = 8;
      fencesArr.push(
        new NewFence(
          fenceId,
          fenceType,
          boardCol,
          startUndAbschCol,
          smallBoardsDefaultCol,
          fenceSizeObj,
          fenceInlays,
          childrenThis,
          0,
          laisnesCol,
          numOfBoards
        )
      );

      fencesArr[fenceId].status = "activeFence";

      if (fenceId > 0 && typeof activeFence != "boolean") {
        fencesArr[activeFence].children.push(fenceId);
        fencesArr[fenceId].parent = fencesArr[activeFence].id;

        //set parent right post
        if (
          rightPosts[fencesArr[fenceId].parent].isVisible &&
          type != "easyFenceHalf"
        ) {
          ledsRight[fencesArr[fenceId].parent].scaling.z = 1;
          ledsRight[fencesArr[fenceId].parent].position.z = 0;
          ledsRight[fencesArr[fenceId].parent].position.y = 0.001;
          if (rightPosts[fencesArr[fenceId].parent].scaling.z < 0.55) {
            rightPosts[fencesArr[fenceId].parent].scaling.z = 1;
            rightPosts[fencesArr[fenceId].parent].position.y = 0.962;
          }
          if (
            rightPosts[fencesArr[fenceId].parent].scaling.z > 0.7 &&
            rightPosts[fencesArr[fenceId].parent].scaling.z < 0.8
          ) {
            rightPosts[fencesArr[fenceId].parent].scaling.z = 1.2;
            rightPosts[fencesArr[fenceId].parent].position.y = 0.7717;
          }
          if (
            rightPosts[fencesArr[fenceId].parent].scaling.z > 0.9 &&
            rightPosts[fencesArr[fenceId].parent].scaling.z < 1
          ) {
            rightPosts[fencesArr[fenceId].parent].scaling.z = 1.475;
            rightPosts[fencesArr[fenceId].parent].position.y = 0.511;
          }
          rightPostCaps[fencesArr[fenceId].parent].isVisible = true;
          rightPostCapClones[fencesArr[fenceId].parent].isVisible = false;
        }
      }
      //for main post
      if (fenceId > 0 && typeof activeFence == "boolean") {
        if (type != "easyFenceHalf") {
          if (leftPosts[0].scaling.y < 0.6) {
            leftPosts[0].scaling.y = 1;
            leftPosts[0].position.y = 0.962;
          }
          if (leftPosts[0].scaling.y > 0.6 && leftPosts[0].scaling.y < 0.9) {
            leftPosts[0].scaling.y = 1.2;
            leftPosts[0].position.y = 0.7717;
          }
          if (leftPosts[0].scaling.y > 0.9 && leftPosts[0].scaling.y < 1) {
            leftPosts[0].scaling.y = 1.475;
            leftPosts[0].position.y = 0.511;
          }
          leftPostCaps[0].position.y = 0.962;
          leds[0].scaling.y = 1;
          leds[0].position.y = 0.962;
          leds[0].position.z = 0.001;
        }
      }
      //set Ground
      setGround();
      // set coordinates for big 3d configurator
      console.log(fence.position.x, fence.position.z, fence.rotation.y);
      fencesCoordinates.push([
        fence.position.x,
        fence.position.z,
        fence.rotation.y,
      ]);
      console.log(fencesCoordinates);
      //for loading
      setTimeout(() => {
        engine.hideLoadingUI();
      }, 3000);
      //END OF MESH
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    });
  //SET GROUND
  var groundSizeX = 0;
  var groundSizeZ = 0;
  let fenceSizeSmallCartDisplay = document.getElementById("fence-size-display");
  function setGround() {
    arrX = [];
    arrZ = [];

    for (let i = 0; i < allPosts.length; i++) {
      if (allPosts[i].isVisible) {
        arrX.push(Math.round(getAbsPosX(allPosts[i]) * 100) / 100);

        arrZ.push(Math.round(getAbsPosZ(allPosts[i]) * 100) / 100);
      }
    }
    arrX.sort(function (a, b) {
      return a - b;
    });
    arrZ.sort(function (a, b) {
      return a - b;
    });

    arrXFirst = Math.abs(arrX[0]);
    arrXSecond = arrX[arrX.length - 1];
    arrZFirst = Math.abs(arrZ[0]);
    arrZSecond = arrZ[arrZ.length - 1];
    groundSizeX = arrXFirst + arrXSecond + 1.1;
    groundSizeZ = arrZFirst + arrZSecond + 1.1;

    groundChange(groundSizeX, groundSizeZ);

    ground.position = new BABYLON.Vector3(
      (arrX[0] + arrX[arrX.length - 1]) / 2,
      0,
      (arrZ[0] + arrZ[arrZ.length - 1]) / 2
    );
    //aniamtion to change camera target position
    var animationCameraTarget = new BABYLON.Animation(
      "myAnimationcamera",
      "position",
      60,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    const keyFrames = [];

    keyFrames.push({
      frame: 0,
      value: cameraTarget.position.clone(),
    });
    //change camera target position
    cameraTarget.position.x = ground.position.x;
    cameraTarget.position.z = ground.position.z;

    keyFrames.push({
      frame: 120,
      value: cameraTarget.position.clone(),
    });

    animationCameraTarget.setKeys(keyFrames);
    const easingFun2 = new BABYLON.CubicEase();
    easingFun2.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
    animationCameraTarget.setEasingFunction(easingFun2);
    cameraTarget.animations.push(animationCameraTarget);
    //call animation
    scene.beginAnimation(cameraTarget, 0, 120, false);

    //set camera radius
    var cameraRadius;
    if (ground.scaling.x > ground.scaling.z) {
      if (ground.scaling.x < 2.7) {
        cameraRadius = 4;
      } else {
        cameraRadius = ground.scaling.x * 1.5;
      }
    } else {
      cameraRadius = ground.scaling.z * 1.5;
    }

    //radius  animation
    let radiusAnimation = new BABYLON.Animation(
      "radiusAnimation",
      "radius",
      60,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    let radiusKeyFrames = [];
    radiusKeyFrames.push({
      frame: 0,
      value: camera.radius,
    });
    radiusKeyFrames.push({
      frame: 120,
      value: cameraRadius,
    });
    radiusAnimation.setKeys(radiusKeyFrames);
    const easingFun = new BABYLON.CubicEase();
    easingFun.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
    radiusAnimation.setEasingFunction(easingFun);
    camera.animations.push(radiusAnimation);
    //call radius animation
    scene.beginAnimation(camera, 0, 120, false);

    displayGroundSizeX = Math.round((arrXFirst + arrXSecond) * 100) + 7;
    displayGroundSizeZ = Math.round((arrZFirst + arrZSecond) * 100) + 7;

    //set ground text position and value
    //x
    groundTextX.position.x = groundTextX2.position.x = ground.position.x;
    groundTextX.position.z = ground.position.z + -ground.scaling.z / 2 - 0.2;
    groundTextX2.position.z = ground.position.z + ground.scaling.z / 2 + 0.2;
    textX = displayGroundSizeX + "cm";
    textureContextX.clearRect(0, 0, 512, 256);
    textureContextX.textAlign = "center";
    textureContextX.fillText(textX, 256, 140);
    textureGroundX.update();
    //z
    groundTextZ.position.x = ground.position.x + -ground.scaling.x / 2 - 0.2;
    groundTextZ2.position.x = ground.position.x + ground.scaling.x / 2 + 0.2;
    groundTextZ.position.z = groundTextZ2.position.z = ground.position.z;
    textZ = displayGroundSizeZ + "cm";
    textureContextZ.clearRect(0, 0, 512, 256);
    textureContextZ.textAlign = "center";
    textureContextZ.fillText(textZ, 256, 140);
    textureGroundZ.update();

    //set display fence size

    fenceSizeSmallCartDisplay.innerHTML =
      displayGroundSizeX / 100 + " m / " + displayGroundSizeZ / 100 + " m";
  }

  //CREATE DEFAULT FENCE
  function handleTabActivnes() {
    if (!document.hidden) {
      createRightFence(0.94, 0, 0, "easyFence", "silber", 0);
      clearInterval(refreshIntervalId);
    }
  }
  if (document.hidden) {
    var refreshIntervalId = setInterval(handleTabActivnes, 100);
  } else {
    createRightFence(0.94, 0, 0, "easyFence", "silber", 0);
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
        tessellation: 50,
      }
    );
    addNewFenceMesh.material = addNewFenceMeshMat;
    addNewFenceMesh.position = new BABYLON.Vector3(
      getAbsPosX(rightPosts[rightPosts.length - 1]) + 0.3,
      1,
      getAbsPosZ(rightPosts[rightPosts.length - 1])
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
            singsDelete.forEach((elm) => {
              elm.isVisible = false;
            });
            createNewFence(
              createRightFence,
              activeArrowSide,
              rightPosts,
              leftPosts,
              activeArrow,
              fencePostMat,
              addFenceSings,
              addNewFenceMeshMat,
              unselect,
              "easyFence",
              "silber",
              0,
              getAbsPosX,
              getAbsPosZ,
              setDisplayOfConfOnAddFence
            );
          }
        )
      );
    }

    //RIGHT SIGHN
    var addNewFenceMeshRight = addNewFenceMesh.clone("addNewFenceMeshRight");
    addNewFenceMeshRight.position = new BABYLON.Vector3(
      getAbsPosX(rightPosts[rightPosts.length - 1]),
      1,
      getAbsPosZ(rightPosts[rightPosts.length - 1]) - 0.3
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
            singsDelete.forEach((elm) => {
              elm.isVisible = false;
            });
            createNewFence(
              createRightFence,
              activeArrowSide,
              rightPosts,
              leftPosts,
              activeArrow,
              fencePostMat,
              addFenceSings,
              addNewFenceMeshMat,
              unselect,
              "easyFence",
              "silber",
              0,
              getAbsPosX,
              getAbsPosZ,
              setDisplayOfConfOnAddFence
            );
          }
        )
      );
    }

    //LEFT SIGHN
    var addNewFenceMeshLeft = addNewFenceMesh.clone("addNewFenceMeshLeft");
    addNewFenceMeshLeft.position = new BABYLON.Vector3(
      getAbsPosX(rightPosts[rightPosts.length - 1]),
      1,
      getAbsPosZ(rightPosts[rightPosts.length - 1]) + 0.3
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
            singsDelete.forEach((elm) => {
              elm.isVisible = false;
            });
            createNewFence(
              createRightFence,
              activeArrowSide,
              rightPosts,
              leftPosts,
              activeArrow,
              fencePostMat,
              addFenceSings,
              addNewFenceMeshMat,
              unselect,
              "easyFence",
              "silber",
              0,
              getAbsPosX,
              getAbsPosZ,
              setDisplayOfConfOnAddFence
            );
          }
        )
      );
    }

    //BACK SIGHN
    var addNewFenceMeshBack = addNewFenceMesh.clone("addNewFenceMeshBack");
    addNewFenceMeshBack.position = new BABYLON.Vector3(
      getAbsPosX(rightPosts[rightPosts.length - 1]) - 0.3,
      1,
      getAbsPosZ(rightPosts[rightPosts.length - 1])
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
            singsDelete.forEach((elm) => {
              elm.isVisible = false;
            });
            createNewFence(
              createRightFence,
              activeArrowSide,
              rightPosts,
              leftPosts,
              activeArrow,
              fencePostMat,
              addFenceSings,
              addNewFenceMeshMat,
              unselect,
              "easyFence",
              "silber",
              0,
              getAbsPosX,
              getAbsPosZ,
              setDisplayOfConfOnAddFence
            );
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
        tessellation: 50,
      }
    );
    addNewFenceMeshRightMain.material = addNewFenceMeshMat;
    addNewFenceMeshRightMain.position = new BABYLON.Vector3(
      getAbsPosX(leftPosts[0]),
      1,
      getAbsPosZ(leftPosts[0]) - 0.3
    );
    addNewFenceMeshRightMain.addRotation(Math.PI / 2, 0, -Math.PI / 2);
    addNewFenceMeshRightMain.actionManager = new BABYLON.ActionManager(scene);
    addNewFenceMeshRightMain.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function () {
          activeArrow = false;
          activeArrowSide = 5;
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
          addNewFenceMeshRightMain.isVisible = true;
          addNewFenceMeshLeftMain.isVisible = true;
          leftPosts[0].material = selectedMat;
          singsDelete.forEach((elm) => {
            elm.isVisible = false;
          });
          createNewFence(
            createRightFence,
            activeArrowSide,
            rightPosts,
            leftPosts,
            activeArrow,
            fencePostMat,
            addFenceSings,
            addNewFenceMeshMat,
            unselect,
            "easyFence",
            "silber",
            0,
            getAbsPosX,
            getAbsPosZ,
            setDisplayOfConfOnAddFence
          );
        }
      )
    );

    //LEFT SIGHN MAIN POST
    const addNewFenceMeshLeftMain = BABYLON.MeshBuilder.CreateCylinder(
      "addNewFenceMeshLeftMain",
      {
        height: 0.01,
        diameter: 0.3,
        tessellation: 50,
      }
    );
    addNewFenceMeshLeftMain.material = addNewFenceMeshMat;
    addNewFenceMeshLeftMain.position = new BABYLON.Vector3(
      getAbsPosX(leftPosts[0]),
      1,
      getAbsPosZ(leftPosts[0]) + 0.3
    );
    addNewFenceMeshLeftMain.addRotation(Math.PI / 2, 0, Math.PI / 2);
    addNewFenceMeshLeftMain.actionManager = new BABYLON.ActionManager(scene);
    addNewFenceMeshLeftMain.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function () {
          activeArrow = false;
          activeArrowSide = 6;

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
          addNewFenceMeshRightMain.isVisible = true;
          addNewFenceMeshLeftMain.isVisible = true;

          leftPosts[0].material = selectedMat;
          singsDelete.forEach((elm) => {
            elm.isVisible = false;
          });
          createNewFence(
            createRightFence,
            activeArrowSide,
            rightPosts,
            leftPosts,
            activeArrow,
            fencePostMat,
            addFenceSings,
            addNewFenceMeshMat,
            unselect,
            "easyFence",
            "silber",
            0,
            getAbsPosX,
            getAbsPosZ,
            setDisplayOfConfOnAddFence
          );
        }
      )
    );

    addFenceSings.push(addNewFenceMeshRightMain, addNewFenceMeshLeftMain);
  }

  let allBoardsCol = 0;

  let startUndAbschMat = 1;

  let laisnesMat = 0;

  //SET MATERIALS TO RECIVE MORE THEN 4 LIGHTS
  scene.materials.forEach(function (mtl) {
    mtl.maxSimultaneousLights = 100;
  });

  // // ACCESORIES SECTION FUNCTIONS*****************************************************************************************
  function unselect(activnesToFalse) {
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
    addFenceSings;
    if (activnesToFalse) {
      setTimeout(() => {
        activeFence = false;
      }, 100);
    }
  }
  //DELETE FENCE
  function deleteFence(a) {
    wholeFences[a].dispose();
    foundationsRight[a].dispose();
    fakeFences[a].name = "disposedFakeFence";
    fencesArr[a].status = "disposedFence";
    newFenceForwardSigns[a].dispose();
    newFenceRightSigns[a].dispose();
    newFenceLeftSigns[a].dispose();
    newFenceBackSigns[a].dispose();
    allPosts[a + 1].isVisible = false;
    fencesArr[a].children.forEach((elm) => {
      fencesArr[elm].parent = fencesArr[a].parent;

      fencesArr[fencesArr[a].parent].children.push(elm);
    });
    if (fencesArr[fencesArr[a].parent] != undefined) {
      fencesArr[fencesArr[a].parent].children.splice(
        fencesArr[fencesArr[a].parent].children.indexOf(a),
        1
      );
    }
    singsDelete[a].dispose();
    setGround();
    //visibility because of cart counting
    rightPosts[a].isVisible = false;
    fenceBoards[a].forEach((elm) => {
      elm.isVisible = false;
    });
    roots[a * 2 + 2].isVisible = roots[a * 2 + 3].isVisible = false;
    startParts[a].isVisible = endParts[a].isVisible = false;
    //for main post
    let mainPostChildType = 0;
    for (let i = 0; i < fencesArr.length; i++) {
      if (
        fencesArr[i].status == "activeFence" &&
        fencesArr[i].parent == undefined &&
        fencesArr[i].type != "easyFenceHalf" &&
        fencesArr[i].type != "gardoHalf"
      ) {
        mainPostChildType += 1;
      }
    }
    if (mainPostChildType == 0) {
      if (allPosts[0].scaling.y < 1.1) {
        allPosts[0].scaling.y = 0.524;
        allPosts[0].position.y = 0.504;
      }
      if (allPosts[0].scaling.y > 1 && allPosts[0].scaling.y < 1.4) {
        allPosts[0].scaling.y = 0.724;
        allPosts[0].position.y = 0.3119;
      }
      if (allPosts[0].scaling.y > 1.4) {
        allPosts[0].scaling.y = 0.999;
        allPosts[0].position.y = 0.053;
      }
      leftPostCaps[0].position.y = 0.052;
      leds[0].scaling.y = 0.524;
      leds[0].position.y = 0.5;
      leds[0].position.z = 0.001;
    }
    //
    fencesArr[a].parent = undefined;
    setDisplayOfConfOnSubFence();
  }
  function recursiveToChildrenDelete(b) {
    if (fencesArr[b].children.length > 0) {
      fencesArr[b].children.forEach((elm) => {
        scaleToOtherFencesToDo(elm);
        recursiveToChildrenDelete(elm);
      });
    }
  }

  function recursiveToChildrenDelete2(c) {
    while (fencesArr[c].children.length > 0) {
      deleteFence(fencesArr[c].children[0]);
    }
  }

  function delFenFun(a) {
    if (fencesArr[a].children.length > 0) {
      firstX = getAbsPosX(rightPosts[a]);
      firstZ = getAbsPosZ(rightPosts[a]);
      if (fencesArr[a].parent != undefined) {
        secondX = getAbsPosX(rightPosts[fencesArr[a].parent]);
        secondZ = getAbsPosZ(rightPosts[fencesArr[a].parent]);
      } else {
        secondX = 0;
        secondZ = 0;
      }
      for (let i = 0; i < fencesArr[a].children.length; i++) {
        if (fencesArr[a].parent != undefined) {
          if (
            wholeFences[a].rotation.y !=
              wholeFences[fencesArr[a].parent].rotation.y ||
            wholeFences[a].rotation.y !=
              wholeFences[fencesArr[a].children[i]].rotation.y
          ) {
            recursiveToChildrenDelete2(a);
          } else {
            b = fencesArr[a].children[i];
            scaleToOtherFencesToDo(b);
            recursiveToChildrenDelete(b);
          }
        } else {
          recursiveToChildrenDelete2(a);
        }
      }
    }
  }
  // accCloseButFun(deleteFencePart);
  //////////////////////////////////////////////////////////////
  // //TAKE SCREENSHOT
  // var screenshotBtn = document.getElementById("screenshot-but");
  // screenshotBtn.onclick = () => {
  //   BABYLON.Tools.CreateScreenshot(engine, camera, 1024);
  // };

  ////////////////////////////
  //LINK

  var link = document.getElementById("link");
  link.onclick = () => {
    // var a = document.getElementsByClassName("scCartList")[0].children;
    var a = products;
    var prodIds = [];
    var prodValues = [];
    var linkParts = [];
    for (let i = 0; i < a.length; i++) {
      prodIds.push(a[i].id);
      prodValues.push(a[i].numOfProd);

      linkParts.push(prodIds[i] + ":" + prodValues[i] + ",");
    }
    linkParts = linkParts.join("");
    linkParts = linkParts.slice(0, -1);
    link.href += "?add-to-cart=" + linkParts;
    console.log(prodValues);
  };

  //MINIFIED CONF/////////////////////////////////////////////////////////////////////
  let products = [
    { id: "6071", prodName: "", numOfProd: 1, prodPrice: "" },
    { id: "6075", prodName: "", numOfProd: 2, prodPrice: "" },
    { id: "6083", prodName: "", numOfProd: 2, prodPrice: "" },
    { id: "6084", prodName: "", numOfProd: 2, prodPrice: "" },
  ];
  let wooComDataLoaded = false;
  let numDataLoaded = 0;

  for (let i = 0; i < products.length; i++) {
    fetch("https://mega-holz.de/wp-json/wc/store/products/" + products[i].id)
      .then((response) => response.json())
      .then((data) => {
        numDataLoaded += 1;

        products[i].prodName = data.name;

        products[i].prodPrice = data.prices.price;
        products[i].prodPrice =
          products[i].prodPrice.substring(0, products[i].prodPrice.length - 2) +
          "." +
          products[i].prodPrice.substring(
            products[i].prodPrice.length - 2,
            products[i].prodPrice.length
          );

        if (numDataLoaded == products.length) wooComDataLoaded = true;
      });
  }

  let sumPrices = [];
  let confTable = document.getElementById("conf-table");
  let allSumPricesDisplay = document.getElementById("price-display");

  function checkLoaded() {
    if (wooComDataLoaded) {
      for (let i = 0; i < products.length; i++) {
        sumPrices.push(products[i].numOfProd * products[i].prodPrice);

        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");

        td1.style.textAlign = "left";
        td2.style.textAlign = "center";
        td3.style.textAlign = td4.style.textAlign = "right";

        var productNameText = document.createTextNode(
          `${products[i].prodName}`
        );
        var numOfProdText = document.createTextNode(`${products[i].numOfProd}`);
        var productPriceText = document.createTextNode(
          `${products[i].prodPrice} \u20ac`
        );
        var productPriceSumText = document.createTextNode(
          `${sumPrices[i].toFixed(2)} \u20ac`
        );
        td1.appendChild(productNameText);
        td2.appendChild(numOfProdText);
        td3.appendChild(productPriceText);
        td4.appendChild(productPriceSumText);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        confTable.appendChild(tr);
      }
      getSumOfAllPrices();
      clearInterval(refreshIntervalId);
      console.log("cart loaded");
    } else {
      console.log("cart not loaded");
    }
  }
  if (!wooComDataLoaded) {
    var refreshIntervalId = setInterval(checkLoaded, 100);
  }

  //DYNAMICLY CHANGE LIVE CART

  function addPartsNumOnAdd() {
    let numOfProdCell = document.getElementsByTagName("tr");
    products[0].numOfProd = products[0].numOfProd + 1;
    products[1].numOfProd = products[1].numOfProd + 2;
    products[2].numOfProd = products[2].numOfProd + 1;
    products[3].numOfProd = products[3].numOfProd + 1;
    for (let i = 1; i < numOfProdCell.length; i++) {
      numOfProdCell[i].children[1].innerHTML = products[i - 1].numOfProd;
    }
  }

  function subPartsNumOnAdd() {
    let numOfProdCell = document.getElementsByTagName("tr");
    products[0].numOfProd = products[0].numOfProd - 1;
    products[1].numOfProd = products[1].numOfProd - 2;
    products[2].numOfProd = products[2].numOfProd - 1;
    products[3].numOfProd = products[3].numOfProd - 1;
    for (let i = 1; i < numOfProdCell.length; i++) {
      numOfProdCell[i].children[1].innerHTML = products[i - 1].numOfProd;
    }
  }

  function getSumOfIndividualParts() {
    let numOfSumCell = document.getElementsByTagName("tr");
    for (let i = 0; i < products.length; i++) {
      sumPrices[i] = products[i].numOfProd * products[i].prodPrice;
    }
    for (let i = 1; i < numOfSumCell.length; i++) {
      numOfSumCell[i].children[3].innerHTML = `${sumPrices[i - 1].toFixed(
        2
      )} \u20ac`;
    }
  }

  function getSumOfAllPrices() {
    let sumOfAllPrices = sumPrices.reduce((partialSum, a) => partialSum + a, 0);
    sumOfAllPrices = Math.round(sumOfAllPrices * 100) / 100;
    allSumPricesDisplay.innerHTML = `${sumOfAllPrices.toFixed(2)} \u20ac`;
  }

  // setTimeout(() => {
  //   setDisplayOfConfOnAddFence();
  // }, 5000);
  function setDisplayOfConfOnAddFence() {
    addPartsNumOnAdd();
    getSumOfIndividualParts();
    getSumOfAllPrices();
  }
  function setDisplayOfConfOnSubFence() {
    subPartsNumOnAdd();
    getSumOfIndividualParts();
    getSumOfAllPrices();
  }
  //PUSH COORDINATES TO LOCAL STORAGE
  let openFullConfgBtn = document.getElementById("openFullConfgBtn");
  openFullConfgBtn.onclick = () => {
    fencesCoordinates = JSON.stringify(fencesCoordinates);
    localStorage.setItem("coordinates", fencesCoordinates);
    aaa = localStorage.getItem("coordinates");
    console.log(aaa);
    aaa = JSON.parse(aaa);
    console.log(aaa);
  };
  ////////////////////////////////////SMART CART///////////////////////////////
  // loadCart(
  //   fenceBoards,
  //   sturmankersVorderseite,
  //   rightPosts,
  //   leftPosts,
  //   directeHauswandMeshes,
  //   fenceBoardMat,
  //   fencePostMat,
  //   concreteMat,
  //   smallBoardsArr,
  //   silberMat,
  //   anthrazitMat,
  //   fencesArr,
  //   addFenceSings,
  //   grauMat,
  //   braunMat,
  //   sandMat,
  //   startParts,
  //   allPosts,
  //   roots,
  //   sturmankersRuckseite,
  //   inlays,
  //   laisnes,
  //   leds,
  //   ledsRight,
  //   ledParts,
  //   woodMaterials,
  //   topBoards,
  //   rankelements,
  //   rightWoodPosts,
  //   woodTopParts,
  //   gardoFenceBoards,
  //   metalParts
  // );
  ///////////////////////////////////////////////////////////////CANVAS PLAN///////////////////////////////////////////////////////////////////
  // draw2dPlan(
  //   allPosts,
  //   fencesArr,
  //   getAbsPosX,
  //   getAbsPosZ,
  //   rightPosts,
  //   foundationsVord,
  //   foundationsRuck,
  //   foundations,
  //   foundationsRight,
  //   wholeFences
  // );

  //end of scene
  return scene;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//END OF SCENE
