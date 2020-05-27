const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);

        trigger.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                // document.body.classList.add('modal-open');
            });
        });

        close.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "";
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    // showModalByTime('.popup', 60000);
};
const tabs = () => {
    function bindTabs(slidesSelector, contentSelector, activeClass) {
        const sliders = document.querySelectorAll(slidesSelector);
        const content = document.querySelectorAll(contentSelector);

        function showTab(indexTab) {
            content.forEach((item, index) => {
                if (index === indexTab) {
                    item.style.display = "block";
                    sliders[index].classList.add(activeClass);
                } else {
                    item.style.display = "none";
                    sliders[index].classList.remove(activeClass);
                }
            });
        }

        sliders.forEach((item, index) => {
            item.addEventListener("click", (evt) => {
                showTab(index);
            })
        })
    }

    bindTabs(".glazing_block", ".glazing_content", "active");
    bindTabs(".no_click", ".decoration_content > div > div", "after_click");

};
const forms = () => {
    let messages = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    const statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    const formsList = document.querySelectorAll("form");

    formsList.forEach((item, index) => {
        item.addEventListener("submit", (evt) => {
            evt.preventDefault();
            item.appendChild(statusMessage);
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            const formData = new FormData(item);
            const obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);
            request.send(json);

            request.addEventListener('readystatechange', function () {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = messages.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = messages.success;
                } else {
                    statusMessage.innerHTML = messages.failure;
                }
            });

            const inputList = item.querySelectorAll("input");
            inputList.forEach((item) => {
                item.value = "";
            })
        });
    })
};
window.addEventListener('DOMContentLoaded', () => {
    modals();
    tabs();
    forms();
});