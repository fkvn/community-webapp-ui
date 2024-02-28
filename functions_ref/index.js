const functions = require("firebase-functions");

// const admin = require("firebase-admin");
// admin.initializeApp();

// const https = require("https");
// const sharp = require("sharp");

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // Full code is here: https://github.com/dbanisimov/firebase-image-cdn

// // Convert option in a string format to a key-value pair
// // key=value   { [key]: value }
// // key         { [key]: true }
// const optionToKeyVal = (option = "") =>
// 	((split = []) =>
// 		split.length > 0
// 			? { [split[0]]: split.length > 1 ? split[1] : true }
// 			: undefined)(option.split("="));

// // Parse options string and return options object
// // width?: string;
// // height?: string;
// // lossless?: boolean;
// const parseOptions = (options = "") =>
// 	options
// 		.split(",")
// 		.reduce(
// 			(acc, option) =>
// 				Object.assign(Object.assign({}, acc), optionToKeyVal(option)),
// 			{}
// 		);

// // Configure allowed request URLs. This should match the hosting glob pattern
// const allowedPrefix = "/cdn/image/";
// const isUrlAllowed = (url) => url.startsWith(allowedPrefix);

// // Configure source image URLs. This assumes that we store images on Firebase Storage
// const projectId = "mono-thainow";
// const sourcePrefix = `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/`;

// // const sourceSuffix = `?alt=media`;

// // Validate and split request URL into options and source parts
// const tokenizeUrl = (url) => {
// 	if (!isUrlAllowed(url)) {
// 		throw new Error("URL is not allowed");
// 	}
// 	const urlNoPrefix = url.slice(allowedPrefix.length);

// 	// has image option - "/width=50,height=20?kvn/...."
// 	const imageOptionsSlashIdx = urlNoPrefix.indexOf("?kvn/");
// 	const optionsSlashIdx = urlNoPrefix.indexOf("/");

// 	let sourceKey = urlNoPrefix.slice(optionsSlashIdx + 1);
// 	let optionsStr = urlNoPrefix.slice(0, optionsSlashIdx);
// 	let sourceUrl = sourcePrefix + sourceKey;

// 	// if no image option
// 	if (imageOptionsSlashIdx < 0) {
// 		sourceUrl = sourcePrefix + urlNoPrefix;

// 		return ["", sourceUrl];
// 	}

// 	return [optionsStr, sourceUrl];
// };

// // Set CDN caching duration in seconds
// const cacheMaxAge = 5 * 60; // 5 minutes

// // Run the image transformation on Http requests.
// // To modify memory and CPU allowance use .runWith({...}) method
// exports.imageTransform = functions.https.onRequest((request, response) => {
// 	let sourceUrl;
// 	let options;
// 	try {
// 		const url = request.url.replace(
// 			"thainow-service-worker/config/",
// 			"thainow-service-worker%2Fconfig%2F"
// 		);

// 		console.log(url);

// 		const [optionsStr, sourceUrlStr] = tokenizeUrl(url);

// 		console.log(sourceUrlStr);
// 		// console.log(optionsStr);

// 		sourceUrl = new URL(sourceUrlStr);

// 		console.log(sourceUrlStr);

// 		options = parseOptions(optionsStr);

// 		console.log(options);
// 	} catch (error) {
// 		response.status(400).send();
// 		return;
// 	}

// 	// Modern browsers that support WebP format will send an appropriate Accept header
// 	const acceptHeader = request.header("Accept");
// 	const webpAccepted =
// 		!!acceptHeader && acceptHeader.indexOf("image/webp") !== -1;

// 	// If one of the dimensions is undefined the automatic sizing
// 	// preserving the aspect ratio will be applied
// 	const transform = sharp()
// 		.resize(
// 			options.width ? Number(options.width) : undefined,
// 			options.height ? Number(options.height) : undefined,
// 			{
// 				fit: "cover",
// 			}
// 		)
// 		.webp({ force: webpAccepted, lossless: !!options.lossless });

// 	// Set cache control headers. This lets Firebase Hosting CDN to cache
// 	// the converted image and serve it from cache on subsequent requests.
// 	// We need to Vary on Accept header to correctly handle WebP support detection.
// 	const responsePipe = response
// 		.set("Cache-Control", `public, max-age=${cacheMaxAge}`)
// 		.set("Vary", "Accept");

// 	// The built-in node https works here
// 	https.get(sourceUrl, (res) => res.pipe(transform).pipe(responsePipe));
// });

// // express serverless api
// const express = require("express");
// let app = express();

// app.get('/',(req, res, next) => {
// 	console.log("page");
// 	console.log(req);
//   const filePath = path.resolve(__dirname, '../build', 'index.html');
// 	res.filePath()

// })

// const prerender = require("prerender-node").set(
// 	"prerenderToken",
// 	"73R1Oklx8KGAGmgQPunS"
// );

// prerender.crawlerUserAgents.push("googlebot");
// prerender.crawlerUserAgents.push("bingbot");
// prerender.crawlerUserAgents.push("yandex");
// app.use(prerender);

// // Google-Cloud-Tasks
// // console.log("SSR: Running with production SSR function v7");
// // const prerender = require("prerender-node")
// // 	.set("prerenderToken", "73R1Oklx8KGAGmgQPunS")
// // 	// .set('prerenderServiceUrl', 'https://app.getpolarized.io/prerender')
// // 	.set("beforeRender", function (req, done) {
// // 		console.log("SSR: beforeRender");
// // 		if (done) {
// // 			done();
// // 		}
// // 	});
// // // this is a bit hacky but there's now way to force the user agent in google
// // // cloud tasks...

// // prerender.crawlerUserAgents.push("Google-Cloud-Tasks");
// var prerender = require("prerender-node").set(
// 	"prerenderToken",
// 	"73R1Oklx8KGAGmgQPunS"
// );
// prerender.crawlerUserAgents.push("googlebot");
// prerender.crawlerUserAgents.push("bingbot");
// prerender.crawlerUserAgents.push("yandex");

// console.log("Running with crawler user agents: ", prerender.crawlerUserAgents);
// app.use(prerender);
// // app.use((req, res, next) => {
// // 	const userAgent = req.header("User-Agent");
// // 	const method = req.method;
// // 	console.log(`SSR: handling prerender: ${method} ${userAgent}`);
// // 	prerender(req, res, next);
// // });

// // app.use(function (err, req, res, next) {
// // 	console.error("Could not handle SSR: \n" + err.stack);
// // 	if (res.headersSent) {
// // 		return next(err);
// // 	}
// // 	res.status(500).send("Internal Server Error");
// // });

// exports.ssr = functions.https.onRequest(app);
// const path = require("node:path");

const express = require("express");

const prerender = express();
prerender.use(
	require("prerender-node")
		// .set("prerenderServiceUrl", "http://localhost:3000")
		.set("prerenderToken", "73R1Oklx8KGAGmgQPunS")
);

const fs = require("fs");

prerender.get("*", (req, res) => {
	console.log("Calling function for URL:", req.path);
	res.set("Cache-Control", "public, max-age = 300, s-maxage = 1200");
	let indexHTML = fs.readFileSync("../build/index.html").toString();
	indexHTML = indexHTML.replace(
		`<meta property="og:title" content="ThaiNow cccc" data-rh="true"/>`,
		'<meta property="og:title" content="BBBB" data-rh="true"/>'
	);
	res.status(200).send(indexHTML);
});

exports.addsocialmeta = functions.https.onRequest(prerender);
