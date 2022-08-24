const sgMail = require("@sendgrid/mail");
// process.env allows us to access environment (secret) variables that remain private from the client side facing app
// they play a huge role in relation to security and and are commonly are used for things like access keys or secrets used for ecryption
// to load them, another package was installed called dotenv and you'll see your npm script is modified to have nodemon load the .env file
// note: variable names at the end of process.env (i.e. SENDGRID_API_KEY) are assigned inside of the .env file (should be in the project directory)
// IMPORTANT: normally you would not want to have a .env file exposed in something like a public github repository. For demonstration purposes, I will upload the file, but without the api key.
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, name, model) => {
	// another way to write and handle asynchronous calls
	try {
		await sgMail.send({
			to: email, // Change to your recipient
			from: "inquiry@colony.r", // Change to verified email you add in send grid. Must add otherwise it throws an error. 
			subject: "Test Email",
			text: `Thank you, ${name} (${email})! We have recieved your inquiry about ${model}!`,
			// html: "<strong>Send emails easily, even with Node.js</strong>", // could send html formatted email
		});
	} catch (error) {
		console.error(error);
		throw error; // should send error up the async chain if there is one
	}
};

// allows us to import our function in another file (see server.js)
module.exports = { sendEmail };
