import './style.css';
import joker from './cards/1J.svg';

console.log('hello gooolf');

function component() {
  const element = document.createElement('div');

  element.innerHTML = 'yo component';
  element.classList.add('hello');

  const jokerImg = new Image();
  jokerImg.src = joker;

  element.appendChild(jokerImg);

  return element;
}

document.body.appendChild(component());
