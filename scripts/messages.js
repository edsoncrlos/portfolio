export const Storage = {
    
    get() {
        return JSON.parse(localStorage.getItem("emailMessage")) || [];
    }, 
    
    set(allEmailMessage) {
        localStorage.setItem("emailMessage", JSON.stringify(allEmailMessage))
    },

    remove () {
        localStorage.removeItem("emailMessage");
    }
}

export const allEmailMessages = Storage.get();

export class EmailMessage {
    constructor (name, email, subject, message) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }
}
const messageList = document.querySelector('.messages__list');

const ManageMessages = {
    
    addAllEmailMessages () {
        if (messageList != null) {
            if (allEmailMessages.length > 0) {
                messageList.innerHTML = '';
                
                allEmailMessages.forEach((message => {
                    messageList.innerHTML += `
                        <li class="messages__item">
                            <p class="messages__name">${message.name}</p>
                            <p class="messages__email">${message.email}</p>
                            <p class="messages__subject">${message.subject}</p>
                            <p class="messages__message">${message.message}</p>
                        </li>
                    `;
                }))
            }
        }
    },

    updateMessages () {
        ManageMessages.addAllEmailMessages();
    }
}

ManageMessages.addAllEmailMessages ();
