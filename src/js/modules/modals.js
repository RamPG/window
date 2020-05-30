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

export default modals;