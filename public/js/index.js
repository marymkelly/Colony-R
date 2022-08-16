const modelContainer = document.getElementsByClassName("model-image");
const inquiryButton = document.getElementsByClassName("inquiry-button");

console.log(modelContainer, inquiryButton);

for (let container of modelContainer) {
    container.addEventListener("mouseover", () => {
        for (let button = 0; button < inquiryButton.length; button++) {
            inquiryButton[button].classList.add("inquir-active");
        };
    });
};