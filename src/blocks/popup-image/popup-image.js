import Component from "../component";

import './popup-image.css';

export default class PopupImage extends Component { 
    constructor (...args) {  
    super(...args);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);  
    
    }
    show() {
        if (event.target.classList.contains('card__image')){
            this.domElement.classList.add('popup-image_visible');
            const link = event.target.style.backgroundImage;
            const placeCardOpen = document.querySelector('.popup-image__image');
            placeCardOpen.setAttribute('src', link.slice(5, -2));
        }
       
    }

    hide() {
        if(event.target.classList.contains('popup-image__button-close')){
            this.domElement.classList.remove('popup-image_visible');  
        }
    }
}
