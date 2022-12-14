import {Storage, allEmailMessages} from "./modules/messages.module.js";

// modal
const modal = document.querySelector('.messages__modal');
const trashCan = document.querySelector('.messages__images-trash');
const modalExitButton = document.querySelector('.messages__button-cancel');
const eraseMessagesButton = document.querySelector('.messages__button-confirm');

trashCan.onclick = () => {
    modal.show();
}

modalExitButton.onclick = () => {
    modal.close();
}

eraseMessagesButton.onclick = () => {
    ManageMessages.removeMessages();
    modal.close();
}

// add messages
const messageList = document.querySelector('.messages__list');
const initialTextWithoutMessages = document.querySelector('.message__text');

const ManageMessages = {
    
    addAllEmailMessages () {
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
                                <b class="messages__label">Nome</b> <span class="messages__sender-text">${message.name}</span>
                            </p>
                            <p class="messages__sender">
                                <b class="messages__label">Email</b> <span class="messages__sender-text">${message.email}</span>
                            </p>
                            <p class="messages__sender">
                                <b class="messages__label">Assunto</b> <span class="messages__sender-text">${message.subject}</span>
                            </p>
                            <p class="messages__sender-text">${message.message}</p>
                        </li>
                    `;
            }))
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

ManageMessages.addAllEmailMessages ();
