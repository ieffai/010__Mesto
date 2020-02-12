import CardList from "./card-list/card-list";

export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers; 
    }
    getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }    

    getInitialCards() {
        fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this.getResponse)
           
        .then((result) => {
            const cardContainer = document.querySelector('.card-list');
            const cardList = new CardList(cardContainer, result);
            cardList.render();
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
          });
    }
    
    getUserInfo() {
        fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this.getResponse)

        .then((userInfo) => {
            const name = document.querySelector('.user__name');
            const about = document.querySelector('.user__about'); 
            const avatar = document.querySelector('.user__photo');  
            name.textContent = userInfo.name;
            about.textContent = userInfo.about;
            avatar.style.backgroundImage = `url(${userInfo.avatar})`;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    sendUserInfo(nameValue, aboutValue) {

        fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: nameValue,
                about: aboutValue
            })
        })
        .then(this.getResponse)  

        .then(() => {
          this.getUserInfo();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            console.log('Я сходил и поменял тебе имя, че еще надо?!');;
        });
    } 

    addNewCard(nameValue, linkValue) {
        fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: nameValue,
                link: linkValue,
            })
        })
        .then(this.getResponse) 

        .then(() => {
            this.getInitialCards();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            console.log('Когда ты уже наиграешься?...');
        });
    }
 
    delCard(id){
        fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this.getResponse) 

        .then(() => {
            console.log('del');
            //this.getInitialCards();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            console.log('Мне она тоже не нравилась');
        });
    }

    uploadAvatar(linkValue) {
        fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: linkValue
            })
        })
        .then(this.getResponse)  
          
        .then(() => {
          this.getUserInfo();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            console.log('Теперь красивый?');;
        });
    }
}