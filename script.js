const stage = document.querySelector("#stage"),
      context = stage.getContext("2d"),
      score = document.querySelector("#score"),
      maxScore = document.querySelector("#max-score"),
      vel = 1;

let vx = vy = 0,
    px = 10,
    py = 15,
    ax = ay = 15,
    tileLenght = 20,
    tileAmount = 20,
    currentScore = currentMaxScore = 0;

let trail = [],
    tail = 5;

document.addEventListener("keydown", keyPush);
setInterval(gameLoop, 60);



function gameLoop() {
    px += vx;
    py += vy;
    
    maxScore.textContent = `Max Score: ${currentMaxScore}`;
    score.textContent = `Score: ${currentScore}`;

    if(px < 0) {
        px = tileAmount - 1;
    }

    if(px > tileAmount - 1) {
        px = 0;
    }

    if(py < 0) {
        py = tileAmount - 1;
    }

    if(py > tileAmount - 1) {
        py = 0;
    }

    context.fillStyle = "black";
    context.fillRect(0,0, stage.width, stage.height);

    context.fillStyle = "red";
    context.fillRect(ax * tileLenght, ay * tileLenght, tileLenght, tileLenght);

    context.fillStyle = "gray";
    for(let i = 0; i < trail.length; i++) {
        context.fillRect(trail[i].x * tileLenght, trail[i].y * tileLenght, tileLenght - 1.5, tileLenght - 1.5);
        if(trail[i].x == px && trail[i].y == py) {
            if(currentScore > currentMaxScore) {
                currentMaxScore = currentScore;
            }
            currentScore = 0;
            vx = vy = 0;
            tail = 5;
        }
    }

    trail.push({x: px,
                y: py});
    
    while (trail.length > tail) {
        trail.shift();
    }

    if(px == ax && py == ay) {
        tail++;
        currentScore++;
        ax = Math.floor(Math.random() * tileAmount);
        ay = Math.floor(Math.random() * tileAmount);
    }

}

function keyPush(event) {
    switch (event.keyCode) {
        case 37:
            vx = -vel;
            vy = 0;
            break;

        case 38:
            vx = 0;
            vy = -vel;
            break;

        case 39:
            vx = vel;
            vy = 0;
            break;

        case 40:
            vx = 0;
            vy = vel;
            break;
    }
}

