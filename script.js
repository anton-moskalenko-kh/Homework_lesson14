function FormValidate(form) {
    const _elements = form.elements;
    const _parentItemClass = 'form-control';
    const _errorWrapperClass = 'error';
    const _successWrapperClass = 'success';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.checkFormElements()
    })
    this.checkFormElements = function () {
        for (let i = 0; i < _elements.length; i++) {
            const element = _elements[i];
            const reqMessage = element.dataset.req;
            if (reqMessage) {
                this.required(element, reqMessage);
            }
        }
    }
    this.required = function (element, message) {
        const notValidString = element.value.length === 0;
        const notValidCheckBox = element.type === 'checkbox' && element.checked === false;
        if (notValidString || notValidCheckBox) {
            this.errorTemplate(element, message)
        } else {
            this.successValid(element);
        }
    }

    this.errorTemplate = function (element, message) {
        const parent = element.closest(`.${_parentItemClass}`);
        if (parent.classList.contains(_errorWrapperClass) === false) {
            parent.classList.add(_errorWrapperClass);
            parent.insertAdjacentHTML('beforeend', `<small>${message}</small>`);
        }
    }
    this.successValid = function (element) {
        const parent = element.closest(`.${_parentItemClass}`);
        parent.classList.remove(_errorWrapperClass);
        parent.classList.add(_successWrapperClass);
    }

}

new FormValidate(document.querySelector('#form'));


