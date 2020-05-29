import modals from "./modals/modals";
import tabs from "./modals/tabs";
import timer from "./modals/timer";
import forms from "./modals/forms";
import calculate from "./modals/calculate";

window.addEventListener('DOMContentLoaded', () => {
    modals();
    tabs();
    forms("form");
    calculate();
    timer("2020-6-30");
});