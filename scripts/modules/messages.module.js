export const StorageEmailMessages = {
    
    get() {
        return JSON.parse(localStorage.getItem("emailMessage")) || [];
    }, 
    
    set(allEmailMessage) {
        localStorage.setItem("emailMessage", JSON.stringify(allEmailMessage));
    },

    remove () {
        localStorage.removeItem("emailMessage");
    }
}

export const allEmailMessages = StorageEmailMessages.get();

export class EmailMessage {
    constructor (name, email, subject, message) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }
}
