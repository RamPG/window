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

export default timer;