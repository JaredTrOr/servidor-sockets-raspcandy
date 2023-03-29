require('dotenv').config();
require('./connection');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3001', //PORT ORIGIN CAN BE CHANGED
        methods: ['GET', 'POST']
    }
});
const port = process.env.PORT;
const cors = require('cors');
const socket = require('./socket');

socket(io);
app.use(cors());

http.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
});