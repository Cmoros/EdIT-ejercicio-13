// 1. Initializing variables:

const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
let idType = '';
const idNumber = document.querySelector('#id-number');
const address = document.querySelector('#address');
const zipCode = document.querySelector('#zipcode');
const phone = document.querySelector('#phone');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const errorContainer = document.querySelector('.error-container')
const errorDisplay = document.querySelector('.error-display');
const resetButton = document.querySelector('.reset-button');
let totalErrorsRegistered = 1;


const regExpFirstName = new RegExp('^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9})(\\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9})?$');
const regExpLastName = new RegExp(`^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19})(\\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19}$)?$`);
const regExpIdNumber = new RegExp("^([1-9]|[\\d][1-9])\\.[\\d]{3}\\.[\\d]{3}$|^((0[1-9][\\d]{6})|([1-9][\\d]{6,7}))$");
const regExpCUIL = new RegExp("^(20|23|27|30|33)(([0-9][1-9][0-9]{6}|[1-9][0-9]{7})|(-([0-9][1-9][0-9]{6}|[1-9][0-9]{7}))-)[0-9]$");
const regExpZipCode = new RegExp("^[0-9]{4}$");
const regExpAddress = new RegExp(`^[A-Za-z\\dÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇ\\s\\.\\,\\-\\(\\)\\'\\"\\°\\/]{10,200}$`);
const regExpPhone = new RegExp(`^(\\+54|0)?(9[1-9]|[1-9][1-9]|[1-9][1-9][1-9])([0-9]{4}|[0-9]{3})([0-9]{4})$`);
const regExpUsername = new RegExp(`^[A-Z][a-z0-9]{6,20}$`);
const regExpPassword = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})`);

// 2. Core functions:

function validateName(firstName, regExpFirstName) {
    let _match = validation(firstName.value, regExpFirstName);
    if(!_match){
        throw new Error('Nombre inválido. Ingrese solo letras mayúsc. o minúsc.');
    } else {
        return true;
    }
}

function validation(value, regExp) {
    return regExp.test(value)
}

function clearInput(e) {
    if(e.target.value === ''){
        e.target.style.backgroundColor = '#202225';
        e.target.style.color = '#ffffff';
        return true
    } return false
}

function displayErrorInLog (error) {
    displayErrorContainerAtFirstError();
    totalErrorsRegistered++;
    let divError = document.createElement('div');
    let headerError = document.createElement('h3');
    let msgError = document.createElement('p');
    divError.classList.add('error-display__item');
    headerError.classList.add('error-display__item__header');
    msgError.classList.add('error-display__item__msg');
    headerError.innerHTML = `${error.name} (Error N°: ${error.id > 9 ? '' : 0}${error.id})`;
    msgError.innerHTML = error.message;
    divError.appendChild(headerError);
    divError.appendChild(msgError);
    errorDisplay.prepend(divError);
    return divError
}

function createError (err, msg) {
    let error = new Error(msg);
    error.name = err;
    error.id = totalErrorsRegistered;
    return error
}

function trimValue (ev) {
    ev.target.value = ev.target.value.trim();
}

function displayWarningError (ev, err) {
    let divError = document.createElement('div');
    divError.classList.add('error-display__popup');
    divError.innerHTML = err.message;
    ev.target.insertAdjacentElement('afterend', divError);
    setTimeout(() => { divError.remove() }, 3000);
    return divError
}


function displayErrorContainerAtFirstError () {
    if(errorContainer.style.display !== 'flex'){
        errorContainer.style.display = 'flex'
    }
}

function displayCheckOnInput (ev) {
    ev.target.style.background='url(./css/assets/check.svg) no-repeat right';
    ev.target.style.backgroundColor = '#202225';
    ev.target.style.backgroundSize = '1.2em';
    ev.target.style.backgroundPosition = '98% center';
}

// 3. Adding Events

document.querySelectorAll('.input-group-idtype__input').forEach(inputName => {
    inputName.addEventListener('change',  e => {
        idType = e.target;
        idNumber.disabled = false;
        idNumber.value = '';
        idNumber.style.backgroundColor = '#202225';
        idNumber.style.color = '#ffffff';
    })
})


/////////////

firstName.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpFirstName) || (e.target.value === '')){
        displayCheckOnInput(e);
    } else {
        e.target.style.backgroundColor= '#d63c40';
        let error = createError('Error en el campo de nombre', 'Nombre inválido. Ingrese solo letras mayúsc. o minúsc.');
        displayWarningError(e, error);
        displayErrorInLog(error);
    }
})

lastName.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpLastName)){
        e.target.style.backgroundColor= 'green';
    } else {
        e.target.style.backgroundColor= '#d63c40';
        let error = createError ('Error en el campo de apellido', 'Apellido inválido. Ingrese solo letras mayúsc. o minúsc.');
        displayWarningError(e, error);
        displayErrorInLog(error);
    }
})

idNumber.addEventListener('change', e => {
    if(clearInput(e)){return}
    trimValue(e);
    let validated;
    if(idType.value === 'DNI'){
        validated = validation(e.target.value, regExpIdNumber);
        // console.log(validated)
    } else {
        validated = validation(e.target.value, regExpCUIL);
    }
    
    if(validated){
        e.target.style.backgroundColor= 'green';
    } else {
        e.target.style.backgroundColor= '#d63c40';
        let error = createError (`Error en el campo de número de ${idType.value}`, `Número de ${idType.value} inválido. Ingrese un número de ${idType.value} válido.`);
        displayWarningError(e, error);
        displayErrorInLog(error);
    }
})

address.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpAddress) || (e.target.value === '')){
        e.target.style.backgroundColor= 'green';
    } else {
        e.target.style.backgroundColor= '#d63c40';
        let error = createError ('Error en el campo de dirección', 'Dirección inválida. Ingrese una dirección válida.');
        displayWarningError(e, error);
        displayErrorInLog(error);
    }
})

zipCode.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpZipCode || (e.target.value === ''))){
        e.target.style.backgroundColor= 'green';
    } else {
        e.target.style.backgroundColor= '#d63c40';
        let error = createError ('Error en el campo de código postal', 'Código postal inválido. Ingrese un código postal válido.');
        displayWarningError(e, error);
        displayErrorInLog(error);
    }
})

phone.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpPhone) || (e.target.value === '')){
        e.target.style.backgroundColor= 'green';
    } else {
        e.target.style.backgroundColor= '#d63c40';
        let error = createError ('Error en el campo de teléfono', 'Teléfono inválido. Ingrese un teléfono válido.');
        displayWarningError(e, error);
        displayErrorInLog(error);
    }
})

username.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpUsername) || (e.target.value === '')){
        e.target.style.backgroundColor= 'green';
    } else {
        e.target.style.backgroundColor= '#d63c40';
        let error = createError ('Error en el campo de nombre de usuario', 'Nombre de usuario inválido. Ingrese un nombre de usuario válido.');
        displayWarningError(e, error);
        displayErrorInLog(error);
    }
})

password.addEventListener('change', e =>{
    if(clearInput(e)){return}
    if(validation(e.target.value, regExpPassword) || (e.target.value === '')){
        e.target.style.backgroundColor= 'green';
    } else {
        e.target.style.backgroundColor= '#d63c40';
        let error = createError ('Error en el campo de contraseña', 'Contraseña inválida. Ingrese una contraseña válida.');
        displayWarningError(e, error);
        displayErrorInLog(error);
    }
})

let exceptionsReset = [resetButton, idNumber];

resetButton.addEventListener('click', e => {
    errorDisplay.innerHTML = '';
    document.querySelectorAll('input').forEach(inputName => {
        if(!exceptionsReset.includes(inputName)){
            inputName.style.backgroundColor = '#202225';
            inputName.style.color = '#ffffff';
            idNumber.disabled = true;
        }
    } )
    errorContainer.style.display = 'none';
    totalErrorsRegistered = 1;
})