import './card.css';

export default class Card {
    constructor(link, name) {
        this.cardElement = this.createCard(link, name);
        this.cardElement.querySelector('.card__like-icon').addEventListener('click', this.like);
        this.cardElement.querySelector('.card__delete-icon').addEventListener('click', this.remove);   
        // this.counter = this.counter.likes;
    }

    createCard(linkValue, nameValue) {
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
        cardDescription.classList.add('card__description');
        cardName.classList.add('card__name');
        cardName.textContent = nameValue;
        likeContainer.classList.add('card__like-container');
        likeIcon.classList.add('card__like-icon');
        likeCounter.classList.add('card__like-counter');
        likeCounter.textContent = '1'; //this.likes.length;
 
        placeCard.appendChild(cardImage);
        cardImage.appendChild(deleteIcon);
        placeCard.appendChild(cardDescription);
        cardDescription.appendChild(cardName);
        cardDescription.appendChild(likeContainer);
        likeContainer.appendChild(likeIcon);
        likeContainer.appendChild(likeCounter);

        return placeCard;
    }
    
    like(event) {
        event.target.classList.toggle('card__like-icon_liked');
    }

    remove(event) {
        const card = event.target.closest('.card');
        card.parentNode.removeChild(card);
    }

}
