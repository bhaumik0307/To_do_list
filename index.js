import express from "express";
import bodyParser from "body-parser";

const app=express();
const port = 3000;
var publicTask=[];
var workTask=[];
var date="";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(getDate);

function getDate(req, res, next){
    // Create a new Date object
const currentDate = new Date();

// Get the day of the week as a number (0 = Sunday, 1 = Monday, etc.)
const dayNumber = currentDate.getDay();

// Create an array of day names
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Get the day name
const dayName = dayNames[dayNumber];

// Get the month as a number (0 = January, 1 = February, etc.)
const monthNumber = currentDate.getMonth();

// Create an array of month names
const monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

// Get the month name
const monthName = monthNames[monthNumber];

// Get the day of the month (1-31)
const dayOfMonth = currentDate.getDate();

date= `${dayName}, ${monthName} ${dayOfMonth}`;
    next();
}
app.get("/",(req, res)=>{
    res.render("index.ejs",{
        publicElement: publicTask,
        date: date,
    });
})

app.get("/work",(req, res)=>{
    res.render("work.ejs",{
        workElement: workTask,
    });
})
app.post("/",(req, res)=>{
    publicTask.push(req.body.newItem);
    res.render("index.ejs", {
        publicElement: publicTask,
        date: date,
    })
})
app.post("/work",(req, res)=>{
    workTask.push(req.body.newItem);
    res.render("work.ejs",{
        workElement: workTask,
    })
})
app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
})