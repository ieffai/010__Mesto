import Component from "../component";

import './popup-author.css';

export default class PopupAuthor extends Component { 
    constructor (...args) {  
    super(...args);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);  
    
    }
    show() {

        if(event.target.closest('.user__button')){
            this.domElement.classList.add('popup-author_visible');
          }
       
    }

    hide() {
        if(event.target.classList.contains('popup-author__button-close')){
            this.domElement.classList.remove('popup-author_visible');  
        }
        if(event.target.classList.contains('popup-author__button-save')){
            this.domElement.classList.remove('popup-author_visible');  
        }
    }
}
