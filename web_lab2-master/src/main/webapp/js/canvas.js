function init(){
    let canv = document.getElementById("canvas");
    let ctx = canv.getContext('2d');
    ctx.fillStyle="#000000";
    const HEIGHT=400;
    const WIDTH=800;
    const RADIUS=(HEIGHT-50)/10;
    canv.width=WIDTH;
    canv.height=HEIGHT;
    ctx.fillStyle="#9abdff";
    ctx.fillRect(WIDTH/2, HEIGHT/2, RADIUS, 2*RADIUS);

    ctx.moveTo(WIDTH/2,HEIGHT/2);
    ctx.lineTo(WIDTH/2,HEIGHT/2-RADIUS);
    ctx.lineTo(WIDTH/2-RADIUS,HEIGHT/2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(WIDTH/2,HEIGHT/2);
    ctx.lineTo(WIDTH/2,HEIGHT/2-2*RADIUS);
    ctx.lineTo(WIDTH/2+1*RADIUS,HEIGHT/2);
    ctx.fill();

    ctx.arc(WIDTH/2,HEIGHT/2,2*RADIUS,Math.PI*1.5,0);
    ctx.fill();

    ctx.fillStyle="#000000";

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
        ctx.moveTo(WIDTH/2-5,HEIGHT/2+i*RADIUS);
        ctx.lineTo(WIDTH/2+5,HEIGHT/2+i*RADIUS);
        ctx.stroke();
        ctx.strokeText(String(-i),WIDTH/2+5,HEIGHT/2+i*RADIUS);
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
        ctx.moveTo(WIDTH/2-i*RADIUS,HEIGHT/2+5);
        ctx.lineTo(WIDTH/2-i*RADIUS,HEIGHT/2-5);
        ctx.stroke();
        ctx.strokeText(String(-i),WIDTH/2-i*RADIUS,HEIGHT/2-5);

    }





}
