var draw = document.getElementById('draw') //通过ID取元素
var context = draw.getContext('2d')


//设置画布大小
canvasSize(draw)
window.onresize = function () {
    canvasSize(draw)
}


//默认颜色和粗细
context.lineWidth = 2
var radius = 1
context.fillStyle = 'black'
context.strokeStyle = 'black'


var moving = false
var formerPoint = { x: undefined, y: undefined }
var eraserOn = false


//判断设备时候支持触屏
if (document.body.ontouchstart !== undefined) {
    //触屏设备
    draw.ontouchstart = function (xy) {
        moving = true
        var x = xy.touches[0].clientX
        var y = xy.touches[0].clientY
        formerPoint = { x: x, y: y }  //重置former，否在会连接上次结束的点！！！
        if (eraserOn) {
            context.fillStyle = 'white'
            drawPoint(x, y, 10)
        }
        else {
            drawPoint(x, y, radius)
        }
    }

    draw.ontouchmove = function (xy) {
        if (moving) {
            var x = xy.touches[0].clientX
            var y = xy.touches[0].clientY
            var presentPonit = { x: x, y: y }
            if (eraserOn) {
                context.fillStyle = 'white'
                drawPoint(x, y, 10)
            }
            else {
                drawLine(formerPoint.x, formerPoint.y, presentPonit.x, presentPonit.y, 5)
                formerPoint = presentPonit  //不断替换坐标
            }
        }

    }

    draw.ontouchend = function (xy) {
        moving = false
    }
}

else {
    //支持鼠标设备
    draw.onmousedown = function (xy) {
        moving = true
        var x = xy.clientX
        var y = xy.clientY
        formerPoint = { x: x, y: y }  //重置former，否在会连接上次结束的点！！！
        if (eraserOn) {
            context.fillStyle = 'white'
            drawPoint(x, y, 10)
        }
        else {
            drawPoint(x, y, radius)
        }
    }

    draw.onmousemove = function (xy) {
        if (moving) {
            var x = xy.clientX
            var y = xy.clientY
            var presentPonit = { x: x, y: y }
            if (eraserOn) {
                context.fillStyle = 'white'
                drawPoint(x, y, 10)
            }
            else {
                drawLine(formerPoint.x, formerPoint.y, presentPonit.x, presentPonit.y, 5)
                formerPoint = presentPonit  //不断替换坐标
                formerPoint = presentPonit  //不断替换坐标
            }
        }

        draw.onmouseup = function (xy) {
            moving = false
        }

    }
}
//按钮功能

pen.onclick = function () {
    eraserOn = false
    pen.classList.add('on')
    eraser.classList.remove('on')
}

eraser.onclick = function () {
    eraserOn = true
    eraser.classList.add('on')
    pen.classList.remove('on')
}

black.onclick = function () {
    context.fillStyle = 'black '
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function () {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')

}
green.onclick = function () {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    blue.classList.remove('active')

}
blue.onclick = function () {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')

}

thick1.onclick = function () {
    context.lineWidth = 1
    radius = 0.5
    thick1.classList.add('active')
    thick2.classList.remove('active')
    thick3.classList.remove('active')
}

thick2.onclick = function () {
    context.lineWidth = 2
    radius = 0.1
    thick2.classList.add('active')
    thick1.classList.remove('active')
    thick3.classList.remove('active')
}

thick3.onclick = function () {
    context.lineWidth = 4
    radius = 2
    thick3.classList.add('active')
    thick1.classList.remove('active')
    thick2.classList.remove('active')
}

clear.onclick = function () {
    context.clearRect(0, 0, draw.width, draw.height);
}



save.onclick = function () {
    var url = draw.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'picture'
    a.target = '_blank'
    a.click()
}


function drawPoint(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.beginPath();
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

