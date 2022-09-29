//   FUNCTION  TO CHANGE FENCES
function changeFenceFunctionGardo(
  c,
  d,
  h,
  fencesArr,
  changePosAndScaleFence,
  positionChildrenOnParentSizeChange,
  rightPosts,
  ledsRight,
  rightPostCaps,
  rightPostCapClones,
  setGround
) {
  fencesArr[h].type = d;
  fencesArr[h].size = c;
  changePosAndScaleFence(c, h);
  positionChildrenOnParentSizeChange(h);
  //set fence height///////////////////////////
  if (d == "gardoHalf") {
    for (let i = 8; i < fencesArr[h].gardoParts.boards.length; i++) {
      fencesArr[h].gardoParts.boards[i].isVisible = false;
    }
    fencesArr[h].gardoParts.rankelement.isVisible = false;
    fencesArr[h].gardoParts.woodTopPart.position.y =
      fencesArr[h].gardoParts.boards[7].position.y + 0.102;
    fencesArr[h].gardoParts.topBoard.isVisible = false;
    //children
    let childType = 0;
    for (let i = 0; i < fencesArr[h].children.length; i++) {
      if (
        fencesArr[fencesArr[h].children[i]].type != "gardoHalf" &&
        fencesArr[fencesArr[h].children[i]].type != "easyFenceHalf"
      ) {
        childType += 1;
      }

      console.log(fencesArr[fencesArr[h].children[i]].type, childType);
    }
    if (childType == 0) {
      if (rightPosts[h].scaling.z < 1.1) {
        // fencesArr[h].gardoParts.woodPost.scaling.z = 0.524;
        // fencesArr[h].gardoParts.woodPost.position.y = 0.504;
        rightPosts[h].scaling.z = 0.524;
        rightPosts[h].position.y = 0.504;
      }
      if (rightPosts[h].scaling.z > 1 && rightPosts[h].scaling.z < 1.4) {
        // fencesArr[h].gardoParts.woodPost.scaling.z = 0.724;
        // fencesArr[h].gardoParts.woodPost.position.y = 0.3119;
        rightPosts[h].scaling.z = 0.724;
        rightPosts[h].position.y = 0.3119;
      }
      if (rightPosts[h].scaling.z > 1.4) {
        // fencesArr[h].gardoParts.woodPost.scaling.z = 0.999;
        // fencesArr[h].gardoParts.woodPost.position.y = 0.053;
        rightPosts[h].scaling.z = 0.999;
        rightPosts[h].position.y = 0.053;
      }
      if (rightPosts[h].isVisible) {
        rightPostCaps[h].isVisible = false;
        rightPostCapClones[h].isVisible = true;
        ledsRight[h].scaling.z = 0.524;
        ledsRight[h].position.z = 0.46;
        ledsRight[h].position.y = 0.001;
      }
    }
    //parent
    if (h > 0) {
      if (
        fencesArr[fencesArr[h].parent].type == "gardoHalf" ||
        fencesArr[fencesArr[h].parent].type == "easyFenceHalf"
      ) {
        let fenceSibling = 0;
        for (
          let i = 0;
          i < fencesArr[fencesArr[h].parent].children.length;
          i++
        ) {
          if (
            fencesArr[fencesArr[fencesArr[h].parent].children[i]].type !=
              "gardoHalf" &&
            fencesArr[fencesArr[fencesArr[h].parent].children[i]].type !=
              "easyFenceHalf"
          ) {
            fenceSibling += 1;
          }
        }
        if (fenceSibling < 1) {
          if (rightPosts[fencesArr[h].parent].scaling.z < 1.1) {
            // fencesArr[
            //   fencesArr[h].parent
            // ].gardoParts.woodPost.scaling.y = 0.524;
            // fencesArr[
            //   fencesArr[h].parent
            // ].gardoParts.woodPost.position.y = 0.504;
            rightPosts[fencesArr[h].parent].scaling.z = 0.524;
            rightPosts[fencesArr[h].parent].position.y = 0.504;
          }
          if (
            rightPosts[fencesArr[h].parent].scaling.z > 1 &&
            rightPosts[fencesArr[h].parent].scaling.z < 1.4
          ) {
            // fencesArr[
            //   fencesArr[h].parent
            // ].gardoParts.woodPost.scaling.y = 0.724;
            // fencesArr[
            //   fencesArr[h].parent
            // ].gardoParts.woodPost.position.y = 0.3119;
            rightPosts[fencesArr[h].parent].scaling.z = 0.724;
            rightPosts[fencesArr[h].parent].position.y = 0.3119;
          }
          if (rightPosts[fencesArr[h].parent].scaling.z > 1.4) {
            fencesArr[
              fencesArr[h].parent
            ].gardoParts.woodPost.scaling.y = 0.999;
            fencesArr[
              fencesArr[h].parent
            ].gardoParts.woodPost.position.y = 0.053;
            rightPosts[fencesArr[h].parent].scaling.z = 0.999;
            rightPosts[fencesArr[h].parent].position.y = 0.053;
          }
          if (rightPosts[fencesArr[h].parent].isVisible) {
            rightPostCaps[fencesArr[h].parent].isVisible = false;
            rightPostCapClones[fencesArr[h].parent].isVisible = true;
            ledsRight[fencesArr[h].parent].scaling.z = 0.524;
            ledsRight[fencesArr[h].parent].position.z = 0.46;
            ledsRight[fencesArr[h].parent].position.y = 0.001;
          }
        }
      }
    }
  } else {
    for (let i = 8; i < fencesArr[h].gardoParts.boards.length; i++) {
      fencesArr[h].gardoParts.boards[i].isVisible = true;
    }
    fencesArr[h].gardoParts.woodTopPart.position.y =
      fencesArr[h].gardoParts.boards[15].position.y + 0.102;
    ledsRight[h].scaling.z = 1;
    ledsRight[h].position.z = 0;
    ledsRight[h].position.y = 0.001;
    if (fencesArr[h].type == "gardoRank") {
      fencesArr[h].gardoParts.boards[13].isVisible = false;
      fencesArr[h].gardoParts.boards[14].isVisible = false;
      fencesArr[h].gardoParts.rankelement.isVisible = true;
    } else {
      fencesArr[h].gardoParts.rankelement.isVisible = false;
    }
    if (rightPosts[h].scaling.z < 0.6) {
      // fencesArr[h].gardoParts.woodPost.scaling.z = 1;
      // fencesArr[h].gardoParts.woodPost.position.y = 0.935;
      rightPosts[h].scaling.z = 1;
      rightPosts[h].position.y = 0.962;
    }
    if (rightPosts[h].scaling.z > 0.6 && rightPosts[h].scaling.z < 0.9) {
      // fencesArr[h].gardoParts.woodPost.scaling.z = 1.2;
      // fencesArr[h].gardoParts.woodPost.position.y = 0.7717;
      rightPosts[h].scaling.z = 1.2;
      rightPosts[h].position.y = 0.7717;
    }
    if (rightPosts[h].scaling.z > 0.9 && rightPosts[h].scaling.z < 1) {
      // fencesArr[h].gardoParts.woodPost.scaling.z = 1.475;
      // fencesArr[h].gardoParts.woodPost.position.y = 0.511;
      rightPosts[h].scaling.z = 1.475;
      rightPosts[h].position.y = 0.511;
    }
    if (rightPosts[h].isVisible) {
      rightPostCaps[h].isVisible = true;
      rightPostCapClones[h].isVisible = false;
    }
    //set parent right post
    if (h > 0 && fencesArr[h].parent != undefined) {
      if (rightPosts[fencesArr[h].parent].scaling.z < 0.6) {
        // fencesArr[fencesArr[h].parent].gardoParts.woodPost.scaling.y = 1;
        // fencesArr[fencesArr[h].parent].gardoParts.woodPost.position.y = 0.935;
        rightPosts[fencesArr[h].parent].scaling.z = 1;
        rightPosts[fencesArr[h].parent].position.y = 0.962;
      }
      if (
        rightPosts[fencesArr[h].parent].scaling.z > 0.6 &&
        rightPosts[fencesArr[h].parent].scaling.z < 0.9
      ) {
        // fencesArr[fencesArr[h].parent].gardoParts.woodPost.scaling.y = 1.2;
        // fencesArr[fencesArr[h].parent].gardoParts.woodPost.position.y = 0.7717;
        rightPosts[fencesArr[h].parent].scaling.z = 1.2;
        rightPosts[fencesArr[h].parent].position.y = 0.7717;
      }
      if (
        rightPosts[fencesArr[h].parent].scaling.z > 0.9 &&
        rightPosts[fencesArr[h].parent].scaling.z < 1
      ) {
        // fencesArr[fencesArr[h].parent].gardoParts.woodPost.scaling.y = 1.475;
        // fencesArr[fencesArr[h].parent].gardoParts.woodPost.position.y = 0.511;
        rightPosts[fencesArr[h].parent].scaling.z = 1.475;
        rightPosts[fencesArr[h].parent].position.y = 0.511;
      }
      if (rightPosts[fencesArr[h].parent].isVisible) {
        rightPostCaps[fencesArr[h].parent].isVisible = true;
        rightPostCapClones[fencesArr[h].parent].isVisible = false;
      }
      ledsRight[fencesArr[h].parent].scaling.z = 1;
      ledsRight[fencesArr[h].parent].position.z = 0;
      ledsRight[fencesArr[h].parent].position.y = 0.001;
    }
  }
  //set ground size
  setGround();
}
