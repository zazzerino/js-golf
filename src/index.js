import './style.css';
import * as PIXI from 'pixi.js';
import { Deck } from './deck.js';

const appState = {
  deck: new Deck(),
  hands: {
    player1: [],
    player2: [],
  },
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

// PIXI.settings.SCALE_MODE = 'NEAREST';

app.renderer.backgroundColor = 0xeeeeee;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth-1, window.innerHeight-1);

document.body.appendChild(app.view);

const cardFiles = [
  "cards/svg/1B.svg", "cards/svg/2J.svg", "cards/svg/4C.svg",
  "cards/svg/5H.svg", "cards/svg/7C.svg", "cards/svg/8H.svg",
  "cards/svg/AC.svg", "cards/svg/JH.svg", "cards/svg/QC.svg",
  "cards/svg/TH.svg", "cards/svg/1J.svg", "cards/svg/2S.svg",
  "cards/svg/4D.svg", "cards/svg/5S.svg", "cards/svg/7D.svg",
  "cards/svg/8S.svg", "cards/svg/AD.svg", "cards/svg/JS.svg",
  "cards/svg/QD.svg", "cards/svg/TS.svg", "cards/svg/2B.svg",
  "cards/svg/3C.svg", "cards/svg/4H.svg", "cards/svg/6C.svg",
  "cards/svg/7H.svg", "cards/svg/9C.svg", "cards/svg/AH.svg",
  "cards/svg/KC.svg", "cards/svg/QH.svg", "cards/svg/2C.svg",
  "cards/svg/3D.svg", "cards/svg/4S.svg", "cards/svg/6D.svg",
  "cards/svg/7S.svg", "cards/svg/9D.svg", "cards/svg/AS.svg",
  "cards/svg/KD.svg", "cards/svg/QS.svg", "cards/svg/2D.svg",
  "cards/svg/3H.svg", "cards/svg/5C.svg", "cards/svg/6H.svg",
  "cards/svg/8C.svg", "cards/svg/9H.svg", "cards/svg/JC.svg",
  "cards/svg/KH.svg", "cards/svg/TC.svg", "cards/svg/2H.svg",
  "cards/svg/3S.svg", "cards/svg/5D.svg", "cards/svg/6S.svg",
  "cards/svg/8D.svg", "cards/svg/9S.svg", "cards/svg/JD.svg",
  "cards/svg/KS.svg", "cards/svg/TD.svg"
];

// load textures, then call setup()
function init() {
  cardFiles.map(filename => {
    app.loader.add(getCardname(filename),
		   filename);
  });

  app.loader.load(setup);
}

function setup() {
  dealCards();
  draw();
  // app.ticker.add(delta => gameLoop(delta));
}

// function gameLoop(delta) {
// }

function dealCards() {
  appState.hands.player1 = appState.deck.deal(6);
  appState.hands.player2 = appState.deck.deal(6);
}

function getCardname(filename) {
  return filename.split('/')[2].split('.')[0];
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

function draw() {
  drawHands();
  drawDeck();
}

function drawHands() {
  for (const [player, hand] of Object.entries(appState.hands)) {
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

function drawDeck() {
  const deckSprite = makeCardSprite("2B",
				    app.screen.width / 2
				    + cardWidth * cardScaleX,
				    app.screen.height / 2);
  deckSprite.x -= cardWidth * cardScaleX / 2;
  deckSprite.anchor.set(0.5, 0.5);
  deckSprite.interactive = true;
  deckSprite.on("click", onDeckClick);

  const dealtCard = appState.deck.deal(1)[0];
  const dealtSprite = makeCardSprite(dealtCard,
				     app.screen.width / 2
				     + cardWidth * cardScaleX,
				     app.screen.height / 2);
  dealtSprite.x -= 1.5 * cardWidth * cardScaleX + 2;
  dealtSprite.anchor.set(0.5, 0.5);
  dealtSprite.interactive = true;
  dealtSprite.on("click", onTableCardClick);

  app.stage.addChild(deckSprite);
  app.stage.addChild(dealtSprite);
}

function onCardClick(event) {
  console.log(this.cardName, this.player);
}

function onDeckClick(event) {
  console.log("deck clicked");
}

function onTableCardClick(event) {
  console.log("table card clicked");
  console.log(this.cardName);
}

init();
