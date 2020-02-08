import './card-list.css';

import Card from "../card/card";

export default class CardList { 
    constructor (container, list) {
        this.container = container;
        this.cards = list;
    }

    addCard (name, link) {
        const { cardElement } = new Card(name, link);
        this.cards.push(cardElement);
        this.container.appendChild(cardElement);
    }

     render() {
        this.cards.forEach(card => this.addCard(card.link, card.name))
    } 
}
