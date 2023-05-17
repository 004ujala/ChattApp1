let app=require('express')();
var http=require('http').createServer(app);
var io=require('socket.io')(http);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/f1.html");
})

const users={};
io.on('connection',socket=>{
    socket.on('new-user',name=>{
        console.log(`name of the person is ${name}`);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,namee:users[socket.id]});
    })
    socket.on('disconnect',message=>{
        console.log("disconnected with default msg ",message)
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    })
})

http.listen(8000,function(){
    console.log('Server running at port 8000');
})








