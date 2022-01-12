
let errorX1= document.createElement("p");
errorX1.textContent = "X must be number";
let errorX2= document.createElement("p");
errorX2.textContent = "X must be in (-3;3)";
let errorX3= document.createElement("p");
errorX3.textContent = "X can't be empty";
let errorY=document.createElement("p");
errorY.textContent = "Y must be chosen";
let errorR1= document.createElement("p");
errorR1.textContent = "R must be number";
let errorR2= document.createElement("p");
errorR2.textContent = "R must be in (1;4)";
let errorR3= document.createElement("p");
errorR3.textContent = "R can't be empty";
let inputY;
let inputX;
let inputR;

let canvas=document.getElementById("canvas");
let ctx = canvas.getContext('2d');
const Y_VALUES = [-5.0, -4.0, -3.0,  -2.0,  -1.0,  0.0, 1.0, 2.0, 3.0];
let yFromCanvas;
let xFromCanvas;
const HEIGHT=400;
const WIDTH=800;
const DOT=(HEIGHT-50)/10;

$(document).ready(function(){
    canvas.addEventListener("mousedown",function (event) {
        if (!validateR()){
            return;
        }

        drawFigures();
        drawPoints();
        xFromCanvas=(event.offsetX-canvas.width/2)/DOT;
        yFromCanvas=-(event.offsetY-canvas.height/2)/DOT;
        drawPoint(event.offsetX,event.offsetY);
        if(xFromCanvas <= -3||yFromCanvas<-5||xFromCanvas>=3||yFromCanvas>3){
            return;
        }
        inputX=xFromCanvas.toFixed(2);
        findNearestY();
        sendCheckAreaRequest(inputX,inputY,inputR);
    });

    $('#main-form').on('submit', function(event) {
        event.preventDefault();
        if (!validateForm()) {
            return;
        } else {
            drawFigures();
            drawPoints();
             massivWithY.forEach(function (inputY){
                 sendCheckAreaRequest(inputX,inputY,inputR);
                 drawPoint(inputX*DOT+canvas.width/2,-inputY*DOT+canvas.height/2);
             })
        }
        $('#x').trigger('reset');
        $('#y').trigger('reset');
    });


});
function findNearestY(){
    let minDifference=Infinity;
    for (let i = 0; i < Y_VALUES.length; i++) {
        if (Math.abs(yFromCanvas - Y_VALUES[i]) < minDifference) {
            minDifference = Math.abs(yFromCanvas - Y_VALUES[i]);
            inputY = Y_VALUES[i];
        }
    }
}
function drawPoints(){
    let pointX = Array.from(document.getElementsByClassName("coordX")).map(v => v.innerHTML);
    let pointY = Array.from(document.getElementsByClassName("coordY")).map(v => v.innerHTML);
    for (let i=0;i<pointX.length;i++){
      //  console.log(pointY);
        drawPoint(pointX[i]*DOT+canvas.width/2,-pointY[i]*DOT+canvas.height/2);
    }
}
function drawPoint(x,y){
    ctx.fillStyle="#4F8A8B";
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(x, canvas.height/2);
    ctx.lineTo(x, y);
    ctx.moveTo(canvas.width/2, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = "#fa1515";
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.setLineDash([]);
}
function clearCanvas(){
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}
function drawFigures(){
    clearCanvas();
    const RADIUS=(HEIGHT-50)/10*inputR/2;
    ctx.fillStyle="#9abdff";
    ctx.fillRect(WIDTH/2, HEIGHT/2, RADIUS, 2*RADIUS);
    ctx.beginPath();
    ctx.moveTo(WIDTH/2,HEIGHT/2);
    ctx.lineTo(WIDTH/2,HEIGHT/2-RADIUS);
    ctx.lineTo(WIDTH/2-RADIUS,HEIGHT/2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(WIDTH/2,HEIGHT/2);
    ctx.lineTo(WIDTH/2,HEIGHT/2-2*RADIUS);
    ctx.lineTo(WIDTH/2+2*RADIUS,HEIGHT/2);
    ctx.fill();

    ctx.arc(WIDTH/2,HEIGHT/2,2*RADIUS,Math.PI*1.5,0);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(WIDTH/2,0);
    ctx.lineTo(WIDTH/2,HEIGHT);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(WIDTH/2,0);
    ctx.lineTo(WIDTH/2-10,15);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(WIDTH/2,0);
    ctx.lineTo(WIDTH/2+10,15);
    ctx.stroke();

    for (let i=-5;i<=5;i++ ){
        ctx.beginPath();
        ctx.moveTo(WIDTH/2-5,HEIGHT/2+i*DOT);
        ctx.lineTo(WIDTH/2+5,HEIGHT/2+i*DOT);
        ctx.stroke();
        ctx.strokeText(String(-i),WIDTH/2+5,HEIGHT/2+i*DOT);
    }

    ctx.beginPath();
    ctx.moveTo(WIDTH*2/10,HEIGHT/2);
    ctx.lineTo(8*WIDTH/10,HEIGHT/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(WIDTH*8/10,HEIGHT/2);
    ctx.lineTo(8*WIDTH/10-15,HEIGHT/2-10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(WIDTH*8/10,HEIGHT/2);
    ctx.lineTo(8*WIDTH/10-15,HEIGHT/2+10);
    ctx.stroke();

    for (let i=-5;i<=5;i++ ){
        ctx.beginPath();
        ctx.moveTo(WIDTH/2-i*DOT,HEIGHT/2+5);
        ctx.lineTo(WIDTH/2-i*DOT,HEIGHT/2-5);
        ctx.stroke();
        ctx.strokeText(String(-i),WIDTH/2-i*DOT,HEIGHT/2-5);

    }
}
function validateX() {
    let xField = $('#x_text_field');
    inputX = xField.val().replace(',', '.');
    if (inputX == ""){
        errorX1.remove();
        errorX2.remove();
        $('#errors').append(errorX3);
        return false;
    }else{
        if ((/[^0-9.-]/i.test(inputX))){
            errorX2.remove();
            errorX3.remove();
            $('#errors').append(errorX1);
            return false;
        }
        else{
            if (inputX > -3 && inputX < 3){
                errorX1.remove();
                errorX2.remove();
                errorX3.remove();
                return true;
            }else{
                errorX1.remove();
                errorX3.remove();
                $('#errors').append(errorX2);
                return false;
            }
        }

    }

}
function validateY() {
    let checkboxes=document.getElementsByName('y');
    massivWithY=[];
    if ($('.y-checkbox').is(':checked')) {
        checkboxes.forEach(checkbox=> {
            if (checkbox.checked){
                massivWithY.push(checkbox.value);
            }
        });
        errorY.remove();
        return true;
    } else {
        $('#errors').append(errorY);
        return false;
    }

}
function validateR() {
    let rField = $('#r_text_field');
    inputR = rField.val().replace(',', '.');
    if(inputR == ""){
        errorR1.remove();
        errorR2.remove();
        $('#errors').append(errorR3);
        return false;
    }else{
        if ((/[^0-9.-]/i.test(inputR))){
            errorR2.remove();
            errorR3.remove();
            $('#errors').append(errorR1);
            return  false;
        }else{
            if (inputR > 1 && inputR < 4){
                errorR1.remove();
                errorR2.remove();
                errorR3.remove();
                return true;
            }else{
                errorR1.remove();
                errorR3.remove();
                $('#errors').append(errorR2);
                return false;

            }
        }
    }
}
function validateForm() {
    if (validateX() & validateY() & validateR()){
        return true;
    }else{
        return false;
    }



}
function sendCheckAreaRequest(x, y, r) {
    return $.post("process", {
        'x': x,
        'y': y,
        'r': r
    }).done(function (data) {
        if (data === "INVALID VALUES" || data == null || data==="") {
            console.log("INVALID VALUES");
        }
        else {
            //console.log(data);
            $("#result-table tr:gt(0)").remove();
            let result = JSON.parse(data);
            for (let i in result.response){
                let newRow = '<tr>';
                    newRow += '<td class="coordX">' +  result.response[i].xval + '</td>';
                    newRow += '<td class="coordY">' + result.response[i].yval + '</td>';
                    newRow += '<td>' + result.response[i].rval + '</td>';
                    newRow += '<td>' + result.response[i].currentTime + '</td>';
                    newRow += '<td>' + result.response[i].executeTime + '</td>';
                    newRow += '<td>' + result.response[i].result + '</td>';
                    $('#result-table').append(newRow);
            }
            }
    })
        .fail(function (err) {
            alert(err);
        });



}












