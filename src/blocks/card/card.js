import './card.css';
import Api from "../api";
export default class Card {
    constructor(link, name, likes) {
        this.cardElement = this.createCard(link, name, likes);
        this.cardElement.querySelector('.card__like-icon').addEventListener('click', this.like);
        this.cardElement.querySelector('.card__delete-icon').addEventListener('click', this.remove);   
    }

    createCard(linkValue, nameValue, likesValue) {
        const placeCard = document.createElement('div');
        const cardImage = document.createElement('div');
        const deleteIcon = document.createElement('button');
        const cardDescription = document.createElement('div');
        const cardName = document.createElement('h3');
        const likeContainer = document.createElement('div');
        const likeIcon = document.createElement('button');
        const likeCounter = document.createElement('p');
        
    
        placeCard.classList.add('card');
        cardImage.classList.add('card__image');
        cardImage.style.backgroundImage = `url(${linkValue})`;

        deleteIcon.classList.add('card__delete-icon');
        // console.log(idValue.length);


        cardDescription.classList.add('card__description');
        cardName.classList.add('card__name');
        cardName.textContent = nameValue;
        likeContainer.classList.add('card__like-container');
        likeIcon.classList.add('card__like-icon');
        likeCounter.classList.add('card__like-counter');
        likeCounter.textContent = likesValue.length;
 
        placeCard.appendChild(cardImage);
        cardImage.appendChild(deleteIcon);
        placeCard.appendChild(cardDescription);
        cardDescription.appendChild(cardName);
        cardDescription.appendChild(likeContainer);
        likeContainer.appendChild(likeIcon);
        likeContainer.appendChild(likeCounter);

        return placeCard;
    }
    
    like() {
        this.classList.toggle('card__like-icon_liked');
    }

    remove() {
        const card = this.closest('.card');
        card.parentNode.removeChild(card);
        const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort6' : 'https://praktikum.tk';
        const api = new Api({
            baseUrl: serverUrl,
            headers: {
              authorization: 'cd21394a-f920-4ae5-9101-693fbfcfd353',
              'Content-Type': 'application/json'
            }
        });
        api.delCard();
    }



}
