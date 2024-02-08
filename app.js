const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , (req , res)=>{
    res.sendFile(__dirname + "/index.html")
});

app.post("/" , (req, res)=>{
    
   

    const query = req.body.cityName;
    const appid = "83678bf365f375a2b87953fcf0208e27";
    const units = "metric";
    url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&units="+ units + "&appid="+ appid +"";
    
    https.get( url , (response)=>{
        console.log(response.statusCode);
    
    
        response.on("data" , (data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconurl ="http://openweathermap.org/img/w/" + icon + ".png";
    
            res.write("<h1>The temperature in " + query +" is " + temp +" degree celcius. </h1>");
            res.write("<p>The weather Description is currently " + weatherDesc + "</p>");
            res.write("<img src='"+ iconurl + "'>");
            res.send();
        })
    
        
    
    })
});



app.listen(3000 , ()=>{
    console.log("This server is running on port 3000.");}
);