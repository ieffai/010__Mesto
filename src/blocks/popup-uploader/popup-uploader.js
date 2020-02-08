import Component from "../component";

import './popup-uploader.css';

export default class PopupUploader extends Component { 
    constructor (...args) {  
    super(...args);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);  
    
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
}
