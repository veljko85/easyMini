// GROUND
function createGround() {
  var ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 2, height: 0.5 },
    scene
  );
  var grassMaterial = new BABYLON.StandardMaterial("grassMaterial", scene);
  // var grassTexture = new BABYLON.GrassProceduralTexture(
  //   name + "text",
  //   512,
  //   scene
  // );
  // grassTexture.grassColor = new BABYLON.Color3(224 / 255, 197 / 255, 127 / 255);
  // grassMaterial.diffuseTexture = grassTexture;
  grassMaterial.diffuseTexture = new BABYLON.Texture("img/grass.jpg", scene);
  grassMaterial.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  grassMaterial.diffuseTexture.uScale = 5;
  grassMaterial.diffuseTexture.vScale = 5;
  ground.material = grassMaterial;
}
