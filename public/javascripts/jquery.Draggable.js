;(function($) {
	var dragObject = null;
	var mouseObject = null;
	//捕获鼠标相关事件
	document.onmousemove = mouseMove;
	document.onmouseup = mouseUp;
	//创建一个鼠标位置
	function MousePoint(x, y) {

		this.x = x;
		this.y = y;
	}

	//寻找鼠标位置
	function mousePosition(event) {
		var x = parseInt(event.clientX);
		var y = parseInt(event.clientY);
		return new MousePoint(x, y);
	}

	//获取元素在页面中的位置偏移量
	function getMouseOffset(target, event) {
		var theEvent = event ? event : window.event;
		var mousePos = mousePosition(theEvent);

		var x = mousePos.x - target.offsetLeft;
		var y = mousePos.y - target.offsetTop;
		return new MousePoint(x, y);
	}

	//停止拖放
	function mouseUp(event) {
		dragObject = null;
	}

	//当拖动时捕获鼠标的移动
	function mouseMove(event) {
		if(!dragObject)
			return;
		var theEvent = event ? event : window.event;
		var mousePos = mousePosition(theEvent);
		//如果可拖放，设置新的绝对位置
		if(dragObject) {
			dragObject.style.position = 'relative';
			dragObject.style.top = mousePos.y - mouseOffset.y + "px";
			dragObject.style.left = mousePos.x - mouseOffset.x + "px";
			return false;
		}
	}

	//使对象可拖放
	function makeDraggable(item) {
		if(item) {
			item.mousedown(function(theEvent) {
                dragObject = this;
                mouseOffset = getMouseOffset(this, theEvent);
                return false;
            });
        }		
	}
	/*$.Draggable = makeDraggable;*/

	jQuery.fn.extend({
		"Draggable":function(){
			return makeDraggable(this);
		}
	});
})(jQuery); 