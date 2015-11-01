/**
 * Created by John Goen
 * Draw a simple circle that inscribes the page, with same color as page's compliment.
 */
var circle = document.getElementById("circle");
var circle_context = circle.getContext("2d");

var centerX = circle.width / 2;
var centerY = circle.height / 2;

var radius = centerX - .012*centerX;

circle_context.beginPath();
circle_context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

circle_context.lineWidth = 5;
circle_context.strokeStyle = '#6B6793';
circle_context.stroke();