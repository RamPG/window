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

export default tabs;