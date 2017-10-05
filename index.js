const express = require('express');
const bodyParser  = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('here we go!');
});
 
app.listen(3000, function(){
    console.log('App running on 3000');
});
