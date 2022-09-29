function onHover(mesh, textOnHover) {
  var advancedTexture =
    BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  var textHolder = new BABYLON.GUI.Rectangle();
  textHolder.width = "150px";
  textHolder.height = "50px";
  textHolder.cornerRadius = 20;
  textHolder.color = "red";
  textHolder.thickness = 0;
  textHolder.background = "#404040";
  // textHolder.linkWithMesh(scene.getMeshByName("Sat.004_primitive0"));
  // textHolder.linkOffsetY = -250;
  // textHolder.linkOffsetX = -150;
  // textHolder.horizontalAlignment =
  //   BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  // textHolder.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
  // textHolder.left = 100 + "px";
  advancedTexture.addControl(textHolder);
  textHolder.notRenderable = true;

  var text = new BABYLON.GUI.TextBlock();
  text.color = "white";
  text.textWrapping = true;
  text.text = textOnHover;
  text.fontSize = "14px";
  textHolder.addControl(text);

  mesh.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPointerOverTrigger,
      function () {
        var width = engine.getRenderWidth();
        var height = engine.getRenderHeight();
        textHolder.leftInPixels = scene.pointerX - width / 2.0 - 100;
        textHolder.topInPixels = scene.pointerY - height / 2.0;
        textHolder.notRenderable = false;
      }
    )
  );
  mesh.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPointerOutTrigger,
      function () {
        // var width = engine.getRenderWidth();
        // var height = engine.getRenderHeight();
        // textHolder.leftInPixels = scene.pointerX - width / 2.0 - 100;
        // textHolder.topInPixels = scene.pointerY - height / 2.0;
        textHolder.notRenderable = true;
      }
    )
  );
}
