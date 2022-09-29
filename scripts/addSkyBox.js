//SKY
function addSkyBox(skyBoxes) {
  var skyBox = BABYLON.Mesh.CreateBox(
    "SkyBox",
    500,
    scene,
    false,
    BABYLON.Mesh.BACKSIDE
  );
  skyBox.material = new BABYLON.SkyMaterial("sky", scene);
  skyBox.material.inclination = 0;
  skyBox.material.luminance = 0.7;
  skyBox.material.azimuth = 0.25;
  skyBox.position.y = 0;
  skyBoxes.push(skyBox);
}
