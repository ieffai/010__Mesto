import "./index.css";
const serverUrl =
  NODE_ENV === "development"
    ? "http://praktikum.tk/cohort4"
    : "https://praktikum.tk/cohort4";

import PopupAuthor from "./blocks/popup-author/popup-author";
import PopupImage from "./blocks/popup-image/popup-image";
import PopupUploader from "./blocks/popup-uploader/popup-uploader";
import PopupAvatar from "./blocks/popup-avatar/popup-avatar";
import Api from "./blocks/api";


const api = new Api({
    baseUrl: serverUrl,
    headers: {
      authorization: 'cd21394a-f920-4ae5-9101-693fbfcfd353',
      'Content-Type': 'application/json'
    }
});
api.getUserInfo();
api.getInitialCards();

const uploader = document.querySelector('.popup-uploader');
const author = document.querySelector('.popup-author');
const image = document.querySelector('.popup-image');
const avatar = document.querySelector('.popup-avatar');

const popupAuthor = new PopupAuthor(author, api);
const popupImage = new PopupImage(image);
const popupUploader = new PopupUploader(uploader, api);
const popupAvatar = new PopupAvatar(avatar, api);


const root = document.querySelector('.root');
root.addEventListener('click', (event) => {
    popupAuthor.show(event);
    popupImage.show(event);
    popupUploader.show(event);
    popupAvatar.show(event)
    });
root.addEventListener('click', () => {
    popupAuthor.hide(event);
    popupImage.hide(event);
    popupUploader.hide(event);
    popupAvatar.hide(event)
    });

const uploaderForm = document.forms.uploader;
uploaderForm.addEventListener('input', () => {
    popupUploader.validator();
    });
uploaderForm.addEventListener('submit', () => {
    event.preventDefault(); 
    popupUploader.uploadCard(api);
    });

const authorForm = document.forms.author;
authorForm.addEventListener('input', () => {
    popupAuthor.validator();  
    });
authorForm.addEventListener('submit', () => {
    event.preventDefault();
    popupAuthor.сhangeName(api); 
    });

const avatarForm = document.forms.avatar;
avatarForm.addEventListener('input', () => {
    popupAvatar.validator();  
    });
avatarForm.addEventListener('submit', () => {
    event.preventDefault();
    popupAvatar.сhangeAvatar(api); 
    });
