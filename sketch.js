let video;
let poseNet;
let pose;
let skeleton;
let img;

function preload() {
  img = loadImage('assets/avatar1.png');
} //it loads the AI model

function setup() {
  createCanvas(640, 480);

  //it enables the video source, in this case the webcam
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded); //this is the source or call back
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  console.log(poses); // the code automatically picks the info from the poses that are loaded in the array
  if (poses.length > 0) {
    pose = poses[0].pose; //poses[0] takes us to the very beginning of the array. ".pose" takes us to the inside of the coordinates to get the pose info.
    skeleton = poses[0].skeleton;
  }

} //

function modelLoaded(){
  console.log('poseNet ready');
} //this function emphazises in capturing the image through the webcam

function draw() {
  image(video, 0, 0);
  filter(GRAY);

  if(pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

    fill(255, 0, 0);
    image(pose.nose.x, pose.nose.y, d); // d will scale nose base on size of face

    fill(152, 240, 237)
    ellipse(pose.rightEye.x, pose.rightEye.y, 40);
    ellipse(pose.leftEye.x, pose.leftEye.y, 40);

    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y,32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

    for(let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      ellipse(x,y,16,16);
    }

    for(let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y,b.position.x, b.position.y);
    }

    //draw an eyeball over one or both of the eyes
  }

}

function eye(x, y, size, n) {
	let angle = frameCount * 0.2;

	fill(255);
	noStroke();
	ellipse(x, y, size, size);

	fill(56);
	noStroke();
	ellipse(x+cos(angle*n)*size/5, y+sin(angle*n)*size/5, size/2, size/2);
}
