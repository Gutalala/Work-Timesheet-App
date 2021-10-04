import { Contact } from "./Contact";

export class User {
    constructor() {
        this.id = '';
        this.name = '';
        this.contact = new Contact;
        this.emergencyContact = [];
    }
}