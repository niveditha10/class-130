song="";

left_x=0;
left_y=0;

right_x=0;
right_y=0;

score_left=0;
score_right=0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

posenet=ml5.poseNet(video,modelLoaded);
posenet.on('pose',gotPoses);
}

function modelLoaded(){

    console.log("posenet is loaded");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_left=results[0].pose.keypoints[9].score;
        score_right=results[0].pose.keypoints[10].score;

        left_x=results[0].pose.leftWrist.x;
        left_y=results[0].pose.leftWrist.y;

        right_x=results[0].pose.rightWrist.x;
        right_y=results[0].pose.rightWrist.y;

        console.log("left_x="+left_x+"  "+"left_=y"+left_y);
        console.log("right_x="+right_x+"  "+"right_y="+right_y);
        console.log("score left wrist="+score_left+"   score right wrist="+score_right);
    }
}

function draw(){
    image (video,0,0,600,500);
   fill("#FF0000");
   stroke ("#FF0000");

   if(score_right>0.2){
circle(right_x,right_y,20);

if(right_y>0 && right_y<=100){
document.getElementById("speed").innerHTML="speed = 0.5x";
song.rate(0.5);
}

else if(right_y>100 && right_y<=200){
    document.getElementById("speed").innerHTML="speed = 1x";
    song.rate(1);
    }

else if(right_y>200 && right_y<=300){
        document.getElementById("speed").innerHTML="speed = 1.5x";
        song.rate(1.5);
    }

    else if(right_y>300 && right_y<=400){
        document.getElementById("speed").innerHTML="speed = 2x";
        song.rate(2);
        }
        else if(right_y>400 && right_y<=500){
            document.getElementById("speed").innerHTML="speed = 2.5x";
            song.rate(2.5);
            }



   }

   if(score_left>0.2){
       circle(left_x,left_y,20);
       number_left=Number(left_y);
       remove_decimals=floor(number_left);
       volume=remove_decimals/500;
       song.setVolume(volume);
       document.getElementById("volume").innerHTML="volume ="+volume;
   }
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}













































function pause(){
    song.pause();
    }

    function stop(){
        song.stop();
}

