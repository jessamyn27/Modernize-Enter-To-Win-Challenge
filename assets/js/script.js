console.log('hello console... it\'s me');
const requestUrl = 'https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar';

let data = {};
let btnEnter = document.querySelector("#form__btn-enter");
let btnSubmitted = document.querySelector("#form__btn-submitted");
let username = document.querySelector('#name');
let city = document.querySelector('#city');
let state = document.querySelector('#state');
let phone = document.querySelector('#phone');
let email = document.querySelector('#email');
let regex2letters = /^[a-z]{2}$/i

phone.addEventListener('input', function(e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

btnEnter.addEventListener("click", (e) => {
    e.preventDefault();

    let data = {
        name: username.name,
        city: city.value,
        state: state.value,
        phone: phone.value,
        email: email.value
    }

    let passed = false;

    // username
    if (username.value.length <= 1) {
        username.classList.add('required-border')
        username.passed = false;
        console.log(`username: ${username.passed}`)
    } else if (username.value.length >= 2) {
        username.classList.remove('required-border');
        username.passed = true;
        console.log(`username: ${username.passed}`)
    }
    // phone
    if ((phone.value.match(/\d/g) == null) || (phone.value.match(/\d/g).length < 10)) {
        phone.classList.add('required-border')
        phone.passed = false;
        console.log(`phone: ${phone.passed}`)
    } else {
        phone.classList.remove('required-border');
        phone.passed = true;
        console.log(`phone: ${phone.passed}`)
    }
    //email
    if (email.value === '') {
        email.classList.add('required-border')
        email.passed = false;
        console.log(`email: ${email.passed}`)
    } else {
        email.classList.remove('required-border');
        email.passed = true;
        console.log(`email: ${email.passed}`)
    }
    // submit post and input validation
    if ((username.passed === true) && (phone.passed === true) && (email.passed === true)) {
        btnEnter.classList.add('hide')
        btnSubmitted.classList.remove('hide');
        console.log(`username: ${username.passed} phone: ${phone.passed} email: ${email.passed}`)
            // ajax call
        $.post(requestUrl, JSON.stringify(data), (data, status) => {
            console.log(data, `${status} POST data submitted`);
        })
    } else {
        console.log('error')
        console.log(passed)
    }

});