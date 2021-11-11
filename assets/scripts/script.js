let liveStream;
let detector;
let detections = [];

function preload() {
  // img = loadImage('dog_cat.jpg');
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(liveStream, gotDetections);
}

function setup() {
  createCanvas(640, 480);
  liveStream = createCapture(liveStream);
  liveStream.size(640, 480);
  liveStream.hide();
  detector.detect(liveStream, gotDetections);
}


function draw() {
  image(liveStream, 0, 0);

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}