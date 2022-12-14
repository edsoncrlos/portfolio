import {StorageEmailMessages, allEmailMessages, EmailMessage} from "./modules/messages.module.js";
const form = document.querySelector('.form');
const TimeForShowPopUp = 4000;
const TimeShowCheckIcon = 3000;

function cleanFields() {
    const fields = document.querySelectorAll('.form__group [required]');
    fields.forEach((field) => {
        field.value = '';
    }); 
}

function showPopUpForCertainTime (selector) {
    const popUP = document.querySelector(`.${selector}`);
    popUP.classList.remove('form__status--display-none');

    setTimeout(() => {
        popUP.classList.add('form__status--display-none');
    }, TimeForShowPopUp);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
        const {name, email, subject, message} = getValues();
        const emailMessage = new EmailMessage(name, email, subject, message);
        allEmailMessages.push(emailMessage);
        StorageEmailMessages.set(allEmailMessages);
        showPopUpForCertainTime('form__success');
        cleanFields();
        
    } catch (e) {
        if (e instanceof emailFormatException) {
            removeCharactersNotAllowed(e);
            const spanErrorMessage = e.target.nextElementSibling;
            
            let errorMessage = `O símbolo ${e.value.toString().replace(',',' ')} não é permido.`;
            if (e.value.length > 1) {
                errorMessage = `Os símbolos ${e.value.toString().replace(',',' ')} não são permidos.`;
            }
            spanErrorMessage.textContent = errorMessage;
            spanErrorMessage.classList.remove('sr-only');
        } else {
            console.log(e);
            showPopUpForCertainTime('form__error');
        }
    }
})

function getValues() {
    const fields = document.querySelectorAll('.form__group [required]');
    const fieldsSendEmail = {};

    try {
        fields.forEach((field) => {
            if (field.type === 'email') {
                validateEmail(field);
            }
            fieldsSendEmail[field.id] = field.value.trim();
        }); 

        return fieldsSendEmail;
    } catch (e) {
        throw e;
    }
}

function validateEmail (email) {
    const regex = /[^\w.@]/g
    const emailInput = email; 
    const emailText = email.value;
    
    const notShouldContain = emailText.match(regex);
    if (notShouldContain != null && notShouldContain.length != 0) {
        throw new emailFormatException(notShouldContain, emailInput);
    }
}

function emailFormatException (value, target) {
    this.value = value;
    this.message = "These characters not allowed";
    this.target = target;

    this.toString = () =>  {
        return this.value + this.message;
    };
}

function removeCharactersNotAllowed (e) {
    const text = e.target.value;
    e.target.value = text.replace(/[^\w.@]/g, '');
}

const RequiredFields = {
    requiredFields: document.querySelectorAll('[required]'),
    requiredFieldsMessage: {
        name: 'Digite o seu nome, por favor.',
        email: 'Digite o seu email, por favor',
        subject: 'Diga qual o assunto do email, por favor.',
        message: 'Opa, eu acho que você esqueceu de digitar a mensagem.'
    },

    invalid(e) {
        e.preventDefault();
        if (e.target.value === '') {
            const spanErrorMessage = e.target.nextElementSibling;
            spanErrorMessage.textContent = RequiredFields.requiredFieldsMessage[e.target.name];
            spanErrorMessage.classList.remove('sr-only');

            e.target.removeEventListener('invalid', (e) => RequiredFields.invalid(e));
            e.target.addEventListener('input', (e) => RequiredFields.hasCaractere(e));
        } else if (e.target.type === 'email') {

            const spanErrorMessage = e.target.nextElementSibling;
            spanErrorMessage.textContent = 'Seu email deve conter @ e o domínio: Example@domínio.com';
            spanErrorMessage.classList.remove('sr-only');

            e.target.removeEventListener('invalid', (e) => RequiredFields.invalid(e));
            e.target.addEventListener('input', (e) => RequiredFields.hasCaractere(e));
        }
    },

    hasCaractere(e) {
        e.preventDefault();
        const spanErrorMessage = e.target.nextElementSibling;
        spanErrorMessage.classList.add('sr-only');
        e.target.addEventListener('invalid', (e) => RequiredFields.invalid(e));
        e.target.removeEventListener('input', (e) => RequiredFields.hasCaractere(e));
    }
}

RequiredFields.requiredFields.forEach((required) => {
    required.addEventListener('invalid', (e) => RequiredFields.invalid(e));
})

//clipboard
const clipboard = document.querySelector('.clipboard');

function toggleIconsInClipboard () {
    const copy = document.querySelector('.clipboard__copy');
    const success = document.querySelector('.clipboard__success');

    copy.classList.add('clipboard__icon--display-none');
    success.classList.remove('clipboard__icon--display-none');

    setTimeout (() => {
        copy.classList.remove('clipboard__icon--display-none');
        success.classList.add('clipboard__icon--display-none');
    }, TimeShowCheckIcon);
}

clipboard.onclick = () => {
    const contact = document.querySelector('.contacts-list__contact');

    try {
        (async () => {
            await navigator.clipboard.writeText(contact.textContent)
        })();
        toggleIconsInClipboard();
    } catch (e) {
        console.log(e)
    };
}
