import "./index.css";


import PopupAuthor from "./blocks/popup-author/popup-author";
import PopupImage from "./blocks/popup-image/popup-image";
import PopupUploader from "./blocks/popup-uploader/popup-uploader";
import Api from "./blocks/api"

////////////////////////////////////////

const popupPlaceForm = document.forms.uploader;
const placeNameForm = popupPlaceForm.elements.place;
const placeLinkForm = popupPlaceForm.elements.link;


// const uploaderForm = document.forms.uploader;
// uploaderForm.reset();


///////////////Popup окна и их функционал///////////////////

const popupUploader = document.querySelector('.popup-uploader');
const popupAuthor = document.querySelector('.popup-author');
const popupImage = document.querySelector('.popup-image');


const popupAuthor1 = new PopupAuthor(popupAuthor);
const popupImage1 = new PopupImage(popupImage);
const popupUploader1 = new PopupUploader(popupUploader);

const root = document.querySelector('.root');
root.addEventListener('click', () => {
    popupAuthor1.show();
    popupImage1.show();
    popupUploader1.show()
    });
root.addEventListener('click', () => {
    popupAuthor1.hide();
    popupImage1.hide();
    popupUploader1.hide()
    });

///////////////AuthorEditHandler////////////////////
const popupAuthorForm = document.forms.author;
const authorNameForm = popupAuthorForm.elements.name;
const authorJobForm = popupAuthorForm.elements.job;
const authorName = document.querySelector('.user__name');
const authorJob = document.querySelector('.user__about');
authorNameForm.setAttribute('value', authorName.textContent);
authorJobForm.setAttribute('value', authorJob.textContent);

function addAuthor(event) {
    event.preventDefault();
    const name = popupAuthorForm.elements.name;
    const job = popupAuthorForm.elements.job;
    api.userEdit(name.value, job.value);

}

function renderLoading(isLoading) {
    const saveBtn = document.querySelector('.popup__button-save');
    const uplBtn = document.querySelector('.popup__button-upload');
    if(isLoading) {
    saveBtn.textContent = 'Загрузка...'; 
    uplBtn.textContent = 'Загрузка...'  
    } else {
    saveBtn.textContent = 'Сохранить';   
    uplBtn.textContent = '+';
    }
}

const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort4',
    headers: {
      authorization: 'cff214a0-7ac6-44ce-b23a-2f2cd5eb7637',
      'Content-Type': 'application/json'
    }
});



///////////////Слушатели событий/////////////////////////
popupPlaceForm.addEventListener('submit', function (event) {
    event.preventDefault(); 
    api.addNewCard(placeNameForm.value, placeLinkForm.value);
});
popupAuthor.addEventListener('input', inputAuthorNameValidator);
popupAuthor.addEventListener('input', inputAuthorJobValidator);
popupPlaceForm.addEventListener('input', inputPlaceLinkValidator);
popupPlaceForm.addEventListener('input', inputPlaceNameValidator);
popupAuthorForm.addEventListener('submit', addAuthor);

const valid = { validationLenght: 'Должно быть от 2 до 30 символов',
                validationMiss: 'Это обязательное поле',
                validationType: 'Здесь должна быть ссылка'}

//Блок валидации окна place               

const popUpUpload = document.querySelector('.popup__button-upload');
//ValidationPlaceName
function inputPlaceNameValidator() {
    const inputPlaceName = document.querySelector('.popup__input_type_name');
    const errorPlaceName = document.querySelector('.error-place-name');

    if (inputPlaceName.validity.tooShort) {
        errorPlaceName.innerHTML = valid.validationLenght;
        popUpUpload.setAttribute('disabled', true);
        popUpUpload.classList.remove('popup__button-disabled');
  }  

  else if (inputPlaceName.validity.valueMissing) {
        errorPlaceName.innerHTML = valid.validationMiss;
        popUpUpload.setAttribute('disabled', true);
        popUpUpload.classList.remove('popup__button-disabled');
  }  

   else {
    errorPlaceName.innerHTML = '';
    popUpUpload.removeAttribute('disabled');
    popUpUpload.classList.add('popup__button-disabled');
  }
}
//ValidationPlaceLink
function inputPlaceLinkValidator() {
    const inputPlaceUrl = document.querySelector('.popup__input_type_link-url');
    const errorLink = document.querySelector('.error-place-link');

    if (inputPlaceUrl.validity.typeMismatch) {
        errorLink.innerHTML = valid.validationType;
        popUpUpload.setAttribute('disabled', true);
        popUpUpload.classList.remove('popup__button-disabled');
  }  

  else if (inputPlaceUrl.validity.valueMissing) {
        errorLink.innerHTML = valid.validationMiss;
        popUpUpload.setAttribute('disabled', true);
        popUpUpload.classList.remove('popup__button-disabled');
  }  

   else {
    errorLink.innerHTML = '';
    popUpUpload.removeAttribute('disabled');
    popUpUpload.classList.add('popup__button-disabled');
  }
}


//Блок валидации окна author
const popUpSave = document.querySelector('.popup__button-save');


//ValidationAuthorName
function inputAuthorNameValidator() {
    const inputAuthorName = popupAuthor.querySelector('.popup__input_type_name');
    const errorName = document.querySelector('.error-name');

    if (inputAuthorName.validity.tooShort) {
          errorName.innerHTML = valid.validationLenght;
          popUpSave.setAttribute('disabled', true);
          popUpSave.classList.remove('popup__button-disabled');
    }  

    else if (inputAuthorName.validity.valueMissing) {
        errorName.innerHTML = valid.validationMiss;
        popUpSave.setAttribute('disabled', true);
        popUpSave.classList.remove('popup__button-disabled');
    }  

     else {
      errorName.innerHTML = '';
      popUpSave.removeAttribute('disabled');
      popUpSave.classList.add('popup__button-disabled');
    }
}

//ValidationAuthorJob
function inputAuthorJobValidator() {
    const inputAuthorJob = popupAuthor.querySelector('.popup__input_type_link-url');
    const errorJob = document.querySelector('.error-job');

    if (inputAuthorJob.validity.valueMissing) {
        errorJob.innerHTML = valid.validationMiss;
        popUpSave.setAttribute('disabled', true);
        popUpSave.classList.remove('popup__button-disabled');
    }  

    else if (inputAuthorJob.validity.tooShort) {
        errorJob.innerHTML = valid.validationLenght;
        popUpSave.setAttribute('disabled', true);
        popUpSave.classList.remove('popup__button-disabled');
    }

     else {
      errorJob.innerHTML = '';
      popUpSave.removeAttribute('disabled');
      popUpSave.classList.add('popup__button-disabled');
    }
}










