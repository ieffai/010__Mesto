import Component from "../component";
import Api from "../api";
import './popup-avatar.css';


export default class PopupAvatar extends Component { 
    constructor (...args) {  
    super(...args);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);  
    
    }
    show() {

        if(event.target.closest('.user__photo')){
            this.domElement.classList.add('popup-avatar_visible');
          }
       
    }

    hide() {
        if(event.target.classList.contains('popup-avatar__button-close')){
            this.domElement.classList.remove('popup-avatar_visible');  
        }
        if(event.target.classList.contains('popup-avatar__button-save')){
            this.domElement.classList.remove('popup-avatar_visible');  
        }
    }
    validator() {
        const input = document.getElementById('popup-avatar_field1');
        const error = document.getElementById('error-avatar_field1');

        const avatarBtn = document.querySelector('.popup-avatar__button-save');
        const valid = { validationLenght: 'Должно быть от 2 до 30 символов',
                        validationMiss: 'Это обязательное поле',
                        validationType: 'Здесь должна быть ссылка'}

        if (input.validity.tooShort) {
            error.innerHTML = valid.validationLenght;
            avatarBtn.setAttribute('disabled', true);
            avatarBtn.classList.remove('popup-avatar__button-save_disabled');
        }  
                
        else if (input.validity.valueMissing) {
            error.innerHTML = valid.validationMiss;
            avatarBtn.setAttribute('disabled', true);
            avatarBtn.classList.remove('popup-avatar__button-save_disabled');
        }  
                
        else if (input.validity.typeMismatch) {
            error.innerHTML = valid.validationType;
            avatarBtn.setAttribute('disabled', true);
            avatarBtn.classList.remove('popup-avatar__button-save_disabled');
        }       
        else {
            error.innerHTML = '';
            avatarBtn.removeAttribute('disabled');
            avatarBtn.classList.add('popup-avatar__button-save_disabled');
        }
    }

    сhangeAvatar() {
        const avatarForm = document.forms.avatar;  
        const url = avatarForm.elements.avatar;
        const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort6' : 'https://praktikum.tk';
        const api = new Api({
            baseUrl: serverUrl,
            headers: {
            authorization: 'cd21394a-f920-4ae5-9101-693fbfcfd353',
            'Content-Type': 'application/json'
            }
        });
        api.uploadAvatar(url.value);
    }

}
