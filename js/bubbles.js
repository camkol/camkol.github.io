// Define a Vector constructor to represent a point in 3D space
function Vector(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;

  // Set method to update the coordinates of the vector
  this.set = function (x, y) {
    this.x = x;
    this.y = y;
  };
}

// Define a PointCollection constructor to manage a collection of points
function PointCollection() {
  // Initialize properties
  this.mousePos = new Vector(0, 0);
  this.pointCollectionX = 0;
  this.pointCollectionY = 0;
  this.points = [];

  // Update method to move points based on mouse position
  this.update = function () {
    for (var i = 0; i < this.points.length; i++) {
      var point = this.points[i];
      var dx = this.mousePos.x - point.curPos.x;
      var dy = this.mousePos.y - point.curPos.y;
      var dd = dx * dx + dy * dy;
      var d = Math.sqrt(dd);

      // Adjust the target position based on the distance from the mouse
      point.targetPos.x = d < 150 ? point.curPos.x - dx : point.originalPos.x;
      point.targetPos.y = d < 150 ? point.curPos.y - dy : point.originalPos.y;

      // Update the point
      point.update();
    }
  };

  // Shake method to create a shaking effect on the points
  this.shake = function () {
    var randomNum = Math.floor(Math.random() * 5) - 2;

    for (var i = 0; i < this.points.length; i++) {
      var point = this.points[i];
      var dx = this.mousePos.x - point.curPos.x;
      var dy = this.mousePos.y - point.curPos.y;
      var dd = dx * dx + dy * dy;
      var d = Math.sqrt(dd);

      // If the mouse is close, shake the points
      if (d < 50) {
        this.pointCollectionX = Math.floor(Math.random() * 5) - 2;
        this.pointCollectionY = Math.floor(Math.random() * 5) - 2;
      }

      // Draw the points with the shaking effect
      point.draw(bubbleShape, this.pointCollectionX, this.pointCollectionY);
    }
  };

  // Draw method to render the points
  this.draw = function (bubbleShape, reset) {
    for (var i = 0; i < this.points.length; i++) {
      var point = this.points[i];

      // Skip if the point is null
      if (point === null) continue;

      // Reset properties if specified
      if (window.reset) {
        this.pointCollectionX = 0;
        this.pointCollectionY = 0;
        this.mousePos = new Vector(0, 0);
      }

      // Draw the point
      point.draw(
        bubbleShape,
        this.pointCollectionX,
        this.pointCollectionY,
        reset
      );
    }
  };

  // Reset method (currently empty, can be implemented if needed)
  this.reset = function (bubbleShape) {};
}

// Define a Point constructor to represent a point with physical properties
function Point(x, y, z, size, color) {
  // Initialize properties
  this.curPos = new Vector(x, y, z);
  this.color = color;
  this.friction = document.Friction;
  this.rotationForce = document.rotationForce;
  this.springStrength = 0.01;
  this.originalPos = new Vector(x, y, z);
  this.radius = size;
  this.size = size;
  this.targetPos = new Vector(x, y, z);
  this.velocity = new Vector(0.0, 0.0, 0.0);

  // Update method to simulate physical movement
  this.update = function () {
    var dx = this.targetPos.x - this.curPos.x;
    var dy = this.targetPos.y - this.curPos.y;
    var ax = dx * this.springStrength - this.rotationForce * dy;
    var ay = dy * this.springStrength + this.rotationForce * dx;

    // Update velocity and current position
    this.velocity.x += ax;
    this.velocity.x *= this.friction;
    this.curPos.x += this.velocity.x;

    this.velocity.y += ay;
    this.velocity.y *= this.friction;
    this.curPos.y += this.velocity.y;

    // Update z-coordinate
    var dox = this.originalPos.x - this.curPos.x;
    var doy = this.originalPos.y - this.curPos.y;
    var dd = dox * dox + doy * doy;
    var d = Math.sqrt(dd);

    this.targetPos.z = d / 100 + 1;
    var dz = this.targetPos.z - this.curPos.z;
    var az = dz * this.springStrength;
    this.velocity.z += az;
    this.velocity.z *= this.friction;
    this.curPos.z += this.velocity.z;

    // Update radius based on z-coordinate
    this.radius = this.size * this.curPos.z;
    if (this.radius < 1) this.radius = 1;
  };

  // Draw method to render the point
  this.draw = function (bubbleShape, dx, dy) {
    ctx.fillStyle = this.color;

    // Draw either a square or a circle based on bubbleShape
    if (bubbleShape == "square") {
      ctx.beginPath();
      ctx.fillRect(
        this.curPos.x + dx,
        this.curPos.y + dy,
        this.radius * 1.5,
        this.radius * 1.5
      );
    } else {
      ctx.beginPath();
      ctx.arc(
        this.curPos.x + dx,
        this.curPos.y + dy,
        this.radius,
        0,
        Math.PI * 2,
        true
      );
      ctx.fill();
    }
  };
}

// Function to generate a color based on HSL values and fade
function makeColor(hslList, fade) {
  var hue = hslList[0];
  var sat = hslList[1];
  var lgt = hslList[2];
  return "hsl(" + hue + "," + sat + "%," + lgt + "%)";
}

// Function to convert a phrase to a hexadecimal representation
function phraseToHex(phrase) {
  var hexphrase = "";
  for (var i = 0; i < phrase.length; i++) {
    hexphrase += phrase.charCodeAt(i).toString(16);
  }
  return hexphrase;
}

