let mainSeed = 100;

function setup() {
  let cnv;
  rectMode(CORNERS);
  colorMode(HSB, 100);
  randomSeed(mainSeed);
  cnv = createCanvas(windowWidth, windowHeight);
  main();
  cnv.mouseClicked(main);
}

function windowResized() {
  center = createVector(windowWidth / 2, windowHeight / 2);
  resizeCanvas(windowWidth, windowHeight);
  main();
}

function mouseWheel(event) {
  mainSeed += event.delta;
  randomSeed(mainSeed);
  main();
}

function main() {
  let origamiCount = random(100, 300);
  background(random(0, 100), random(0, 100), random(0, 100));
  let lightColor = random(0, 100);
  let origamiSizeMax = 7;
  let origamiSizeMin = 13;
  let shadowX = random(1, 2);
  let shadowY = random(1, 2);
  fill(color(lightColor, 100, 100));
  circle(width / 2, height / 2, 200);
  stroke(0, 50);

  let origami;
  for (let i = 0; i < origamiCount; i++) {
    origami = getRandVertices(
      3,
      map(-i, 0, -origamiCount, origamiSizeMin, origamiSizeMax)
    );
    fill(color(0, 0, 0, 50));
    genShape(origami, shadowX, shadowY);
    fill(
      color(
        lightColor,
        map(origamiCount - i - 50, origamiCount, 0, 100, 0),
        map(origamiCount - i, origamiCount, 0, 100, 0)
      )
    );
    genShape(origami, 0, 0);
  }
}

function getRandVertices(vertexCount, sizeRatio) {
  let scatterRatio = 100;
  let xoff = random() * scatterRatio;
  let yoff = random() * scatterRatio;
  let vertices = [];
  let x;
  let y;
  for (let i = 1; i <= vertexCount; i++) {
    x = map(noise(i / sizeRatio + xoff), 0, 1, 0, width);
    y = map(noise(i / sizeRatio + yoff), 0, 1, 0, height);
    vertices.push(createVector(x, y));
  }
  return vertices;
}

function genShape(vertices, offX, offY) {
  beginShape();
  for (const el of vertices) {
    vertex(el.x + offX, el.y + offY);
  }
  endShape(CLOSE);
}
