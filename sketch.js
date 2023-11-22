let imgFundo, imgFly, imgHit;
let fundo, bird, canos;
let gameOver, gameStart 

function preload() {
    imgFundo = loadImage('./assets/bg.png');
    imgFly = loadImage('./assets/chickFly.png')
    imgHit = loadImage('./assets/chickGotHit.png')
}

function setup() {
    new Canvas(360, 640);

    gameStart = false;
    gameOver = false;

    world.gravity.y = 0;

    fundo = new Group();
    fundo.addAni(imgFundo);
    fundo.collider = "n";
    fundo.y = height / 2;
    for (let i = 0; i < 3; i++) {
        const f = new fundo.Sprite();
        f.x = width * i + width / 2;
    }

    //canos 
    criaCanos();

    bird = new Sprite();
    bird.addAni('fly', imgFly, {frameSize: [110, 87], frames: 4});
    bird.addAni('hit', imgHit, {frameSize: [117, 98], frames: 2});
    bird.changeAni('fly');
    bird.radius = 20;
    bird.x = bird.radius + 10;
    bird.y = height / 2;
    bird.ani.scale = 0.5;

   // bird.debug = true;
}

function draw() {
    if (kb.pressed(' ') && !gameOver) {
        if (!gameStart) {
            // inicio do jogo
            gameStart = true;
            fundo.vel.x = -3;
            canos.vel.x = -3;
         world.gravity.y = 14;

        }
            // sobe bicho
            bird.vel.y = -7;
    }

    moveFundo();
    moveCanos();
    bird.y = constrain(bird.y, bird.radius, height - bird.radius);
    if (bird.vel.y > 0) {
        bird.rotateTo(30, 3);
    } else if ((bird.vel.y === 0)) {
        bird.rotateTo(0, 3);
    } else {
        bird.rotateTo(-15, 3);
    }
}
function moveFundo() {
    for (let i = 0; i < fundo.length; ++i) {
        const f = fundo[i];
        if (f.x < -width) {
            f.x = width * 2
        }
    }
}

function moveCanos() {
        const cima = canos[0];
        if (cima.x < -cima.w) {
            const baixo = canos[1];
            cima.remove();
            baixo.remove();
            const ultimo = canos[canos.length - 1];
            criaPipes(ultimo.x + width / 2);
            canos.vel.x = -4;
        }
}

function criaCanos() {
    canos = new Group();
    for (let i = 0; i < 3; i++) {
        criaPipes(i * width / 2 + width);

    }
}

function criaPipes(x) {
    const gap = new Sprite();
    gap.collider = 'n';
    gap.h = 160;
    gap.y = random(gap.h, height - gap.h);
    gap.x = x; 

    const pipe = new canos.Group();
    pipe.collider = 'k';
    pipe.w = 30;
    pipe.h = height;
    pipe.x = x;
    pipe.color = "red"
    pipe.strokeWeight = 0;
    // cano de cima
    const cima = new pipe.Sprite();
    cima.y = gap.y - (pipe.h / 2 + gap.h / 2);
    // cano de baixo
    const baixo = new pipe.Sprite();
    baixo.y = gap.y + (pipe.h / 2 + gap.h / 2);

    gap.remove();
}