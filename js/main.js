const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelectors) {
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);

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
        closeSelectors.forEach((item) => {
            document.querySelector(item).addEventListener("click", () => {
                modal.style.display = "none";
                document.body.style.overflow = "";
            })
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "";
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', ['.popup_engineer .popup_close']);
    bindModal('.phone_link', '.popup', ['.popup .popup_close']);
    bindModal(".glazing_price_btn", ".popup_calc", [".popup_calc_close", ".popup_calc_button"]);
    bindModal(".popup_calc_button", ".popup_calc_profile", [".popup_calc_profile_close", ".popup_calc_profile_button"]);
    bindModal(".popup_calc_profile_button", ".popup_calc_end", [".popup_calc_end_close"]);
    // showModalByTime('.popup', 60000);
};
const tabs = () => {
    function bindTabs(slidesSelector, contentSelector, activeClass, display) {
        const sliders = document.querySelectorAll(slidesSelector);
        const content = document.querySelectorAll(contentSelector);

        function showTab(indexTab) {
            content.forEach((item, index) => {
                if (index === indexTab) {
                    item.style.display = display;
                    sliders[index].classList.add(activeClass);
                } else {
                    item.style.display = "none";
                    sliders[index].classList.remove(activeClass);
                }
            });
        }

        sliders.forEach((item, index) => {
            item.addEventListener("click", () => {
                showTab(index);
            })
        })
        showTab(0);
    }

    bindTabs(".glazing_block", ".glazing_content", "active", "block");
    bindTabs(".no_click", ".decoration_content > div > div", "after_click", "block");
    bindTabs(".balcon_icons_img", ".big_img > img", "do_image_more", "inline");

};
const postRequest = (data, formDoc) => {
    const clearInputs = () => {
        formDoc.querySelectorAll("input").forEach((item) => {
            item.value = "";
        })
    }
    let messages = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };
    const statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    formDoc.appendChild(statusMessage);
    const postData = async (url, data) => {
        statusMessage.textContent = messages.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };
    postData('server.php', data)
        .then(() => {
            statusMessage.textContent = messages.success;
        })
        .catch(() => statusMessage.textContent = messages.failure)
        .finally(() => {
            clearInputs();
            setTimeout(() => {
                statusMessage.remove();
            }, 5000);
        });
};
const forms = (formSelector) => {
    const statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    const formsList = document.querySelectorAll(formSelector);
    formsList.forEach((item) => {
        item.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const formData = new FormData(item)
            postRequest(formData, item);
        });
    })
}
const timer = (deadline) => {
    const deadlineParse = new Date(deadline);
    const daysElement = document.querySelector("#days");
    const hoursElement = document.querySelector("#hours");
    const minutesElement = document.querySelector("#minutes");
    const secondsElement = document.querySelector("#seconds");
    const addZero = (number) => (number < 10) ? "0" + number : number;

    function setTime() {
        const totalTime = deadlineParse - Date.now();
        if (totalTime > 0) {
            const days = Math.floor(totalTime / 1000 / 60 / 60 / 24);
            const hours = Math.floor(totalTime / 1000 / 60 / 60 % 24);
            const minutes = Math.floor(totalTime / 1000 / 60 % 60);
            const seconds = Math.floor(totalTime / 1000 % 60);
            daysElement.textContent = addZero(days);
            hoursElement.textContent = addZero(hours);
            minutesElement.textContent = addZero(minutes);
            secondsElement.textContent = addZero(seconds);
        } else {
            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
        }
    }

    setInterval(setTime, 1000);
};
const calculate = () => {
    const formBalconyDoc = document.querySelectorAll(".balcon_icons_img");
    const widthBalconyDoc = document.querySelector("#width");
    const heightBalconyDoc = document.querySelector("#height");
    const viewBalconyDoc = document.querySelector("#view_type");
    const coldBalconyDoc = document.querySelector("#cold");
    const warmBalconyDoc = document.querySelector("#warm");
    const buttonCalc = document.querySelector(".button_calc");
    const nameDoc = document.querySelector(".calc_name");
    const phoneDoc = document.querySelector(".calc_phone");
    const dataCalc = {};


    buttonCalc.addEventListener("click", (evt) => {
        evt.preventDefault();
        for (let i = 0; i < formBalconyDoc.length; i++) {
            if (formBalconyDoc[i].classList.contains("do_image_more")) {
                dataCalc["form"] = i;
                formBalconyDoc[i].classList.remove("do_image_more")
                formBalconyDoc[0].classList.add("do_image_more");
                break
            }
        }
        dataCalc["width"] = widthBalconyDoc.value;
        widthBalconyDoc.value = "";
        dataCalc["height"] = heightBalconyDoc.value;
        heightBalconyDoc.value = ""
        dataCalc["view"] = viewBalconyDoc.value;
        viewBalconyDoc.value = "tree";
        dataCalc["cold"] = coldBalconyDoc.checked;
        coldBalconyDoc.checked = false;
        dataCalc["warm"] = warmBalconyDoc.checked;
        warmBalconyDoc.value = false;
        dataCalc["name"] = nameDoc.value;
        nameDoc.value = "";
        dataCalc["phone"] = phoneDoc.value;
        phoneDoc.value = "";
        postRequest(JSON.stringify(dataCalc), document.querySelector(".calc_form"));

    })

}
window.addEventListener('DOMContentLoaded', () => {
    modals();
    tabs();
    forms("form");
    calculate();
    timer("2020-6-30");
});