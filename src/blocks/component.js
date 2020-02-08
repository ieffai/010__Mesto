export default class Component {
    constructor (domElement) {
        this.domElement = domElement;
        this.addEventListener = this.addEventListener.bind(this);
    }
    addEventListener (...args) {
        this.domElement.addEventListener(...args);
    }
}