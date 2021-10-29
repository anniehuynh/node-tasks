'use strict';
const img = document.querySelector('img');

img.addEventListener('click', (evt) => {
  img.classList.toggle('small');
});

const getCat = async () => {
  const response = await fetch('./catinfo');

  //wait for the data in the index json file
  const json = await response.json();
  document.querySelector('h2').innerHTML = json.name;
  document.querySelector('p:nth-of-type(1)').innerHTML = `Age: ${json.birthdate}`;
  document.querySelector('p:nth-of-type(2)').innerHTML = `Weight: ${json.weight}kg`;
};

getCat();