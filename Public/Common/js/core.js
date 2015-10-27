// 修复IE8不支持trim
if (!String.prototype.trim) String.prototype.trim = function() {
	return $.trim(this);
};

// 定义Token对象
var Token = {
	alert: bootbox.alert,
	ajax: function(url, parameters, callback) {
		$.post(url, parameters, function(result) {
			if(result.code == 200) callback(result.data);
			else bootbox.alert(result.data);
		});
	},
	variable: ""
};

// 返回顶部
$("#go_top").click(function() {
	$("body,html").animate({ scrollTop: 0}, 500);
});

// 设置进度条
$(document).ready(function() { 
	NProgress.start();
});

$(window).load(function() {  
	NProgress.done();
}); 

$(document).ajaxSend(function() {
	NProgress.start();
});

$(document).ajaxComplete(function() {
	NProgress.done();
});
