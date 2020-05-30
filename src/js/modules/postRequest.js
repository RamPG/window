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
export default postRequest;