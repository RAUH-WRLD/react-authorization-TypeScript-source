const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const {sendEmail} = require("./mail");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("client/build"));
app.post("/api/sendMail", (request, result) => {
    sendEmail(request.body.email, request.body.text, request.body.subject);
});
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running");
});
