// 1. Initializing variables:

const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
let idType = '';
const idNumber = document.querySelector('#id-number');
const address = document.querySelector('#address');

// const DNIRadio = document.getElementById('DNI');
// const CUILRadio = document.getElementById('CUIL');

const regExpFirstName = new RegExp('^[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9}$');
const regExpLastName = new RegExp(`^[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19}$`);
const regExpIdNumber = new RegExp("^([1-9]|[\\d][1-9])\\.[\\d]{3}\\.[\\d]{3}$|^((0[1-9][\\d]{6})|([1-9][\\d]{6,7}))$");
const regExpCUIL = new RegExp("^(20|23|27|30|33)(([0-9][1-9][0-9]{6}|[1-9][0-9]{7})|(-([0-9][1-9][0-9]{6}|[1-9][0-9]{7}))-)[0-9]$");
const regExpAddress = new RegExp(`^[A-Za-z\\dÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇ\\s\\.\\,\\-\\(\\)\\'\\"\\°\\/]{10,200}$`);

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
        e.target.style.backgroundColor = '#ffffff';
        return true
    } return false
}



// 3. Adding Events

document.querySelectorAll('.input-group-idtype__input').forEach(inputName => {
    inputName.addEventListener('change',  e => {
        idType = e.target;
        idNumber.value = '';
        idNumber.style.backgroundColor = '#ffffff'
    })
})


/////////////

firstName.addEventListener('change', e =>{
    if(clearInput(e)){return}
    if(validation(e.target.value, regExpFirstName) || (e.target.value === '')){
        e.target.style.backgroundColor= 'green';
    } else {
        e.target.style.backgroundColor= 'red';
    }
})

lastName.addEventListener('change', e =>{
    if(clearInput(e)){return}
    if(validation(e.target.value, regExpLastName)){
        e.target.style.backgroundColor= 'green';
    } else {
        e.target.style.backgroundColor= 'red';
    }
})

idNumber.addEventListener('change', e => {
    if(clearInput(e)){return}
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
        e.target.style.backgroundColor= 'red';
    }
})

address.addEventListener('change', e =>{
    if(clearInput(e)){return}
    if(validation(e.target.value, regExpAddress) || (e.target.value === '')){
        e.target.style.backgroundColor= 'green';
    } else {
        e.target.style.backgroundColor= 'red';
    }
})


