import postRequest from "./postRequest";
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

};
export default calculate;