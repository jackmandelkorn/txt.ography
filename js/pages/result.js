var charset70 = "@Q&$WM0B%8#hkbdpqwmZOJUYXvuoanxjftIl!rzc+iLC?][}{1)(|\\/*><~^;:,\"-_`'. ";
var charset24 = "@Q0M#8%hbqUn1ti?c\"~:.- ";
var charset10 = "@%#+*=:-. ";
var charset5 = "@#+: ";
var charset3 = "@: ";
var charRatio = 14 / 6.59;
var invertedColors = true;

//initial url unpacking
$("body").get(0).style.setProperty("--back", getUrlVars().background);
$("body").get(0).style.setProperty("--fore", getUrlVars().foreground);
invertedColors = getUrlVars().inverted;
var imageData = getUrlVars().img;
var heightData = getUrlVars().height;
var charsetData = getUrlVars().charset;
  var redData = Number(getUrlVars().red);
  var greenData = Number(getUrlVars().green);
  var blueData = Number(getUrlVars().blue);
eval("var charset = " + charsetData);
render(imageData, heightData);

function render(data, height) {
  //prep image
  var image = new Image();
  image.src = data;
  image.onload = function(){
    var natWidth = image.width;
    var natHeight = image.height;
  var scale = natWidth / (charRatio * height);
  image.width = Math.floor((natWidth / scale) + 0.5);
  image.height = Math.floor(((natHeight / scale) / charRatio) + 0.5);

  //create canvas object
  var canvas = document.createElement("CANVAS");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
  canvasData = canvas.getContext('2d');

  //compile data for <pre> element
  var textObj = "";
  for (var y = 0; y < image.height; y++) {
    for (var x = 0; x < image.width; x++) {
      textObj = textObj + determineCharacter(canvasData, x, y);
    }
    textObj = textObj + "\n";
  }

  //make the <pre> element
  var pre = document.createElement("pre");
  pre.innerText = textObj;
  pre.className = "result";
  document.getElementById("container").appendChild(pre);
  }
}

function determineCharacter(canvas, x, y) {
  var data = canvas.getImageData(x, y, 1, 1).data;
  var mean = ((data[0] * redData) + (data[1] * greenData) + (data[2] * blueData));
  var level = Math.floor(mean / (((255 * redData) + (255 * greenData) + (255 * blueData)) / charset.length));
  if (data[3] === 0) {
    return " ";
  }
  else {
    if (invertedColors === "true") {
      return charset.charAt(level);
    }
    else {
      return charset.charAt((charset.length - 1) - level);
    }
  }
}
