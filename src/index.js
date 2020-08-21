import './style.css';
import * as PIXI from 'pixi.js';

const appWidth = 256;
const appHeight = 256;

const app = new PIXI.Application({
  width: appWidth,
  height: appHeight,
  antialias: true,
});

app.renderer.backgroundColor = 0xeeeeee;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

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

function getCardSprite(cardName) {
  const sprite = new PIXI.Sprite(app.loader
				 .resources[`cards/${cardName}.svg`]
				 .texture);
  return sprite;
}

function setup() {
  const card2B = getCardSprite("2B");
  app.stage.addChild(card2B);
}

app.loader.add(cardFiles).load(setup);
