function proccessJsonEntry(entry){
	/*alert("id: "+entry.id.$t);
	alert("published: "+entry.published.$t);
	alert("updated: "+entry.updated.$t);
	alert("title: "+entry.title.$t);
	alert("content: "+entry.content.$t);
	alert("link: "+entry.link.$t);*/
	var html = "<article class='post'><header>";
	html += "<div class='title'><h2>"+entry.title.$t+"</h2></div>";
	var date = entry.published.$t;
	var newDate = date.substring(0,date.indexOf('T'));
	html += "<div class='meta'><time class='published' date='"+newDate+"'>"+newDate+"</time></div></header>";
	html += "<p>"+proccessedContent(entry.content.$t)+"</p>";
 	html += "<footer></footer></article>";
	$("div#main").append(html);
}

function correctWidth(newElement){
	var maxWidthParent = $("body").css("width");
	if(maxWidthParent.indexOf("px")>-1){
		maxWidthParent = maxWidthParent.substring(0,maxWidthParent.length-2);
	}
	newElement.css("max-width",maxWidthParent-80);
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
	contentElement.find("a").each(function(){
		href = $(this).attr("href")
		value = href.replace("www.harddevelop.com","blog.harddevelop.com")
		$(this).attr("href",value)
	});
	return contentElement.html();
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

