import {StorageEmailMessages, allEmailMessages} from "./modules/messages.module.js";

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
const initialTextWithoutMessages = messageList.cloneNode(true);
const itemTemplate = document.querySelector('.messages__item').cloneNode(true);

const ManageMessages = {
    
    addAllEmailMessages () {
        if (allEmailMessages.length > 0) {
            trashCan.classList.add('messages__images-trash--show');
            const initialParagraph = messageList.querySelector('.messages__text');
            messageList.removeChild(initialParagraph);
            
            itemTemplate.setAttribute('style', '');
            allEmailMessages.forEach((message => {
                const copyItem = itemTemplate.cloneNode(true);

                const [name, email, subject, messages] = copyItem.querySelectorAll('.messages__sender-text');

                name.textContent = message.name;
                email.textContent = message.email;
                subject.textContent = message.subject;
                messages.textContent = message.message;
                
                messageList.appendChild(copyItem);
            }))
        }
    },
    
    removeMessages () {
        trashCan.classList.remove('messages__images-trash--show');
        StorageEmailMessages.remove();
        messageList.innerHTML = initialTextWithoutMessages.innerHTML;
    }
}

ManageMessages.addAllEmailMessages ();
