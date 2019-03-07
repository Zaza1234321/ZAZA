$(document).ready(function(){
    //anti adblock
    var screen = $(window).width();
    if(screen>500){
        var ad = $("#ad1").height();
        if(ad==0){
            $("body").css("cursor", "none");
            alert("xoar chabere");
        }
    }

    else if(screen<=500){
        var ad = $("#phonead").height();
        if(ad==0){
            $("body").css("cursor", "none");
            alert("xoar gamoylevdi");
        }
    };
    //upload
    $(".upload_img").click(function(){
        $("#fileselect").click();
    });
    //switch function
    $("#switch").click(function(){
        var status = $(this).attr("name");
        if(status=="off"){
            $("body").css("background-color", "black");
            $(this).attr("name", "on");
        }else{
            $("body").removeAttr("style");
            $(this).attr("name", "off");
        }
    });
    //panel height
    var height = ($(document).height()/100)*8;
    $(".panel").css("height", height + "px");
    //typing position
    var bottom = ($(document).height()/100)*10;
    $(".typing-indicator").css("bottom", bottom + "px");
});