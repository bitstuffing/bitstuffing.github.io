(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	$.fn._parallax = (browser.name == 'ie' || browser.name == 'edge' || browser.mobile) ? function() { return $(this) } : function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				on, off;

			on = function() {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function() {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Clear transitioning state on unload/hide.
		$window.on('unload pagehide', function() {
			window.setTimeout(function() {
				$('.is-transitioning').removeClass('is-transitioning');
			}, 250);
		});

	// Fix: Enable IE-only tweaks.
		if (browser.name == 'ie' || browser.name == 'edge')
			$body.addClass('is-ie');

	// Scrolly.
		$('.scrolly').scrolly({
			offset: function() {
				return $header.height() - 2;
			}
		});

		//console.log("here we came!");
		starting();
		//console.log("done!");


	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() {
				$window.trigger('scroll');
			});

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.height() + 10,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
				});

				window.setTimeout(function() {
					$window.triggerHandler('scroll');
				}, 100);

			});

		}

	// Banner.
		$banner.each(function() {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img');

			// Parallax.
				$this._parallax(0.275);

			// Image.
				if ($image.length > 0) {

					// Set image.
						$this.css('background-image', 'url(' + $img.attr('src') + ')');

					// Hide original.
						$image.hide();

				}

		});

	// Menu.
		var $menu = $('#menu'),
			$menuInner;

		$menu.wrapInner('<div class="inner"></div>');
		$menuInner = $menu.children('.inner');
		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menuInner
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');
				var alt = $(this).attr('alt');

				//console.log(alt);

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					window.setTimeout(function() {
						window.location.href = href;
					}, 250);

			});

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();
				event.preventDefault();

				$body.removeClass('is-menu-visible');

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});



})(jQuery);



function processResponse(obj){
	//console.log(obj.feed.author[0].name.$t);
	//console.log("processing response...");
	for (var i = 0, len = obj.feed.entry.length; i < len; i++) {
		proccessJsonEntry(obj.feed.entry[i]);
		//console.log(i);
	}
}

function proccessJsonEntry(entry){
	/*
	//console.log("id: "+entry.id.$t);
	//console.log("published: "+entry.published.$t);
	//console.log("updated: "+entry.updated.$t);
	//console.log("title: "+entry.title.$t);
	//console.log("content: "+entry.content.$t);
	//console.log("link: "+entry.link.$t);
	*/
	var newId = guid();
	var image = "https://immortaldiva.files.wordpress.com/2009/07/post-it-note.jpg"; //default if not found
	try{
		content = entry.content.$t;
		extension = ""
		if(content.indexOf(".jpg\"")!=-1){
			extension = ".jpg\"";
		}else if(content.indexOf(".gif\"")!=-1){
			extension = ".gif\"";
		}else if(content.indexOf(".png\"")!=-1){
			extension = ".png\"";
		}
		if(extension.length>0){
			img = content.substring(0,parseInt(content.indexOf(extension)+4));
			img = img.substring(img.lastIndexOf("http")).replace("\"","");
			image = img;
		}else{
			image = entry.media$thumbnail.url;
		}
	}catch(e){
		image = "https://immortaldiva.files.wordpress.com/2009/07/post-it-note.jpg"; //default if not found
	}

	var html = "<article class='"+newId+"'>";
	html += '<span class="image">';
	html += '<img src="'+image+'" alt="" />';
	html += '</span>';
	html += '<header class="major">';
	html += '<h3><a href="#" id="title-'+newId+'" alt="'+newId+'" class="link">'+entry.title.$t+'</a></h3>';
	var date = entry.published.$t;
	var newDate = date.substring(0,date.indexOf('T'));
	html += '<p>'+newDate+'</p>';
	html += '</header>';
	html += "<div id='"+newId+"' class='inner article-content' style='display:none;'>"+proccessedContent(entry.content.$t)+"</div>";
	html += '</article>';
	var element = $(html);
	$(".tiles").append(element);
}

function displayArticle(id){
	console.log("id to toogle:"+id);
}

