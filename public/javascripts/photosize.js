jQuery(function ($) {
	$('.artZoom').artZoom({
		path: '../artZoom/images',	// 设置artZoom图片文件夹路径
		preload: true,		// 设置是否提前缓存视野内的大图片
		blur: true,			// 设置加载大图是否有模糊变清晰的效果
		
		// 语言设置
		left: '左旋转',		// 左旋转按钮文字
		right: '右旋转',		// 右旋转按钮文字
		source: '看原图'		// 查看原图按钮文字
	});
});
