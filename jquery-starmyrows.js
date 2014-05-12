(function ($) {
    
	$.fn.starMyRows = function (settings) {
	    var config = {
	        cookieName: 'starMyRows',
            cookieExpiresInDays: 50,
	        starClassName: 'star',
	        color: null,
	        getId: function() { return 0; }
		};

    if (settings) { $.extend(config, settings); }
            
    var selectedIds = getSelectionStarsFromCookie(config.cookieName);

		return this.filter('table').each(function () {

		    var table = $(this);
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

		  $('a.star', table)
                /*
                .mouseenter(function () {
                    toggleStar($('.glyphicon', $(this)));
                })
                .mouseleave(function () {
                    toggleStar($('.glyphicon', $(this)));
                })
                */
			.click(function (e) {
				    e.preventDefault();
				    var self = $(this);
				    toggleStar($('.glyphicon', self));

				    var row = self.closest('tr')
				    var currentId = getId(row);
				    toggleStarCookie(config.cookieName, currentId, config.cookieExpiresInDays);
			});
		});		
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

    // cookie method taken from w3schools
	function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	    var expires = "expires=" + d.toGMTString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	// cookie method taken from w3schools
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
