const express = require('express')
const app = express()
const port = 4000

//override security concerns to stop errors
const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//body parser for post method
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//copied code form mongoose
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

//paste our connection key in here
async function main() {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.dke412c.mongodb.net/?retryWrites=true&w=majority');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//map how our database is layed out 
const bookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    author: String
})

const bookModel = mongoose.model('kevins_books', bookSchema);

//http listeners for the given port number
app.get('/', (req, res) => {
    res.send('Hello World!');//return message
})

//listener for post method
app.post('/api/books', (req, res) => {
    console.log(req.body);//log book object passed in from create.js
    bookModel.create({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author
    })//then and catch for the promise
        .then(() => { res.send("Book Created") })
        .catch(() => { res.send("Book NOT Created") })

})

//get data from mongose send it in respsone
app.get('/api/books', async (req, res) => {
    let books = await bookModel.find({});
    //send json object
    res.json(books);
})

app.delete('/api/book/:id', async(req, res) => {
    console.log("Delete: "+req.params.id);

    let book = await bookModel.findByIdAndDelete(req.params.id);
    res.send(book);
})

//method to return data for one specified book
app.get('/api/book/:id', async (req, res) => {
    console.log(req.params.id);
    let book = await bookModel.findById(req.params.id);
    res.send(book);
})

app.put('http://localhost:4000/api/book/:id', async (req, res) => {
    console.log("Delete:" + req.params.id);

    let book = await bookModel.findByIdAndDelete(req.params.id)
    res.send(book);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})