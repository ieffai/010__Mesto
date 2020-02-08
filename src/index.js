import "./index.css";


import PopupAuthor from "./blocks/popup-author/popup-author";
import PopupImage from "./blocks/popup-image/popup-image";
import PopupUploader from "./blocks/popup-uploader/popup-uploader";
import PopupAvatar from "./blocks/popup-avatar/popup-avatar";
import Api from "./blocks/api";

const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort4',
    headers: {
      authorization: 'cff214a0-7ac6-44ce-b23a-2f2cd5eb7637',
      'Content-Type': 'application/json'
    }
});

api.getUserInfo();
api.getInitialCards();

const uploader = document.querySelector('.popup-uploader');
const author = document.querySelector('.popup-author');
const image = document.querySelector('.popup-image');
const avatar = document.querySelector('.popup-avatar');

const popupAuthor = new PopupAuthor(author);
const popupImage = new PopupImage(image);
const popupUploader = new PopupUploader(uploader);
const popupAvatar = new PopupAvatar(avatar);


const root = document.querySelector('.root');
root.addEventListener('click', () => {
    popupAuthor.show();
    popupImage.show();
    popupUploader.show();
    popupAvatar.show()
    });
root.addEventListener('click', () => {
    popupAuthor.hide();
    popupImage.hide();
    popupUploader.hide();
    popupAvatar.hide()
    });

const uploaderForm = document.forms.uploader;
uploaderForm.addEventListener('input', () => {
    popupUploader.validator();
    });
uploaderForm.addEventListener('submit', () => {
    event.preventDefault(); 
    popupUploader.uploadCard();
    });

const authorForm = document.forms.author;
authorForm.addEventListener('input', () => {
    popupAuthor.validator();  
    });
authorForm.addEventListener('submit', () => {
    event.preventDefault();
    popupAuthor.сhangeName(); 
    });

const avatarForm = document.forms.avatar;
avatarForm.addEventListener('input', () => {
    popupAvatar.validator();  
    });
avatarForm.addEventListener('submit', () => {
    event.preventDefault();
    popupAvatar.сhangeAvatar(); 
    });