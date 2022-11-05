//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-Parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
 
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");    
    
})

app.post("/", function(req,res){
var query = req.body.cityName;
var id = "76c509149fc375f7d0896b353a2035f5";
var unit = "metric";
var url= "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + id + "&units=" + unit;

https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        console.log(temp);

        const des = weatherData.weather[0].description;
        console.log(des);

        const icon = weatherData.weather[0].icon;
        const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<h1>the temperature in " + query + " is " + temp + " degree celeius</h1>");
        res.write("<p>the description is" + des + "</p>");
        res.write("<img src=" + imageUrl + ">");
        res.send();
       });
    });

});



app.listen(3000, function(req, res){
    console.log("server is running on port 3000");
})