const express = require('express');
const app = express();

app.use(express.urlencoded());


app.post('/auth', (req, res) => {

    const streamKey = req.body.key;

    if(streamKey === "ENV.SECRET_KEY") {
        res.status(200).send();
        return;
    }

    // rejects unauthourized streams
    res.status(403).send();
})

app.listen("8000", err => {
    if(err) {
        console.log("Unable to start server: " + err);
        // gracefully kill services
    }
    console.log("Listen on port 8000");
})