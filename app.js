const express = require("express");
const https = require("https");
const app = express();

app.use(express.urlencoded({extended: true}));


app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "8770a36c02b98cf993d5a5c9315e8962";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data" , function(data){
            
            const WeatherData = JSON.parse(data);
            const temp = WeatherData.main.temp;
            const weatherDescription = WeatherData.weather[0].description
            const icon = WeatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png" ;

            res.write("<p>The weather is currently "+  weatherDescription+ "</p>");
            res.write("<h1>The tempertaure of "+query+" is "+ temp + " degree celsius.</h1>");
            res.write("<img src="+imageURL+">");
            res.send();

        })
    });
    

})

    

app.listen(3000, function(){
    console.log("running on port 3000");
});