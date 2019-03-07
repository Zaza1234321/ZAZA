$(document).ready(function(){
    console.log("linked");
    function check(){
        var width = $(window).width();
        if(width>=768){
        var status = $("#ad1").height();
        console.log(status+"s");
            if(status==0){
                alert("გთხოვთ გამორთოთ ადბლოკერი რათა განაგრძოთ საიტის გამოყენება");
                var event = $(document).click(function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                });
               
                // disable right click
                $(document).bind('contextmenu', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                });
            }
        }
        else{
            var status = $("#phonead").height();
            console.log(status+"s");
            if(status==0){
                alert("გთხოვთ გამორთოთ ადბლოკერი რათა განაგრძოთ საიტის გამოყენება");
            }
        }
    }
    setInterval(check, 3000);
});