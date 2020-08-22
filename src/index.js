import './style.css';
import * as PIXI from 'pixi.js';

const appState = {
  hands: {
    player1: ['3S', 'JH', '5H', 'KC', '8D', 'AS'],
    player2: ['4S', 'JH', '5H', 'KC', '8D', 'AS'],
  }
};

const appWidth = 256;
const appHeight = 256;

const cardWidth = 240;
const cardHeight = 336;
const cardScaleX = 0.3;
const cardScaleY = 0.3;

const app = new PIXI.Application({
  width: appWidth,
  height: appHeight,
  antialias: true,
  resolution: 1
});

app.renderer.backgroundColor = 0xeeeeee;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth-1, window.innerHeight-1);

document.body.appendChild(app.view);

const cardFiles = [
  "cards/1B.svg", "cards/2J.svg", "cards/4C.svg", "cards/5H.svg",
  "cards/7C.svg", "cards/8H.svg", "cards/AC.svg", "cards/JH.svg",
  "cards/QC.svg", "cards/TH.svg", "cards/1J.svg", "cards/2S.svg",
  "cards/4D.svg", "cards/5S.svg", "cards/7D.svg", "cards/8S.svg",
  "cards/AD.svg", "cards/JS.svg", "cards/QD.svg", "cards/TS.svg",
  "cards/2B.svg", "cards/3C.svg", "cards/4H.svg", "cards/6C.svg",
  "cards/7H.svg", "cards/9C.svg", "cards/AH.svg", "cards/KC.svg",
  "cards/QH.svg", "cards/2C.svg", "cards/3D.svg", "cards/4S.svg",
  "cards/6D.svg", "cards/7S.svg", "cards/9D.svg", "cards/AS.svg",
  "cards/KD.svg", "cards/QS.svg", "cards/2D.svg", "cards/3H.svg",
  "cards/5C.svg", "cards/6H.svg", "cards/8C.svg", "cards/9H.svg",
  "cards/JC.svg", "cards/KH.svg", "cards/TC.svg", "cards/2H.svg",
  "cards/3S.svg", "cards/5D.svg", "cards/6S.svg", "cards/8D.svg",
  "cards/9S.svg", "cards/JD.svg", "cards/KS.svg", "cards/TD.svg",
];

function init() {
  cardFiles.map(filename => {
    app.loader.add(getCardname(filename),
		   filename);
  });
  app.loader.load(setup);
}

function setup() {
  drawHands(appState.hands);

  // app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
}

function getCardname(filename) {
  return filename.split('/')[1].split('.')[0];
}

function makeCardSprite(cardName, x, y) {
  const sprite = new PIXI.Sprite(app.loader
				 .resources[cardName]
				 .texture);
  sprite.x = x;
  sprite.y = y;
  sprite.scale.set(cardScaleX, cardScaleY);

  sprite.cardName = cardName;

  return sprite;
}

function makeHandContainer(cards) {
  const container = new PIXI.Container();

  const xSpacing = 5;
  const ySpacing = 5;

  for (let i = 0; i < 3; i++) {
    const sprite = makeCardSprite(
      cards[i],
      i * cardWidth * cardScaleX + xSpacing * i,
      0
    );
    container.addChild(sprite);
  }

  for (let i = 3; i < 6; i++) {
    const j = i - 3;
    const sprite = makeCardSprite(
      cards[i],
      j * cardWidth * cardScaleX + xSpacing * j,
      cardHeight * cardScaleY + ySpacing
    );
    container.addChild(sprite);
  }

  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;

  return container;
}

function makeSpritesInteractive(handContainer) {
  for (const child of handContainer.children) {
    child.interactive = true;
    child.on('click', onCardClick);
  }
}

function drawHands(hands) {
  for (const [player, hand] of Object.entries(hands)) {
    const handContainer = makeHandContainer(hand);

    switch (player) {
    case 'player1':
      handContainer.x = app.screen.width / 2;
      handContainer.y = app.screen.height - handContainer.height / 2;
      break;

    case 'player2':
      handContainer.x = app.screen.width / 2;
      handContainer.y = handContainer.height / 2;
      break;
    }

    handContainer.children.map(child => child.player = player);
    makeSpritesInteractive(handContainer);
    app.stage.addChild(handContainer);
  }
}

function onCardClick(event) {
  console.log(this.cardName, this.player);
}

init();
