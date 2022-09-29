function draw2dPlan(
  allPosts,
  fencesArr,
  getAbsPosX,
  getAbsPosZ,
  rightPosts,
  foundationsVord,
  foundationsRuck,
  foundations,
  foundationsRight,
  wholeFences
) {
  const canvasPlan = document.getElementById("canvas-plan");
  const ctx = canvasPlan.getContext("2d");
  let plan = document.getElementById("2dplan-but");
  // outlined square X: 50, Y: 35, width/height 50

  //function to draw foundations
  function drawFoundation(
    x,
    y,
    width,
    height,
    x2,
    y2,
    width2,
    height2,
    foundScal
  ) {
    ctx.setLineDash([0]);
    //draw rect
    if (foundScal > 1) {
      ctx.fillStyle = "#585858";
    } else {
      ctx.fillStyle = "#A8A8A8";
    }

    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
    ctx.strokeRect(x2, y2, width2, height2);
    // //draw cross
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 + 15, y2 + 15);
    ctx.moveTo(x2 + 15, y2);
    ctx.lineTo(x2, y2 + 15);
    ctx.closePath();
    //line down of foundation
    // ctx.moveTo(x + 10, y + 20);
    // ctx.lineTo(x + 10, y + 40);
    ctx.stroke();
  }
  function drawText2d(text, x, y) {
    ctx.save();
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
    ctx.restore();
  }
  function drawLine(lineWid, startX, startY, endX, endY, arrowHeads) {
    //draw line
    ctx.lineWidth = lineWid;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.stroke();

    if (arrowHeads) {
      if (startY == endY) {
        if (startX < endX) {
          //draw left arrow
          drawArrowhead(
            startX,
            startY,
            startX + 10,
            startY - 5,
            startX + 10,
            startY + 5
          );
          //draw right arrow
          drawArrowhead(endX, endY, endX - 10, endY - 5, endX - 10, endY + 5);
        } else {
          //draw left arrow
          drawArrowhead(
            startX,
            startY,
            startX - 10,
            startY - 5,
            startX - 10,
            startY + 5
          );
          //draw right arrow
          drawArrowhead(endX, endY, endX + 10, endY - 5, endX + 10, endY + 5);
        }
        //side lines
        //side line left
        ctx.beginPath();
        ctx.moveTo(startX, startY - 30);
        ctx.lineTo(startX, startY + 10);
        ctx.closePath();
        ctx.stroke();
        // //side line right
        ctx.beginPath();
        ctx.moveTo(endX, endY - 30);
        ctx.lineTo(endX, endY + 10);
        ctx.closePath();
        ctx.stroke();
      } else {
        if (startY < endY) {
          //draw left arrow
          drawArrowhead(
            startX,
            startY,
            startX - 5,
            startY + 10,
            startX + 5,
            startY + 10
          );
          //draw right arrow
          drawArrowhead(endX, endY, endX - 5, endY - 10, endX + 5, endY - 10);
        } else {
          drawArrowhead(
            startX,
            startY,
            startX - 5,
            startY - 10,
            startX + 5,
            startY - 10
          );
          //draw right arrow
          drawArrowhead(endX, endY, endX - 5, endY + 10, endX + 5, endY + 10);
        }
        //side lines
        //side line left
        ctx.beginPath();
        ctx.moveTo(startX - 30, startY);
        ctx.lineTo(startX + 10, startY);
        ctx.closePath();
        ctx.stroke();
        // //side line right
        ctx.beginPath();
        ctx.moveTo(endX - 30, endY);
        ctx.lineTo(endX + 10, endY);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }
  function drawArrowhead(pointX, pointY, upX, upY, downX, downY) {
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.lineTo(upX, upY);
    ctx.lineTo(downX, downY);
    ctx.fill();
  }

  //create 2d plan
  plan.onclick = () => {
    let canvasSize;
    if (displayGroundSizeX > displayGroundSizeZ) {
      canvasSize = displayGroundSizeX < 700 ? 1000 : displayGroundSizeX * 1.5;
    } else {
      canvasSize = displayGroundSizeZ < 700 ? 1000 : displayGroundSizeZ * 1.5;
    }
    ctx.canvas.width = ctx.canvas.height = canvasSize;
    canvasPlan.style.display = "block";
    setTimeout(() => {
      canvasPlan.style.display = "none";
    }, 1000);
    // downloadPlan.style.display = "block";
    // plan.style.display = "none";
    // draw ground
    // let groundPosX = 500 - displayGroundSizeX / 2;
    // let groundPosZ = 500 - displayGroundSizeZ / 2;
    // let groundSizeX = displayGroundSizeX;
    // let groundSizeZ = displayGroundSizeZ;
    // drawGround(groundPosX, groundPosZ, groundSizeX, groundSizeZ);
    // if(displayGroundSizeX)
    //get postions of all posts
    let allPostsPos = [];
    let allXpos = [0];
    let allZpos = [];
    for (let i = 1; i < allPosts.length; i++) {
      let postsChildren = [];

      fencesArr[i - 1].children.forEach((elm) => {
        postsChildren.push(elm);
      });

      let allPostPosX = Math.round(getAbsPosX(allPosts[i]) * 100);
      let allPostPosZ;
      if (Math.round(getAbsPosZ(allPosts[i]) * 100) > 0) {
        allPostPosZ = -Math.abs(Math.round(getAbsPosZ(allPosts[i]) * 100));
      } else {
        allPostPosZ = Math.abs(Math.round(getAbsPosZ(allPosts[i]) * 100));
      }
      let postPosArr = [allPostPosX, allPostPosZ, i, postsChildren];
      allPostsPos.push(postPosArr);
      allXpos.push(allPostPosX);
      allZpos.push(allPostPosZ);
    }
    //get sizes for kotas
    let fencesSize = [];
    fencesArr.forEach((elm) => {
      fencesSize.push(elm.size + 4);
    });

    //draw main post
    allXpos.sort(function (a, b) {
      return a - b;
    });
    allZpos.sort(function (a, b) {
      return a - b;
    });
    let mainPostPosX =
      canvasSize / 2 - 15 - (allXpos[0] + allXpos[allXpos.length - 1]) / 2;
    let mainPostPosZ =
      canvasSize / 2 - 15 - (allZpos[0] + allZpos[allZpos.length - 1]) / 2;

    //get all posts positions
    let linesX = [];
    let linesY = [];
    allPostsPos.forEach((elm) => {
      linesX.push(mainPostPosX + elm[0] + 15);
      linesY.push(mainPostPosZ + elm[1] + 15);
    });

    //draw line betwen first and second foundations
    for (let i = 0; i < rightPosts.length; i++) {
      if (
        typeof fencesArr[i].parent == "undefined" &&
        rightPosts[i].isVisible &&
        fencesArr[i].status != "disposedFence"
      ) {
        if (mainPostPosZ + 15 == linesY[i]) {
          //draw line betwen first and second foundations
          drawLine(
            3,
            mainPostPosX + 15,
            mainPostPosZ + 15,
            linesX[i],
            linesY[i],
            false
          );
          //draw text kotas for first fence
          if (fencesSize[i] < 81) {
            drawText2d(
              fencesSize[i] + "cm",
              (mainPostPosX + 15 + linesX[i]) / 2,
              mainPostPosZ - 5
            );
          } else {
            drawText2d(
              fencesSize[i] + "cm",
              (mainPostPosX + 15 + linesX[i]) / 2,
              mainPostPosZ + 55
            );
          }
          //middle line to present size between foundation
          drawLine(
            1,
            mainPostPosX + 15,
            mainPostPosZ + 60,
            linesX[i],
            linesY[i] + 45,
            true
          );
        } else {
          //draw line betwen first and second foundations
          drawLine(
            3,
            mainPostPosX + 15,
            mainPostPosZ + 15,
            linesX[i],
            linesY[i],
            false
          );
          //draw text kotas for first fence
          drawText2d(
            fencesSize[i] + "cm",
            mainPostPosX + 85,
            (mainPostPosZ + 15 + linesY[i]) / 2
          );
          //
          //middle line to present size between foundation
          drawLine(
            1,
            mainPostPosX + 60,
            mainPostPosZ + 15,
            linesX[i] + 45,
            linesY[i],
            true
          );
        }
      }
    }

    for (let i = 0; i < allPostsPos.length; i++) {
      allPostsPos[i][3].forEach((elm) => {
        if (
          rightPosts[i].isVisible &&
          fencesArr[i].status != "disposedFence" &&
          rightPosts[elm].isVisible &&
          fencesArr[i].status != "disposedFence"
        ) {
          drawLine(3, linesX[i], linesY[i], linesX[elm], linesY[elm], false);
          //draw text kotas
          if (linesY[i] == linesY[elm]) {
            //size of small line text
            if (fencesSize[elm] > 81) {
              drawText2d(
                fencesSize[elm] + "cm",
                (linesX[i] + linesX[elm]) / 2,
                linesY[i] + 40
              );
            } else {
              drawText2d(
                fencesSize[elm] + "cm",
                (linesX[i] + linesX[elm]) / 2,
                linesY[i] - 20
              );
            }
            //middle line to present size between foundation
            drawLine(
              1,
              linesX[i],
              linesY[i] + 45,
              linesX[elm],
              linesY[elm] + 45,
              true
            );
          } else {
            //size of small line text
            drawText2d(
              fencesSize[elm] + "cm",
              linesX[i] + 75,
              (linesY[i] + linesY[elm]) / 2
            );
            //middle line to present size between foundation
            drawLine(
              1,
              linesX[i] + 45,
              linesY[i],
              linesX[elm] + 45,
              linesY[elm],
              true
            );
          }
        }
      });
    }

    //for whole sizees
    let mainX = [];
    let mainY = [];
    for (let i = 0; i < rightPosts.length; i++) {
      if (rightPosts[i].isVisible && fencesArr[i].status != "disposedFence") {
        mainX.push(linesX[i]);
        mainY.push(linesY[i]);
      }
    }
    mainX.push(mainPostPosX + 15);
    mainY.push(mainPostPosZ + 15);

    mainX.sort(function (a, b) {
      return a - b;
    });
    mainY.sort(function (a, b) {
      return a - b;
    });
    //main line //horizontal size
    drawLine(
      1,
      mainX[0],
      mainY[mainY.length - 1] + 110,
      mainX[mainX.length - 1],
      mainY[mainY.length - 1] + 110,
      true
    );
    //size of big line text //horizontal size
    if (displayGroundSizeX > 191) {
      drawText2d(
        displayGroundSizeX + "cm",
        (mainX[0] + mainX[mainX.length - 1]) / 2,
        mainY[mainY.length - 1] + 130
      );
    } else {
      drawText2d(
        displayGroundSizeX - 7 + "cm",
        (mainX[0] + mainX[mainX.length - 1]) / 2,
        mainY[mainY.length - 1] + 130
      );
    }
    //main line //vertical size
    if (displayGroundSizeZ > 20) {
      drawLine(
        1,
        mainX[mainX.length - 1] + 110,
        mainY[0],
        mainX[mainX.length - 1] + 110,
        mainY[mainY.length - 1],
        true
      );
      //size of big line text //vertical size
      if (displayGroundSizeZ > 191) {
        drawText2d(
          displayGroundSizeZ + "cm",
          mainX[mainX.length - 1] + 145,
          (mainY[0] + mainY[mainY.length - 1]) / 2
        );
      } else {
        drawText2d(
          displayGroundSizeZ - 7 + "cm",
          mainX[mainX.length - 1] + 145,
          (mainY[0] + mainY[mainY.length - 1]) / 2
        );
      }
    }

    //draw foundarion
    //draw first foundation
    if (foundationsVord[0].isVisible)
      drawFoundation(
        mainPostPosX,
        mainPostPosZ,
        30,
        50,
        mainPostPosX + 7.5,
        mainPostPosZ + 7.5,
        15,
        15,
        foundations[0].scaling.y
      );
    if (foundationsRuck[0].isVisible)
      drawFoundation(
        mainPostPosX,
        mainPostPosZ - 20,
        30,
        50,
        mainPostPosX + 7.5,
        mainPostPosZ + 7.5,
        15,
        15,
        foundations[0].scaling.y
      );
    if (foundations[0].isVisible)
      drawFoundation(
        mainPostPosX,
        mainPostPosZ,
        30,
        30,
        mainPostPosX + 7.5,
        mainPostPosZ + 7.5,
        15,
        15,
        foundations[0].scaling.y
      );
    //draw all foundaions
    for (let i = 0; i < allPostsPos.length; i++) {
      if (rightPosts[i].isVisible && fencesArr[i].status != "disposedFence") {
        //vord
        if (foundationsVord[i + 1].isVisible) {
          if (wholeFences[i].rotation.y == 0) {
            drawFoundation(
              mainPostPosX + allPostsPos[i][0],
              mainPostPosZ + allPostsPos[i][1],
              30,
              50,
              mainPostPosX + allPostsPos[i][0] + 7.5,
              mainPostPosZ + allPostsPos[i][1] + 7.5,
              15,
              15,
              foundationsRight[i].scaling.y
            );
          }
          if (wholeFences[i].rotation.y > 1 && wholeFences[i].rotation.y < 2) {
            drawFoundation(
              mainPostPosX + allPostsPos[i][0] - 20,
              mainPostPosZ + allPostsPos[i][1],
              50,
              30,
              mainPostPosX + allPostsPos[i][0] + 7.5,
              mainPostPosZ + allPostsPos[i][1] + 7.5,
              15,
              15,
              foundationsRight[i].scaling.y
            );
          }
          if (wholeFences[i].rotation.y > 2) {
            drawFoundation(
              mainPostPosX + allPostsPos[i][0],
              mainPostPosZ + allPostsPos[i][1] - 20,
              30,
              50,
              mainPostPosX + allPostsPos[i][0] + 7.5,
              mainPostPosZ + allPostsPos[i][1] + 7.5,
              15,
              15,
              foundationsRight[i].scaling.y
            );
          }
          if (wholeFences[i].rotation.y < 0) {
            drawFoundation(
              mainPostPosX + allPostsPos[i][0],
              mainPostPosZ + allPostsPos[i][1],
              50,
              30,
              mainPostPosX + allPostsPos[i][0] + 7.5,
              mainPostPosZ + allPostsPos[i][1] + 7.5,
              15,
              15,
              foundationsRight[i].scaling.y
            );
          }
        }
        //ruck
        if (foundationsRuck[i + 1].isVisible) {
          if (wholeFences[i].rotation.y == 0) {
            drawFoundation(
              mainPostPosX + allPostsPos[i][0],
              mainPostPosZ + allPostsPos[i][1] - 20,
              30,
              50,
              mainPostPosX + allPostsPos[i][0] + 7.5,
              mainPostPosZ + allPostsPos[i][1] + 7.5,
              15,
              15,
              foundationsRight[i].scaling.y
            );
          }
          if (wholeFences[i].rotation.y > 1 && wholeFences[i].rotation.y < 2) {
            drawFoundation(
              mainPostPosX + allPostsPos[i][0],
              mainPostPosZ + allPostsPos[i][1],
              50,
              30,
              mainPostPosX + allPostsPos[i][0] + 7.5,
              mainPostPosZ + allPostsPos[i][1] + 7.5,
              15,
              15,
              foundationsRight[i].scaling.y
            );
          }
          if (wholeFences[i].rotation.y > 2) {
            drawFoundation(
              mainPostPosX + allPostsPos[i][0],
              mainPostPosZ + allPostsPos[i][1],
              30,
              50,
              mainPostPosX + allPostsPos[i][0] + 7.5,
              mainPostPosZ + allPostsPos[i][1] + 7.5,
              15,
              15,
              foundationsRight[i].scaling.y
            );
          }
          if (wholeFences[i].rotation.y < 0) {
            drawFoundation(
              mainPostPosX + allPostsPos[i][0] - 20,
              mainPostPosZ + allPostsPos[i][1],
              50,
              30,
              mainPostPosX + allPostsPos[i][0] + 7.5,
              mainPostPosZ + allPostsPos[i][1] + 7.5,
              15,
              15,
              foundationsRight[i].scaling.y
            );
          }
        }
        //ohne
        if (foundations[i + 1].isVisible)
          drawFoundation(
            mainPostPosX + allPostsPos[i][0],
            mainPostPosZ + allPostsPos[i][1],
            30,
            30,
            mainPostPosX + allPostsPos[i][0] + 7.5,
            mainPostPosZ + allPostsPos[i][1] + 7.5,
            15,
            15,
            foundationsRight[i].scaling.y
          );
      }
    }

    //download 3d
    var formats = {
      a4: [210, 297],
      a3: [400, 200],
    };

    setTimeout(() => {
      html2canvas(canvasPlan, {
        onrendered: function (canvasPlan) {
          var img = canvasPlan.toDataURL("image/jpeg,0.5");
          // pdf.output("datauri");
          var imgData = new Image();
          imgData.src = "./img/pdfInstr.png";
          var pdf = new jsPDF("l", "mm", [210, 297]);
          imgData.onload = function () {
            pdf.addImage(imgData, "PNG", 5, 140, 43.5, 61.46);
            pdf.addImage(img, "PNG", 43.5, 0, 210, 210);
            pdf.text("Mega Holz 2D Plan", 10, 10);
            pdf.save("Mega Holz 2D Plan For Fundaments.pdf");
          };
        },
      });
    }, 500);

    ////////////////////////////////////
    //end create 2d function
  };
}
