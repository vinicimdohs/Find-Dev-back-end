const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://vinicius:admwindows@cluster0-gfj9x.mongodb.net/test?retryWrites=true&w=majority' ,
{ 
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

app.use(cors());
app.use(express.json());//tem q estar antes
app.use(routes);

server.listen(3333);//nossa rota