function guid(){ //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

$(window).on("orientationchange", function( event ) {
	$(".correctedWidth").each(function(){
		correctWidth($(this));
	});
});

function showNext(element){
	element.nextAll().slideToggle("slow");
}

function proccessedContent(content){
	var contentElement = $("<div>"+content+"</div>");
	contentElement.find("pre").each(function(){
		var newElement = $("<div class='content-block correctedWidth'></div>");
		correctWidth(newElement);
		newElement.append($(this).text());
		$(this).replaceWith(newElement);
	});
	contentElement.find("code").each(function(){
		var newElement = $("<div class='content-block correctedWidth'></div>");
		correctWidth(newElement);
		newElement.append($(this).text());
		$(this).replaceWith(newElement);
	});
	contentElement.find("blockquote").each(function(){
		var newElement = $("<div class='content-block correctedWidth'></div>");
		newElement.append($(this).text());
		correctWidth(newElement);
		$(this).replaceWith(newElement);
	});
	return contentElement.html();
}

function correctWidth(newElement){
	var maxWidthParent = $("body").css("width");
	if(maxWidthParent.indexOf("px")>-1){
		maxWidthParent = maxWidthParent.substring(0,maxWidthParent.length-2);
	}
	newElement.css("max-width",maxWidthParent-80);
}

function processPetition(url){
	//console.log("starting process...");
	$.ajax({
	   type: 'GET',
	    url: url,
	    async: false,
	    contentType: "application/json",
	    dataType: 'jsonp',
	    timeout: 5000,
	    success: function(json) {
				processResponse(json);
				loadEvents();
				managePagination();
				$(".loading").fadeOut("slow");
	    },
	    error: function (xOptions, textStatus) {
				console.log("Error: "+textStatus);
	    }
	});
}

function managePagination(){
	var index = parseInt($("#pagination-page").val());
	$("#pagination").show();
	$("#pagination-left a").addClass("disabled");
	$("#pagination-right a").addClass("disabled");
	//console.log("index is: "+index);
	if(index==1){
		$("#pagination-right a").removeClass("disabled");
	}else if(index>1){
		$("#pagination-left a").removeClass("disabled");
	}
	if($("section#one article").length>0){
		$("#pagination-right a").removeClass("disabled");
	}
}

function paginateLess(){
	$("#pagination").hide();
	var index = $("#pagination-page").val();
	$("#pagination-page").val(--index);
	$("section#one article").remove();
	starting();
}

function paginateMore(){
	$("#pagination").hide();
	var index = $("#pagination-page").val();
	$("#pagination-page").val(++index);
	$("section#one article").remove();
	starting();
}

function starting(){
	//console.log("start process...");
	$(".loading").fadeIn("fast");
	var pageSize = 10;
	var index = (parseInt($("#pagination-page").val())*pageSize)-(pageSize-1); //first index is 1, next index is pagesize+1, so, 1, 11, 21...
	var url = "https://www.blogger.com/feeds/3274373248279408623/posts/default?alt=json-in-script&max-results=10&start-index="+index;
	processPetition(url);
	$('html,body').animate({ scrollTop : $("a[name='home']").offset().top }, 'fast');
	$("body").removeClass('is-preload');
	//console.log("processed");
}

function loadEvents(){
		var $wrapper = $('#wrapper');
		// Tiles.
		var $tiles = $('.tiles > article');

		$tiles.each(function() {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img'),
				$link = $this.find('.link'),
				x;

			// Image.

				// Set image.
					$this.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide original.
					$image.hide();

			// Link.
				if ($link.length > 0) {

					$x = $link.clone()
						.text('')
						.addClass('primary')
						.appendTo($this);

					$link = $link.add($x);

					$link.on('click', function(event) {

						var href = $link.attr('alt');

						//console.log(href);

						// Prevent default.
							event.stopPropagation();
							event.preventDefault();

						// Target blank?
							if ($link.attr('target') == '_blank') {

								// Open in new tab.
									window.open(href);

							}
							else if(href.toLowerCase().startsWith("http")){ //normal behaviour
								//console.log("link here: "+href);
								location.href = href;
							}
							else {

								// Start transitioning.
									$this.addClass('is-transitioning');
									$wrapper.addClass('is-transitioning');

								// Redirect.
									window.setTimeout(function() {
										buildArticle(href);
									}, 500);

							}

					});

				}

		});
}
function buildArticle(id){
	$("section#one article").hide();
	$("#pagination").hide();

	var image = "images/pic11.jpg"; //default if not found
	var content = $("#"+id).html();

	try{
		//use regex to get img and map to extract src origin
		image = content.match(/<img [^>]*src="[^"]*"[^>]*>/gm).map(x => x.replace(/.*src="([^"]*)".*/, '$1'))[0];
	}catch(ex){
			//use simple & classic algorithm
			try{
				extension = ""
				if(content.indexOf(".jpg\"")!=-1){
					extension = ".jpg\"";
				}else if(content.indexOf(".gif\"")!=-1){
					extension = ".gif\"";
				}else if(content.indexOf(".png\"")!=-1){
					extension = ".png\"";
				}
				if(extension.length>0){
					img = content.substring(0,parseInt(content.indexOf(extension)+4));
					img = img.substring(img.lastIndexOf("http")).replace("\"","");
					image = img;
				}else{
					image = "images/pic11.jpg";
				}
			}catch(e){
				image = "images/pic11.jpg"; //default if not found
			}
	}
	//build article
	var article = "";
	article += '<div id="article_loaded" class="inner">';
	article += '<header class="major">';
	article += '<h3>'+$("#title-"+id).text()+'</h3>';
	article += '</header>';
	article += '<span class="image main"><img src="'+image+'" alt=""></span>';
	article += content;
	article += '<p><br /><input type="submit" value="Back to articles" class="primary" onclick="showAllArticles();"></p>';
	article += '</div>';
	//write article
	$("section#one").append(article);
	//rebuild css properties of container
	$("#one").removeClass("tiles");
	$(".is-transitioning").removeClass("is-transitioning");
	$('html,body').animate({ scrollTop : $("a[name='home']").offset().top }, 'fast');

}

function showAllArticles(){
	$("#article_loaded").remove();
	$("#one").addClass("tiles");
	$("section#one article").show();
	$("#pagination").show();
	$('html,body').animate({ scrollTop : $("a[name='home']").offset().top }, 'fast');
	$("body").removeClass('is-preload');
	//console.log("done!");
}
