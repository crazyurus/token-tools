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
			else if(result.data) bootbox.alert(result.data);
		});
	},
	check: {
		url: function(url) {
			return /^[a-zA-z]+:\/\/[^\s]*$/.test(url);
		},
		qq: function(qq) {
			return /^[1-9][0-9]{4,10}$/.test(qq);
		},
		weibo: function(weibo) {
			return /^[0-9]{8,12}$/.test(weibo);
		}
	},
	detect: {
		_useragent: navigator.userAgent,
		isIE: function() {
            return !!window.ActiveXObject || "ActiveXObject" in window;
		},
		isChrome: function() {
			return !!window.chrome;
		},
		isFirefox: function() {
			return !!window.netscape && !!window.Iterator;
		},
		isOpera: function() {
			return !!window.opera;
		},
		isSafari: function() {
			return this._useragent.indexOf("Safari")>-1 && this._useragent.indexOf("Chrome")<1;
		},
		getIEVer: function() {
			var result = this._useragent.match(/(msie) ([\w.]+)/gi);
			return result ? parseFloat(result[0].replace(/(msie) /i, "")) : 99;
		}
	},
	storage: {
    	_storage: window.localStorage,
	    enable: function() {
	        return this._storage != undefined;
	    },
	    set: function(key, value) {
	        if (this._storage) {
	            this._storage.setItem(key, value);
	        }
	    },
	    get: function(key) {
	        var val = undefined;
	        if (this._storage) {
	            val = this._storage.getItem(key);
	        }
	        return val;
	    },
	    has: function(key) {
	        return this.get(key) != undefined;
	    },
	    remove: function(key) {
	        if (this._storage) {
	            this._storage.removeItem(key);
	        }
	    },
	    clear: function() {
	        this._storage.clear();
	    }
	},
	message: {
		alert: bootbox.alert,
		confirm: bootbox.confirm,
		prompt: bootbox.prompt,
		dialog: bootbox.dialog,
		topbar: function(name, text) {
			if(!Token.storage.has("top_"+name)) {
				$(".alert-top").show();
				$(".alert-top > button").data("name", name);
				$(".alert-top > .top-text").html(text);
			}
		}
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

	// 检查IE版本
	var ie_ver = Token.detect.getIEVer();
	if(Token.detect.isIE() && ie_ver < 10) {
		Token.message.topbar("iever", "检测到正在使用 Internet Explorer " + ie_ver+ "。为了更好地浏览本网站，请将浏览器升级到更高版本或更换为其它浏览器。");
	}

	// 警告框关闭
	$(".alert-top > button").click(function() {
		var name = $(this).data("name");
		if(name != "") Token.storage.set("top_"+name, true);
		$(".alert-top").slideUp("fast");
	});
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
