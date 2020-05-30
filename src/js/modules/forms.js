import postRequest from "./postRequest";
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
export default forms;