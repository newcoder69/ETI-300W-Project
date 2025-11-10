const express = require('express');
const app = express();
const port = 3000;
const {getProduct} = require("./getItemByName.js")

app.use(express.json());

app.post('/', (req, res) => {

const {message} = req.body;

if(!message){res.status(400).send('Bad Request: Missing name field!')}

try{
    data = JSON.stringify(getProduct(message))

}

    


});


app.listen(port, () => {

console.log(`API is listening on port ${port}`);

})