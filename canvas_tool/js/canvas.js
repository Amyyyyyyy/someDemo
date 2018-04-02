
document.body.ontouchStart = function(e){
    e.preventDefault();
}
var canvas = document.getElementById('canvas');
if (canvas.getContext) {
    // 画笔
    var context = canvas.getContext('2d');
    // 默认画笔粗细
    var lineWidth = 5;
    // 画布状态
    var using = false;

    // 橡皮擦状态
    var eraserEnabled = false;

    // 设置canvas高度
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    autoSetCanvasSize(canvas, pageWidth, pageHeight);

    // 监听触屏/鼠标
    listenToUser(canvas);

    // 橡皮擦点击事件
    eraser.onclick = function () {
        eraserEnabled = true;
        eraser.classList.add('active');
        brush.classList.remove('active');
        clear.classList.remove('active');
    }
    // 画笔点击事件
    brush.onclick = function () {
        eraserEnabled = false;
        brush.classList.add('active');
        eraser.classList.remove('active');
        clear.classList.remove('active');
    }

    // 清屏点击事件
    clear.onclick = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        clear.classList.add('active');
        brush.classList.remove('active');
        eraser.classList.remove('active');
    }

    // 线条点击事件
    thinLine.onclick = function () {
        context.lineWidth = 1
        thinLine.classList.add("active")
        middleLine.classList.remove("active")
        thickLine.classList.remove("active")
    }
    middleLine.onclick = function () {
        context.lineWidth = 3
        thinLine.classList.remove("active")
        middleLine.classList.add("active")
        thickLine.classList.remove("active")
    }
    thickLine.onclick = function () {
        context.lineWidth = 4
        thinLine.classList.remove("active")
        middleLine.classList.remove("active")
        thickLine.classList.add("active")
    }

    //颜色点击事件
    black.onclick = function () {
        context.strokeStyle = "black"
        black.classList.add("active")
        red.classList.remove("active")
        green.classList.remove("active")
        blue.classList.remove("active")
    }
    red.onclick = function () {
        context.strokeStyle = "red"
        black.classList.remove("active")
        red.classList.add("active")
        green.classList.remove("active")
        blue.classList.remove("active")
    }
    green.onclick = function () {
        context.strokeStyle = "green"
        black.classList.remove("active")
        red.classList.remove("active")
        green.classList.add("active")
        blue.classList.remove("active")
    }
    blue.onclick = function () {
        context.strokeStyle = "blue"
        black.classList.remove("active")
        red.classList.remove("active")
        green.classList.remove("active")
        blue.classList.add("active")
    }

    // 下载点击事件
    download.onclick = function () {
        var url = canvas.toDataURL("img/png")
        // 创建一个a标签 模拟点击下载
        var a = document.createElement('a')
        a.href = url
        document.body.appendChild(a)
        a.download = 'canvas';
        a.click();
        download.classList.add('active');
    }
    /**************************************************************/


    // 视口改变大小时，改变canvas大小
    function autoSetCanvasSize(canvas, pageWidth, pageHeight) {
        setCanvasSize();
        window.onresize = function () {
            setCanvasSize();
        }
        function setCanvasSize() {
            canvas.width = pageWidth;
            canvas.height = pageHeight;
        }
    }

    // 画线
    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1)
        context.lineWidth = lineWidth;
        context.lineTo(x2, y2)
        context.stroke()
        context.closePath()
    }

    function listenToUser(canvas) {
        var lastPoint = {
            x: undefined,
            y: undefined
        }
        // 特性检测
        if (document.body.ontouchstart !== undefined) {
            context
            // 触碰设备
            canvas.ontouchstart = function (e) {
                var x = e.touches[0].clientX;
                var y = e.touches[0].clientY;
                using = true;
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 20, 20)
                } else {
                    lastPoint = {
                        "x": x,
                        "y": y
                    }
                }
            }
            canvas.ontouchmove = function (e) {
                var x = e.touches[0].clientX;
                var y = e.touches[0].clientY;

                if (!using) { return }

                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 20, 20)
                } else {
                    var newPoint = {
                        "x": x,
                        "y": y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
            canvas.ontouchend = function (e) {
                using = false
            }
        } else {
            // 非触屏设备
            canvas.onmousedown = function (e) {
                var x = e.clientX
                var y = e.clientY
                using = true
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 20, 20)
                } else {
                    lastPoint = {
                        "x": x,
                        "y": y
                    }
                }
            }

            canvas.onmousemove = function (e) {
                var x = e.clientX
                var y = e.clientY

                if (!using) { return }

                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 20, 20)
                } else {
                    var newPoint = {
                        "x": x,
                        "y": y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }

            }

            canvas.onmouseup = function (e) {
                using = false
            }
        }
    }
}
