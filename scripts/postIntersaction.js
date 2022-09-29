function checkIntPos(
  fakePosts,
  allPosts,
  rightRoots,
  intersectedPosts,
  intersectedPostsMain,
  fencesArr
) {
  for (let i = 0; i < fakePosts.length; i++) {
    for (let j = i; j < fakePosts.length; j++) {
      if (i != j) {
        if (fakePosts[i].intersectsMesh(fakePosts[j], false)) {
          if (allPosts[i].isVisible && allPosts[j].isVisible) {
            allPosts[j].isVisible = false;
            rightRoots[j - 1].forEach((elm) => {
              elm.isVisible = false;
            });
            intersectedPostsMain.push(i);
            intersectedPosts.push(j);
          }
        }
      }
    }
  }
  if (intersectedPostsMain.length > 0) {
    for (let i = 0; i < intersectedPostsMain.length; i++) {
      if (
        fakePosts[intersectedPostsMain[i]].intersectsMesh(
          fakePosts[intersectedPosts[i]],
          false
        )
      ) {
        allPosts[intersectedPosts[i]].isVisible = false;
        rightRoots[intersectedPosts[i] - 1].forEach((elm) => {
          elm.isVisible = false;
        });
        if (
          intersectedPostsMain[i] > 0 &&
          fencesArr[intersectedPostsMain[i] - 1].status != "activeFence"
        ) {
          allPosts[intersectedPosts[i]].isVisible = true;
          if (
            allPosts[intersectedPosts[i]].scaling.z == 1 ||
            allPosts[intersectedPosts[i]].scaling.z == 0.524
          )
            rightRoots[intersectedPosts[i] - 1].forEach((elm) => {
              elm.isVisible = true;
            });
          intersectedPostsMain.splice(i, 1);
          intersectedPosts.splice(i, 1);
        }
      } else {
        allPosts[intersectedPosts[i]].isVisible = true;
        if (
          allPosts[intersectedPosts[i]].scaling.z == 1 ||
          allPosts[intersectedPosts[i]].scaling.z == 0.524
        )
          rightRoots[intersectedPosts[i] - 1].forEach((elm) => {
            elm.isVisible = true;
          });
        intersectedPostsMain.splice(i, 1);
        intersectedPosts.splice(i, 1);
      }
    }
  }
}
var checkPostIntersecting = (
  fakePosts,
  allPosts,
  rightRoots,
  intersectedPosts,
  intersectedPostsMain,
  fencesArr
) => {
  setTimeout(() => {
    checkIntPos(
      fakePosts,
      allPosts,
      rightRoots,
      intersectedPosts,
      intersectedPostsMain,
      fencesArr
    );
  }, 0);
  setTimeout(() => {
    checkIntPos(
      fakePosts,
      allPosts,
      rightRoots,
      intersectedPosts,
      intersectedPostsMain,
      fencesArr
    );
  }, 100);
  setTimeout(() => {
    checkIntPos(
      fakePosts,
      allPosts,
      rightRoots,
      intersectedPosts,
      intersectedPostsMain,
      fencesArr
    );
  }, 200);
};
