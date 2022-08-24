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
}

// functionailty for the the inquiry box

const inquiryBox = document.querySelector("#inquire-box");
const exitButton = document.querySelector("#inquiry-exit-button");
const inquiryLink = document.querySelectorAll(".inquiry-button");

for (const link of inquiryLink) {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		inquiryBox.classList.add("inquire-box-enabled");
	});
}

if (exitButton) {
	exitButton.addEventListener("click", () => {
		inquiryBox.classList.remove("inquire-box-enabled");
	});
}

//submit data to the backend for nodemailer
const formInfo = document.querySelector(".contact-form");

let fullName = document.getElementById("name");
let email = document.getElementById("email");
let selectedModel = document.getElementById("model-list");

// added for result handling
const resultForm = document.getElementById("result-form");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-msg");
const resultBtn = document.getElementById("result-btn");

resultBtn.addEventListener("click", () => {
	resultForm.classList.add("hide");
	inquiryBox.classList.remove("inquire-box-enabled");
	document.getElementById("form-data").style.opacity = 1;
});

formInfo.addEventListener("submit", async (e) => {
	e.preventDefault();

	let formData = {
		fullName: fullName.value,
		email: email.value,
		model: selectedModel.value,
	};

	// I prefer to use fetch function (as opposed to your XML below) so we can parse and send through as json
	// using async/await for these asynchronous data calls (hence what all the .then and .catch are, if you're not familiar with this)
	let response = await fetch("/", {
		method: "POST",
		body: JSON.stringify(formData), // have to stringify our object data
		headers: { "Content-Type": "application/json" }, // important for telling recieving server what type of content is being trasmitted
	})
		.then((response) => response.json()) // have to parse json resopnse to make it readable
		.then((data) => {
			// see successful response
			console.log("Success:", data);
			return data;
		})
		.catch((error) => {
			console.error("Error:", error);
		});

	// can handle what to do next based on response (or error) received back from the fetch call
	// response.success is a variable sent back in our response from the post route that I'm using for a bit of handling below

	// we will need to manually the intest form clear the form. You could do something like wait and let them resubmit on error and then clear it, but I'm just clearing it straight of the bat here
	fullName.value = "";
	email.value = "";
	selectedModel.value = 0;

	document.getElementById("form-data").style.opacity = 0;
	resultForm.classList.remove("hide");

	resultTitle.innerHTML = response?.success ? "Success!" : "Error";
	resultMessage.innerHTML = response?.success
		? `Thank you for your interest in ${response.data.model}, ${response.data.name}. Please check <strong>${response?.data?.email?.toLowerCase()}</strong> for an email from us!`
		: "We had an issue submitting your form. Please try again later";

	// let xhr = new XMLHttpRequest();
	// xhr.open("POST", "/");
	// xhr.setRequestHeader("content-type", "application/json");
	// xhr.onload = function () {
	//     console.log(xhr.responseText)
	//     if (xhr.responseText == "success") {
	//         alert("email sent");
	//         fullName.value = "";
	//         email.value = "";
	//     } else {
	//         alert("something went wrong, try again.");
	//     };
	// };
	// xhr.send(JSON.stringify(formData));
});
