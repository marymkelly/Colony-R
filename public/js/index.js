//functionality for the model preveiws 

const modelContainer = document.getElementsByClassName("model-image");
const inquiryButton = document.getElementsByClassName("inquiry-button");

for (const container of modelContainer) {
    container.addEventListener("mouseover", () => {
        const button = container.children[0];
        button.classList.add("inquire-active");
    });

    container.addEventListener("mouseout", () => {
        const button = container.children[0];
        button.classList.remove("inquire-active");
    });
};

// functionailty for the the inquiry box 

const inquiryBox = document.querySelector("#inquire-box");
const exitButton = document.querySelector("#inquiry-exit-button");
const inquiryLink = document.querySelectorAll(".inquiry-button");

for (const link of inquiryLink) {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        inquiryBox.classList.add("inquire-box-enabled");
    });
};

if (exitButton) {
    exitButton.addEventListener("click", () => {
        inquiryBox.classList.remove("inquire-box-enabled");
    });
};

//submit data to the backend for nodemailer


const formInfo = document.querySelector(".contact-form");

let fullName = document.getElementById("name");
let email = document.getElementById("email");
let selectedModel = document.getElementById("model-list");

formInfo.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let formData = {
        fullName: fullName.value,
        email: email.value,
        model: selectedModel.value
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function () {
        console.log(xhr.responseText)
        if (xhr.responseText == "success") {
            alert("email sent");
            fullName.value = "";
            email.value = "";
        } else {
            alert("something went wrong, try again.");
        };
    };
    xhr.send(JSON.stringify(formData));

});



