import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// var publicTask = [];
var items = [];
var workTask = [];
var date = "";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(getDate);
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", { useNewUrlParser: true });

function getDate(req, res, next) {
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

    date = `${dayName}, ${monthName} ${dayOfMonth}`;
    next();
}

const itemSchema = {
    name: String
};

const Item = new mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to the To-Do-List"
});
const item2 = new Item({
    name: "Click + to add a task"
});
const item3 = new Item({
    name: "click to delete a task"
});

const defaultItems = [item1, item2, item3];





app.get("/", (req, res) => {
    Item.find(function (err, result) {
        if (result.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("default items added successfully");
                }
            });
            res.redirect('/');
        }
        else {
            
            res.render("index.ejs",{date: date, publicElement: result});
        }
    });
})
app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    })
    item.save();
    res.redirect('/');
})
app.post("/delete", (req, res) =>{
    const itemId = req.body.check;
    Item.findByIdAndRemove(itemId, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("removed successfully");
        }
    })
    res.redirect("/")
})

app.get("/work", (req, res) => {
    res.render("work.ejs");
})
app.post("/work", (req, res) => {
    workTask.push(req.body.newItem);
    res.render("work.ejs", {
        workElement: workTask,
    })
})
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})