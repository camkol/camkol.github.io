// Definition of a Vector class to represent 3D vectors
function Vector(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;

  // Method to set new x and y values to the vector
  this.set = function (x, y) {
    this.x = x;
    this.y = y;
  };
}

// Definition of PointCollection class to manage a collection of Point objects
function PointCollection() {
  // Initialization of properties
  this.mousePos = new Vector(0, 0);
  this.pointCollectionX = 0;
  this.pointCollectionY = 0;
  this.points = [];

  // Method to update the positions of points based on mouse position
  this.update = function () {
    for (var i = 0; i < this.points.length; i++) {
      var point = this.points[i];

      var dx = this.mousePos.x - point.curPos.x;
      var dy = this.mousePos.y - point.curPos.y;
      var dd = dx * dx + dy * dy;
      var d = Math.sqrt(dd);

      point.targetPos.x = d < 150 ? point.curPos.x - dx : point.originalPos.x;
      point.targetPos.y = d < 150 ? point.curPos.y - dy : point.originalPos.y;

      point.update();
    }
  };

  // Method to shake the points randomly
  this.shake = function () {
    var randomNum = Math.floor(Math.random() * 5) - 2;

    for (var i = 0; i < this.points.length; i++) {
      var point = this.points[i];
      var dx = this.mousePos.x - point.curPos.x;
      var dy = this.mousePos.y - point.curPos.y;
      var dd = dx * dx + dy * dy;
      var d = Math.sqrt(dd);
      if (d < 50) {
        this.pointCollectionX = Math.floor(Math.random() * 5) - 2;
        this.pointCollectionY = Math.floor(Math.random() * 5) - 2;
      }
      point.draw(bubbleShape, this.pointCollectionX, this.pointCollectionY);
    }
  };

  // Method to draw the points
  this.draw = function (bubbleShape, reset) {
    for (var i = 0; i < this.points.length; i++) {
      var point = this.points[i];

      if (point === null) continue;

      if (window.reset) {
        this.pointCollectionX = 0;
        this.pointCollectionY = 0;
        this.mousePos = new Vector(0, 0);
      }

      point.draw(
        bubbleShape,
        this.pointCollectionX,
        this.pointCollectionY,
        reset
      );
    }
  };

  // Method to reset the point collection
  this.reset = function (bubbleShape) {};
}

// Definition of the Point class to represent individual points
function Point(x, y, z, size, color) {
  this.curPos = new Vector(x, y, z);
  this.color = color;

  // Constants for physics simulation
  this.friction = document.Friction;
  this.rotationForce = document.rotationForce;
  this.springStrength = 0.01;

  // Initialization of properties
  this.originalPos = new Vector(x, y, z);
  this.radius = size;
  this.size = size;
  this.targetPos = new Vector(x, y, z);
  this.velocity = new Vector(0.0, 0.0, 0.0);

  // Method to update the point's position based on physics simulation
  this.update = function () {
    var dx = this.targetPos.x - this.curPos.x;
    var dy = this.targetPos.y - this.curPos.y;
    var ax = dx * this.springStrength - this.rotationForce * dy;
    var ay = dy * this.springStrength + this.rotationForce * dx;

    this.velocity.x += ax;
    this.velocity.x *= this.friction;
    this.curPos.x += this.velocity.x;

    this.velocity.y += ay;
    this.velocity.y *= this.friction;
    this.curPos.y += this.velocity.y;

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

    this.radius = this.size * this.curPos.z;
    if (this.radius < 1) this.radius = 1;
  };

  // Method to draw the point
  this.draw = function (bubbleShape, dx, dy) {
    ctx.fillStyle = this.color;
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

// Function to create a color in HSL format
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

// Function to update canvas dimensions on window resize
function updateCanvasDimensions() {
  canvas.attr({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  canvasWidth = canvas.width();
  canvasHeight = canvas.height();
  draw();
}

// Function to update mouse position on mouse move
function onMove(e) {
  if (pointCollection) {
    pointCollection.mousePos.set(
      e.pageX - canvas.offset().left,
      e.pageY - canvas.offset().top
    );
  }
}

// Function to update mouse position on touch move
function onTouchMove(e) {
  if (pointCollection) {
    pointCollection.mousePos.set(
      e.targetTouches[0].pageX - canvas.offset().left,
      e.targetTouches[0].pageY - canvas.offset().top
    );
  }
}
