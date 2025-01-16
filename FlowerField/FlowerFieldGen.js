function setup() {
    let cnv;
    rectMode(CORNERS);
    colorMode(HSB, 100);
    cnv = createCanvas(windowWidth, windowHeight);
    main();
    cnv.style('z-index', '0');
    window.addEventListener('click', main);

    let ticking = false;

    // window.addEventListener('scroll', function () {
    //     if (!ticking) {
    //         window.requestAnimationFrame(function () {
    //             resizeCanvas(windowWidth, Math.max(windowHeight, document.body.scrollHeight));
    //             main();
    //             ticking = false;
    //         });
    //         ticking = true;
    //     }
    // });
}


function windowResized() {
    center = createVector(windowWidth / 2, windowHeight / 2);
    resizeCanvas(windowWidth, Math.max(windowHeight, document.body.scrollHeight));
    main();
}

function main() {
    background(color(random(100), 40, 0, 100));
    let row = Math.floor(windowHeight / 300);
    let col = Math.floor(windowWidth / 300);
    let cellScale;
    if (windowWidth / col > windowHeight / row) {
        cellScale = windowHeight / row;
    } else {
        cellScale = windowWidth / col;
    }
    let cellCenter;

    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            cellCenter = createVector(
                cellScale * c + cellScale / 2,
                cellScale * r + cellScale / 2
            );
            flowerGen(cellCenter, cellScale);
        }
    }
}

function flowerGen(cellCenter, cellScale) {
    let colorPalette = random([0, 1, 2, 3, 4, 5, 6]);
    let shadowX = random(2);
    let shadowY = random(2);
    let density = random(0.6, 0.9);
    let circular = random([true]);

    stroke(0);
    let tri;

    for (let i = 0; i < cellScale / 2; i++) {
        strokeWeight(i / cellScale / 2);
        if (random() > density) {
            if (circular) {
                tri = genTriangleInCircle(
                    cellCenter.x,
                    cellCenter.y,
                    cellScale / 2 - i
                );
            } else {
                tri = genTriangleInRect(
                    cellCenter.x - cellScale / 2 + i,
                    cellCenter.y - cellScale / 2 + i,
                    cellCenter.x + cellScale / 2 - i,
                    cellCenter.y + cellScale / 2 - i
                );
            }
            if (shadowX != 0 || shadowY != 0) {
                fill(color(0, 0, 0, i));
                triangle(
                    tri[0].x + shadowX,
                    tri[0].y + shadowY,
                    tri[1].x + shadowX,
                    tri[1].y + shadowY,
                    tri[2].x + shadowX,
                    tri[2].y + shadowY
                );
            }
            fill(color(pickColor(colorPalette), 100, i, i));
            triangle(tri[0].x, tri[0].y, tri[1].x, tri[1].y, tri[2].x, tri[2].y);
        }
    }
}

function pickColor(palette) {
    switch (palette) {
        case 0:
            return random(0, 25);
        case 1:
            return random(25, 50);
        case 2:
            return random(50, 75);
        case 3:
            return random(75, 100);
        case 4:
            return random(0, 50);
        case 5:
            return random(50, 100);
        default:
            return random(0, 100);
    }
}

function genTriangleInRect(minX, minY, maxX, maxY) {
    let a = createVector(minX, random(minY, maxY));
    let b = createVector(maxX, random(minY, maxY));
    let c = createVector(random(minX, maxX), minY);
    let d = createVector(random(minX, maxX), maxY);
    switch (random([0, 1, 2, 3])) {
        case 0:
            return [a, b, c];
        case 1:
            return [a, b, d];
        case 2:
            return [a, c, d];
        default:
            return [b, c, d];
    }
}

function genTriangleInCircle(x, y, radius) {
    var a = getPointOnCircle(x, y, radius);
    var b = getPointOnCircle(x, y, radius);
    var c = getPointOnCircle(x, y, radius);
    return [a, b, c];
}

function getPointOnCircle(x, y, radius) {
    var angle = random() * Math.PI * 2;
    return createVector(
        Math.cos(angle) * radius + x,
        Math.sin(angle) * radius + y
    );
}