import Component from "../component";
import Api from "../api";

import './popup-uploader.css';


export default class PopupUploader extends Component { 
    constructor (...args) {  
    super(...args);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this); 
    this.validator = this.validator.bind(this);
    }
    
    show() {
        if(event.target.closest('.profile__button')){
            this.domElement.classList.add('popup-uploader_visible');
        }
        
    }

    hide() {
            if(event.target.classList.contains('popup-uploader__button-close')){
                this.domElement.classList.remove('popup-uploader_visible');  
            }
            if(event.target.classList.contains('popup-uploader__button-upload')){
                this.domElement.classList.remove('popup-uploader_visible');  
            }
            
    }

    validator() {
            const input = document.getElementById('popup-uploader_field1');
            const error = document.getElementById('error-uploader_field1');
            const inputLink = document.getElementById('popup-uploader_field2');
            const errorLink = document.getElementById('error-uploader_field2');

            const uploaderBtn = document.querySelector('.popup-uploader__button-upload');
            const valid = { validationLenght: 'Должно быть от 2 до 30 символов',
            validationMiss: 'Это обязательное поле',
                            validationType: 'Здесь должна быть ссылка'}
                            
            if (input.validity.tooShort) {
                error.innerHTML = valid.validationLenght;
                uploaderBtn.setAttribute('disabled', true);
                uploaderBtn.classList.remove('popup-uploader__button-upload_disabled');
            }  
            
            else if (input.validity.valueMissing) {
                error.innerHTML = valid.validationMiss;
                uploaderBtn.setAttribute('disabled', true);
                uploaderBtn.classList.remove('popup-uploader__button-upload_disabled');
            }  
            
            else if (inputLink.validity.typeMismatch) {
                errorLink.innerHTML = valid.validationType;
                uploaderBtn.setAttribute('disabled', true);
                uploaderBtn.classList.remove('popup-uploader__button-upload_disabled');
            }  

            else if (inputLink.validity.valueMissing) {
                errorLink.innerHTML = valid.validationMiss;
                uploaderBtn.setAttribute('disabled', true);
                uploaderBtn.classList.remove('popup-uploader__button-upload_disabled');
            }  
            
            else {
                    error.innerHTML = '';
                    errorLink.innerHTML = '';
                    uploaderBtn.removeAttribute('disabled');
                    uploaderBtn.classList.add('popup-uploader__button-upload_disabled');
                }
    }
        
    uploadCard() {
            const uploaderForm = document.forms.uploader;  
            const name = uploaderForm.elements.place;
            const url = uploaderForm.elements.link;
            const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort6' : 'https://praktikum.tk';
            const api = new Api({
                baseUrl: serverUrl,
                headers: {
                authorization: 'cd21394a-f920-4ae5-9101-693fbfcfd353',
                'Content-Type': 'application/json'
                }
            });
            api.addNewCard(name.value, url.value);
    }
}
