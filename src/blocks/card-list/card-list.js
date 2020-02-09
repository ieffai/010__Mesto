import './card-list.css';

import Card from "../card/card";

export default class CardList { 
    constructor (container, cardlist) {
        this.container = container;
        this.cardlist = cardlist;
    }

    addCard (name, link, likes) {
        const { cardElement } = new Card(name, link, likes, owner._id);
        this.cardlist.push(cardElement);
        this.container.appendChild(cardElement);
    }

    ownerCheck(card) {
        if (card.owner._id !== '1e8883c74b1f4e612b645bb0') {
            console.log('A');
            //return false;
        }
        console.log('B');
        //return true;
    }

    render() {
        this.cardlist.forEach(item => this.addCard(item.link, item.name, item.likes))
    } 
}
//card.owner = this.ownerCheck(item);