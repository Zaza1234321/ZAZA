var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var helmet = require('helmet')
var consolidate = require('consolidate');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet())
app.engine('html', consolidate.mustache);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
var numb = 1;
var chnm = io.of('/STchat')
var port = process.env.PORT || 8000
var host = process.env.HOST ||'127.0.0.1'
app.get('/', function(req, res){
  res.render('first')
 
});
 
 app.get('/STchat', function(req, res){
    res.sendFile(__dirname +'\\views\\Tchat.html')
    chnm.once('connect', function(socket){
      var room = "room" + numb;
      socket.join(room);
      socket.current_room = room;
 
      console.log('made socket connection', socket.id);
      console.log("Joined room: ", socket.current_room);
 
 
      chnm.in(room).clients(function(err, clients) {
          if (clients.length >= 2) {
              numb++;
              socket.on('delwait', function(){
                   chnm.in(socket.current_room).emit('delwait');
              });
          }
      });
      chnm.in(room).clients(function(err, clients) {
        if (clients.length < 2) {
            socket.on('wait', function(){
                 chnm.in(socket.current_room).emit('wait')
            })
        }
    });
 
 
      socket.on('disconnect', function(){
               socket.leave(socket.current_room)
               chnm.in(socket.current_room).emit('disconnect')
      });
 
 
   
 
 
  socket.on('chat', function(data) {
    chnm.in(socket.current_room).emit('chat', data);
 
});
socket.on('img', function(imgData) {
  console.log(imgData)
  chnm.in(socket.current_room).emit('newImg',imgData);
});
 
socket.on('typo', function(){
  chnm.in(socket.current_room).emit('typo')
});
 
socket.on('deltypo', function(){
     chnm.in(socket.current_room).emit('deltypo')
});
 
socket.on('deltytwo', function(){
     chnm.in(socket.current_room).emit('deltytwo')
})
 
 
 
  });
})
 
 
 
app.get('/StvChat', function(req ,res){
  res.sendFile(__dirname + '/views/VideoC.html');
 
});
 
http.listen(port);