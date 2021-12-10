const express = require('express');
const app = express();
const port = 80;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const qs = require('querystring');
const fs = require('fs');
const cookie = require('cookie');

app.set('port', port);

app.use(express.static('public'));
app.use(express.static('node_modules/socket.io/client-dist'));


app.post('/login_process', (req, res)=>{
    let body = '';
    req.on('data', (data)=>{
        body += data;
    });
    req.on('end', ()=>{
        let post = qs.parse(body);
        let username = post.name;
        let servername = post.serverName;

        res.writeHead(302, {
            'Set-Cookie':[
                `name=${username}`,
                `server=${servername}`
            ],
            Location: `/`
        });
        res.end();
    })
});


app.get('/bounce', (req,res)=>{
    res.sendFile(__dirname + '/views/bounceball.html');
});
app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/chat', (req, res)=>{
    res.sendFile(__dirname + '/views/chat.html');
});
app.get('/', (req, res, next)=>{
    let cookies = {};
    if(req.headers.cookie !== undefined){
        cookies = cookie.parse(req.headers.cookie);
        res.writeHead(302, {user: cookies.name, server: cookies.server ,Location: `/chat`});
    } else{
        res.writeHead(302, {Location: `/login`});
    }
    res.end();
})

//접속중인 유저
let user = [];

io.on('connection', (socket)=>{
    console.log(`${socket.id} conncected`);

    socket.on('disconnect', ()=>{
        io.emit('exit', `${socket.id}`);
        
        //userlist 송출
        user.splice(user.indexOf(socket.id), 1);
        io.emit('userlist', user);
    })

    socket.on('join', (id)=>{
        console.log(`${id} conncected`);
        socket.broadcast.emit('join', id);
        user.push({socketId: socket.id, name: id});
        io.emit('userlist', user);
    })
    socket.on('message', (data)=>{
        socket.broadcast.emit('message', {
            socketId: data.socketId,
            name: data.name,
            message: data.message,
            time : data.time            
        })
    })
})

http.listen(port, ()=>{
    console.log(`server online on port #${port}`);
})