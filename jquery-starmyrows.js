(function ($) {
    
	$.fn.starMyRows = function (settings) {
	    var config = {
	        color: null,
	        cookieName: 'starMyRows',
	        cookieExpiresInDays: 50,
	        disableHover: false,
	        getId: function() { return 0; },
	        starClassName: 'star'	        
		};

	    if (settings) { $.extend(config, settings); }
            
        var selectedIds = getSelectionStarsFromCookie(config.cookieName);

        var table = this;

        if (table.is("table")) {
            $('tr', table).each(function () {
                var row = $(this);

                if (row.parent().is("thead")) {
                    row.prepend("<th></th>");
                }
                else if (row.parent().is("tfoot")) {
                    row.prepend("<td></td>");
                } else {
                    var currentId = getId(row);
                    var starBootStrapClass = 'glyphicon-star' + (($.inArray(currentId, selectedIds) < 0) ? "-empty" : "");

                    var html = '<td><a href="#" class="' + config.starClassName + '"><span class="glyphicon ' + starBootStrapClass + '"></span></a></td>';
                    var newCell = $(html);
                    $('.glyphicon', newCell).css('color', config.color);
                    row.prepend(newCell);
                }
            });
                 
            // check if Modernizr library exists, it has detected that it is a no touch device and not DisableHover
            if (typeof Modernizr !== "undefined" && table.closest('.no-touch').length > 0 && !config.disableHover) {
                $('a.' + config.starClassName, table).hover(function () {                   
                    toggleStar($('.glyphicon', $(this)));
                }, function () {
                    toggleStar($('.glyphicon', $(this)));
                });
            }

            // regular click function
            $('a.' + config.starClassName, table).click(function (e) {
                e.preventDefault();
                var self = $(this);
                toggleStar($('.glyphicon', self));

                var row = self.closest('tr')
                var currentId = getId(row);
                toggleStarCookie(config.cookieName, currentId, config.cookieExpiresInDays);
            });
        }
		return this;
	};

	function toggleStar(element) {
	    element.toggleClass('glyphicon-star-empty');
	    element.toggleClass('glyphicon-star');
	}

	function toggleStarCookie(cookieName, currentId, cookieExpiresInDays) {
	    var selectedIds = getSelectionStarsFromCookie(cookieName);

	    if ($.inArray(currentId, selectedIds) < 0)
	        selectedIds.push(currentId);
	    else {
	        selectedIds = selectedIds.filter(function (element) {
	            return element != currentId;
	        });
	    }	        

	    setCookie(cookieName, selectedIds.join('|'), cookieExpiresInDays);
	}

	function getSelectionStarsFromCookie(cookieName) {
	    var cookieVal = getCookie(cookieName);
	    var sel = new Array();

	    if (cookieVal != '') {
	        var ids = cookieVal.split('|');

	        $.each(ids, function (index, element) {
	            sel.push(element);
	        });
	    }

	    return sel;
	}

    // cookie methods taken from w3schools
	function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	    var expires = "expires=" + d.toGMTString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for (var i = 0; i < ca.length; i++) {
	        var c = ca[i].trim();
	        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	    }
	    return "";
	}
	
})(jQuery);
