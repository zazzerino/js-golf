import { score } from './gameLogic.js';

const h1 = ["2H", "2D", "2C",
	    "3S", "3C", "3S"];

const h2 = ["2H", "JD", "2C",
	    "2S", "3C", "2S"];

const h3 = ["2H", "2D", "8C",
	    "2S", "2C", "AS"];

const h4 = ["JH", "4D", "4C",
	    "AS", "4C", "4S"];

const h5 = ["JH", "4D", "4C",
	    "JS", "7C", "KS"];

const h6 = ["JH", "7D", "4C",
	    "3S", "7C", "KS"];

const h7 = ["JH", "2D", "KC",
	    "3S", "7C", "KS"];

test("calculates score", () => {
  expect(score(h1)).toBe(15);
  expect(score(h2)).toBe(-7);
  expect(score(h3)).toBe(-1);
  expect(score(h4)).toBe(1);
  expect(score(h5)).toBe(14);
  expect(score(h6)).toBe(16);
  expect(score(h7)).toBe(22);
});
