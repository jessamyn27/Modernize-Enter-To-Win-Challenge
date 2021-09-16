const requestUrl = 'https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar';

let btnEnter = document.querySelector("#form__btn-enter");
let btnSubmitted = document.querySelector("#form__btn-submitted");
let form = document.querySelector(".form");
let username = document.querySelector('#name');
let city = document.querySelector('#city');
let state = document.querySelector('#state');
let phone = document.querySelector('#phone');
let email = document.querySelector('#email');
let regex2letters = /^[a-z]{2}$/i

phone.addEventListener('input', (e) => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let data = {
        name: username.value,
        city: city.value,
        state: state.value,
        phone: phone.value,
        email: email.value
    }

    // username
    if (username.value.length <= 1) {
        username.classList.add('required-border')
        username.passed = false;
    } else if (username.value.length >= 2) {
        username.classList.remove('required-border');
        username.passed = true;
    }
    // phone
    if ((phone.value.match(/\d/g) == null) || (phone.value.match(/\d/g).length < 10)) {
        phone.classList.add('required-border')
        phone.passed = false;
    } else {
        phone.classList.remove('required-border');
        phone.passed = true;
    }
    //email
    if (email.value === '') {
        email.classList.add('required-border')
        email.passed = false;
    } else {
        email.classList.remove('required-border');
        email.passed = true;
    }
    // submit post and input validation
    if ((username.passed === true) && (phone.passed === true) && (email.passed === true)) {
        btnEnter.classList.add('hide')
        btnSubmitted.classList.remove('hide');
        // ajax call
        $.post('https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar', JSON.stringify(data), (data, status) => {
            console.log(data, `${status} POST data submitted`);
        })
    } else {
        console.log('error')
    }

});