function start(){
	drawPosts();
}

function initEvents(){
	$("a").click(function( event ) {
		event.preventDefault();
		$.ajax({
			type: 'GET',
			url: $(this).attr("href")+"?alt=json-in-script",
			contentType: "application/json",
			dataType: "jsonp",
			timeout: 5000,
			success: function(obj) {
				processArticleResponse(obj.entry);
			},
			error: function (xOptions, textStatus) {
				console.log("Error: "+textStatus);
			}
		});
	});
	
	$(document).on('closed', '.remodal', function (e) {
		//$("#content").fadeIn("fast");
		$('[data-remodal-id=modal]').remove();
		console.log('Modal is closed' + (e.reason ? ', reason: ' + e.reason : ''));
	});
}

function processArticleResponse(obj){
	var div = '<div class="remodal" data-remodal-id="modal">';
	div += '<button data-remodal-action="close" class="remodal-close"></button>';
	div += '<h1>'+obj.title.$t+'</h1>';
	div += '<p class="u-fontSize12">';
	div += obj.content.$t;
	div += '</p>';
	div += '<br>';
	//div += '<button data-remodal-action="cancel" class="remodal-cancel">Cancel</button>';
	div += '<button data-remodal-action="confirm" class="remodal-confirm">Back</button>';
	div += '</div>';
	//$("#content").after(div);
        $("div#main").append(div);
	//$("#content").fadeOut("fast");
	
	var remodal = $('[data-remodal-id=modal]').remodal({closeOnEscape:true});
	remodal.open();
}

function drawPosts(){
	var url = "https://www.blogger.com/feeds/3274373248279408623/posts/default?alt=json-in-script&max-results=999";
	processPetition(url);
}

function processPetition(url){
	$.ajax({
	   type: 'GET',
	    url: url,
	    async: false,
	    contentType: "application/json",
	    dataType: 'jsonp',
	    timeout: 5000,
	    success: function(obj) {
			processResponse(obj);
	    },
	    error: function (xOptions, textStatus) {
			console.log("Error: "+textStatus);
	    }
	});
}

function processResponse(obj){
	for (var i = 0, len = obj.feed.entry.length; i < len; i++) {
		proccessJsonEntry(obj.feed.entry[i]);
	}
	initEvents();
}

function proccessJsonEntry(entry){
	var link = entry.link[0].href;
	var title = entry.title.$t;
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
	var helpText = 'helper text';
	var text= entry.content.$t.substring(0,300);
	if(text.indexOf("\n")>-1){
		//text = text.substring(0,text.indexOf("\n"));
		text = text.replaceAll("\n","");
	}
	if(text.indexOf("<")>-1){
		text = text.substring(0,text.indexOf("<")-1);
	}
	text += "...";
	var signLink = 'mailto:'+entry.author[0].email.$t;
	var signImg = entry.author[0].gd$image.src; 
	if(signImg.startsWith("//")){
		signImg = 'http:'+signImg;
	}
	var signAltText = 'Writen by '+entry.author[0].name.$t;
	var dateTime = entry.published.$t;
	var minutes = parseInt(entry.content.$t.length/1500);
	minutes = minutes>20?4:minutes;
	var readTime = minutes+' minutes';
	var bookmarkLink = entry.link[0].href;
	var bookmarkText = 'Bookmark';	
	
	var htmlCard = getCard(link,title,image,helpText,text,signLink,signImg,signAltText,dateTime,readTime,bookmarkLink,bookmarkText);
	//$("#content").append(htmlCard);
        $("div#main").append(htmlCard);
}

function getCard(link,title,image,helpText,text,signLink,signImg,signAltText,dateTime,readTime,bookmarkLink,bookmarkText){
	var div = '<div class="u-sizeFullWidth u-flex u-marginBottom20 u-backgroundColorWhite u-borderRadius2 u-overflowHidden u-relative u-transition--boxShadow200 u-boxShadow4px16pxN2pxBlack10WithBorderBlack02 u-xs-flexWrap">';
		div += getCardImageDiv(link,image,helpText);
		div += getCardContent(link,title,text,signLink,signImg,signAltText,dateTime,readTime,bookmarkLink,bookmarkText);
	div += '</div>';
	return div;
}

function getCardImageDiv(link,image,helpText){
	var div = '<div class="u-lineHeightBase u-flex0 u-width240 u-height220 u-overflowHidden u-xs-height170 u-xs-sizeFullWidth">';
		div += '<a href="'+link+'" data-action="open-post" data-action-value="" class="u-block u-backgroundSizeCover u-backgroundOriginBorderBox u-borderBox u-backgroundColorGrayLight u-borderLighter u-overflowHidden u-sizeFullHeight" style="background-image: url(&quot;'+image+'&quot;); background-position: 50% 50% !important;">';
			div += '<span class="u-textScreenReader">'+helpText+'</span>';
		div += '</a>';
	div += '</div>';
	return div;
}

