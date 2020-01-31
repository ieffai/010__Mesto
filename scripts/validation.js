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









