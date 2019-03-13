var draw = document.getElementById('draw') //通过ID取元素
var context = draw.getContext('2d')


//设置画布大小
canvasSize(draw)
window.onresize = function () {
    canvasSize(draw)
}

var painting = false
var formerPoint = { x: undefined, y: undefined }

draw.onmousedown = function (xy) {
    painting = true
    var x = xy.clientX
    var y = xy.clientY
    formerPoint = { x: x, y: y }  //重置former，否在会连接上次结束的点！！！
    drawPoint(x, y, 2)
}

draw.onmousemove = function (xy) {
    if (painting) {
        var x = xy.clientX
        var y = xy.clientY
        var presentPonit = { x: x, y: y }
        drawLine(formerPoint.x, formerPoint.y, presentPonit.x, presentPonit.y, 5)
        formerPoint = presentPonit  //不断替换坐标
    }
}

draw.onmouseup = function (xy) {
    painting = false
}


function drawPoint(x, y, radius) {
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function drawLine(x1, y1, x2, y2, w) {
    context.beginPath()
    context.fillStyle = 'black'
    context.beginPath();
    context.lineWidth = w
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke()
    context.closePath()
}
function canvasSize(canvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}