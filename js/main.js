// 1. Initializing variables:

const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const idNumber = document.querySelector('#id-number');
const address = document.querySelector('#address');
const zipCode = document.querySelector('#zipcode');
const phone = document.querySelector('#phone');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const errorContainer = document.querySelector('.error-container')
const errorDisplay = document.querySelector('.error-display');
const resetButton = document.querySelector('.reset-button');
let idType = '';
let totalErrorsRegistered = 1;


const regExpFirstName = new RegExp('^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9})(\\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9})?$');
const regExpLastName = new RegExp(`^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19})(\\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19}$)?$`);
const regExpIdNumber = new RegExp("^([1-9]|[\\d][1-9])\\.[\\d]{3}\\.[\\d]{3}$|^((0[1-9][\\d]{6})|([1-9][\\d]{6,7}))$");
const regExpCUIL = new RegExp("^(20|23|27|30|33)(([0-9][1-9][0-9]{6}|[1-9][0-9]{7})|(-([0-9][1-9][0-9]{6}|[1-9][0-9]{7}))-)[0-9]$");
const regExpZipCode = new RegExp("^[0-9]{4}$");
const regExpAddress = new RegExp(`^[A-Za-z\\dÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç\\s\\.\\,\\-\\(\\)\\'\\"\\°\\/]{10,200}$`);
const regExpPhone = new RegExp(`^(\\+54|0)?(9[1-9]|[1-9][1-9]|[1-9][1-9][1-9])([0-9]{4}|[0-9]{3})([0-9]{4})$`);
const regExpUsername = new RegExp(`^[A-Z][a-z0-9]{6,20}$`);
const regExpPassword = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})`);

// 2. Core functions:

function validation(value, regExp) {
    return regExp.test(value)
}

function clearInput(e) {
    if(e.target.value === ''){
        e.target.style.backgroundImage = "none";
        e.target.style.backgroundColor = '#202225';
        e.target.style.color = '#ffffff';
        return true
    } return false
}

function displayErrorInLog (error) {
    totalErrorsRegistered++;
    let divError = document.createElement('div');
    let headerError = document.createElement('h3');
    let msgError = document.createElement('p');
    let popupError = document.createElement('p')
    divError.classList.add('error-display__item');
    headerError.classList.add('error-display__item__header');
    msgError.classList.add('error-display__item__msg');
    popupError.classList.add('error-display__item__msg');
    headerError.innerHTML = `${error.name} (Error N°: ${error.id > 9 ? '' : 0}${error.id})`;
    msgError.innerHTML = error.message;
    popupError.innerHTML = error.popup;
    divError.appendChild(headerError);
    divError.appendChild(msgError);
    divError.appendChild(popupError);
    errorDisplay.prepend(divError);
    return divError;
}

function createError (err, msg, popup) {
    let error = new Error(msg);
    error.name = err;
    error.id = totalErrorsRegistered;
    error.popup = popup
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
    if (ev.target.parentElement.classList.contains('input-group--address')) {
        divError.classList.add('error-display__popup--address');
    }
    setTimeout(() => divError.remove(), 3000);
    return divError
}


function displayCheckOnInput (ev) {
    ev.target.style.background='url(./css/assets/check.svg) no-repeat right';
    ev.target.style.backgroundColor = '#202225';
    ev.target.style.backgroundSize = '1.2em';
    ev.target.style.backgroundPosition = '98% center';
}

function pushErrorAnimation(error) {
    let newDivError = displayErrorInLog(error);
    let errorLogArray = document.querySelectorAll('.error-display__item');
    if (errorLogArray.length === 1) {
        displayErrorContainerAtFirstError();
        return;
    }
    let size = getComputedStyle(newDivError).height.slice(0,-2);
    for (let divError of errorLogArray) {
        divError.style.top = `-${+ size + 24}px`
        console.log(divError.style.top);
        setTimeout(() => {
            divError.style.transition = "top 0.5s";
            setTimeout(()=>divError.style.top = "0",0.15)
            setTimeout(() => divError.style.transition = "",500)
        }, 15)
    }
}

function displayErrorContainerAtFirstError () {
    errorContainer.style.display = 'flex'
    let size = getComputedStyle(errorContainer).height.slice(0,-2);
    errorContainer.style.top = `-${+ size + 32}px`
    setTimeout(() => {
        errorContainer.style.transition = "top 0.5s";
        setTimeout(()=>errorContainer.style.top = "0",0.15);
        setTimeout(() => errorContainer.style.zIndex = "initial", 500);
    }, 15)
}

function hideErrorContainer() {
    let size = getComputedStyle(errorContainer).height.slice(0,-2);
    errorContainer.style.zIndex = "-1";
    setTimeout(()=>errorContainer.style.top = `-${+ size + 32}px`, 15)
        setTimeout(() => {
            errorDisplay.innerHTML = '';
            errorContainer.style.transition = "";
            errorContainer.style.display = "none"; 
        },500);
}

function modifyInputBackgroundOnError(e) {
    e.target.style.backgroundColor= '#d63c40';
    e.target.style.backgroundImage = "none";
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
        modifyInputBackgroundOnError(e);
        let error = createError(
            'Error en el campo de nombre', 
            'Nombre inválido. Ingrese solo letras mayúsc. o minúsc.',
            'Ej: Pedro, pedro, Ruben, ruben...');
        displayWarningError(e, error);
        pushErrorAnimation(error);
    }
})


lastName.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpLastName)){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError ('Error en el campo de apellido', 
            'Apellido inválido. Ingrese solo letras mayúsc. o minúsc.',
            'Ej: ramirez, Gonzáles, McGregor, Ñandú...');
        displayWarningError(e, error);
        pushErrorAnimation(error);
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
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let popup = 'Ej: '
        if (idType.value === 'DNI') {
            popup += '6045678950, 23.345.234, 1.234.342...';
        } else {
            popup += '23-23456278-2, 27102345678, 30-10000000-0...'
        }
        let error = createError (`Error en el campo de número de ${idType.value}`, 
        `Número de ${idType.value} inválido. Ingrese un número de ${idType.value} válido.`,
        popup);
        displayWarningError(e, error);
        pushErrorAnimation(error);
    }
})

address.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpAddress) || (e.target.value === '')){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError ('Error en el campo de dirección', 
        'Dirección inválida. Ingrese una dirección válida.',
        'Ej: Estado-De-Israel 1234 5f , ...');
        displayWarningError(e, error);
        pushErrorAnimation(error);
    }
})

zipCode.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpZipCode || (e.target.value === ''))){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError ('Error en el campo de código postal', 'Código postal inválido. Ingrese un código postal válido.',
        'Ej: 1234, 0000, 9999...');
        displayWarningError(e, error);
        pushErrorAnimation(error);
    }
})

phone.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpPhone) || (e.target.value === '')){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError ('Error en el campo de teléfono', 
        'Teléfono inválido. Ingrese un teléfono válido.',
        'Ej: 1153233234, 9115488905, 1554899876...');
        displayWarningError(e, error);
        pushErrorAnimation(error);
    }
});

username.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpUsername) || (e.target.value === '')){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError ('Error en el campo de nombre de usuario', 
        'Nombre de usuario inválido. Ingrese un nombre de usuario válido.',
        'Ej: Marquitos9, Lautaro, Mon1caa, ...');
        displayWarningError(e, error);
        pushErrorAnimation(error);
    }
});

password.addEventListener('change', e =>{
    if(clearInput(e)){return}
    if(validation(e.target.value, regExpPassword) || (e.target.value === '')){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError ('Error en el campo de contraseña', 
        'Contraseña inválida. Ingrese una contraseña válida.',
        'Ej: Marcela-131297, Rocko0123, Maradona1982. , ...');
        displayWarningError(e, error);
        pushErrorAnimation(error);
    }
});


resetButton.addEventListener('click', () => {
    let exceptionsReset = [resetButton, idNumber];
    setTimeout(()=>document.body.scrollIntoView({behavior: "smooth", block: "start"}), 300)
    document.querySelectorAll('input').forEach(inputName => {
        if(!exceptionsReset.includes(inputName)){
            inputName.style.backgroundColor = '#202225';
            inputName.style.color = '#ffffff';
            idNumber.disabled = true;
        }
    } )
    hideErrorContainer();
    totalErrorsRegistered = 1;
});