// Function to initialize event listeners
function initEventListeners() {
  $(window).bind("resize", updateCanvasDimensions).bind("mousemove", onMove);

  canvas.ontouchmove = function (e) {
    e.preventDefault();
    onTouchMove(e);
  };

  canvas.ontouchstart = function (e) {
    e.preventDefault();
  };
}

// Function to update canvas dimensions based on window size
function updateCanvasDimensions() {
  canvas.attr({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  canvasWidth = canvas.width();
  canvasHeight = canvas.height();
  draw();
}

// Function to handle mouse movement
function onMove(e) {
  if (pointCollection) {
    pointCollection.mousePos.set(
      e.pageX - canvas.offset().left,
      e.pageY - canvas.offset().top
    );
  }
}

// Function to handle touch movement
function onTouchMove(e) {
  if (pointCollection) {
    pointCollection.mousePos.set(
      e.targetTouches[0].pageX - canvas.offset().left,
      e.targetTouches[0].pageY - canvas.offset().top
    );
  }
}

// Function to create a bouncing name effect
function bounceName() {
  shake();
  setTimeout(bounceName, 30);
}

// Function to create bouncing bubbles effect
function bounceBubbles() {
  draw();
  update();
  setTimeout(bounceBubbles, 30);
}

// Function to render the canvas
function draw(reset) {
  var tmpCanvas = canvas.get(0);

  if (tmpCanvas.getContext === null) {
    return;
  }

  ctx = tmpCanvas.getContext("2d");
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  bubbleShape = typeof bubbleShape !== "undefined" ? bubbleShape : "circle";

  if (pointCollection) {
    pointCollection.draw(bubbleShape, reset);
  }
}

// Function to create a shaking effect
function shake() {
  var tmpCanvas = canvas.get(0);

  if (tmpCanvas.getContext === null) {
    return;
  }

  ctx = tmpCanvas.getContext("2d");
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  bubbleShape = typeof bubbleShape !== "undefined" ? bubbleShape : "circle";

  if (pointCollection) {
    pointCollection.shake(bubbleShape);
  }
}

// Function to update the points
function update() {
  if (pointCollection) pointCollection.update();
}

// Function to draw a name with specified letter colors
function drawName(name, letterColors) {
  updateCanvasDimensions();
  var g = [];
  var offset = 0;

  // Function to add a letter to the collection
  function addLetter(cc_hex, ix, letterCols) {
    if (typeof letterCols !== "undefined") {
      if (
        Object.prototype.toString.call(letterCols) === "[object Array]" &&
        Object.prototype.toString.call(letterCols[0]) === "[object Array]"
      ) {
        letterColors = letterCols;
      }
      if (
        Object.prototype.toString.call(letterCols) === "[object Array]" &&
        typeof letterCols[0] === "number"
      ) {
        letterColors = [letterCols];
      }
    } else {
      // if undefined set black
      letterColors = [[0, 0, 27]];
    }

    if (document.alphabet.hasOwnProperty(cc_hex)) {
      var chr_data = document.alphabet[cc_hex].P;
      var bc = letterColors[ix % letterColors.length];

      // Create points for each part of the letter
      for (var i = 0; i < chr_data.length; ++i) {
        point = chr_data[i];

        g.push(
          new Point(
            point[0] * 0.5 + offset,
            point[1] * 0.5,
            0.0,
            point[2] * 0.5,
            makeColor(bc, point[3] * 0.5)
          )
        );
      }
      offset += document.alphabet[cc_hex].W * 0.5;
    }
  }

  var hexphrase = phraseToHex(name);

  var col_ix = -1;
  for (var i = 0; i < hexphrase.length; i += 2) {
    var cc_hex = "A" + hexphrase.charAt(i) + hexphrase.charAt(i + 1);
    if (cc_hex != "A20") {
      col_ix++;
    }
    addLetter(cc_hex, col_ix, letterColors);
  }

  // Adjust positions of points
  for (var j = 0; j < g.length; j++) {
    g[j].curPos.x = canvasWidth / 2 - offset / 2 + g[j].curPos.x;
    g[j].curPos.y = canvasHeight / 2 - 105 + g[j].curPos.y;
    g[j].originalPos.x = canvasWidth / 2 - offset / 2 + g[j].originalPos.x;
    g[j].originalPos.y = canvasHeight / 2 - 105 + g[j].originalPos.y;
  }

  // Create a PointCollection with the generated points
  pointCollection = new PointCollection();
  pointCollection.points = g;
  initEventListeners();
}

// Reset flag and event handlers for mouse leave and enter
window.reset = false;

$(window).mouseleave(function () {
  window.reset = true;
});

$(window).mouseenter(function () {
  window.reset = false;
});

// Initialize canvas and set initial properties
var canvas = $("#myCanvas");
var canvasHeight;
var canvasWidth;
var ctx;
var pointCollection;

// Set global properties
document.rotationForce = 0.0;
document.Friction = 0.85;

// Define color presets
var white = [0, 0, 100];
var black = [0, 0, 27];
var red = [0, 100, 63];
var orange = [40, 100, 60];
var green = [75, 100, 40];
var blue = [196, 77, 55];
var purple = [280, 50, 60];

// Set an initial delay to update canvas dimensions
setTimeout(updateCanvasDimensions, 30);
