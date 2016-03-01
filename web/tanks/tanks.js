        var word = "bottles";
        var count =99;
        while(count > 0){
            console.log(count + " " + word + " of beer on the wall");
            console.log(count + " " + word + " of beer,");
            console.log("Take one down, pass it around,");
            count = count - 1;
            if(count > 0){
                console.log(count + " " + word + "of beer on the wall.")
            }else{
                console.log("No more" + word + " of beer on the wall.")
            }
        }
        
        function right() {
            document.getElementById("img").style.top = '400px';
            document.getElementById("img").style.left = '1000px';
        }

        function left(){
            document.getElementById("img").style.top = '0px';
            document.getElementById("img").style.left = '0px';
        }