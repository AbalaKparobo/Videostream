const express = require('express');
const fs = require('fs');

const app = express();

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.get("/video", (req, res) => {
	const range = req.headers.range;
	// if(!range) throw error
	
	// Should point to wherever the videos are store, db or file
	const videoPath = "../videos/mood4Eva.mp4"; // change to whatever you like, or download same video and enjoy good music
	const videoSize = fs.statSync(videoPath).size;

	const CHUNK_SIZE = 10 ** 6 // 1MB

	const start = Number(range.replace(/\D/g, ""));
	const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

	const contentLength = end - start + 1;
	const headers = {
		"Content-Range": `bytes ${start} -${end}/${videoSize}`,
		"Accept-Range": "bytes",
		"Content-Length": contentLength,
		"Contenet-Type": "video/mp4"
	}

	res.writeHead(206, headers);
	
	const videoStream = fs.createReadStream(videoPath, {start, end});
	videoStream.pipe(res);
})

app.listen('8080', err => {
	if(err) console.log("Error occured while starting server" + err);
	console.log("Server suceesffully started");
});
