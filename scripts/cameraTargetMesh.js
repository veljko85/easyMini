//aniamtion to change camera target position
function cameraTargetMesh(cameraTarget, mesh) {
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
  cameraTarget.position.x = mesh.position.x;
  cameraTarget.position.z = mesh.position.z;

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
}
