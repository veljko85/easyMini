//LIGHTS BABYLON
function lightsBabylon(a, b, c) {
  //set lite lights
  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 0, -1),
    scene
  );

  var light2 = new BABYLON.HemisphericLight(
    "light2",
    new BABYLON.Vector3(0, 0, 1),
    scene
  );

  a.push(light, light2);

  //set light lights intensity
  a.forEach((elm) => {
    elm.intensity = 0.2;
  });

  //set havy lights
  var light3 = new BABYLON.HemisphericLight(
    "light3",
    new BABYLON.Vector3(0, 1, -1),
    scene
  );

  var light4 = new BABYLON.HemisphericLight(
    "light4",
    new BABYLON.Vector3(0, 1, 1),
    scene
  );

  b.push(light3, light4);

  c.push(light, light2, light3, light4);

  //set havy lights intensity
  b.forEach((elm) => {
    elm.intensity = 0.6;
  });
}
