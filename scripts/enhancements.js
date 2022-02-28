/*
Filename: apply.js
Targethtml: apply.html
Purpose: Validate application form and store data to local and session storages
Author: Hoang Chau Anh Pham
Date Written: 15/9/2021
Last Edit: 18/9/2021
*/


// include the things in the about.html and so on here

var latt= 0;
var logg = 0;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(demo);
    document.getElementById("demo").innerHTML = "Your coordinates:<br>" + "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    latt = position.coords.latitude;
    logg = position.coords.longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
        x.innerHTML = "You have denied the Geolocation request.";
        break;
        case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Cannot find your location.";
        break;
    }
}

function confirm_canvas(){
var canvas = document.createElement("canvas");
var width = canvas.width = window.innerWidth * 0.75;
var height = canvas.height = window.innerHeight * 0.75;
document.body.appendChild(canvas);
var gl = canvas.getContext('webgl');

var mouse = {x: 0, y: 0};

var numMetaballs = 30;
var metaballs = [];

for (var i = 0; i < numMetaballs; i++) {
  var radius = Math.random() * 60 + 10;
  metaballs.push({
    x: Math.random() * (width - 2 * radius) + radius,
    y: Math.random() * (height - 2 * radius) + radius,
    vx: (Math.random() - 0.5) * 3,
    vy: (Math.random() - 0.5) * 3,
    r: radius * 0.75
  });
}

var vertexShaderSrc = `
attribute vec2 position;

void main() {
gl_Position = vec4(position, 0.0, 1.0);
}
`;

var fragmentShaderSrc = `
precision highp float;

const float WIDTH = ` + (width >> 0) + `.0;
const float HEIGHT = ` + (height >> 0) + `.0;

uniform vec3 metaballs[` + numMetaballs + `];

void main(){
float x = gl_FragCoord.x;
float y = gl_FragCoord.y;

float sum = 0.0;
for (int i = 0; i < ` + numMetaballs + `; i++) {
vec3 metaball = metaballs[i];
float dx = metaball.x - x;
float dy = metaball.y - y;
float radius = metaball.z;

sum += (radius * radius) / (dx * dx + dy * dy);
}

if (sum >= 0.99) {
gl_FragColor = vec4(mix(vec3(x / WIDTH, y / HEIGHT, 1.0), vec3(1, 1, 1), max(0.0, 1.0 - (sum - 0.99) * 100.0)), 1.0);
return;
}

gl_FragColor = vec4(2.0, 2.0, 2.0, -1.0);
}

`;

var vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
var fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);

var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

var vertexData = new Float32Array([
  -1.0,  1.0, // top left
  -1.0, -1.0, // bottom left
  1.0,  1.0, // top right
  1.0, -1.0, // bottom right
]);
var vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

var positionHandle = getAttribLocation(program, 'position');
gl.enableVertexAttribArray(positionHandle);
gl.vertexAttribPointer(positionHandle,
  2, 
  gl.FLOAT, 
  gl.FALSE, 
  2 * 4, 
  0 
);

var metaballsHandle = getUniformLocation(program, 'metaballs');

loop();
function loop() {
  for (var i = 0; i < numMetaballs; i++) {
    var metaball = metaballs[i];
    metaball.x += metaball.vx;
    metaball.y += metaball.vy;

    if (metaball.x < metaball.r || metaball.x > width - metaball.r) metaball.vx *= -1;
    if (metaball.y < metaball.r || metaball.y > height - metaball.r) metaball.vy *= -1;
  }

  var dataToSendToGPU = new Float32Array(3 * numMetaballs);
  for (var i = 0; i < numMetaballs; i++) {
    var baseIndex = 3 * i;
    var mb = metaballs[i];
    dataToSendToGPU[baseIndex + 0] = mb.x;
    dataToSendToGPU[baseIndex + 1] = mb.y;
    dataToSendToGPU[baseIndex + 2] = mb.r;
  }
  gl.uniform3fv(metaballsHandle, dataToSendToGPU);
  
  //Draw
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(loop);
}
function getUniformLocation(program, name) {
  var uniloc = gl.getUniformLocation(program, name);
  if (uniloc === -1) {
    throw 'Can not find uniform ' + name + '.';
  }
  return uniloc;
}

function getAttribLocation(program, name) {
  var atloc = gl.getAttribLocation(program, name);
  if (atloc === -1) {
    throw 'Can not find attribute ' + name + '.';
  }
  return atloc;
}

function compileShader(shaderSource, shaderType) {
  var sh = gl.createShader(shaderType);
  gl.shaderSource(sh, shaderSource);
  gl.compileShader(sh);

  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    throw "sh compile failed with: " + gl.getShaderInfoLog(sh);
  }

  return sh;
}
canvas.onmousemove = function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}
}

function Submit() {
	window.open('/confirm.html');
}

function init(){
	if (window.localStorage.getItem('href') == "/index.html"){
        if (document.getElementById("submit-button") != null){
            var submit_button = document.getElementById("submit-button");
            submit_button.onclick = Submit;
        }
        else {
            confirm_canvas();
        }
	}
    if (window.localStorage.getItem('href') == "/about.html"){
        var get_loc = document.getElementById("getlocation");
        get_loc.onclick = getLocation;
        console.log(window.localStorage.getItem('href'));
    } 
}
window.onload = init;

// and confirm.js.


