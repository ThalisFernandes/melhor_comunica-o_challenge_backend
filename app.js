const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const bodyparser = require('body-parser');
const deviceRoutes = require('./routes/mobileRoute');
const res = require('express/lib/response');


app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


deviceRoutes(app);
app.get('', ()=>{
    res.status(200).send('Esta rodando !!!');
})

app.listen(port, ()=>{
    console.log('Rodando na porta 8080');
})