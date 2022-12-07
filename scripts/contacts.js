const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
        
    try {
        const {name, email, subject, message} = getValues();

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
