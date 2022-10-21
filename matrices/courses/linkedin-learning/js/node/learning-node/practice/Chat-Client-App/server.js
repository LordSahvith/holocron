const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbURL = 'mongodb+srv://lordsavith:Darthbane4@learning-node.dxjvxu6.mongodb.net/test';

const Message = mongoose.model('Message', {
    name: String,
    message: String,
});

app.get('/messages', (req, res) => {
    Message.find({}, (error, messages) => {
        res.send(messages);
    });
});

app.post('/messages', async (req, res) => {
    try {
        const message = new Message(req.body);
        const savedMessage = await message.save();

        console.log('saved');

        const censored = await Message.findOne({ message: 'badword' });

        if (censored) {
            await Message.deleteOne({ _id: censored.id });
        } else {
            io.emit('message', req.body);
        }

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        return console.log(error);
    } finally {
        console.log('some default code');
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

mongoose.connect(dbURL, (error) => {
    console.log('mongoDB connection:', error);
});

const server = http.listen(3000, () => {
    console.log(`server is listening on port ${server.address().port}`);
});
