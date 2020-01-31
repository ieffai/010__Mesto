///////////////////Карточка и ее функционал/////////////////
class Card {
    constructor(link, name) {
        this.cardElement = this.createCard(link, name);
        this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);  
    }

    createCard(linkValue, nameValue) {
        const placeCard = document.createElement('div');
        const cardImage = document.createElement('div');
        const deleteIcon = document.createElement('button');
        const cardDescription = document.createElement('div');
        const cardName = document.createElement('h3');
        const likeIcon = document.createElement('button');

      
        placeCard.classList.add('place-card');
        cardImage.classList.add('place-card__image');
        cardImage.style.backgroundImage = `url(${linkValue})`;
        deleteIcon.classList.add('place-card__delete-icon');
        cardDescription.classList.add('place-card__description');
        cardName.classList.add('place-card__name');
        cardName.textContent = nameValue;
        likeIcon.classList.add('place-card__like-icon');
 
      
        placeCard.appendChild(cardImage);
        cardImage.appendChild(deleteIcon);
        placeCard.appendChild(cardDescription);
        cardDescription.appendChild(cardName);
        cardDescription.appendChild(likeIcon);

        return placeCard;
    }
    
    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(event) {
        const card = event.target.closest('.place-card');
        card.parentNode.removeChild(card);
    }
}

//////////////////////Список карточек и его функционал///////////
class CardList { 
    constructor (container, list) {
        this.container = container;
        this.cards = list;
    }

    addCard (name, link) {
        const { cardElement } = new Card(name, link);
        this.cards.push(cardElement);
        this.container.appendChild(cardElement);
        popupPlaceForm.reset();
    }

     render() {
        this.cards.forEach(card => this.addCard(card.link, card.name))
    } 
}
const cardContainer = document.querySelector('.places-list');
const popupPlaceForm = document.forms.place;
const placeNameForm = popupPlaceForm.elements.place;
const placeLinkForm = popupPlaceForm.elements.link;
const cardList = new CardList(document.querySelector('.places-list'));

///////////////Popup окна и их функционал///////////////////
const popupPlace = document.querySelector('.popup__place');
const popupAuthor = document.querySelector('.popup__author');
const popupImage = document.querySelector('.popup__image');
const placeCardOpen = document.querySelector('.place-card__is-open');
class Popup { 
    constructor (popupPlace, popupAuthor, popupImage) {
    this.popupPlace = popupPlace;
    this.popupAuthor = popupAuthor;
    this.popupImage = popupImage;
    }

    open(event) {
        if(event.target.closest('.user-info__button')){
            this.popupPlace.classList.add('popup_is-opened');
          }
        if(event.target.closest('.user-edit__button')){
            this.popupAuthor.classList.add('popup_is-opened');
          }
        if (event.target.classList.contains('place-card__image')){
            this.popupImage.classList.add('popup_is-opened');
            const link = event.target.style.backgroundImage;
            placeCardOpen.setAttribute('src', link.slice(5, -2));
        }
        
    }

    close (event) {
        if(event.target.classList.contains('popup__close-place')){
            this.popupPlace.classList.remove('popup_is-opened');  
        }
        if(event.target.classList.contains('popup__button-upload')){
            this.popupPlace.classList.remove('popup_is-opened');  
        }
        if(event.target.classList.contains('popup__close-author')){
            this.popupAuthor.classList.remove('popup_is-opened');  
        }
        if(event.target.classList.contains('popup__button-save')){
            this.popupAuthor.classList.remove('popup_is-opened');  
        }
        if(event.target.classList.contains('popup__close-image')){
            this.popupImage.classList.remove('popup_is-opened');  
        }
    }
}
const popup = new Popup(popupPlace, popupAuthor, popupImage);

///////////////AuthorEditHandler////////////////////
const popupAuthorForm = document.forms.author;
const authorNameForm = popupAuthorForm.elements.name;
const authorJobForm = popupAuthorForm.elements.job;
const authorName = document.querySelector('.user-info__name');
const authorJob = document.querySelector('.user-info__job');
authorNameForm.setAttribute('value', authorName.textContent);
authorJobForm.setAttribute('value', authorJob.textContent);

function addAuthor(event) {
    event.preventDefault();
    const name = popupAuthorForm.elements.name;
    const job = popupAuthorForm.elements.job;
    api.userEdit(name.value, job.value);

}

function renderLoading(isLoading) {
    const saveBtn = document.querySelector('.popup__button-save');
    const uplBtn = document.querySelector('.popup__button-upload');
    if(isLoading) {
    saveBtn.textContent = 'Загрузка...'; 
    uplBtn.textContent = 'Загрузка...'  
    } else {
    saveBtn.textContent = 'Сохранить';   
    uplBtn.textContent = '+';
    }
}

class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        this.getUserInfo();
        this.getInitialCards();
        
    }
    getUserInfo() {
        fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })    
        .then((userInfo) => {
            authorName.textContent = userInfo.name;
            authorJob.textContent = userInfo.about;
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    getInitialCards() {
        fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })    
        .then((result) => {
            const cardList = new CardList(cardContainer, result);
            cardList.render();
        })
        .catch((err) => {
            console.log(err);
          });
    }
    
    userEdit(nameValue, aboutValue) {
        renderLoading(true);
        fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: nameValue,
                about: aboutValue
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })    
        .then(() => {
          this.getUserInfo();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
  
            renderLoading(false);
        });
    } 
    
    addNewCard(nameValue, linkValue) {
        renderLoading(true);
        fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: nameValue,
                link: linkValue
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })    
        .then(() => {
            this.getInitialCards();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false);
        });
    }
 
  }
  
const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort4',
    headers: {
      authorization: 'cff214a0-7ac6-44ce-b23a-2f2cd5eb7637',
      'Content-Type': 'application/json'
    }
});



///////////////Слушатели событий/////////////////////////
popupPlaceForm.addEventListener('submit', function (event) {
    event.preventDefault(); 
    api.addNewCard(placeNameForm.value, placeLinkForm.value);
});
document.querySelector('.root').addEventListener('click', function() {
    popup.open(event)
    });
document.querySelector('.root').addEventListener('click', function() {
    popup.close(event)
    });
popupAuthor.addEventListener('input', inputAuthorNameValidator);
popupAuthor.addEventListener('input', inputAuthorJobValidator);
popupPlaceForm.addEventListener('input', inputPlaceLinkValidator);
popupPlaceForm.addEventListener('input', inputPlaceNameValidator);
popupAuthorForm.addEventListener('submit', addAuthor);


