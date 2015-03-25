(function ($) {
    
	var config = {
        color: 'black',
        multiselect : false,
        saveState: true,
        cookieName: 'starMyRows',
        cookieExpiresInDays: 50,
        disableHover: false,
        getId: function() { return 0; },
        starClassName: 'star',
        mouseoverClass: 'mouseover'	        
	};

	$.fn.starMyRows = function (settings) {
		var table = this;
        if (table.is("table")) {
	    	if (typeof settings == 'object') { $.extend(config, settings); }
            addStarsToTable(table);     
            bindStarMouseOverEvents(table);
            bindStarClickEvents(table);
        }
		return table;
	};

	function addStarsToTable(table) {
		var selectedIds = getSelectionStarsFromCookie();
		$('tr', table).each(function () {
            var row = $(this);
            var rowParent = row.parent();
            if (rowParent.is("thead")) {
                row.prepend("<th></th>");
            }
            else if (rowParent.is("tfoot")) {
                row.prepend("<td></td>");
            } else {
                var currentId = config.getId(row);
                var starBootStrapClass = 'glyphicon-star' + (($.inArray(currentId, selectedIds) < 0) ? "-empty" : "");
                var newCell = $('<td><a href="javascript:;" class="' + config.starClassName + '"><span class="glyphicon ' + starBootStrapClass + '"></span></a></td>');
                $('.glyphicon', newCell).css('color', config.color);
                row.prepend(newCell);
            }
        });
	}

	function bindStarMouseOverEvents(table) {
        if ((typeof Modernizr !== "undefined" && table.closest('.no-touch').length > 0 && !config.disableHover) || !config.disableHover) {
            $('a.' + config.starClassName, table).hover(function () {   
            	var theStar = $('.glyphicon', $(this));
                toggleStar(theStar);
                theStar.addClass(config.mouseoverClass);
            }, function () {
            	var theStar = $('.glyphicon', $(this));
                toggleStar(theStar);
                theStar.removeClass(config.mouseoverClass);
            });
        }
	}

	function bindStarClickEvents(table) {
        $('a.' + config.starClassName, table).click(function (e) {
            e.preventDefault();
            var self = $(this);
            var row = self.closest('tr')
            var currentId = config.getId(row);

            if (config.multiselect && config.saveState) {
            	toggleStar(theStar);
            	toggleStarCookie(currentId);	
            } else {
            	var selectedStars = $('.glyphicon-star').not('.mouseover');
            	selectedStars.each(function (ii, ee) {
            		toggleStar($(this));
            	});
            	if (config.saveState) {
            		setCookie(config.cookieName, currentId, config.cookieExpiresInDays);	
            	}                	
            }
            toggleStar($('.glyphicon', self));
        });
	}

	function toggleStar(element) {
	    element.toggleClass('glyphicon-star-empty');
	    element.toggleClass('glyphicon-star');
	}

	function toggleStarCookie (currentId) {
	    var selectedIds = getSelectionStarsFromCookie();
	    if ($.inArray(currentId, selectedIds) < 0)
	        selectedIds.push(currentId);
	    else {
	        selectedIds = selectedIds.filter(function (element) {
	            return element != currentId;
	        });
	    }	        
	    setCookie(config.cookieName, selectedIds.join('|'), config.cookieExpiresInDays);
	}

	function getSelectionStarsFromCookie() {
	    var cookieVal = getCookie(config.cookieName);
	    var sel = new Array();
	    if (config.saveState) {
	    	if (cookieVal != '') {
		        var ids = cookieVal.split('|');
		        $.each(ids, function (ii, ee) {
		            sel.push(ee);
		        });
		    }	
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
