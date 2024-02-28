/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");

const app = express();

const prerender = require("prerender-node")
	// .set("prerenderServiceUrl", "http://localhost:3000")
	.set("prerenderToken", "73R1Oklx8KGAGmgQPunS");

prerender.crawlerUserAgents.push("Google-Cloud-Tasks");
prerender.crawlerUserAgents.push("googlebot");
prerender.crawlerUserAgents.push("bingbot");
prerender.crawlerUserAgents.push("yandex");

app.use(prerender);

const fs = require("fs");

app.get("*", (req, res) => {
	console.log("Calling function for URL:", req.path);
	const userAgent = req.header("User-Agent");
	const method = req.method;
	console.log(`Express: handling prerender: ${method} ${userAgent}`);

	// need to replace the index.html in the functions folder with the index.html in the build folder every time we create a new build
	let indexHTML = fs.readFileSync("./index.html").toString();

	// render built indexHTML
	res.status(200).send(indexHTML);
});

exports.addsocialmeta = functions.https.onRequest(app);
