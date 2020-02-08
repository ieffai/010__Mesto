import CardList from "./card-list/card-list";

export default class Api {
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
            const authorName = document.querySelector('.user__name');
            const authorJob = document.querySelector('.user__about');   
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
            const cardContainer = document.querySelector('.card-list');
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