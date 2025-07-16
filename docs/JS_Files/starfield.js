let stars = [];

function setup() {
    pixelDensity(1);
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
    canvas.style('pointer-events', 'none');
    
    for (let i = 0; i < 180; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            r: random(1.5, 3.5),
            opacity: random(50, 180),
            flickerSpeed: random(0.4, 1.5),
            direction: random([1, -1]),
            maxOpacity: random(180, 255),
            minOpacity: random(20, 60),
            vx: random(-0.1, 0.1),
            vy: random(-0.1, 0.1)
        });
    }
}

function draw() {
    clear();
    noStroke();

    for (let star of stars) {
        // Flickering
        star.opacity += star.flickerSpeed * star.direction;
        if (star.opacity >= star.maxOpacity || star.opacity <= star.minOpacity) {
            star.direction *= -1;
            star.flickerSpeed = random(0.4, 1.5);
        }

        // Floating motion
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen edges
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Warmer Farbton für die Sterne (leicht gelblich/orange)
        const starColor = color(255, 247, 220); // Warmweißer Farbton
        fill(starColor.levels[0], starColor.levels[1], starColor.levels[2], constrain(star.opacity, 0, 255));
        drawingContext.shadowBlur = 6;
        drawingContext.shadowColor = color(255, 247, 220, star.opacity);

        ellipse(star.x, star.y, star.r * 2);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
