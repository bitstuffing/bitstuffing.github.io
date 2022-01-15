// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$(document).on('click', '.link[data-page="github"]', function (e) {
    myApp.alert('http://github.com/bitstuffing');
})
$(document).on('click', '.link[data-page="gitlab"]', function (e) {
    myApp.alert('http://gitlab.com/hard.develop');
})

/*
$.ajaxSetup({
    'beforeSend': function(xhr) {
	var referer = "http://blog.harddevelop.com";
	xhr.setRequestHeader("Origin", referer);
	xhr.setRequestHeader("Referer", referer);
    }
});
*/

function processResponse(obj){
	//console.log(obj.feed.author[0].name.$t);
	for (var i = 0, len = obj.feed.entry.length; i < len; i++) {
		proccessJsonEntry(obj.feed.entry[i]);
	}
	$(".logo")/*.addClass("fadeOut")*/.delay(3000).remove();
	//now show each elements one by one
	//using css3 instead of jquery because css3 apparently on mobiles
	//platforms uses hardware acceleration and jquery not at all :'(
	var i=0;
	var lis = $(".update-box");
	var interval = setInterval(function() {
	    lis.slice(i,i+1).removeClass("update-box").addClass("update-box2");
		//.css("margin-top","500px")
		//.animate({'margin-top': '5px', "display":"block"});
	    console.log(lis.slice(i,i+1));
	    i += 1;
	}, 200);
}

function proccessJsonEntry(entry){
	/*console.log("id: "+entry.id.$t);
	console.log("published: "+entry.published.$t);
	console.log("updated: "+entry.updated.$t);
	console.log("title: "+entry.title.$t);
	console.log("content: "+entry.content.$t);
	console.log("link: "+entry.link.$t);*/
	var html = "<article class='update-box'>";
	html += "<h3 class='articleTitleH1' onclick=\"showNext($(this));\">"+entry.title.$t+"</h3>";
	var date = entry.published.$t;
	var newDate = date.substring(0,date.indexOf('T'));
	html += "<section class='sectionDate'>"+newDate+"</section>";
	html += "<section class='sectionContent'>"+proccessedContent(entry.content.$t)+"</section>";
 	html += "</article>";
	$("#content-block-div").append(html);
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
	$.ajax({
	   type: 'GET',
	    url: url,
	    async: false,
	    contentType: "application/json",
	    dataType: 'jsonp',
	    timeout: 5000,
	    success: function(json) {
		processResponse(json);
	    },
	    error: function (xOptions, textStatus) {
		myApp.alert("Error: "+textStatus);
	    }
	});
}

$(window).ready(function(){
	var chkReadyState = setInterval(function() {
	    if (document.readyState == "complete") {
		// clear the interval
		clearInterval(chkReadyState);
		var url = "https://www.blogger.com/feeds/3274373248279408623/posts/default?alt=json-in-script&max-results=999";
		processPetition(url);
	    }
	}, 100);

});
