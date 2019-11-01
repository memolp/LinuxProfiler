/*!
 *  MiniDialog v1.0.5
 *  Copyright (C) 2019, ZhaoGang
 *  Released under the MIT license.
 */
 
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["minidialog"], factory);
	} else if (typeof module !== "undefined" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		module.exports = factory();
	} else {
		global.Dialog = factory();
	}
}(typeof window !== "undefined" ? window : void 0, function () {
	"use strict";

	var UA = navigator.userAgent.toLowerCase(),
		IE11 = UA.match("trident"); 

	// 获取 DOM
	var $ = function $(elem, context) {
		return (context || document).querySelector(elem);
	};

	var $$ = function $$(elem, context) {
		var arrayLike = _typeof(elem) === "object" ? elem.length ? elem : [elem] : (context || document).querySelectorAll(elem);
		return Array.from ? Array.from(arrayLike) : [].slice.call(arrayLike);
	}; 

	// 方法
	var Fn = {
		getCSS: function getCSS(elem, name) {
			return window.getComputedStyle(elem, null).getPropertyValue(name);
		},
		setCSS: function setCSS(elem, css) {
			$$(elem).forEach(function (el) {
				for (var name in css) {
					el.style[name] = css[name];
				}
			});
		},
		setAttr: function setAttr(elem, props) {
			$$(elem).forEach(function (el) {
				for (var name in props) {
					el.setAttribute(name, props[name]);
				}
			});
		},
		append: function append(elem, content) {
			$$(elem).forEach(function (el) {
				el.insertAdjacentHTML("beforeend", content);
			});
		},
		prepend: function prepend(elem, content) {
			$$(elem).forEach(function (el) {
				el.insertAdjacentHTML("afterbegin", content);
			});
		},
		remove: function remove(elem) {
			$$(elem).forEach(function (el) {
				el.parentNode.removeChild(el);
			});
		},
		type: function type(obj) {
			return Object.prototype.toString.call(obj).replace(/(\[object |\])/g, "").toLowerCase();
		},
		isPlainObject: function isPlainObject(obj) {
			return Fn.type(obj) === "object";
		},
		isEmptyObject: function isEmptyObject(obj) {
			return !Object.keys(obj).length;
		}
	}; 

	// 图标
	var Icon = function Icon(type) {
		var icon = "";

		switch (type) {
			case "info":
				icon = '<svg viewBox="0 0 1024 1024" version="1.1" width="30" height="30"><path d="M513.46384 60.225663c-248.292969 0-449.584462 201.299679-449.584462 449.625394 0 248.296039 201.291492 449.594695 449.584462 449.594695 248.28069 0 449.63665-201.299679 449.63665-449.594695C963.099467 261.525342 761.744529 60.225663 513.46384 60.225663zM554.626331 714.465225c0 22.720468-18.416442 41.139979-41.136909 41.139979s-41.136909-18.419512-41.136909-41.139979L472.352513 453.586612c0-22.716374 18.416442-41.135886 41.136909-41.135886s41.136909 18.419512 41.136909 41.135886L554.626331 714.465225zM513.489422 372.423081c-25.719778 0-46.561455-20.845771-46.561455-46.557362 0-25.719778 20.841677-46.560432 46.561455-46.560432s46.561455 20.841677 46.561455 46.560432C560.050878 351.577311 539.2092 372.423081 513.489422 372.423081z" fill="#19b6f8"></path></svg>';
				break;

			case "success":
				icon = '<svg viewBox="0 0 1024 1024" version="1.1" width="30" height="30"><path d="M513.559007 60.225663c-248.299109 0-449.587532 201.299679-449.587532 449.625394 0 248.296039 201.288422 449.594695 449.587532 449.594695 248.27762 0 449.63358-201.299679 449.63358-449.594695C963.192587 261.525342 761.836627 60.225663 513.559007 60.225663zM766.338151 407.245168 485.919507 692.261527c-0.044002 0.045025-0.084934 0.092098-0.127913 0.137123s-0.090051 0.085958-0.134053 0.12996l-0.751107 0.763386c-6.256494 6.359848-14.548344 9.5454-22.967084 9.597589-0.061398 0.001023-0.121773 0.001023-0.183172 0.002047-0.161682 0-0.322341 0.004093-0.485047 0.002047-8.398274 0.068562-16.715707-2.979868-23.057135-9.217942L282.51591 540.491914c-12.999059-12.791327-12.775978-34.097586 0.49835-47.590901 13.281491-13.494339 34.58468-14.06739 47.576575-1.276063l130.36921 128.264269 256.507048-260.722046c12.797467-12.999059 34.100656-12.771885 47.591925 0.502443C778.555403 372.942921 779.129478 394.243039 766.338151 407.245168z" fill="#08ba61"></path></svg>';
				break;

			case "warn":
				icon = '<svg viewBox="0 0 1024 1024" version="1.1" width="30" height="30"><path d="M513.46384 60.225663c-248.291946 0-449.584462 201.299679-449.584462 449.624371 0 248.296039 201.292516 449.594695 449.584462 449.594695 248.28069 0 449.63665-201.299679 449.63665-449.594695C963.099467 261.525342 761.744529 60.225663 513.46384 60.225663zM473.683834 304.175721c2.690272-35.478026 40.597627-32.423457 40.597627-32.423457s34.488489-2.288113 39.011502 32.225959c0 0 8.162914 181.774997-15.904225 294.366308 0 0-3.746324 14.944364-23.107277 16.22145l0 0.275269c-20.751626-0.539282-24.692379-16.296151-24.692379-16.296151C465.521944 485.947647 473.683834 304.175721 473.683834 304.175721zM513.489422 747.984642c-25.719778 0-46.560432-20.840654-46.560432-46.560432 0-25.710568 20.840654-46.556339 46.560432-46.556339s46.561455 20.845771 46.561455 46.556339C560.050878 727.143988 539.2092 747.984642 513.489422 747.984642z" fill="#f39509"></path></svg>';
				break;

			case "error":
				icon = '<svg viewBox="0 0 1024 1024" version="1.1" width="30" height="30"><path d="M513.559007 60.225663c-248.291946 0-449.587532 201.299679-449.587532 449.625394 0 248.291946 201.295586 449.594695 449.587532 449.594695 248.284783 0 449.632557-201.303772 449.632557-449.594695C963.191564 261.525342 761.84379 60.225663 513.559007 60.225663zM678.729837 644.059712c12.798491 13.003152 12.217253 34.302247-1.272993 47.575552-13.490246 13.275351-34.800597 13.502525-47.590901 0.503467l-116.284423-118.191866-116.278283 118.187773c-12.798491 13.003152-34.093493 12.774955-47.590901-0.499373-13.497409-13.277398-14.063297-34.576493-1.279133-47.575552l117.065206-118.984928L348.433202 406.088832c-12.783141-12.999059-12.218276-34.298154 1.279133-47.576575 13.497409-13.274328 34.792411-13.501502 47.590901-0.49835l116.279307 118.187773 116.2834-118.190843c12.790304-12.999059 34.100656-12.771885 47.590901 0.502443 13.491269 13.274328 14.071484 34.573423 1.272993 47.576575L561.666678 525.07376 678.729837 644.059712z" fill="#d81e06"></path></svg>';
				break;

			case "close":
				icon = '<svg viewBox="0 0 1024 1024" version="1.1" width="16" height="16"><path d="M806.4 172.8l-633.6 633.6c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l633.6-633.6c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0z" fill="#000"></path><path d="M172.8 172.8c-12.8 12.8-12.8 32 0 44.8l633.6 633.6c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8L217.6 172.8c-12.8-12.8-32-12.8-44.8 0z" fill="#000"></path></svg>';
				break;
		}

		return icon;
	}; 

	// 对话框样式
	var DialogCSS = ".mini-dialog-container,.mini-dialog-container *{box-sizing: content-box!important}\n\t\tbody.mini-dialog-body-noscroll{padding-right:17px;position:relative;height:100%;overflow:hidden}\n\t\t.mini-dialog-noselect{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}\n\t\t.mini-dialog-container{position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483580;pointer-events:none}\n\t\t.mini-dialog-container *{-webkit-tap-highlight-color:transparent;margin:0;padding:0}\n\t\t.mini-dialog-container-top{z-index:2147483584}\n\t\t.mini-dialog-mask{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);pointer-events:auto}\n\t\t.mini-dialog-mask-show{animation:MiniDialogMaskShow .35s;animation-fill-mode:forwards}\n\t\t.mini-dialog-mask-hide{animation:MiniDialogMaskHide .35s;animation-fill-mode:forwards}\n\t\t.mini-dialog-wrapper{position:absolute;top:50%;left:50%;background:#fff;overflow:hidden;transform:translate(-50%,-50%);box-shadow:rgba(0,0,0,.12) 0 0 12px;pointer-events:auto}\n\t\t.mini-dialog-wrapper-fullscreen{width:100%!important;height:100%!important;border-radius:0!important}\n\t\t.mini-dialog-wrapper-show{animation:MiniDialogWrapperShow .35s;animation-fill-mode:forwards}\n\t\t.mini-dialog-wrapper-hide{animation:MiniDialogWrapperHide .35s;animation-fill-mode:forwards}\n\t\t.mini-dialog-header{overflow:hidden;border-bottom:#e6e6e6 solid 1px}\n\t\t.mini-dialog-header-move{cursor:grab}\n\t\t.mini-dialog-header-move-ie{cursor:move}\n\t\t.mini-dialog-header>span{display:block;float:left;width:calc(100% - 65px);height:52px;line-height:52px;padding:0 15px;font-size:16px;font-weight:700;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\n\t\t.mini-dialog-header>i{display:block;float:right;width:20px;height:20px;line-height:20px;margin:17px 13px 0 0;font-style:normal;text-align:center;cursor:pointer;opacity:.35;transition:.2s}\n\t\t.mini-dialog-header>i:hover{opacity:1}\n\t\t.mini-dialog-header-drag{cursor:move}\n\t\t.mini-dialog-main{position:relative;padding:15px 0;min-height:100px;font-size:14px;line-height:160%;overflow:auto;word-break:break-all;color:#292929;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}\n\t\t.mini-dialog-main>div{overflow:hidden;margin:0 15px}\n\t\t.mini-dialog-main>iframe,.mini-dialog-main>img{display:block;position:absolute;top:0;left:0;width:100%;height:100%}\n\t\t.mini-dialog-main.mini-dialog-mobile-main{padding:10px 0}\n\t\t.mini-dialog-main.mini-dialog-mobile-main>div{margin:0 10px}\n\t\t.mini-dialog-main:hover .mini-dialog-image-prev,.mini-dialog-main:hover .mini-dialog-image-next{opacity:1}\n\t\t.mini-dialog-waiting-wrapper{box-shadow:none;padding:0;background:rgba(0,0,0,.7);border-radius:4px}\n\t\t.mini-dialog-waiting-wrapper .mini-dialog-main{background:rgba(0,0,0,0)!important;min-height:0;color:#eee;font-size:13px;text-align:center;padding:10px}\n\t\t.mini-dialog-waiting-wrapper span{display:block;text-align:center;margin-top:8px}\n\t\t.mini-dialog-waiting-box{margin:0 auto!important;width:40px;height:40px;border-radius:50%;border:rgba(255,255,255,.4) solid 3px;border-left:#eee solid 3px;animation:MiniDialogWaiting 1s linear infinite}\n\t\t.mini-dialog-prompt>p:first-child{font-size:14px;color:#f00;word-break:break-all}\n\t\t.mini-dialog-prompt>p:first-child+input{border-color:#f00!important}\n\t\t.mini-dialog-prompt input,.mini-dialog-prompt textarea{display:block;border-radius:4px;font-size:14px;outline:none;box-shadow:none;border:#dfdfdf solid 1px;padding:10px;width:calc(100% - 22px);transition:border-color .2s}\n\t\t.mini-dialog-prompt input{margin:10px 0}\n\t\t.mini-dialog-prompt input:hover,.mini-dialog-prompt textarea:hover{border-color:rgba(25,182,248,.6)}\n\t\t.mini-dialog-prompt input:focus,.mini-dialog-prompt textarea:focus{border-color:#19b6f8}\n\t\t.mini-dialog-prompt textarea{resize:vertical;min-height:18px}\n\t\t.mini-dialog-prompt textarea::-webkit-input-placeholder{display:block;height:17px;line-height:17px}\n\t\t.mini-dialog-prompt input::-webkit-input-placeholder,.mini-dialog-prompt textarea::-webkit-input-placeholder{color:#aaa}\n\t\t.mini-dialog-image-prev,.mini-dialog-image-next{opacity:0;transition:.2s}\n\t\tdiv.mini-dialog-image-wrapper{position:absolute;top:0;left:0;width:100%;height:100%;margin:0}\n\t\t.mini-dialog-image-wrapper>div:first-child{position:absolute;top:0;left:0;height:100%;transition-property:transform;transition-duration:.8s;transition-timing-function:cubic-bezier(.57,0,.375,1)}\n\t\t.mini-dialog-image-wrapper img{display:block;float:left}\n\t\tdiv.mini-dialog-image-next,div.mini-dialog-image-prev{width:40px;height:40px;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU1NzI0MjA4NjA5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIyOTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjgiIGhlaWdodD0iMjgiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTY3MC42NzY5MjkgNzc3LjU5Mjk4NCA0MDMuNjI3NzggNTEzLjM2MjAyMWwyNjUuMzIwNzg1LTI2OC4xNDYxMzNjMTEuNzc2MjA4LTExLjc3NTE4NCAxMS43MzQyNTItMzAuOTA4OTY0LTAuMDkxMDc0LTQyLjczNDI5bC0wLjAwMTAyMyAwYy0xMS44MjUzMjYtMTEuODI2MzUtMzAuOTU4MDgyLTExLjg2NzI4Mi00Mi43MjgxNSAyLjkzMDc0OUwzNDMuMTAwMjQyIDQ4OC40NDA0MjFjLTMuODE3OTU1IDQuMjczMzI3LTguMjA1ODkyIDkuMzIxMjk2LTguOTMzNDYzIDEyLjA0NTMzNy00LjQ3MDgyNSAxMS4xMTIwODItMi4yMzI4NTQgMjQuNzY1MDMzIDYuNzEwODQyIDM1Ljk4NzYzMmwyODYuOTgyMTMgMjg2Ljk4MjEzYzExLjg3NTQ2OCA4Ljg0NzUwNSAzMS4wOTYyMjkgOC44OTM1NTQgNDIuOTIyNTc4LTIuOTMyNzk2QzY4Mi42MDY2MzMgODA4LjY5NjM3NiA2ODIuNTYwNTg0IDc4OS40NzY2MzkgNjcwLjY3NjkyOSA3NzcuNTkyOTg0eiIgcC1pZD0iMjI5MSIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg==);background-color:rgba(0,0,0,.5);background-position:center;background-repeat:no-repeat;position:absolute;top:50%;border-radius:50%;cursor:pointer;margin-top:-20px}\n\t\t.mini-dialog-image-prev{left:15px}\n\t\t.mini-dialog-image-next{right:15px;transform:rotate(180deg)}\n\t\t.mini-dialog-footer{position:relative;text-align:right;height:34px;padding:15px 0;border-top:#e6e6e6 solid 1px}\n\t\t.mini-dialog-footer>div{display:inline-block;font-size:14px;cursor:pointer;text-align:center;border:#e8e8e8 solid 1px;height:32px;line-height:32px;vertical-align:middle;border-radius:4px;padding:0 14px;transition:.2s}\n\t\tdiv.mini-dialog-ok{color:#fff;background:#19b6f8;border-color:#19b6f8;margin:0 15px 0 5px}\n\t\tdiv.mini-dialog-ok:hover{background:#08a0e0;border-color:#08a0e0}\n\t\tdiv.mini-dialog-cancel{color:#888;background:#fff}\n\t\tdiv.mini-dialog-cancel:hover{background:#fafafa}\n\t\tdiv.mini-dialog-shortcuts-ok{margin:-5px 20px 0 0}\n\t\tdiv.mini-dialog-ok-disabled{pointer-events:none;opacity:.5}\n\t\t.mini-dialog-ok i{display:inline-block;width:12px;height:12px;margin-right:5px;border-radius:50%;border:#fff solid 1px;border-left:#09f solid 1px;animation:MiniDialogWaiting 1s linear infinite}\n\t\tdiv.mini-dialog-checkbox{position:relative;display:block;float:left;height:14px;line-height:14px;font-size:14px;margin:10px 0 0 15px;cursor:pointer;border:none;padding:0;transition:none}\n\t\tdiv.mini-dialog-checkbox.active div{background:#19b6f8;border-color:#19b6f8}\n\t\tdiv.mini-dialog-checkbox.active div::after{content:\"\";display:block;position:absolute;top:50%;left:50%;width:8px;height:4px;margin-top:-1px;border-left:#fff solid 2px;border-bottom:#fff solid 2px;transform:translate(-50%, -50%) rotate(-45deg) scale(0.8)}\n\t\t.mini-dialog-checkbox div{position:relative;width:12px;height:12px;border:#aaa solid 1px;border-radius:2px;float:left;margin-right:6px}\n\t\t.mini-dialog-checkbox span{color:#4a4a4a}\n\t\t.mini-dialog-autoclose{position:absolute;left:0;bottom:0;height:3px;background:#19b6f8;width:100%;transform:scaleX(0);transform-origin:left center;transition-property:transform;transition-timing-function:linear}\n\t\t.mini-dialog-autoclose-active{transform:scaleX(1)}\n\t\t.mini-dialog-shortcuts>i{display:block;float:left;width:30px;height:30px;margin:8px 0 0 10px;border-radius:50%;transform:scale(.9)}\n\t\t.mini-dialog-shortcuts>div{float:left;width:calc(100% - 60px);margin:8px 0 0 10px}\n\t\t.mini-dialog-shortcuts>div p{display:block;font-size:16px;font-weight:700;word-break:break-all;margin-top:3px}\n\t\t.mini-dialog-shortcuts>div div{font-size:14px;margin-top:5px;word-break:break-all}\n\t\t@keyframes MiniDialogMaskShow{0%{opacity:0}100%{opacity:1}}\n\t\t@keyframes MiniDialogMaskHide{0%{opacity:1}100%{opacity:0}}\n\t\t@keyframes MiniDialogWrapperShow{0%{opacity:0;transform:translate(-50%,-50%) scale(.85)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}\n\t\t@keyframes MiniDialogWrapperHide{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(.85)}}\n\t\t@keyframes MiniDialogWaiting{0%{transform:translateY(2px) rotate(0) scale(.85)}100%{transform:translateY(2px) rotate(360deg) scale(.85)}}\n\t";
	var DialogStyle = "<style class=\"mini-dialog-css\">".concat(DialogCSS, "</style>"); 

	// 对话框模板
	var DialogTmpl = "\n\t\t<div class=\"mini-dialog-container\">\n\t\t\t<div class=\"mini-dialog-mask\"></div>\n\t\t\t<div class=\"mini-dialog-wrapper\">\n\t\t\t\t<div class=\"mini-dialog-header\">\n\t\t\t\t\t<span></span>\n\t\t\t\t\t<i>".concat(Icon("close"), "</i>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"mini-dialog-main\">\n\t\t\t\t\t<div></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"mini-dialog-footer mini-dialog-noselect\">\n\t\t\t\t\t<div class=\"mini-dialog-cancel\">\n\t\t\t\t\t\t<span></span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"mini-dialog-ok\">\n\t\t\t\t\t\t<span></span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t"); // 对话框默认配置

	var Defaults = {
		title: "网页消息",
		content: "",
		contentBgColor: "#fff",
		iframeContent: null,
		videoContent: null,
		imageContent: null,
		fullscreen: false,
		draggable: false,
		maskClose: false,
		mask: true,
		closable: true,
		showTitle: true,
		bodyScroll: true,
		showButton: true,
		autoCloseEffect: true,
		parentsIframeLayer: 0,
		borderRadius: 6,
		autoClose: 0,
		width: 500,
		checkbox: null,
		ok: {
			text: "确定",
			waiting: false,
			waitingText: "确定",
			notClose: false,
			callback: function callback() {}
		},
		cancel: {
			text: "取消",
			show: true,
			callback: function callback() {}
		},
		afterOpen: function afterOpen() {},
		afterClose: function afterClose() {},
		SHORTCUTS: null,
		WAITING: null,
		PROMPT: null
	}; 

	// 整合参数
	function mergeParam(param) {
		var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Defaults;

		for (var name in target) {
			var v = target[name];

			if (Fn.type(v) !== "object") {
				if (param[name] === undefined) {
					param[name] = v;
				}
			} else {
				for (var _name in v) {
					if (param[name]) {
						if (param[name][_name] === undefined) {
							param[name][_name] = v[_name];
						}
					} else {
						param[name] = v;
					}
				}
			}
		}

		return param;
	}

	var Dialog = function Dialog() {

		// 参数修整
		var size = arguments.length;
		var options = {};

		if (!size) {
			return;
		} else if (size === 1) {
			if (Fn.isPlainObject(arguments.length <= 0 ? undefined : arguments[0])) {
				options = arguments.length <= 0 ? undefined : arguments[0];
			} else {
				options.content = arguments.length <= 0 ? undefined : arguments[0];
			}
		} else {
			options.title = arguments.length <= 0 ? undefined : arguments[0];
			options.content = arguments.length <= 1 ? undefined : arguments[1];
			options.width = arguments.length <= 2 ? undefined : arguments[2];
		}

		var opt = mergeParam(options || {});

		if (opt.WAITING) {
			opt.showTitle = false;
			opt.showButton = false;
			opt.width = "auto";
		}

		if (opt.PROMPT && opt.PROMPT.title) {
			opt.title = opt.PROMPT.title;
		}

		var isFullScreen = opt.fullscreen;
		var dialogWidth = opt.width; 

		// 添加对话框
		var _parent;

		if (!opt.parentsIframeLayer) {
			if (!$("style.mini-dialog-css")) {
				Fn.append($("head"), DialogStyle);
			}

			Fn.append($("body"), DialogTmpl);
		} else {
			_parent = parent;

			for (var i = 0; i < opt.parentsIframeLayer - 1; i++) {
				_parent = _parent.parent;
			}

			if (!$("style.mini-dialog-css", _parent.document)) {
				Fn.append($("head", _parent.document), DialogStyle);
			}

			Fn.append($("body", _parent.document), DialogTmpl);
		}

		var $container = _parent ? $("body > .mini-dialog-container:last-child", _parent.document) : $("body > .mini-dialog-container:last-child"),
				$mask = $(".mini-dialog-mask", $container),
				$wrapper = $(".mini-dialog-wrapper", $container),
				$header = $(".mini-dialog-header", $wrapper),
				$title = $("span", $header),
				$close = $("i", $header),
				$main = $(".mini-dialog-main", $wrapper),
				$content = $("div", $main),
				$footer = $(".mini-dialog-footer", $wrapper),
				$ok = $(".mini-dialog-ok", $footer),
				$cancel = $(".mini-dialog-cancel", $footer);
		var winWidth = document.documentElement.clientWidth,
				winHeight = document.documentElement.clientHeight;
		var lowerWidth = !!(winWidth < 430); 

		// 当手动设置的 width 大于浏览器可视区域的宽度时
		// 将自动调整为浏览器可视区域的宽度
		if (dialogWidth > winWidth || isFullScreen) {
			dialogWidth = winWidth;
		}

		$wrapper.style.width = "".concat(dialogWidth, "px");

		if (lowerWidth && !isFullScreen && !opt.WAITING) {
			$wrapper.style.width = "".concat(winWidth - 60, "px");
		} 

		// 相关配置
		$title.textContent = opt.title;
		$wrapper.style.borderRadius = "".concat(opt.borderRadius, "px");
		$main.style.background = opt.contentBgColor;
		$content.innerHTML = opt.content;
		$("span", $ok).textContent = opt.ok.text;
		$("span", $cancel).textContent = opt.cancel.text;

		if (!opt.bodyScroll) {
			$("body", _parent ? _parent.document : window.document).classList.add("mini-dialog-body-noscroll");
		}

		if (!opt.showTitle) {
			Fn.remove($header);
		}

		if (!opt.showButton) {
			Fn.remove($footer);
		}

		if (!opt.cancel.show) {
			Fn.remove($cancel);
		}

		if (!opt.closable) {
			Fn.remove($close);
			$title.style.width = "calc(100% - 30px)";
		}

		if (!opt.mask) {
			Fn.remove($mask);
		}

		var dis = $header.offsetHeight + $footer.offsetHeight; 

		// 添加复选框
		var checkBoxHasChecked = false;

		if (Fn.isPlainObject(opt.checkbox) && !Fn.isEmptyObject(opt.checkbox) && opt.showButton) {
			Fn.prepend($footer, "<div class=\"mini-dialog-checkbox\">\n\t\t\t\t<div></div>\n\t\t\t\t<span>".concat(opt.checkbox.text || "", "</span>\n\t\t\t</div>"));
			var $checkbox = $(".mini-dialog-checkbox", $footer);

			if (opt.checkbox.checked) {
				checkBoxHasChecked = true;
				$checkbox.classList.add("active");
			}

			$checkbox.onclick = function () {
				this.classList.toggle("active");

				if (Fn.type(opt.checkbox.change) === "function") {
					var contains = this.classList.contains("active");
					checkBoxHasChecked = contains;
					opt.checkbox.change(contains);
				}
			};
		} 

		// 嵌入框架
		var iframeContent = opt.iframeContent;
		var isIframeContent = false;

		if (Fn.isPlainObject(opt.iframeContent)) {
			var src = iframeContent.src,
					height = iframeContent.height;

			if (!src || !height) {
				return;
			}

			isIframeContent = true;

			if (isFullScreen || height > winHeight - dis) {
				height = winHeight - dis;
			}

			Fn.setCSS($main, {
				padding: 0,
				height: "".concat(height, "px")
			});
			$main.innerHTML = "<iframe src=\"".concat(src, "\" frameborder=\"0\" scrolling=\"auto\"></iframe>");
		} 

		// 嵌入图片 ( 支持单张图片或多张图片的轮播图效果 )
		var imageContent = opt.imageContent;
		var isImageContent = false;

		if (Fn.isPlainObject(imageContent)) {
			var transitionHandle = function transitionHandle() {
				animated = false;
				$imageWrapper.removeEventListener("transitionend", transitionHandle);
			};

			var animate = function animate(i) {
				animated = true;
				$imageWrapper.style.transform = "translateX(".concat(-i * dialogWidth, "px)");
				$imageWrapper.addEventListener("transitionend", transitionHandle);
			};

			var _src = imageContent.src,
					_height = imageContent.height;

			if (!_src || !_height) {
				return;
			}

			isImageContent = true;

			if (isFullScreen || _height > winHeight - dis) {
				_height = winHeight - dis;
			}

			var _size = _src.length;
			var img = "";

			if (Array.isArray(_src)) {
				_src.forEach(function (v) {
					img += "<img src=\"".concat(v, "\" style=\"width:").concat(dialogWidth, "px;height:").concat(_height, "px;\" ondragstart=\"return false\">");
				});

				img = "\n\t\t\t\t\t<div class=\"mini-dialog-image-wrapper mini-dialog-noselect\">\n\t\t\t\t\t\t<div style=\"width:".concat(dialogWidth * _size, "px;\">\n\t\t\t\t\t\t\t").concat(img, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"mini-dialog-image-prev\"></div>\n\t\t\t\t\t\t<div class=\"mini-dialog-image-next\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t");
			} else {
				img = "<img src=\"".concat(_src, "\">");
			}

			Fn.setCSS($main, {
				padding: 0,
				overflow: "hidden",
				height: "".concat(_height, "px")
			});
			$main.innerHTML = img;
			var $imageWrapper = $(".mini-dialog-image-wrapper > div:first-child", $main),
					$arrow = $$(".mini-dialog-image-prev, .mini-dialog-image-next", $main);
			var index = 0;
			var animated = false;

			if ($arrow.length === 2) {
				$arrow[0].onclick = function () {
					if (index && !animated) {
						index--;
						animate(index);
					}
				};

				$arrow[1].onclick = function () {
					if (index < _size - 1 && !animated) {
						index++;
						animate(index);
					}
				};
			}
		} 

		// 嵌入视频
		var videoContent = opt.videoContent;
		var isVideoContent = false;

		if (Fn.isPlainObject(videoContent)) {
			var _src2 = videoContent.src,
					_height2 = videoContent.height,
					autoplay = videoContent.autoplay;

			if (!_src2 || !_height2) {
				return;
			}

			isVideoContent = true;

			if (isFullScreen || _height2 > winHeight - dis) {
				_height2 = winHeight - dis;
			}

			Fn.setCSS($main, {
				padding: 0,
				overflow: "hidden",
				height: "".concat(_height2, "px"),
				background: "#000"
			});
			$main.innerHTML = "<video src=\"".concat(_src2, "\" width=\"").concat(dialogWidth, "\" height=\"").concat(_height2, "\" controls></video>");

			if (autoplay) {
				$("video", $main).setAttribute("autoplay", true);
			}
		} 

		// 当创建多个对话框时
		// 只显示一个遮罩层
		if ($$(".mini-dialog-mask").length > 1) {
			Fn.remove($mask);
		} 

		// 存储 afterClose 事件
		// 便于在 close 方法中调用
		if (Fn.type(opt.afterClose) === "function") {
			$container["mini_dialog_afterclose"] = opt.afterClose;
		} 

		// 全屏对话框
		if (isFullScreen) {
			Fn.setCSS($wrapper, {
				height: "".concat(winHeight, "px"),
				borderRadius: 0
			});
			$main.style.height = "".concat(winHeight - dis - (isVideoContent || isImageContent || isIframeContent ? 0 : 30), "px");
		} 

		// 开启自动关闭功能时
		// 添加提示条
		if (Fn.type(opt.autoClose) === "number" && opt.autoClose > 2000 && opt.autoCloseEffect) {
			Fn.append($wrapper, '<div class="mini-dialog-autoclose"></div>');
		} 

		// 当内容区域的高度超出临界值时
		// 自动调整高度
		if (Fn.getCSS($wrapper, "height") > winHeight) {
			$main.style.height = "".concat(winHeight - dis, "px");
		} 

		// 信息提示类对话框
		if (Fn.isPlainObject(opt.SHORTCUTS) && !Fn.isEmptyObject(opt.SHORTCUTS)) {
			Fn.remove($header);
			Fn.remove($cancel);
			Fn.remove($content);
			$footer.style.borderTop = "none";
			$wrapper.style.width = "".concat(lowerWidth ? w - 60 : 420, "px");
			$wrapper.classList.add("mini-dialog-shortcuts-mark");
			$main.innerHTML = "\n\t\t\t\t<div>\n\t\t\t\t\t<div class=\"mini-dialog-shortcuts\">\n\t\t\t\t\t\t<i>".concat(Icon(opt.SHORTCUTS.type), "</i>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<p>").concat(opt.SHORTCUTS.title, "</p>\n\t\t\t\t\t\t\t\t<div>").concat(opt.SHORTCUTS.content || "", "</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t");
			$main.style.minHeight = "90px";

			if (lowerWidth) {
				$main.classList.add("mini-dialog-mobile-main");
			}
		} 

		// 请等待
		if (opt.WAITING) {
			$wrapper.classList.add("mini-dialog-waiting-wrapper");
			var waitingText = "";

			if (Fn.type(opt.WAITING) === "string") {
				waitingText = opt.WAITING;
			}

			$main.innerHTML = "<div class=\"mini-dialog-waiting-box\"></div><span>".concat(waitingText, "</span>");

			if (Fn.type(opt.WAITING) === "function") {
				opt.WAITING($(".mini-dialog-waiting-box + span"));
			}
		} 

		// 可输入对话框
		if (Fn.isPlainObject(opt.PROMPT) && !Fn.isEmptyObject(opt.PROMPT)) {
			$wrapper.style.width = "".concat(lowerWidth ? w - 60 : 350, "px");
			$main.innerHTML = '<div class="mini-dialog-prompt"></div>';
			$main.style.minHeight = "0";
			var $inner = $("div", $main);
			var input = opt.PROMPT.type !== "textarea" ? "<input type=\"".concat(opt.PROMPT.type, "\" spellcheck=\"false\">") : "<textarea spellcheck=\"false\"></textarea>";
			Fn.append($inner, input);
			var $input = $("input, textarea", $main);
			$input.setAttribute("maxlength", opt.PROMPT.maxlength);

			if (opt.PROMPT.placeholder) {
				$input.setAttribute("placeholder", opt.PROMPT.placeholder);
			}

			if (opt.PROMPT.autofocus) {
				$input.focus();
			}

			$ok.classList.add("mini-dialog-notclose");
			$ok.addEventListener("click", function () {
				if (Fn.type(opt.PROMPT.callback) === "function") {

					// 只要点击了确定按钮
					// 就先移除之前 (或许) 存在的反馈信息
					Dialog.prompt.errorFeedBack(false); 

					// 执行回调函数
					opt.PROMPT.callback($input.value, $input, $ok);
				}
			});
		} 

		// 相关事件
		if (opt.maskClose) {
			$mask.onclick = function () {
				return Dialog.close($container, _parent);
			};
		}

		$close.onclick = function () {
			return Dialog.close($container, _parent);
		};

		$cancel.onclick = function () {
			Dialog.close($container, _parent);

			if (Fn.type(opt.cancel.callback) === "function") {
				opt.cancel.callback($cancel, checkBoxHasChecked);
			}
		};

		$ok.onclick = function () {
			if (Fn.type(opt.ok.callback) === "function" && !opt.PROMPT) {
				opt.ok.callback($ok, checkBoxHasChecked);
			} 

			// 三种情况下，点击确定按钮不会关闭对话框：
			// 1. 在确定按钮上设置了 waiting 属性；
			// 2. 在确定按钮上设置了 notClose 属性；
			// 3. 针对四种信息提示类弹框调用了 okNotClose() 方法。
			if (!opt.ok.waiting && !opt.ok.notClose && !$ok.classList.contains("mini-dialog-notclose")) {
				Dialog.close($container, _parent);
			} 

			// 设置了 waiting 属性
			// 在点击后会在按钮上出现 "加载中" 效果
			if (opt.ok.waiting) {
				Fn.prepend($ok, "<i></i>");
				Fn.setCSS($ok, {
					opacity: .5,
					pointerEvents: "none"
				});
				$("span", $ok).textContent = opt.ok.waitingText;
			}
		}; 

		// 可拖动
		if (opt.draggable && !opt.fullscreen) {
			var upHandle = function upHandle() {
				$header.style.removeProperty("cursor");
				$container.classList.remove("mini-dialog-noselect");
				document.onmousemove = null;
			};

			Fn.remove($mask);

			var _height3 = parseFloat(Fn.getCSS($wrapper, "height"));

			var top, left; 

			// 置于最顶层
			$wrapper.onmousedown = function () {
				$$(".mini-dialog-container-top").forEach(function (el) {
					el.classList.remove("mini-dialog-container-top");
				});
				$container.classList.add("mini-dialog-container-top");
			};

			$header.classList.add("mini-dialog-header-move" + (IE11 ? "-ie" : ""));

			$header.onmousedown = function (event) {
				event.preventDefault();
				$container.classList.add("mini-dialog-noselect");
				$header.style.cursor = "grabbing";
				left = event.pageX - $wrapper.offsetLeft;
				top = event.pageY - $wrapper.offsetTop;

				document.onmousemove = function (ev) {
					var x = ev.pageX - left,
							y = ev.pageY - top;
					x < dialogWidth / 2 && (x = dialogWidth / 2);
					y < _height3 / 2 && (y = _height3 / 2);

					if (x > winWidth - dialogWidth / 2) {
						x = winWidth - dialogWidth / 2;
					}

					if (y > winHeight - _height3 / 2) {
						y = winHeight - _height3 / 2;
					}

					Fn.setCSS($wrapper, {
						left: "".concat(x, "px"),
						top: "".concat(y, "px")
					});
				};
			};

			$header.onmouseup = upHandle;
			document.onmouseup = upHandle;
		}

		$mask.classList.add("mini-dialog-mask-show");
		$wrapper.classList.add("mini-dialog-wrapper-show");

		function endHandle() {
			$wrapper.removeEventListener("animationend", endHandle);

			if (Fn.type(opt.afterOpen) === "function") {
				opt.afterOpen();
			}

			var $auto = $(".mini-dialog-autoclose", $wrapper);

			if ($auto) {
				$auto.style.transitionDuration = "".concat(~~opt.autoClose, "ms");
				$auto.classList.add("mini-dialog-autoclose-active");
				$auto.addEventListener("transitionend", function () {
					Dialog.close($container, _parent);
				});
			}
		}

		$wrapper.addEventListener("animationend", endHandle);
		return $container;
	}; 

	// 对话框的快捷方式
	function DialogShortcuts(type, title, content) {
		Dialog({
			SHORTCUTS: {
				type: type,
				title: title,
				content: content
			}
		});
	} 

	// 添加版本号标识
	Dialog.version = "1.0.5"; 

	// 信息展示类弹框
	Dialog.info = function (title, content) {
		DialogShortcuts("info", title, content);
		return Dialog;
	};

	Dialog.success = function (title, content) {
		DialogShortcuts("success", title, content);
		return Dialog;
	};

	Dialog.warn = function (title, content) {
		DialogShortcuts("warn", title, content);
		return Dialog;
	};

	Dialog.error = function (title, content) {
		DialogShortcuts("error", title, content);
		return Dialog;
	}; 

	// 等待中对话框
	Dialog.waiting = function () {
		var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "请等待";
		Dialog({
			WAITING: text
		});
	}; 

	// 可输入对话框
	Dialog.prompt = function () {
		var defaults = {
			title: "",
			placeholder: "",
			autofocus: true,
			maxlength: Infinity,
			type: "text",
			callback: function callback() {}
		};
		var obj = {};

		if (Fn.isPlainObject(arguments.length <= 0 ? undefined : arguments[0])) {
			obj = arguments.length <= 0 ? undefined : arguments[0];
		} else {
			obj.title = arguments.length <= 0 ? undefined : arguments[0];
			var size = arguments.length;

			if (size === 2) {
				obj.callback = arguments.length <= 1 ? undefined : arguments[1];
			}

			if (size === 3) {
				obj.placeholder = arguments.length <= 1 ? undefined : arguments[1];
				obj.callback = arguments.length <= 2 ? undefined : arguments[2];
			}
		}

		var opt = mergeParam(obj, defaults);
		Dialog({
			PROMPT: opt
		});
		return Dialog;
	}; 

	// 可输入对话框的反馈信息
	Dialog.prompt.errorFeedBack = function (text) {
		var $prompt = $(".mini-dialog-prompt");
		var $feedBack = $("p", $prompt);

		if (text) {
			Fn.prepend($(".mini-dialog-prompt"), "<p>".concat(text, "</p>"));
			$("input", $prompt).focus();
		} else {
			$feedBack && Fn.remove($feedBack);
		}
	}; 

	// 专门针对信息展示类弹框的阻止确定按钮关闭对话框的方法
	Dialog.okNotClose = function () {
		var $ok = $(".mini-dialog-ok");

		if ($ok) {
			$ok.classList.add("mini-dialog-notclose");
		}

		return Dialog;
	}; 

	// 对话框的全局关闭方法
	Dialog.close = function (target) {
		var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
		var doc = context.document; 

		// 可关闭指定对话框或所有对话框
		var $target = $$(target || ".mini-dialog-container", doc);

		if (!$target.length) {
			return;
		}

		$target.forEach(function (el) {
			var $wrapper = $(".mini-dialog-wrapper", el),
					$mask = $(".mini-dialog-mask", el);
			$wrapper.classList.add("mini-dialog-wrapper-hide");
			$wrapper.addEventListener("animationend", function () {

				// 关闭后执行 afterClose 回调函数
				var afterClose = el["mini_dialog_afterclose"];

				if (afterClose) {
					afterClose();
				}

				Fn.remove(el);
				$("body", doc).classList.remove("mini-dialog-body-noscroll");
			});

			if ($mask) {
				$mask.classList.add("mini-dialog-mask-hide");
			}
		});
	}; 

	// 对话框的全局移除
	Dialog.remove = function (target) {
		var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

		// 可移除指定对话框或所有对话框
		var $target = $$(target || ".mini-dialog-container", context.document);

		if ($target.length) {
			$target.forEach(function (el) {
				return Fn.remove(el);
			});
		}
	}; 

	// 专门针对信息展示类弹框的确定按钮点击事件
	Dialog.ok = function (callback) {
		var $shortcutsOK = $(".mini-dialog-shortcuts-mark .mini-dialog-ok");

		if ($shortcutsOK) {
			var callbackFn = Fn.type(callback) === "function";
			$shortcutsOK.addEventListener("click", function () {

				// 调用了 okNotClose 方法
				// 此时点击确定按钮将不会关闭对话框
				// 需手动在 callback 中调用 Dialog.close() 才能关闭
				if ($shortcutsOK.classList.contains("mini-dialog-notclose")) {

					// 确保只能点击一次
					// 防止事件重复执行
					$shortcutsOK.style.pointerEvents = "none"; 

					// 执行 callback
					callbackFn && callback($shortcutsOK);
				} else {

					// 正常关闭并在关闭动画结束后执行 callback
					$(".mini-dialog-shortcuts-mark").addEventListener("animationend", function () {
						callbackFn && callback();
					});
				}
			});
		}
	};

	return Dialog;
});