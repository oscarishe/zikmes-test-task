const URL = 'https://jsonplaceholder.typicode.com/posts';

export default class Form {
    constructor() {
        this.main = document.querySelector('.order');
        this.form = document.querySelector('.form')
        this.input = document.querySelector('.form__input');
        this.submit = document.querySelector('.form__submit');
        this.submitContainer = document.querySelector('.form__section_submit');
        this.notice = document.createElement('div');
        this.notice.classList.add('notice');
    }
    addValidation() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            let pattern = /^(\+?375|80)(29|25|44|33)(\d{7})$/;
            if(pattern.test(this.input.value)) {
                this.fetchData();
            }
            else this.showPhoneError();
        });
        this.form.addEventListener('input', () => {
            if(!this.input.value) {
                this.submitContainer.classList.add('form__section_disabled');
                this.submit.disabled = true;
            }
            else {
                this.submitContainer.classList.remove('form__section_disabled');
                this.submit.disabled = false;
            }
        })
    }
    showServerError() {
        this.notice.innerText = 'Ошибка сервера';
        this.notice.classList.add('notice_error');
        this.notice.classList.remove('notice_success');
        this.main.append(this.notice);
    }
    showPhoneError() {
        this.notice.innerText = 'Неправильный номер телефона';
        this.notice.classList.add('notice_error');
        this.notice.classList.remove('notice_success');
        this.main.append(this.notice);
    }
    hideError() {
        this.notice.remove();
    }
    showSuccess() {
        this.notice.classList.remove('notice_error');
        this.notice.classList.add('notice_success');
        this.notice.innerText = 'Данные успешно отправлены';
        this.main.append(this.notice);
        this.clearForm();
    }
    clearForm() {
        this.input.value = '';
    }
    fetchData = async () => {
        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify ({  
              body: this.input.value,  
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
        }});
        if(response.ok) this.showSuccess();
        else this.showServerError();
    }
    
}