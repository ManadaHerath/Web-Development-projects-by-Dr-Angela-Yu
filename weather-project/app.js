const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html")


});

app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "742d566075e1362d552ebef7a61062eb";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
    https.get(url, function (response) {
        console.log(response.statusCode);


        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            console.log(description);
            const iconLink = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
            res.write("<h1>The temperature in " + query + " is " + temp + " C</h1>");
            res.write("<h1>The Weather description is is " + description + ".</h1>");
            res.write("<img src=" + iconLink + ">")
            res.send();
        })



    })
});













app.listen(3000, function () {
    console.log("Server started on 3000 yo!")
})