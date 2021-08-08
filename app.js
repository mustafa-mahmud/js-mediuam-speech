//new SpeechSynthesisUtterance();
'use strict';

const mainEl = document.querySelector('main');
const toggle = document.getElementById('toggle');
const textBox = document.getElementById('text-box');
const close = document.getElementById('close');
const textarea = document.querySelector('textarea');
const read = document.getElementById('read');

let data = '';

//fetch data from json
const fetchData = async () => {
  const res = await fetch('./data.json');
  const data = await res.json();

  displayUI(data);
};

//speak
const speechText = (e) => {
  const target = e.target.closest('.box');
  const text = target.textContent.trim();

  speak(text);
};

//speak
const listenMe = (e) => {
  const text = textarea.value.trim();
  textarea.value = '';

  speak(text);
};

//speak
const speak = (text) => {
  const synth = window.speechSynthesis;
  const voice = new SpeechSynthesisUtterance(text);

  synth.speak(voice);
};

//show json data on UI
const displayUI = (data) => {
  mainEl.innerHTML = '';

  data.forEach((el) => {
    const div = document.createElement('div');
    div.classList.add('box');
    div.addEventListener('click', speechText);
    div.innerHTML = `
			<img src="./img/${el.img}.jpg" alt="${el.text}">
			<p class="info">${el.text.toUpperCase()}</p>
		`;

    mainEl.appendChild(div);
  });
};

//toggle textarea
const toggleTextarea = () => {
  textBox.classList.toggle('show');
};

///////////////////////
//////////////////////
fetchData();
toggle.addEventListener('click', toggleTextarea);
close.addEventListener('click', toggleTextarea);
read.addEventListener('click', listenMe);