function getCardContent(link,title,text,signLink,signImg,signAltText,dateTime,readTime,bookmarkLink,bookmarkText){
	var div = '<div class="u-borderBox u-flexColumn u-flex1 u-xs-sizeFullWidth u-height220 u-paddingLeft20 u-paddingRight20 u-paddingBottom20 u-xs-heightAuto">';
		div += getCardMetadata(link,title,text);
		div += getCardInfo(signLink,signImg,signAltText,dateTime,readTime,bookmarkLink,bookmarkText);
	div += '</div>';
	return div;
}

function getCardMetadata(link,title,text){
	var div = '<div class="u-relative u-flex1">';
		div += '<div class="u-flex0 u-sizeFullWidth">';
			div += '<a class="" href="'+link+'" data-action-source="" data-post-id="">';
				div += '<h3 class="u-contentSansBold u-letterSpacingTight u-lineHeightTight u-marginBottom2 u-marginTop20 u-fontSize20 u-marginRight15">'+title+'</h3>';
			div += '</a>';
		div += '</div>';
	div += '</div>';
	div += '<a class="" href="'+link+'" data-action-source="" data-post-id="">';
		div += '<span class="u-contentSansThin u-baseColor--textNormal u-textColorNormal u-flex0 u-sizeFullWidth u-lineClamp3 u-textOverflowEllipsis u-letterSpacingTight u-marginTop5 u-fontSize12 u-paddingBottom2">'+text+'</span>';
	div += '</a>';
	return div;
}

function getCardInfo(signLink,signImg,signAltText,dateTime,readTime,bookmarkLink,bookmarkText){
	var div = '<div class="u-flex0 u-flexEnd u-marginTop15">';
		div += getSignImg(signLink,signImg,signAltText);
		div += getDivDate(signLink,signAltText,dateTime,readTime);
		div += getBookmarkDiv(bookmarkLink,bookmarkText);	
	div += '</div>';
	return div;
}

function getSignImg(signLink,signImg,signAltText){
	var div = '<div class="u-flex0 u-paddingRight10">';
		div += '<a class="link avatar u-baseColor--link" href="'+signLink+'" data-action="show-user-card" data-action-value="" data-action-type="hover" data-user-id="" dir="auto">';
			div += '<img src="'+signImg+'" class="avatar-image avatar-image--smaller" alt="'+signAltText+'">';
		div += '</a>';
	div += '</div>';
	return div;
}

function getDivDate(signLink,signAltText,dateTime,readTime){
	var div = '<div class="u-flex1 u-paddingBottom2 u-noWrapWithEllipsis">';
		div += '<div class="postMetaInline postMetaInline-authorLockup u-paddingLeft0">';
			div += '<a class="link link--accent u-accentColor--textNormal u-fontSize14 u-baseColor--link" href="'+signLink+'" data-action="show-user-card" data-action-value="" data-action-type="hover" data-user-id="" dir="auto">'+signAltText+'</a>';
		div += '</div>';
		div += '<div class="u-fontSize14 u-baseColor--textNormal u-textColorNormal u-noWrapWithEllipsis">';
			div += '<time datetime="'+dateTime+'"></time>';
			div += '<span class="middotDivider u-fontSize12"></span>';
			div += '<span class="readingTime" title="'+readTime+'"></span>';
		div += '</div>';
	div += '</div>';
	return div;
}

function getBookmarkDiv(bookmarkLink,bookmarkText){
	var div = '<div class="u-flex0 u-baseColor--iconNormal">';
		div += '<button class="button button--chromeless is-touchIconFadeInPulse u-baseColor--buttonNormal button--withIcon button--withSvgIcon button--bookmark js-bookmarkButton" title="'+bookmarkText+'" aria-label="'+bookmarkText+'" data-action="sign-in-prompt" data-sign-in-action="add-to-bookmarks" data-requires-token="true" data-redirect="'+bookmarkLink+'">';
			div += '<span class="button-defaultState">';
				div += '<span class="svgIcon svgIcon--bookmark svgIcon--25px is-flushRight is-flushBottom">';
					div += '<svg class="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">';
						div += '<path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path>';
					div += '</svg>';
				div += '</span>';
			div += '</span>';
			div += '<span class="button-activeState">';
				div += '<span class="svgIcon svgIcon--bookmarkFilled svgIcon--25px is-flushRight is-flushBottom">';
					div += '<svg class="svgIcon-use" width="25" height="26" viewBox="0 0 25 26">';
						div += '<path d="M19 7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 17.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V7z" fill-rule="evenodd"></path>';
					div += '</svg>';
				div += '</span>';
			div += '</span>';
		div += '</button>';
	div += '</div>';
	return div;
}

$(document).ready(function(){
        start();
});