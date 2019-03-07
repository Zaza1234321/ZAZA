var socket = io.connect("/STchat")
//document.addEventListener('contextmenu', event => event.preventDefault());
 
var message = document.getElementById('message');
handle = document.getElementById('handle');
btn = document.getElementById('send');
output = document.getElementById('output');
input = document.getElementById("message");
FAKSTYVN = document.getElementById('disc');
EHH = document.getElementById('cls');
N = document.getElementById('next');
var onlus = 0;
var FAKATYVN = new Date();
var hours = FAKATYVN.getHours();
var Minute = FAKATYVN.getMinutes();
var Second = FAKATYVN.getSeconds();
var audio = new Audio("notification.mp3");
 
$(document).ready(function() {
    socket.emit('wait');
    socket.emit('delwait');
    socket.emit('backfront');
 
})
 
N.addEventListener('click', function(e) {
    socket.emit('next')
 
});
message.addEventListener('keypress', function() {
    socket.emit('typo')
});
 
socket.on('deltypo', function() {
    if (!document.hasFocus()) {
        document.getElementById('wae').style.display = "none";
    }
})
 
 
$(document).ready(function() {
 
 
    document.getElementById('message').onkeyup = function(event) {
        if (this.value.length === 0) {
            socket.emit('deltytwo')
 
        }
    }
});
 
socket.on('deltytwo', function() {
    document.getElementById('wae').style.display = "none"
 
 
})
 
 
socket.on('typo', function() {
    if (!document.hasFocus()) {
        document.getElementById('wae').style.display = "inline-block";
    }
})
 
 
 
 
cls.addEventListener('click', function(e) {
 
    socket.emit('disconnect')
 
});
 
 
socket.on('disconnect', function() {
    socket.disconnect()
    document.getElementById('disconnectDIV').style.opacity = "1";
    document.getElementById('message').disabled = true;
    document.getElementById('fileselect').disabled = true;
    document.getElementById('send').disabled = true;
    document.getElementById('confound').style.opacity = "0";
    document.getElementById('WC').style.display = "none";
    document.getElementById('wae').style.display = "none"
});
 
 
 
 
socket.on('wait', function() {
    document.getElementById('WC').style.display = "inline";
    document.getElementById('message').disabled = true;
    document.getElementById('fileselect').disabled = true;
    document.getElementById('send').disabled = true;
});
 
socket.on('delwait', function() {
    document.getElementById('WC').style.display = "none";
    document.getElementById('message').disabled = false;
    document.getElementById('fileselect').disabled = false;
    document.getElementById('send').disabled = false;
    document.getElementById('confound').style.opacity = "1";
    console.log("Partner Found");
 
    function hide() {
        document.getElementById("confound").style.opacity = "0";
    }
 
    setTimeout(hide, 3000);
})
 
 
 
$('form').submit(function() {
    socket.emit('chat', {
    message: message.value
    });
 
    $('#message').val('');
    return false;
});
 
 
 
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("send").click();
    }
});
 
socket.on('chat', function(data) {
    if (data.message.length !== 0) {
 
        if (!document.hasFocus()) {
            $(document).attr('title', 'მესიჯი');
            audio.play();
 
        }
        document.getElementById('wae').style.display = "none"
        if (!document.hasFocus()) {
 
            var mess = data.message;
            var encod = $('<div />').text(mess).html();
            output.innerHTML += '<div class="hisout"><p class="me">' + encod +
                '</p></div>'
 
            output.scrollTop = output.scrollHeight
 
        } else {
 
            var messa = data.message;
            var encod = $('<div />').text(messa).html();
            output.innerHTML += '<div class="myout"><p class="you">' + encod + '</p></div>'
 
            output.scrollTop = output.scrollHeight
        }
    }
})
 
function displayImage(imgData) {
 
    if (!document.hasFocus()) {
        output.innerHTML += '<img class="hisphoto" src="' + imgData + '"/><br/>'
 
        output.scrollTop = output.scrollHeight
    } else {
        output.innerHTML += '<img class="myphoto" src="' + imgData + '"/><br/>'
 
        output.scrollTop = output.scrollHeight
    }
 
}
document.getElementById('fileselect').addEventListener('change', function() {
    if (this.files.length != 0) {
        var file = this.files[0],
            reader = new FileReader();
 
        reader.onload = function(e) {
            this.value = '';
            socket.emit('img', e.target.result);
 
        };
        reader.readAsDataURL(file);
    };
}, false);
 
socket.on('newImg', function(img) {
    if (!document.hasFocus()) {
        $(document).attr('title', 'მესიჯი')
    }
    displayImage(img);
});
 
function focc() {
    $(document).attr('title', 'Chat')
}