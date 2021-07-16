const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const fs = require('fs');



app.use(express.static('public'));
app.use(express.static('node_modules/socket.io/client-dist'));

app.get('/', (req, res, next)=>{
    res.sendFile(__dirname + '/views/chat.html')
})


/* view engine set to load html file
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
                                  */

io.on('connection', (socket)=>{
    console.log(`${socket.id} conncected`);
    socket.on('disconnect', ()=>{
        io.emit('exit', `${socket.id}`);
    })

    socket.on('join', (id)=>{
        socket.broadcast.emit('join', id);
    })
    socket.on('message', (data)=>{
        socket.broadcast.emit('message', {
            name: data.name,
            message: data.message,
            time : data.time            
        })
    })
})

http.listen(3000, ()=>{
    console.log('server online');
})