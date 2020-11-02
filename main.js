try {
    auto();
} catch (error) {
    toast("请手动开启无障碍并授权给Auto.js");
    sleep(2000);
    exit();
}

toast("run server")
var miyoushe = getPackageName("米游社");
var float = 1.25;
console.log(miyoushe,'mihuo');
if(miyoushe) {
  launch(miyoushe);
  sleep(6000);
  swip_bh3();
  sign_in();
  step_five()
}else {
  alert("没有检测到米游社app");
  exit()
}

// 1.滑动到崩坏3板块
function swip_bh3() {
  let bh3_point = text('崩坏3').findOne().parent();
  console.log(bh3_point,'bh3_point');
  bh3_point.click();
  sleep(200);
  
}

// 2.签到
function sign_in() {
  let sign_point = text('进入讨论区').findOne().parent();
  sign_point.click();
  sleep(1000);
  swipe(device.width / 2 , 820, device.width / 2 , 330, 1000)
}

// 3. 下滑列表 点赞 并点击去浏览 
function step_five() {
  let i = 0;
  while(i < 5) {
    look_like(i)
    i++
  }
  
}
function look_like(i) {
  let target = id('mPostCard1TvTitle').depth(11).findOne()
  console.log(target,'target');
  target.parent().click()
  sleep(1000);
  //点赞
  click(840, 2130)
  sleep(1000);
  //最后一次的时候，按分享
  if(i === 4){
    click(999, 165)
    sleep(1000);
    back();
    toast("The Task have finshed!")
    exit();
  }
  back();
  sleep(500);
  let divider = id('dividerView').boundsInside(0, 560, device.width, device.height / 1.5).findOne()
  console.log(divider,'divider');
  let dividerY = divider.bounds().bottom
  swipe(device.width / 2 , dividerY, device.width / 2 , 0, 1000)
  sleep(1000)
 

}

//

/**
 * 随机滑动
 */
function randomSwipe() {
  smlMove(ramdomByFloat(device.width / 2), ramdomByFloat(device.height / 1.5), ramdomByFloat(device.width / 2), ramdomByFloat(device.height / 4), ramdomByFloat(800));
}

/**
 * 根据float生成随机数
 * @param number
 */
function ramdomByFloat(number) {
  return random(number, number * float);
}

/**
 * 仿真随机带曲线滑动
 * @param qx 起点x轴坐标
 * @param qy 起点y轴坐标
 * @param zx 终点x轴坐标
 * @param zy 终点y轴坐标
 * @param time 滑动时间，毫秒
 */
function smlMove(qx, qy, zx, zy, time) {
  var xxy = [time];
  var point = [];
  var dx0 = {
      "x": qx,
      "y": qy
  };
  var dx1 = {
      "x": random(qx - 100, qx + 100),
      "y": random(qy, qy + 50)
  };
  var dx2 = {
      "x": random(zx - 100, zx + 100),
      "y": random(zy, zy + 50),
  };
  var dx3 = {
      "x": zx,
      "y": zy
  };
  for (var i = 0; i < 4; i++) {
      eval("point.push(dx" + i + ")");
  }
  ;
  for (let i = 0; i < 1; i += 0.08) {
      xxyy = [parseInt(bezierCurves(point, i).x), parseInt(bezierCurves(point, i).y)];
      xxy.push(xxyy);
  }
  gesture.apply(null, xxy);
};

function bezierCurves(cp, t) {
  cx = 3.0 * (cp[1].x - cp[0].x);
  bx = 3.0 * (cp[2].x - cp[1].x) - cx;
  ax = cp[3].x - cp[0].x - cx - bx;
  cy = 3.0 * (cp[1].y - cp[0].y);
  by = 3.0 * (cp[2].y - cp[1].y) - cy;
  ay = cp[3].y - cp[0].y - cy - by;

  tSquared = t * t;
  tCubed = tSquared * t;
  result = {
      "x": 0,
      "y": 0
  };
  result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
  result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
  return result;
};
