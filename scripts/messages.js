export const Storage = {
    
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
const initialTextWithoutMessages = document.querySelector('.message__text');

const ManageMessages = {
    
    addAllEmailMessages () {
        if (messageList != null) {
            if (allEmailMessages.length > 0) {
                messageList.innerHTML = `
                    <div class="messages__wrap-image">
                        <img class="messages__image-trash" src="assets/icons/trash-can.svg" alt="cesta de lixo vermelha">
                    </div>
                `;
                
                allEmailMessages.forEach((message => {
                    messageList.innerHTML += `
                        <li class="messages__item">
                            <p class="messages__sender">
                                <b>Nome</b> <span class="messages__sender-text">${message.name}</span>
                            </p>
                            <p class="messages__sender">
                                <b>Email</b> <span class="messages__sender-text">${message.email}</span>
                            </p>
                            <p class="messages__sender">
                                <b>Assunto</b> <span class="messages__sender-text">${message.subject}</span>
                            </p>
                            <p class="messages__sender-text">${message.message}</p>
                        </li>
                    `;
                }))
            }
        }
    },

    updateMessages () {
        ManageMessages.addAllEmailMessages();
    }, 

    removeMessages () {
        Storage.remove();
        messageList.innerHTML = '';
        messageList.appendChild(initialTextWithoutMessages)
    }
}

const path = document.URL.match('messages')

if (path != null && path[0] === 'messages') {

    ManageMessages.addAllEmailMessages ();

    // modal
    const modal = document.querySelector('.messages__modal');
    const trashCan = document.querySelector('.messages__image-trash');
    const modalExitButton = document.querySelector('.messages__button-cancel');
    const eraseMessagesButton = document.querySelector('.messages__button-confirm');

    if (trashCan != null) {
        trashCan.onclick = () => {
            modal.show();
        }
    }

    modalExitButton.onclick = () => {
        modal.close();
    }

    eraseMessagesButton.onclick = () => {
        ManageMessages.removeMessages();
        modal.close();
    }
}
