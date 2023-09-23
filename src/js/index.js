import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common["x-api-key"] = "live_dTMk3RlHdIQ7dS6WdmN5lk4rELcOasVPOWSUfgtHjQkn0qD2MY4IcpWvhNIGQKrD";

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');

document.body.style.backgroundColor = '#FFEBCD'; 
// console.log(fetchBreeds());
// console.log(error);


loader.hidden = true;
catInfo.classList.add('is-hidden');

breedSelect.addEventListener('change', findBreed);
breedSelect.classList.remove('is-hidden');

fetchBreeds()
    .then(breeds => 
        renderBreeds(breeds))
    .catch(error => 

        Notiflix.Notify.failure(
            'Oops! Something went wrong! Try reloading the page!')
        );

function findBreed(event){
    event.preventDefault();
    
    loader.hidden = false;
    // catInfo.classList.add('is-hidden');
   
    clearCats();

    const breedId = event.target.value;
    console.log('breedId: ', breedId);

    
    fetchCatByBreed(breedId)
    .then(cats => {
        loader.hidden = true; 
         breedSelect.classList.add('is-hidden');
        //  catInfo.classList.add('is-hidden');

         renderCat(cats);
         catInfo.classList.remove('is-hidden');
         breedSelect.classList.remove('is-hidden');})
    .catch(error => {
        console.log(error);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
    })
    .finally(() => loader.hidden = true)
}

function renderBreeds(breeds){
    catInfo.classList.add('is-hidden');

    const markup = breeds.map(({id, name}) => {
        return `<option value="${id}">${name}</option>`
    }).join('');

    breedSelect.insertAdjacentHTML('afterbegin', markup);
    
    new SlimSelect({
        select: '#single',
      });
}

function renderCat(cats){
    const markupCat = cats.map( cat => {
        return `<div class="box-img"> 
        <img src="${cat.url}" alt="${cat.breeds[0].name}" width="400"/>
        </div>
        <div class="box-info">
        <h1>${cat.breeds[0].name}</h1>
        <p class="text-description">${cat.breeds[0].description}</p>
        <p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
        </div>`
    }).join('');

    catInfo.insertAdjacentHTML('beforeend', markupCat);
}

function clearCats(){
    catInfo.innerHTML = '';
}

