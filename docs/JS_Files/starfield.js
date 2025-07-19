let stars = [];

function setup() {
    pixelDensity(1);
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-2'); // Zwischen Nebula (-3) und Content
    canvas.style('pointer-events', 'none');
    canvas.style('transform', 'translate3d(0, 0, 0)'); // Hardware-Beschleunigung
    canvas.style('will-change', 'auto'); // Optimierung deaktivieren
    
    // Stelle sicher, dass der Canvas im body ist, nicht in scrollbaren Containern
    document.body.appendChild(canvas.canvas);
    
    // Weniger Sterne für bessere Performance
    for (let i = 0; i < 100; i++) {
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
    clear(); // Transparenter Hintergrund
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
        fill(255, 247, 220, constrain(star.opacity, 0, 255));
        drawingContext.shadowBlur = 6;
        drawingContext.shadowColor = color(255, 247, 220, star.opacity);

        ellipse(star.x, star.y, star.r * 2);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
