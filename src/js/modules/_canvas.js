/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import '@babel/polyfill';

const fourByFour = document.querySelector('.hex');
const thirtyTwoToThirtyTwo = document.querySelector('.rgb');
const image = document.querySelector('.img');

const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

async function getData(url) {
  const response = await fetch(url);
  let data;

  if (response.ok) {
    data = await response.json();
  } else {
    console.log(`Ошибка HTTP: ${response.status}`);
  }

  return data;
}

function drawCanvas(arrayOfColors) {
  const width = arrayOfColors[0].length;
  const height = arrayOfColors.length;
  const scale = canvas.width / width;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      context.fillStyle = arrayOfColors[row][col];
      context.fillRect(col * scale, row * scale, scale, scale);
    }
  }
}

fourByFour.addEventListener('click', function f() {
  const { url } = this.dataset;

  getData(url)
    .then((arr) => {
      const resultArray = arr.map((item) => item.map((color) => `#${color}`));

      drawCanvas(resultArray);
    });
});

thirtyTwoToThirtyTwo.addEventListener('click', function f() {
  const { url } = this.dataset;

  getData(url)
    .then((arr) => {
      const resultArray = arr.map((item) => item.map((color) => `rgb(${color[0]},${color[1]},${color[2]}`));

      drawCanvas(resultArray);
    });
});

image.addEventListener('click', () => {
  const pic = new Image();
  const { width } = canvas;
  const { height } = canvas;

  pic.src = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png';

  pic.onload = function f() {
    context.drawImage(pic, 0, 0, width, height);
  };
});
