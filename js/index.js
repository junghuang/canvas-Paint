var paintPad = document.getElementById('canvas')
var context = paintPad.getContext('2d')
var lineWidth = 5
var color = [red, orange, yellow, green, blue, cyan, purple]
var pens = [thin, thick, x3, x4, x5]

autoSetCanvasSize(paintPad)

listenToUser(paintPad)

var eraserEnabled = false
pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

//绑定选中
addSelected()
//设置画笔
setPenSize()


clear.onclick = function () {
  context.clearRect(0, 0, paintPad.width, paintPad.height)
}

download.onclick = function () {
  var url = paintPad.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = 'pic'
  a.target = '_blank'
  a.click()
}

function setPenSize() {
  for (var i = 0; i < pens.length; i++) {
    (function (n) {
      pens[n].onclick = function () {
        lineWidth = 5 * (n + 1)
      }
    }(i))
  }
}

function addSelected() {
  color.forEach(function (c) {
    c.onclick = function () {
      context.fillStyle = c.id;
      context.strokeStyle = c.id;
      removeSelected()
      c.classList.add('active')
    }
  })
}

function removeSelected() {
  color.forEach(function (c) {
    c.classList.remove('active')
  })
}

function autoSetCanvasSize(canvas) {
  SetCanvasSize()

  window.onresize = function () {
    SetCanvasSize()
  }

  function SetCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.pi * 2)
  context.closePath()
  context.fill()
}

function drawLine(x1, x2, y1, y2) {
  context.beginPath()
  context.lineWidth = lineWidth
  context.moveTo(x1, x2)
  context.lineTo(y1, y2)
  context.closePath()
  context.stroke()
}

function clearDraw(x, y, width = 20, height = 20) {
  context.clearRect(x - width / 2, y - height / 2, width, height)
}

//监听用户
function listenToUser(canvas) {
  var using = false
  var lastPoint = {x: undefined, y: undefined}
  //特性检测
  if (document.body.ontouchstart !== undefined) { // === null
    //  触屏设备
    canvas.ontouchstart = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      using = true
      if (eraserEnabled) {
        clearDraw(x, y)
      } else {
        lastPoint = {'x': x, 'y': y}
      }
    }
    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY

      if (!using) {
        return
      }

      if (eraserEnabled) {
        clearDraw(x, y)
      } else {
        var newPoint = {'x': x, 'y': y}
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function () {
      using = false
    }
  } else {
    // 非触屏设备
    canvas.onmousedown = function (e) {
      var x = e.clientX
      var y = e.clientY
      using = true
      if (eraserEnabled) {
        clearDraw(x, y)
      } else {
        lastPoint = {'x': x, 'y': y}
      }
    }

    canvas.onmousemove = function (e) {
      var x = e.clientX
      var y = e.clientY

      if (!using) {
        return
      }

      if (eraserEnabled) {
        clearDraw(x, y)
      } else {
        var newPoint = {'x': x, 'y': y}
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }

    canvas.onmouseup = function () {
      using = false
    }
  }

}


