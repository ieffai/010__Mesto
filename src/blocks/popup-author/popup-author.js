import Component from "../component";

import './popup-author.css';

export default class PopupAuthor extends Component { 
    constructor (...args) {  
    super(...args);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this); 

    }

    autofill () {
        const form = document.forms.author;  
        const name = document.querySelector('.user__name');
        const about = document.querySelector('.user__about'); 
        const nameField = form.elements.name;
        const aboutField = form.elements.job;
        nameField.setAttribute('value', name.textContent);
        aboutField.setAttribute('value', about.textContent);
    }

    show(event) {
        this.autofill();
        if(event.target.closest('.user__button')){
            this.domElement.classList.add('popup-author_visible');
        }
    }

    hide(event) {
        if(event.target.classList.contains('popup-author__button-close')){
            this.domElement.classList.remove('popup-author_visible');  
        }
        if(event.target.classList.contains('popup-author__button-save')){
            this.domElement.classList.remove('popup-author_visible');  
        }
    }

    validator() {
        const input = document.getElementById('popup-author_field1');
        const error = document.getElementById('error-author_field1');
        const inputAbout = document.getElementById('popup-author_field2');
        const errorAbout = document.getElementById('error-author_field2');

        const authorBtn = document.querySelector('.popup-author__button-save');
        const valid = { validationLenght: 'Должно быть от 2 до 30 символов',
                        validationMiss: 'Это обязательное поле'}

        if (input.validity.tooShort) {
            error.innerHTML = valid.validationLenght;
            authorBtn.setAttribute('disabled', true);
            authorBtn.classList.remove('popup-author__button-save_disabled');
        }  

        else if (input.validity.valueMissing) {
            error.innerHTML = valid.validationMiss;
            authorBtn.setAttribute('disabled', true);
            authorBtn.classList.remove('popup-author__button-save_disabled');
        } 

        else if (inputAbout.validity.valueMissing) {
            errorAbout.innerHTML = valid.validationMiss;
            authorBtn.setAttribute('disabled', true);
            authorBtn.classList.remove('popup-author__button-save_disabled');
        }  

        else if (inputAbout.validity.tooShort) {
            errorAbout.innerHTML = valid.validationLenght;
            authorBtn.setAttribute('disabled', true);
            authorBtn.classList.remove('popup-author__button-save_disabled');
        }
        else {
            error.innerHTML = '';
            errorAbout.innerHTML = '';
            authorBtn.removeAttribute('disabled');
            authorBtn.classList.add('popup-author__button-save_disabled');
        }
    }

    сhangeName(api) {
        const authorForm = document.forms.author;  
        const name = authorForm.elements.name;
        const about = authorForm.elements.job;
        api.sendUserInfo(name.value, about.value);
    }
}
