var charset = 'charset10';

$(window).bind("pageshow", function() {
  document.getElementById("file").type = "";
  document.getElementById("file").value = "";
  document.getElementById("file").type = "file";
});

$(function () {
    $(":file").change(function () {
      console.log(this.files && this.files[0]);
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageLoad;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

//color variables
var red = 1;
var green = 1;
var blue = 1;
var colorsOn = 3;
var invertedColors = false;
var colorDistanceThreshold = 120;
var baseColors = ["Red","Orange","Yellow","Lime","Cyan","Magenta"]; //bright colors
var foregroundColor = "#000000";
var backgroundColor = "#FFFFFF";
bwColors();
tippy('.tooltip', {theme: 'norm', size: 'small', arrow: 'true', animateFill: false});

function switchColors() {
  if (invertedColors) {
    backgroundColor = chroma(baseColors[Math.floor(Math.random()*baseColors.length)]).brighten(Math.random()*1.2).saturate((Math.random()*1.5) + 0.5).hex();
    foregroundColor = chroma(baseColors[Math.floor(Math.random()*baseColors.length)]).darken((Math.random()*3) + 4).saturate(Math.random()*0.5).hex();
  }
  else {
    foregroundColor = chroma(baseColors[Math.floor(Math.random()*baseColors.length)]).brighten(Math.random()*1.2).saturate((Math.random()*1.5) + 0.5).hex();
    backgroundColor = chroma(baseColors[Math.floor(Math.random()*baseColors.length)]).darken((Math.random()*3) + 4).saturate(Math.random()*0.5).hex();
  }
  if (Math.abs(chroma.distance(foregroundColor,backgroundColor)) > (colorDistanceThreshold - 1)) {
    $("body").get(0).style.setProperty("--back", backgroundColor);
    $("body").get(0).style.setProperty("--fore", foregroundColor);
  }
  else {
    switchColors();
  }
}

function invertColors() {
  if (invertedColors) {
    invertedColors = false;
  }
  else {
    invertedColors = true;
  }
  var temp = foregroundColor;
  foregroundColor = backgroundColor;
  backgroundColor = temp;
  $("body").get(0).style.setProperty("--back", backgroundColor);
  $("body").get(0).style.setProperty("--fore", foregroundColor);
}

function bwColors() {
  foregroundColor = '#000000';
  backgroundColor = '#FFFFFF';
  invertedColors = true;
  $("body").get(0).style.setProperty("--back", backgroundColor);
  $("body").get(0).style.setProperty("--fore", foregroundColor);
}

function imageLoad(e) {
  var data = e.target.result;
  window.location.href = ("result.html?red=" + red + "&green=" + green + "&blue=" + blue + "&height=" + document.getElementById("image-height").value + "&charset=" + charset + "&inverted=" + invertedColors + "&foreground=" + foregroundColor + "&background=" + backgroundColor + "&img=" + data);
}

function charSelect(set,obj) {
  charset = set;
  document.getElementsByClassName("selected")[0].className = "char-icon";
  obj.className = "char-icon selected";
}

function chanSelect(color,obj) {
  if (eval(color) === 0) {
    eval(color + " = 1;");
    colorsOn++;
    obj.className = "char-icon";
    document.getElementById(color + "-icon").innerHTML = "invert_colors";
  }
  else {
    if (colorsOn > 1) {
      eval(color + " = 0;");
      colorsOn--;
      obj.className = "char-icon selected";
      document.getElementById(color + "-icon").innerHTML = "invert_colors_off";
    }
  }
}
