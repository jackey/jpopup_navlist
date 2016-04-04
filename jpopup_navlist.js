(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
	$.fn.jpopup = function (options) {
		var $popup = $(this),
			$close = $popup.find('.close'),
			$bg = null;
		var api = {
			show: function () {
				$bg.show();
				$popup.fadeIn('fast');
				return this;
			},
			init: function () {
				$popup.parent().prepend('<div class="jpopup-bg"></div>');
				$bg = $('.jpopup-bg');
				var self = this;
				$close.add($bg).click(function() {
					return self.hide();
				});

				// 内容导航
				$('.nav-left li', $popup).click(function () {
					var index = $(this).index();
					$('.content').eq(index).show().siblings().hide();
				}).eq(0).click();

				// 计算内容高度
				$('.popup-body', $popup).height($popup.height() - $('.header', $popup).height());

				return this;
			},
			hide: function () {
				$popup.hide();
				$bg.hide();
				return this;
			}
		};

		api.init()
			.hide();

		return api;
	};
}));
