const path = require("path");
const express = require("express");
const app = express();
const { sendEmail } = require("./public/js/email"); // access our sendEmail function

app.use(express.static(path.join(__dirname, "public"))); // added node path module above and wrote these lines in such a way so this code is always relative to the project directory
app.set("views", path.join(__dirname, "views")); // views is used to find the commonly named "views" file with html/other files actually being served to the user
app.engine(".html", require("ejs").__express); // app.engine allows us to set template engine/files (this line also happens to extend our html so we can write ejs directly in html files without issue/having to use .ejs files)
app.set("view engine", "html"); // sets our view engine to default to serving html files if the file extension is ommitted
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
// 	console.log("Here");
// 	res.sendFile(__dirname + "/public/index.html");
// });

// I've left your orignal routes commented out above and below, but will be serving files from view in any of my route(s) examples
app.get("/", (req, res) => {
	res.render("index"); // res.render is used to serve templates (the setup added above allows us to server fles local to the views file (also because view engine default, the html extension doesn't have to be added which is why that is just serving 'index' althought it is actually the 'index.html' file)
});

//
app.post("/", async (req, res) => {
	//just checking request, but also, you can console log to make sure your environment key exists as expected (would be careful about console.logs with that though depending on certain circumstances - esentially just remove it to be safe after)
	console.log("POST", req.body, process.env.SENDGRID_API_KEY);
	// destructuring the body object (and renamed the fullName variable) to pass through to the email function below
	const { email, fullName: name, model } = req.body;
	
	try {
		await sendEmail(email, name, model);
		// if no errors occur, we continue to handle code here
		// sending status of 201 to signal ok and we can send whatever data we want
		res.status(201).send({ success: true, message: 'sent!', data: { email, name, model } });
	} catch (e) {
		// if error was thrown, function would handle here
		res.status(400).send(e);
	}
});

// app.post("/", (req, res) => {
// 	console.log(req.body);

// 	const transporter = nodemailer.createTransport({
// 		service: "Outlook365",
// 		auth: {
// 			user: "colonyr123@outlook.com",
// 			pass: "Mypassword123",
// 		},
// 	});

// 	const mailOptions = {
// 		from: "colonyr123@outlook.com",
// 		to: req.body.email,
// 		model: `${req.body.model}`,
// 		text: "colony-R thanks you for reaching out to inquire about our models. One of our repersentative will be reaching out to you within an hour.",
// 	};

// 	transporter.sendMail(mailOptions, (error, info) => {
// 		if (error) {
// 			console.log(error);
// 			res.send("error");
// 		} else {
// 			console.log("email sent" + info.response);
// 		}
// 	});
// });

// /about
app.get("/about", (req, res) => {
	res.render("about"); // pulls very empty about.html file I added in views
});

// /models
app.get("/models", (req, res) => {
	res.status(404).send("Oops"); // didn't make a file/this doesn't exist so could send back something like a 404 status
});

// /contact
app.get("/contact", (req, res) => {
	res.send("Contact Us Page"); // or we could send back string.  This are just random examples for your knowledge
});

// the * acts as a wildpath that will match any [get] routes not specified above, so I'm redirecting the user back to the index page if so
app.get("*", (req, res) => {
	res.redirect("/");
});

app.listen(3000);
