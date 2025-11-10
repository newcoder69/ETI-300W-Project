const express = require('express');
const app = express();
const port = 3000;
const {getProduct} = require("./getItemByName.js")

app.use(express.json());

app.post('/', (req, res) => {

const {message} = req.body;

if(!message){res.status(400).send('Bad Request: Missing name field!')}

try{
    const data = getProduct(message);
    if(!data){
        return res.status(404).json({error:"Item not found"});
    }

    res.json(data);
}catch(error){
    console.log(error);
    res.status(500).json({error:"Internal Server Error"});
}


});


app.listen(port, () => {

console.log(`API is listening on port ${port}`);

})