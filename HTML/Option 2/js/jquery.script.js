/**
 * @package WordPress
 * @subpackage Lawbusiness
 * @since Lawbusiness 1.0
 * 
 * Theme Scripts
 * Created by CMSMasters
 * 
 */


/*
 * Responsive Content Slider v1.1 - jQuery Content Slider
 * 
 * (c) Copyright Steven "cmsmasters" Masters
 * http://cmsmastrs.net/
 * For sale on ThemeForest.net
 */

(function(e){e.fn.cmsmsResponsiveContentSlider=function(t){var n={sliderWidth:1e3,sliderHeight:500,animationSpeed:500,animationEffect:"slide",animationEasing:"easeInOutExpo",pauseTime:5e3,activeSlide:1,touchControls:true,pauseOnHover:true,arrowNavigation:true,arrowNavigationHover:false,slidesNavigation:true,slidesNavigationHover:false,afterSliderLoad:function(){},beforeSlideChange:function(){},afterSlideChange:function(){}},r=this,i=r.wrap('<div class="cmsms_content_slider_parent" />').parent(),s=undefined,o={};o={init:function(){o.options=e.extend({},n,t);o.el=r;o.vars={};o.vars.oldSlide=undefined;o.vars.newSlide=undefined;o.vars.active_sl_numb=o.options.activeSlide==="random"?0:Number(o.options.activeSlide-1);o.vars.ifWNumber=typeof o.options.sliderWidth==="number"?true:false;o.vars.ifHNumber=typeof o.options.sliderHeight==="number"?true:false;o.vars.autoHeight=o.options.sliderHeight==="auto"?true:false;o.vars.inPause=true;o.vars.inAnimation=true;o.vars.startResize=false;o.vars.mouseClicked=false;if(o.options.pauseTime!==0){o.vars.countdown=Math.round(o.options.pauseTime/50);o.vars.countMax=Math.round(o.options.pauseTime/50)}else{o.vars.countdown=-1;o.vars.countMax=-1}if(!o.vars.autoHeight){i.css({height:o.options.sliderHeight})}o.setSliderVars();o.preloadSlider()},setSliderVars:function(){o.vars.sliderWidth=o.vars.ifWNumber?o.options.sliderWidth+"px":o.options.sliderWidth;o.vars.sliderHeight=o.vars.ifHNumber?o.options.sliderHeight+"px":o.options.sliderHeight;o.vars.slides=o.el.find("> li");o.vars.sl_count=o.vars.slides.length;o.vars.first_sl=o.vars.slides.first();o.vars.last_sl=o.vars.slides.eq(o.vars.sl_count-1)},preloadSlider:function(){var t=o.vars.slides.find("img:eq(0)"),n=t.length;if(n>0){t.each(function(){var t=new Image,r=e(this).attr("src");t.src=r;e(this).addClass("cmsms_img");var i=setInterval(function(){if(isImageOk(t)||isImageOk(t)==="stop"){clearInterval(i);n-=1;if(n===0){o.buildSlider();o.buildControls();o.attachEvents();o.afterSliderLoad()}}},50)})}else{o.buildSlider();o.buildControls();o.attachEvents();o.afterSliderLoad()}},buildSlider:function(){o.vars.slides.addClass("cmsmsContentSlide").css({left:o.vars.sliderWidth});if(o.options.activeSlide==="random"){o.vars.active_sl_numb=parseInt(Math.random()*o.vars.sl_count)}o.el.css({background:"none"});i.css({width:o.vars.sliderWidth,padding:0,opacity:0});if(o.vars.autoHeight){o.vars.slides.css({height:"auto"});o.setSlideHeight(o.vars.slides.eq(o.vars.active_sl_numb),false)}o.vars.slides.eq(o.vars.active_sl_numb).css({left:0,zIndex:2}).addClass("active");i.animate({opacity:1},o.options.animationSpeed/2,o.options.animationEasing);o.vars.inPause=false;o.vars.inAnimation=false},buildControls:function(){if(o.options.slidesNavigation){i.append('<ul class="cmsms_slides_nav" />');o.vars.slidesNav=i.find("ul.cmsms_slides_nav");if(o.options.slidesNavigationHover){o.vars.slidesNav.css({opacity:0})}for(var e=0;e<o.vars.sl_count;e+=1){o.vars.slidesNav.append('<li><a href="#">'+(e+1)+"</a></li>")}o.vars.slidesNav.find(">li").eq(o.vars.active_sl_numb).addClass("active");o.vars.slidesNavButton=o.vars.slidesNav.find("> li > a")}if(o.options.arrowNavigation){i.parent().prepend('<a href="#" class="cmsms_content_prev_slide"><span /></a>'+'<a href="#" class="cmsms_content_next_slide"><span /></a>');o.vars.prevSlideButton=i.parent().find(".cmsms_content_prev_slide");o.vars.nextSlideButton=i.parent().find(".cmsms_content_next_slide");if(o.options.arrowNavigationHover){o.vars.prevSlideButton.css({left:"-100px",opacity:0});o.vars.nextSlideButton.css({right:"-100px",opacity:0})}}},attachEvents:function(){if(o.options.touchControls){o.vars.slides.bind("mousedown",function(e){o.mouseDoun(e);return false});o.vars.slides.bind("mousemove",function(e){o.mouseMove(e);return false});o.vars.slides.bind("mouseup",function(){o.mouseUp();return false});i.bind("mouseleave",function(){if(!o.vars.mouseClicked){return}o.mouseUp();return false})}if(o.options.arrowNavigation){o.vars.nextSlideButton.bind("click",function(){o.nextSlide();return false});o.vars.prevSlideButton.bind("click",function(){o.prevSlide();return false})}if(o.options.slidesNavigation){o.vars.slidesNavButton.bind("click",function(){if(e(this).parent().is(".active")){return false}else{o.slideChoose(e(this).parent().index())}return false})}if(o.options.pauseOnHover){i.bind("mouseenter",function(){o.vars.inPause=true}).bind("mouseleave",function(){o.vars.inPause=false})}if(o.options.slidesNavigation&&o.options.slidesNavigationHover){i.bind("mouseenter",function(){o.vars.slidesNav.css({opacity:1})}).bind("mouseleave",function(){o.vars.slidesNav.css({opacity:0})})}if(o.options.arrowNavigation&&o.options.arrowNavigationHover){i.bind("mouseenter",function(){o.vars.prevSlideButton.stop().animate({opacity:1},o.options.animationSpeed,o.options.animationEasing);o.vars.nextSlideButton.stop().animate({opacity:1},o.options.animationSpeed,o.options.animationEasing)}).bind("mouseleave",function(){o.vars.prevSlideButton.stop().animate({opacity:0},o.options.animationSpeed,o.options.animationEasing);o.vars.nextSlideButton.stop().animate({opacity:0},o.options.animationSpeed,o.options.animationEasing)})}if(o.vars.autoHeight){e(window).bind("resize",function(){if(o.vars.startResize){clearTimeout(o.vars.startResize)}o.vars.startResize=setTimeout(function(){o.getSlVars();o.setSlideHeight(o.vars.active_sl,false)},300)})}s=setInterval(function(){o.timerController()},50)},getSlVars:function(){o.vars.active_sl=o.el.find("> li.active")},setSlideHeight:function(e,t){if(t){i.animate({height:e[0].scrollHeight+"px"},o.options.animationSpeed,o.options.animationEasing)}else{i.css({height:e[0].scrollHeight+"px"})}},navActiveSl:function(e,t){o.vars.slidesNav.find("> li").eq(e.index()).removeClass("active");o.vars.slidesNav.find("> li").eq(t.index()).addClass("active")},setTimer:function(){o.vars.inPause=false;if(o.options.pauseTime!==0){o.vars.countdown=Math.round(o.options.pauseTime/50);o.vars.countMax=Math.round(o.options.pauseTime/50)}else{o.vars.countdown=-1;o.vars.countMax=-1}},nextSlide:function(){if(o.vars.inAnimation||o.vars.sl_count<2){return false}else{o.vars.inAnimation=true}o.getSlVars();o.setTimer();o.beforeSlideChange();o.vars.oldSlide=o.vars.active_sl;o.vars.newSlide=o.vars.active_sl.index()<o.vars.sl_count-1?o.vars.active_sl.next():o.vars.first_sl;if(o.options.slidesNavigation){o.navActiveSl(o.vars.oldSlide,o.vars.newSlide)}if(o.vars.autoHeight){o.setSlideHeight(o.vars.newSlide,true)}if(o.options.animationEffect==="slide"){o.vars.oldSlide.removeClass("active").animate({left:"-"+o.vars.sliderWidth},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({left:o.vars.sliderWidth,zIndex:1})});o.vars.newSlide.addClass("active").css({zIndex:3}).animate({left:o.vars.ifWNumber?0:"0%"},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({zIndex:2});o.vars.inAnimation=false;o.afterSlideChange()})}else if(o.options.animationEffect==="fade"){o.fadeSlide(o.vars.oldSlide,o.vars.newSlide,true)}},prevSlide:function(){if(o.vars.inAnimation||o.vars.sl_count<2){return false}else{o.vars.inAnimation=true}o.getSlVars();o.setTimer();o.beforeSlideChange();o.vars.oldSlide=o.vars.active_sl;o.vars.newSlide=o.vars.active_sl.index()>0?o.vars.active_sl.prev():o.vars.last_sl;if(o.options.slidesNavigation){o.navActiveSl(o.vars.oldSlide,o.vars.newSlide)}if(o.vars.autoHeight){o.setSlideHeight(o.vars.newSlide,true)}if(o.options.animationEffect==="slide"){o.vars.oldSlide.removeClass("active").animate({left:o.vars.sliderWidth},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({zIndex:1})});o.vars.newSlide.addClass("active").css({left:"-"+o.vars.sliderWidth,zIndex:3}).animate({left:o.vars.ifWNumber?0:"0%"},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({zIndex:2});o.vars.inAnimation=false;o.afterSlideChange()})}else if(o.options.animationEffect==="fade"){o.fadeSlide(o.vars.oldSlide,o.vars.newSlide,false)}},slideChoose:function(t){if(o.vars.inAnimation){return false}else{o.vars.inAnimation=true}o.getSlVars();o.setTimer();o.beforeSlideChange();o.vars.oldSlide=o.vars.active_sl;o.vars.newSlide=o.vars.slides.eq(t);if(o.options.slidesNavigation){o.navActiveSl(o.vars.oldSlide,o.vars.newSlide)}if(o.vars.autoHeight){o.setSlideHeight(o.vars.newSlide,true)}if(o.vars.active_sl.index()<o.vars.newSlide.index()){if(o.options.animationEffect==="slide"){o.vars.oldSlide.removeClass("active").animate({left:"-"+o.vars.sliderWidth},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({left:o.vars.sliderWidth,zIndex:1})});o.vars.newSlide.addClass("active").css({zIndex:3}).animate({left:o.vars.ifWNumber?0:"0%"},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({zIndex:2});o.vars.inAnimation=false;o.afterSlideChange()})}else if(o.options.animationEffect==="fade"){o.fadeSlide(o.vars.oldSlide,o.vars.newSlide,true)}}else{if(o.options.animationEffect==="slide"){o.vars.oldSlide.removeClass("active").animate({left:o.vars.sliderWidth},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({zIndex:1})});o.vars.newSlide.addClass("active").css({left:"-"+o.vars.sliderWidth,zIndex:3}).animate({left:o.vars.ifWNumber?0:"0%"},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({zIndex:2});o.vars.inAnimation=false;o.afterSlideChange()})}else if(o.options.animationEffect==="fade"){o.fadeSlide(o.vars.oldSlide,o.vars.newSlide,false)}}},fadeSlide:function(t,n,r){n.css({left:0});if(r){t.removeClass("active").animate({left:"-"+o.vars.sliderWidth,opacity:0},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({left:o.vars.sliderWidth,opacity:1,zIndex:1});n.addClass("active").css({zIndex:2});o.vars.inAnimation=false;o.afterSlideChange()})}else{t.removeClass("active").animate({left:o.vars.sliderWidth,opacity:0},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({opacity:1,zIndex:1});n.addClass("active").css({zIndex:2});o.vars.inAnimation=false;o.afterSlideChange()})}},mouseDoun:function(e){if(o.vars.inAnimation||o.vars.pj_count<2){return false}else{o.vars.inAnimation=true;o.vars.inPause=true;o.vars.mouseClicked=true;o.vars.startPosX=e.clientX;o.vars.xIndex=0;if(!o.vars.ifWNumber){o.vars.sliderPxWidth=i.width()}else{o.vars.sliderPxWidth=o.options.sliderWidth}o.getSlVars();o.vars.next_sl=o.vars.active_sl.index()!==o.vars.sl_count-1?o.vars.active_sl.next():o.vars.first_sl;o.vars.prev_sl=o.vars.active_sl.index()!==0?o.vars.active_sl.prev():o.vars.last_sl}},mouseMove:function(e){if(!o.vars.mouseClicked){return}o.vars.finishPosX=e.clientX;o.vars.xIndex=Math.round(o.vars.finishPosX-o.vars.startPosX);if(o.options.animationEffect==="slide"){o.vars.active_sl.css({left:o.vars.xIndex+"px"})}else if(o.options.animationEffect==="fade"){o.vars.active_sl.css({left:o.vars.xIndex+"px",opacity:1-(Math.abs(o.vars.xIndex)/Math.round(o.vars.sliderPxWidth*.75)).toFixed(2)})}if(o.vars.xIndex<0){if(o.options.animationEffect==="slide"){o.vars.next_sl.css({left:o.vars.sliderPxWidth+o.vars.xIndex+"px",zIndex:3})}else if(o.options.animationEffect==="fade"){if(o.vars.prevTouch){o.vars.prevTouch=false;o.vars.touchTarget.css({left:o.vars.sliderPxWidth+"px"})}if(!o.vars.nextTouch){o.vars.nextTouch=true}if(o.vars.active_sl.index()!==o.vars.sl_count-1){o.vars.touchTarget=o.vars.active_sl.next()}else{o.vars.touchTarget=o.vars.first_sl}o.vars.touchTarget.css({left:0})}}else if(o.vars.xIndex>0){if(o.options.animationEffect==="slide"){o.vars.prev_sl.css({left:-o.vars.sliderPxWidth+o.vars.xIndex+"px",zIndex:3})}else if(o.options.animationEffect==="fade"){if(o.vars.nextTouch){o.vars.nextTouch=false;o.vars.touchTarget.css({left:o.vars.sliderPxWidth+"px"})}if(!o.vars.prevTouch){o.vars.prevTouch=true}if(o.vars.active_sl.index()!==0){o.vars.touchTarget=o.vars.active_sl.prev()}else{o.vars.touchTarget=o.vars.last_sl}o.vars.touchTarget.css({left:0})}}},mouseUp:function(){if(!o.vars.mouseClicked){return}o.vars.mouseClicked=false;if(o.vars.xIndex<0){if(o.vars.xIndex<-75){o.beforeSlideChange();if(o.options.slidesNavigation){o.navActiveSl(o.vars.active_sl,o.vars.next_sl)}if(o.vars.autoHeight){o.setSlideHeight(o.vars.next_sl,true)}if(o.options.animationEffect==="slide"){if(o.vars.sl_count>2){o.vars.prev_sl.css({left:o.vars.sliderPxWidth+"px",zIndex:1})}o.vars.active_sl.removeClass("active").animate({left:"-"+o.vars.sliderPxWidth+"px"},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({left:o.vars.sliderPxWidth+"px",zIndex:1})});o.vars.next_sl.addClass("active").animate({left:0},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({zIndex:2});o.vars.inAnimation=false;o.setTimer();o.afterSlideChange()})}else if(o.options.animationEffect==="fade"){if(o.vars.sl_count>2){o.vars.prev_sl.css({left:o.vars.sliderPxWidth+"px",opacity:1,zIndex:1})}o.vars.active_sl.removeClass("active").animate({left:"-"+o.vars.sliderPxWidth+"px"},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({left:o.vars.sliderPxWidth+"px",opacity:1,zIndex:1});o.vars.next_sl.addClass("active").css({zIndex:2});o.vars.inAnimation=false;o.setTimer();o.afterSlideChange()})}}else{if(o.options.animationEffect==="slide"){if(o.vars.sl_count>2){o.vars.prev_sl.css({left:o.vars.sliderPxWidth+"px",zIndex:1})}o.vars.active_sl.animate({left:0},o.options.animationSpeed,o.options.animationEasing);o.vars.next_sl.animate({left:o.vars.sliderPxWidth+"px"},o.options.animationSpeed,o.options.animationEasing,function(){o.vars.inAnimation=false;o.vars.inPause=false})}else if(o.options.animationEffect==="fade"){if(o.vars.sl_count>2){o.vars.prev_sl.css({left:o.vars.sliderPxWidth+"px",opacity:1,zIndex:1})}o.vars.active_sl.animate({left:0,opacity:1},o.options.animationSpeed,o.options.animationEasing,function(){o.vars.next_sl.css({left:o.vars.sliderPxWidth+"px"});o.vars.inAnimation=false;o.vars.inPause=false})}}}else if(o.vars.xIndex>=0){if(o.vars.xIndex>75){o.beforeSlideChange();if(o.options.slidesNavigation){o.navActiveSl(o.vars.active_sl,o.vars.prev_sl)}if(o.vars.autoHeight){o.setSlideHeight(o.vars.prev_sl,true)}if(o.options.animationEffect==="slide"){if(o.vars.sl_count>2){o.vars.next_sl.css({left:o.vars.sliderPxWidth+"px",zIndex:1})}o.vars.active_sl.removeClass("active").animate({left:o.vars.sliderPxWidth+"px"},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({zIndex:1})});o.vars.prev_sl.addClass("active").animate({left:0},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({zIndex:2});o.vars.inAnimation=false;o.setTimer();o.afterSlideChange()})}else if(o.options.animationEffect==="fade"){if(o.vars.sl_count>2){o.vars.next_sl.css({left:o.vars.sliderPxWidth+"px",opacity:1,zIndex:1})}o.vars.active_sl.removeClass("active").animate({left:o.vars.sliderPxWidth+"px"},o.options.animationSpeed,o.options.animationEasing,function(){e(this).css({opacity:1,zIndex:1});o.vars.prev_sl.addClass("active").css({zIndex:2});o.vars.inAnimation=false;o.setTimer();o.afterSlideChange()})}}else{if(o.options.animationEffect==="slide"){if(o.vars.sl_count>2){o.vars.next_sl.css({left:o.vars.sliderPxWidth+"px",zIndex:1})}if(o.vars.xIndex!==0){o.vars.active_sl.animate({left:0},o.options.animationSpeed,o.options.animationEasing);o.vars.prev_sl.animate({left:"-"+o.vars.sliderPxWidth+"px"},o.options.animationSpeed,o.options.animationEasing,function(){o.vars.inAnimation=false;o.vars.inPause=false})}else{o.vars.inAnimation=false;o.vars.inPause=false}}else if(o.options.animationEffect==="fade"){if(o.vars.sl_count>2){o.vars.next_sl.css({left:o.vars.sliderPxWidth+"px",opacity:1,zIndex:1})}if(o.vars.xIndex!==0){o.vars.active_sl.animate({left:0,opacity:1},o.options.animationSpeed,o.options.animationEasing,function(){o.vars.prev_sl.css({left:o.vars.sliderPxWidth+"px"});o.vars.inAnimation=false;o.vars.inPause=false})}else{o.vars.inAnimation=false;o.vars.inPause=false}}}}},timerController:function(){if(o.vars.inPause||o.vars.countdown<0){return}if(o.vars.countdown===0){o.nextSlide()}o.vars.countdown-=1},afterSliderLoad:function(){o.options.afterSliderLoad()},beforeSlideChange:function(){o.options.beforeSlideChange()},afterSlideChange:function(){o.options.afterSlideChange()}};o.init()}})(jQuery);



/* UItoTop jQuery Plugin 1.2 | Matt Varone | http://www.mattvarone.com/web-design/uitotop-jquery-plugin */
(function($){$.fn.UItoTop=function(options){var defaults={text:'To Top',min:200,inDelay:600,outDelay:400,containerID:'toTop',containerHoverID:'toTopHover',scrollSpeed:1200,easingType:'linear'},settings=$.extend(defaults,options),containerIDhash='#'+settings.containerID,containerHoverIDHash='#'+settings.containerHoverID;$('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');$(containerIDhash).hide().on('click.UItoTop',function(){$('html, body').animate({scrollTop:0},settings.scrollSpeed,settings.easingType);$('#'+settings.containerHoverID,this).stop().animate({'opacity':0},settings.inDelay,settings.easingType);return false;}).prepend('<span id="'+settings.containerHoverID+'"></span>').hover(function(){$(containerHoverIDHash,this).stop().animate({'opacity':1},600,'linear');},function(){$(containerHoverIDHash,this).stop().animate({'opacity':0},700,'linear');});$(window).scroll(function(){var sd=$(window).scrollTop();if(typeof document.body.style.maxHeight==="undefined"){$(containerIDhash).css({'position':'absolute','top':sd+$(window).height()-50});}
if(sd>settings.min)
$(containerIDhash).fadeIn(settings.inDelay);else
$(containerIDhash).fadeOut(settings.Outdelay);});};})(jQuery);


jQuery(document).ready(function () { 
	/* Scroll to top */
	jQuery().UItoTop( { 
		containerID : 'slide_top', 
		containerHoverID : 'slide_top_hover', 
		easingType : 'easeOutQuart' 
	} );					
} );



/* Social Icons Script */
(function($){$.fn.socicons=function(c){var d={icons:'digg,stumbleupon,delicious,facebook,yahoo',imagesurl:'images/',imageformat:'png',light:true,targetblank:true,shorturl:''};var e=$.extend({},d,c);var f=this;var g=e.targetblank?'target="_blank"':'';var h=e.icons.split(',');for(key in h){var j=h[key];var k=socformat[h[key]];if(k!=undefined){k=k.replace('{TITLE}',urlencode(socicons_title()));k=k.replace('{URL}',urlencode(socicons_url()));k=k.replace('{SHORTURL}',urlencode(socicons_shorturl()));k=k.replace('{KEYWORDS}',urlencode(socicons_metawords()));k=k.replace('{DESCRIPTION}',urlencode(socicons_metadescript()));var l='<a '+g+' href="'+k+'" class="socicons_icon" title="'+j+'"><img src="'+e.imagesurl+j+'.'+e.imageformat+'" alt="'+j+'" /></a>';this.append(l)}}if(e.light){this.find('.socicons_icon').bind('mouseover',function(){$(this).siblings().stop().animate({'opacity':0.3},500)});this.find('.socicons_icon').bind('mouseout',function(){$(this).siblings().stop().animate({'opacity':1},500)})}var m;function socicons_metawords(){if(n==undefined){metaCollection=document.getElementsByTagName('meta');for(i=0;i<metaCollection.length;i++){nameAttribute=metaCollection[i].name.search(/keywords/);if(nameAttribute!=-1){m=metaCollection[i].content;return m}}}else{return m}}var n;function socicons_metadescript(){if(n==undefined){metaCollection=document.getElementsByTagName('meta');for(i=0;i<metaCollection.length;i++){nameAttribute=metaCollection[i].name.search(/description/);if(nameAttribute!=-1){n=metaCollection[i].content;return n}}}else{return n}}function socicons_title(){return document.title}function socicons_url(){var a=document.location.href;return a}function socicons_shorturl(){if(e.shorturl==''){return socicons_url()}else{return e.shorturl}}function urlencode(a){if(a==undefined){return''}return a.replace(/\s/g,'%20').replace('+','%2B').replace('/%20/g','+').replace('*','%2A').replace('/','%2F').replace('@','%40')}function light(a,b){if(b){a.style.opacity=1;a.childNodes[0].style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity=100);'}else{a.style.opacity=light_opacity/100;a.style.filter='alpha(opacity=20)';a.childNodes[0].style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity='+light_opacity+');'}}return this}})(jQuery);


var socformat = Array();


socformat['bligg'] = 'http://www.bligg.nl/submit.php?url={URL}';
socformat['blogmarks'] = 'http://blogmarks.net/my/new.php?mini=1&url={URL}&title={TITLE}';
socformat['buzz'] = 'http://www.google.com/reader/link?url={URL}&title={TITLE}&snippet={DESCRIPTION}&srcURL={URL}&srcTitle={TITLE}';
socformat['delicious'] = 'http://del.icio.us/post?url={URL}&title={TITLE}';
socformat['digg'] = 'http://digg.com/submit?phase=2&url={URL}&title={TITLE}';
socformat['ekudos'] = 'http://www.ekudos.nl/artikel/nieuw?url={URL}&title={TITLE}&desc={DESCRIPTION}';
socformat['facebook'] = 'http://www.facebook.com/share.php?u={URL}';
socformat['furl'] = 'http://furl.net/storeIt.jsp?u={URL}&t={TITLE}';
socformat['google'] = 'http://www.google.com/bookmarks/mark?op=edit&bkmk={URL}&title={TITLE}';
socformat['googleplus']	= 'https://m.google.com/app/plus/x/?v=compose&content={TITLE}-{URL}';
socformat['linkedin'] = 'http://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TITLE}&summary={DESCRIPTION}&source=';
socformat['live'] = 'https://favorites.live.com/quickadd.aspx?marklet=1&mkt=en-us&url={URL}&title={TITLE}&top=1';
socformat['magnolia'] = 'http://ma.gnolia.com/bookmarklet/add?url={URL}&title={TITLE}';
socformat['mail'] = 'mailto:to@email.com?SUBJECT={TITLE}&BODY={DESCRIPTION}-{URL}';
socformat['misterwong'] = 'http://www.mister-wong.com/add_url/?bm_url={URL}&bm_title={TITLE}&bm_comment=&bm_tags={KEYWORDS}';
socformat['myspace'] = 'http://www.myspace.com/Modules/PostTo/Pages/?u={URL}';
socformat['netscape'] = 'http://www.netscape.com/submit/?U={URL}&T={TITLE}';
socformat['newsvine'] = 'http://www.newsvine.com/_wine/save?u={URL}&h={TITLE}';
socformat['nujij'] = 'http://nujij.nl/jij.lynkx?t={TITLE}&u={URL}&b={DESCRIPTION}'
socformat['reddit'] = 'http://reddit.com/submit?url={URL}&title={TITLE}';
socformat['sphere'] = 'http://www.sphere.com/search?q=sphereit:{URL}';
socformat['stumbleupon'] = 'http://www.stumbleupon.com/submit?url={URL}&title={TITLE}';
socformat['symbaloo'] = 'http://www.symbaloo.com/en/add/url={URL}&title={TITLE}';
socformat['tailrank'] = 'http://tailrank.com/share/?link_href={URL}&title={TITLE}';
socformat['technorati'] = 'http://www.technorati.com/faves?add={URL}';
socformat['twitter'] = 'http://twitter.com/?status={TITLE}%20-%20{SHORTURL}';
socformat['yahoo'] = 'http://myweb2.search.yahoo.com/myresults/bookmarklet?u={URL}&t={TITLE}';



/* Hover Slider Script */
(function ($) { 
	$.fn.cmsmsHoverSlider = function (parameters) { 
		var defaults = { 
				sliderBlock : '.cmsms_hover_slider', 
				sliderItems : '.cmsms_hover_slider_items', 
				thumbWidth : '60', 
				thumbHeight : '40'
			}, 
			plugin = this, 
			methods = {};
		
		
		methods = { 
			init : function () { 
				methods.options = $.extend({}, defaults, parameters);
				
				
				methods.el = plugin;
				methods.vars = {};
				
				
				
				methods.setcmsmsHoverSliderVars();
				methods.startcmsmsHoverSlider();
			}, 
			setcmsmsHoverSliderVars : function () { 
				methods.vars.sliderBlock = $(methods.options.sliderBlock);
				
				methods.vars.items_thumbWidth = methods.options.thumbWidth;
				
				methods.vars.items_thumbHeight = methods.options.thumbHeight;
				
				
				
				methods.vars.items = methods.el.find(methods.options.sliderItems);
				
				methods.vars.items_img = methods.vars.items.find('.cmsms_hover_slider_full_img img');
				
				methods.vars.items_img_count = methods.vars.items.find('.cmsms_hover_slider_full_img').length;
			}, 
			startcmsmsHoverSlider : function () { 
				methods.vars.sliderBlock.append('<ul class="cmsms_hover_slider_thumbs"></ul>');
				
				
				for (i = 0; i < methods.vars.items_img_count; i += 1) {
					methods.vars.sliderBlock.find('.cmsms_hover_slider_thumbs').append('<li>' + 
						'<a href="#" class="cmsms_hover_slider_thumb">' + 
							'<img src="' + $(methods.vars.items_img).eq(i).attr('src') + '" alt="" width="' + methods.vars.items_thumbWidth + '" height="' + methods.vars.items_thumbHeight + '" />' + 
						'</a>' + 
					'</li>');
				}
				
				
				$(methods.vars.items_img).parents(methods.vars.items).find('> li').eq(0).css({'visibility':'visible', 'opacity':1});
				
				
				methods.attachEvents();
			}, 
			attachEvents : function () { 
				$('.cmsms_hover_slider_thumb').bind('mouseover', function () {
					$(methods.vars.items).find('li').css({'visibility':'hidden', 'opacity':0});
					$(this).closest('ul').prev().find('li:eq(' + $(this).closest('li').index() + ')').css({'visibility':'visible', 'opacity':1});
				});
				
				$('.cmsms_hover_slider_thumb').bind('click', function () {
					return false;
				});
			}
		};
		
		methods.init();
	}
} )(jQuery);



/* Clients Slider Script */
(function ($) { 
	$.fn.cmsmsClientsSlider = function (parameters) { 
		var defaults = { 
				sliderBlock : '.cmsms_clients_slider', 
				sliderItems : '.cmsms_clients_items', 
				clientsInPage : 5
			}, 
			plugin = this, 
			methods = {};
		
		
		methods = { 
			init : function () { 
				methods.options = $.extend({}, defaults, parameters);
				
				
				methods.el = plugin;
				methods.vars = {};
				
				
				methods.setcmsmsClientsSliderVars();
				methods.startcmsmsClientsSlider();
			}, 
			setcmsmsClientsSliderVars : function () { 
				methods.vars.sliderBlock = $(methods.options.sliderBlock);
				
				methods.vars.items = methods.el.find(methods.options.sliderItems);
				
				methods.vars.item = methods.vars.items.find('.cmsms_clients_item');
				
				methods.vars.clientsInPage = methods.options.clientsInPage;
				
				if ($(window).width() < 540) {
					methods.vars.clientsInPage = 1;
				} else if ($(window).width() < 767) {
					methods.vars.clientsInPage = 2;
				} else if ($(window).width() < 1024) {
					methods.vars.clientsInPage = 3;
				} else {
					methods.vars.clientsInPage = methods.options.clientsInPage;
				}

				if ($('#page').hasClass('no_responsive')) {
					methods.vars.clientsInPage = methods.options.clientsInPage;
				}	
				
				methods.vars.item_count = methods.vars.item.length;
				
				methods.vars.count_index = 0;
				
				methods.vars.startVars = false;
			}, 
			startcmsmsClientsSlider : function () { 
				methods.vars.clientsOutPage = Math.abs(methods.options.clientsInPage - methods.vars.item_count);
				
				methods.vars.index_out_page = methods.vars.clientsOutPage;
				
				methods.vars.item_width = methods.vars.sliderBlock.width() / methods.vars.clientsInPage;
				
				methods.vars.items_width = (methods.vars.item_width * methods.vars.item_count) + 1;
				
				methods.vars.margin = -(methods.vars.item_width * methods.vars.count_index);
				
				
				methods.vars.items.width(methods.vars.items_width);
				
				methods.vars.item.width(methods.vars.item_width);
				
				methods.vars.items.css('margin-left', methods.vars.margin);
				
				methods.vars.sliderBlock.find('.cmsms_clients_img').css('height', 'auto');
				
				
				if (methods.vars.clientsInPage < methods.vars.item_count && methods.vars.startVars == false) {
					methods.attachEvents();
				}
				
				if (methods.vars.clientsInPage > methods.vars.item_count) {
					methods.vars.sliderBlock.find('.cmsms_clients_slider_arrow_next, .cmsms_clients_slider_arrow_prev').css('display', 'none');
				}
			}, 
			attachEvents : function () { 
				methods.vars.sliderBlock.find('.cmsms_clients_slider_arrow_next').bind('click', function() {
					methods.nextSlide();
					
					
					return false;
				});
				
				
				methods.vars.sliderBlock.find('.cmsms_clients_slider_arrow_prev').bind('click', function() {
					methods.prevSlide();
					
					
					return false;
				});
				
				
				$(window).resize(function () { 
					if ($(window).width() < 540) {
						methods.vars.clientsInPage = methods.options.clientsInPage - ((methods.options.clientsInPage <= 4) ? methods.options.clientsInPage - 1 : 4);
					} else if ($(window).width() < 767) {
						methods.vars.clientsInPage = methods.options.clientsInPage - ((methods.options.clientsInPage <= 3) ? methods.options.clientsInPage - 1 : 3);
					} else if ($(window).width() < 1024) {
						methods.vars.clientsInPage = methods.options.clientsInPage - ((methods.options.clientsInPage <= 2) ? methods.options.clientsInPage - 1 : 2);
					} else if ($(window).width() < 1440) {
						methods.vars.clientsInPage = methods.options.clientsInPage - ((methods.options.clientsInPage == 1) ? 0 : 1);
					} else {
						methods.vars.clientsInPage = methods.options.clientsInPage;
					}
					
					methods.vars.item_width = methods.vars.sliderBlock.width() / methods.vars.clientsInPage;
					
					methods.vars.items_width = (methods.vars.item_width * methods.vars.item_count) + 1;
					
					methods.vars.margin = 0;
					
					methods.vars.clientsOutPage = Math.abs(methods.vars.clientsInPage - methods.vars.item_count);
					
					methods.vars.index_out_page = methods.vars.clientsOutPage;
					
					
					methods.vars.items.width(methods.vars.items_width);
					
					methods.vars.item.width(methods.vars.item_width);
					
					methods.vars.items.css('margin-left', methods.vars.margin);
				} );
			}, 
			nextSlide : function () { 
				if (methods.vars.index_out_page > 0) {
					methods.vars.index_out_page -= 1;
				}
				
				
				methods.vars.count_index = methods.vars.clientsOutPage - methods.vars.index_out_page;
				
				methods.vars.margin = -(methods.vars.item_width * methods.vars.count_index);
				
				
				methods.vars.items.css('margin-left', methods.vars.margin);
			}, 
			prevSlide : function () { 
				if (methods.vars.count_index != 0) {
					if (methods.vars.count_index > 0) {
						methods.vars.count_index -= 1;
					}
					
					
					methods.vars.margin = -(methods.vars.item_width * methods.vars.count_index);
					
					
					methods.vars.items.css('margin-left', methods.vars.margin);
					
					
					methods.vars.index_out_page += 1;
				}
			} 
		};
		
		methods.init();
	} 
} )(jQuery);



jQuery(document).ready(function() { 
	/* Social Icons Toggle */
	(function ($) { 
		$('a.cmsms_share').toggle(function () { 
			$(this).parent().find('.cmsms_social').show('slow');
			
			
			return false;
		} , function () { 
			$(this).parent().find('.cmsms_social').hide('slow');
			
			
			return false;
		} );
	} )(jQuery);


	/* Top Social Block Toggle */
    (function ($) {
        $('a.social_toggle').bind('click', function () {
			if ($(this).hasClass('current')) {
				$(this).removeClass('current');
				
				$(this).parent().parent().find('.header_html').slideUp('slow');
				$(this).parent().parent().find('.wrap_social_icons ul').slideUp('slow');
				
				
				return false;
			} else {
				$(this).addClass('current');
				
				$(this).parent().parent().find('.header_html').slideDown('slow');
				$(this).parent().parent().find('.wrap_social_icons ul').slideDown('slow');
				
				
				return false;
			}
        } );
		
		
		$(window).bind('resize', function () { 
			if ($(this).width() > 1024) {
				$('a.social_toggle').removeClass('current');
				
				$('.header_html').removeAttr('style');
				$('.wrap_social_icons ul').removeAttr('style');
			}
		} );
    } )(jQuery);
    

    /* Navigation Scroll */
	(function ($) { 
		if ($(window).width() > 767) {
			$(window).scroll(function () { 
				var sT = $(window).scrollTop();
				
				if (sT > 60) { 
					$('.navi_scrolled').addClass('navi_scrolled_resize');
					$('.cmsms_dynamic_cart').addClass('cart_scrolled_resize');
				} else {
					$('.navi_scrolled').removeClass('navi_scrolled_resize');
					$('.cmsms_dynamic_cart').removeClass('cart_scrolled_resize');
				}
			} );
			$(window).bind('scroll', function () { 
				var sT = $(window).scrollTop();
				
				if (sT > 40) { 
					$('.cmsms_boxed #header .navi_scrolled').addClass('navi_boxed_fixed');
				} else {
					$('.cmsms_boxed #header .navi_scrolled').removeClass('navi_boxed_fixed');
				}
			} );
		}
	} )(jQuery);

	
	/* PieChart Run */

	(function ($) { 
		$('.percentage').easyPieChart({
			animate: 1000,
			lineWidth: 3,
			trackColor: '#ffffff',
			lineCap: 'butt',
			size: 165,
			scaleColor: false,
			onStep: function(value) {
				this.$el.find('span').text(~~value);
			}
		});
	} )(jQuery);
	
	/* JackBox Lighbox */
	(function ($) { 
		$('a.jackbox[data-group]').jackBox('init', { 
			deepLinking : false, 
			preloadGraphics : false, 
			autoPlayVideo : false, 
			defaultVideoWidth : 1280, 
			defaultVideoHeight : 720, 
			thumbsStartHidden : true, 
			thumbnailWidth : 70, 
			thumbnailHeight : 40 
		} );
	} )(jQuery);
	
	
	
	/* Scroll Top */
	(function ($) { 
		$('.divider a').click(function () { 
			$('html, body').animate( { 
				scrollTop : 0 
			}, 'slow');
			
			
			return false;
		} );
	} )(jQuery);
	
	
	
	/* Mobile Devices Navigation Script */
	(function ($) { 
		$('a.responsive_nav').bind('click', function () { 
			if ($(this).hasClass('active')) {
				if ( 
					checker.os.iphone || 
					checker.os.ipad || 
					checker.os.ipod 
				) {
					$('#navigation').css( { 
						display : 'none' 
					} );
				} else {
					$('#navigation').slideUp('fast');
				}
				
				$('#navigation ul').css( { 
					display : 'none' 
				} );
				$(this).removeClass('active');
			} else {
				if ( 
					checker.os.iphone || 
					checker.os.ipad || 
					checker.os.ipod 
				) {
					$('#navigation').css( { 
						display : 'block' 
					} );
				} else {
					$('#navigation').slideDown('fast');
				}
				
				$(this).addClass('active');
			}
			
			setTimeout(function () { 
				if ($(window).height() < ($('#navigation').height() + 47)) {
					$('#header').css( { 
						position : 'relative', 
						top : 0 
					} );
					
					$('.header_inner').css( { 
						marginTop : 0 
					} );
				} else if ( 
					$(window).height() > ($('#navigation').height() + 47) && 
					$('#header').css('position') !== 'fixed' 
				) {
					$('#header').removeAttr('style');
					
					$('.header_inner').removeAttr('style');
				}
			}, 500);
			
			return false;
		} );
		
		$('#navigation li a').bind('click', function () { 
			if ($('a.responsive_nav').is(':visible')) {
				if ($(this).next().is('ul')) {
					if ($(this).next().is(':visible')) {
						$(this).removeClass('drop_active');
						
						if ( 
							checker.os.iphone || 
							checker.os.ipad || 
							checker.os.ipod 
						) {
							$(this).next().css( { 
								display : 'none' 
							} );
						} else {
							$(this).next().slideUp('fast');
						}
						
						$(this).next().find('ul').css( { 
							display : 'none' 
						} );
					} else {
						$(this).parent().parent().find('a').removeClass('drop_active');
						
						if ( 
							checker.os.iphone || 
							checker.os.ipad || 
							checker.os.ipod 
						) {
							$(this).parent().parent().find('ul').css( { 
								display : 'none' 
							} );
						} else {
							$(this).parent().parent().find('ul').slideUp('fast');
						}
						
						$(this).addClass('drop_active');
						
						if ( 
							checker.os.iphone || 
							checker.os.ipad || 
							checker.os.ipod 
						) {
							$(this).next().css( { 
								display : 'block' 
							} );
						} else {
							$(this).next().slideDown('fast');
						}
					}
					
					setTimeout(function () { 
						if ($(window).height() < ($('#navigation').height() + 47)) {
							$('#header').css( { 
								position : 'relative', 
								top : 0 
							} );
							
							$('.header_inner').css( { 
								marginTop : 0 
							} );
						} else if ( 
							$(window).height() > ($('#navigation').height() + 47) && 
							$('#header').css('position') !== 'fixed' 
						) {
							$('#header').removeAttr('style');
							
							$('.header_inner').removeAttr('style');
						}
					}, 500);
					
					return false;
				}
			}
		} );
		
		$(window).bind('resize', function () { 
			if ($(this).width() > 1024) {
				$('a.responsive_nav').removeClass('active');
				
				$('#navigation').removeAttr('style');
				$('#navigation ul').removeAttr('style');
			} else {
				setTimeout(function () { 
					if ($(window).height() < ($('#navigation').height() + 47)) {
						$('#header').css( { 
							position : 'relative', 
							top : 0 
						} );
						
						$('.header_inner').css( { 
							marginTop : 0 
						} );
					} else if ( 
						$(window).height() > ($('#navigation').height() + 47) && 
						$('#header').css('position') !== 'fixed' 
					) {
						$('#header').removeAttr('style');
						
						$('.header_inner').removeAttr('style');
					}
				}, 500);
			}
		} );
	} )(jQuery);
	
	
	
	/* DebouncedResize Function */
	(function ($) { 
		var $event = $.event, 
			$special, 
			resizeTimeout;
		
		
		$special = $event.special.debouncedresize = { 
			setup : function () { 
				$(this).on('resize', $special.handler);
			}, 
			teardown : function () { 
				$(this).off('resize', $special.handler);
			}, 
			handler : function (event, execAsap) { 
				var context = this, 
					args = arguments, 
					dispatch = function () { 
						event.type = 'debouncedresize';
						
						
						$event.dispatch.apply(context, args);
					};
				
				
				if (resizeTimeout) {
					clearTimeout(resizeTimeout);
				}
				
				
				execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
			}, 
			threshold : 150 
		};
	} )(jQuery);
	
	
	
	/* Body addClass if UA */
	(function ($) { 
		if (checker.ua.safari && !checker.ua.chrome) {
			$('body').addClass('js_body');
		}

		if (checker.ua.chrome) {
			$('body').addClass('js_chrome');
		}
		
		if (checker.ua.firefox) {
			$('body').addClass('js_firefox');
		}
		
		if (checker.ua.ie9) {
			$('body').addClass('js_ie9');
		}
		
		if (checker.ua.ie10) {
			$('body').addClass('js_ie10');
		}
		
		if (checker.os.win8) {
			$('body').addClass('js_win8');
		}
	} )(jQuery);
	
	
	
	/* Theme Scripts */
	(function ($) { 
		$('#flickr .flickr_badge_image a, .cmsmasters_flickr_widget .flickr_badge_image a').each(function () { 
			var src = $(this).find('img').attr('src'), 
				title = $(this).find('img').attr('title'), 
				src2 = src.replace(/_s.jpg/g, '.jpg');
			
			
			$(this).removeAttr('href');
			
			
			$(this).attr( { 
				href : src2, 
				title : title, 
				'class' : 'jackbox', 
				'data-group' : 'flickr_gal' 
			} );
		} ); // Flickr Widget Lightbox
		
		
		$('.gallery.gallery-size-thumbnail').each(function () { 
			var galid = $(this).attr('id');
			
			
			$(this).find('a').attr( { 
				title : '', 
				'class' : 'jackbox', 
				'data-group' : 'wp_gal_' + galid 
			} );
		} ); // Wordpress Default Gallery Shortcode Lightbox
	} )(jQuery);
	
	
	
		/* Popular, Latest and Related Posts */
	(function ($) { 
		$('.related_posts > ul li').click(function (g) { 
			var rposts = $(this).closest('.related_posts'), 
				index = $(this).closest('li').index();
			
			rposts.find('ul > li').removeClass('current');
			$(this).addClass('current');
			
			rposts.find('.related_posts_content').find('div.related_posts_content_tab').not('div.related_posts_content_tab:eq(' + index + ')').slideUp();
			rposts.find('.related_posts_content').find('div.related_posts_content_tab:eq(' + index + ')').slideDown();
			
			g.preventDefault();
		} );
	} )(jQuery);
	
	
	
	/* Toggle */
	(function ($) { 
		$('.togg a.tog').click(function (i) { 
			var dropDown = $(this).closest('.togg').find('.tab_content');
			
			if ($(this).hasClass('current')) { 
				$(this).removeClass('current');
			} else { 
				$(this).addClass('current');
			}
			
			dropDown.stop(false, true).slideToggle();
			
			i.preventDefault();
		} );
	} )(jQuery);
	
	
	
	/* Accordion */
	(function ($) { 
		$('.accordion > .acc:eq(0) a.tog').addClass('current').next().slideDown();
	
		$('.accordion a.tog').click(function (j) { 
			var dropDown = $(this).closest('.acc').find('.tab_content');
			
			$(this).closest('.accordion').find('.tab_content').not(dropDown).slideUp();
			
			if ($(this).hasClass('current')) { 
				$(this).removeClass('current');
			} else { 
				$(this).closest('.accordion').find('.tog.current').removeClass('current');
				$(this).addClass('current');
			}
			
			dropDown.stop(false, true).slideToggle();
			
			j.preventDefault();
		} );
	} )(jQuery);
	
	
	
	/* Tabs */
	(function ($) { 
		$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
		
		$('.tab ul.tabs li a').click(function (g) { 
			var tab = $(this).closest('.tab'), 
				index = $(this).closest('li').index();
			
			tab.find('ul.tabs > li').removeClass('current');
			$(this).closest('li').addClass('current');
			
			tab.find('.tab_content').find('div.tabs_tab').not('div.tabs_tab:eq(' + index + ')').slideUp();
			tab.find('.tab_content').find('div.tabs_tab:eq(' + index + ')').slideDown();
			
			g.preventDefault();
		} );
	} )(jQuery);
	
	
	
	/* Tour */
	(function ($) { 
		$('.tour_content ul.tour').addClass('active').find('> li:eq(0)').addClass('current');
		
		$('.tour_content ul.tour li a').click(function (f) { 
			var tour = $(this).closest('.tour_content'), 
				index = $(this).closest('li').index();
			
			tour.find('ul.tour > li').removeClass('current');
			$(this).closest('li').addClass('current');
			
			tour.find('div.tour_box_content').find('div.tour_box').not('div.tour_box:eq(' + index + ')').slideUp();
			tour.find('div.tour_box_content').find('div.tour_box:eq(' + index + ')').slideDown();
			
			f.preventDefault();
		} );
	} )(jQuery);
	
	
	
	/* Start Image Preloader Function */
	(function ($) { 
		var images = $('.preloader img'), 
			max = images.length, 
			img = new Image(), 
			curr = 1;
		
		$('.preloader').each(function () { 
			$('<span class="image_container_img" />').prependTo($(this));
			
			if ( 
				($('#middle .s_sort_block').find('.s_options_block').html() !== null && checker.ua.opera) || 
				($('#middle .s_sort_block').find('.s_options_block').html() !== null && checker.os.android) 
			) {
				$(this).find('img').closest('figure').css( { 
					backgroundImage : 'url(' + $(this).find('img').attr('src') + ')' 
				} );
			}
		} );
		
		images.remove();
		
		if (max > 0) {
			loadImage(0, max);
		} else if ($('#middle .s_sort').find('.p_options_block').html() !== null) {
			loadSorting();
		}
		
		function loadImage(index, max) { 
			if (index < max) {
				$('<span id="img' + (index + 1) + '" class="p_img_container" />').each(function () { 
					$(this).prependTo($('.preloader .image_container_img').eq(index));
				} );
				
				var img = new Image(), 
					curr = $('#img' + (index + 1));
				
				$(img).load(function () { 
					$(curr).append(this).append('<span class="image_rollover" />');
					
					$(this).parent().parent().parent().css( { 
						backgroundImage : 'none' 
					} );
					
					$(this).animate( { 
						opacity : 1 
					}, 500, 'easeInOutExpo', function () { 
						if ($(this).parent().parent().parent().hasClass('highImg')) {
							$(this).parent().parent().parent().css( { 
								height : 'auto', 
								padding : 0 
							} );
						}
					} );
					
					if (index !== (max - 1)) {
						loadImage(index + 1, max);
					}
				} ).error(function () { 
					$(curr).remove();
					
					loadImage((index + 1), max);
				} ).attr( { 
					src : $(images[index]).attr('src'), 
					title : $(images[index]).attr('title'), 
					alt : $(images[index]).attr('alt') 
				} ).addClass($(images[index]).attr('class'));
				
				if (index === (max - 1) && $('#middle').hasClass('services_page')) {
					if ($('#middle.services_page .s_sort_block').find('.s_options_block').html() !== null) {
						loadSorting();
					}
				}
			}
		}
		
		/* Services Sorting Show */
		function loadSorting() { 
			if ($.browser.msie && $.browser.version < 9) {
				$('.s_options_loader').css( { 
					display : 'none' 
				} );
				
				$('.s_options_block').css( { 
					display : 'block' 
				} );
			} else {
				$('.s_options_loader').fadeOut(500, function () { 
					$(this).css( { 
						display : 'none' 
					} );
					
					$('.s_options_block').fadeIn(200);
				} );
			}
		}
	} )(jQuery);
} );


/* Like Button */
function cmsmsLike(postId) { 
	if (postId !== '') { 
		var likeButton = jQuery('#cmsmsLike-' + postId);
		
		likeButton.find('span.cmsms_like_inner').text('...');
		
		jQuery.post(templateURL + '/framework/class/like.php', { 
				id : postId 
			}, 
			function (data) { 
				likeButton.find('span.cmsms_like_inner').text(data); 
				likeButton.addClass('active');
				
				likeButton.attr( { 
					onclick : 'return false;' 
				} );
			} 
		);
	}
	
	return false;
}


/* Services, add link click for mobile devices */
	(function ($) { 
		$('.touch .service').one('click', function(event) {
			event.preventDefault();
		 	$('*:not(this)').removeClass('cmsms_mobile_hover');
			$(this).addClass('cmsms_mobile_hover');
		});
	} )(jQuery);


/* Comment Form Submit */
function submitform() { 
    document.forms['commentform'].submit();
    
    return false;
}



/* Correct OS & Browser Check */
var ua = navigator.userAgent, 
	checker = { 
		os : { 
			iphone : ua.match(/iPhone/), 
			ipod : ua.match(/iPod/), 
			ipad : ua.match(/iPad/), 
			blackberry : ua.match(/BlackBerry/), 
			android : ua.match(/(Android|Linux armv6l|Linux armv7l)/), 
			linux : ua.match(/Linux/), 
			win : ua.match(/Windows/), 
			mac : ua.match(/Macintosh/) 
		}, 
		ua : { 
			ie : ua.match(/MSIE/), 
			ie6 : ua.match(/MSIE 6.0/), 
			ie7 : ua.match(/MSIE 7.0/), 
			ie8 : ua.match(/MSIE 8.0/), 
			ie9 : ua.match(/MSIE 9.0/), 
			ie10 : ua.match(/MSIE 10.0/), 
			opera : ua.match(/Opera/), 
			firefox : ua.match(/Firefox/), 
			chrome : ua.match(/Chrome/), 
			safari : ua.match(/(Safari|BlackBerry)/) 
		} 
	};



/* Correct Image Load Check */
function isImageOk(img) { 
	if (!img.complete) { 
		return false;
	}
	
	if (typeof img.naturalWidth !== undefined && img.naturalWidth === 0) { 
		return 'stop';
	}
	
	return true;
}



/* Convert Touch Events to Mouse Events Function */
function touchHandler(e) { 
    var first = e.changedTouches[0], 
        type = '', 
		simulatedEvent = undefined;
	
	switch (e.type) { 
        case 'touchstart': 
			type = 'mousedown';
			
			break;
        case 'touchmove': 
			type = 'mousemove';
			
			break;
        case 'touchend': 
			type = 'mouseup';
			
			break;
        case 'touchcancel': 
			type = 'mouseleave';
			
			break;
        default: 
			return;
    }
	
    simulatedEvent = document.createEvent('MouseEvent');
    simulatedEvent.initMouseEvent( 
		type, 
		true, 
		true, 
		window, 
		1, 
		first.screenX, 
		first.screenY, 
		first.clientX, 
		first.clientY, 
		false, 
		false, 
		false, 
		false, 
		0, 
		null 
	);
	
	first.target.dispatchEvent(simulatedEvent);
	
	e.preventDefault();
}

/* Sliders Touch Events Convert Run */
(function ($) { 
	if (!checker.ua.ie6 && !checker.ua.ie7 && !checker.ua.ie8) { 
		document.addEventListener('touchstart', function (e) { 
			if ( 
				$(e.changedTouches[0].target).parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().parent().parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().parent().parent().parent().is('li.cmsmsContentSlide.active') 
			) { 
				touchHandler(e);
			}
		}, true);
		
		document.addEventListener('touchmove', function (e) { 
			if (  
				$(e.changedTouches[0].target).parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().parent().parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().parent().parent().parent().is('li.cmsmsContentSlide.active') 
			) { 
				touchHandler(e);
			}
		}, true);
		
		document.addEventListener('touchend', function (e) { 
			if ( 
				$(e.changedTouches[0].target).parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().parent().parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().parent().parent().parent().is('li.cmsmsContentSlide.active') 
			) { 
				touchHandler(e);
			}
		}, true);
		
		document.addEventListener('touchcancel', function (e) { 
			if (  
				$(e.changedTouches[0].target).parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().parent().parent().is('li.cmsmsContentSlide.active') || 
				$(e.changedTouches[0].target).parent().parent().parent().parent().parent().is('li.cmsmsContentSlide.active') 
			) { 
				touchHandler(e);
			}
		}, true);
	}
} )(jQuery);



(function ($) { 
	$(function() {
		$('.services > article, .type_services article').each( function() { $(this).hoverdir(); } );
	});
} )(jQuery);


(function( $, undefined ) {
		
	/*
	 * HoverDir object.
	 */
	$.HoverDir 				= function( options, element ) {
	
		this.$el	= $( element );
		
		this._init( options );
		
	};
	
	$.HoverDir.defaults 	= {
		hoverDelay	: 0,
		reverse		: false
	};
	
	$.HoverDir.prototype 	= {
		_init 				: function( options ) {
			
			this.options 		= $.extend( true, {}, $.HoverDir.defaults, options );
			
			// load the events
			this._loadEvents();
			
		},
		_loadEvents			: function() {
			
			var _self = this;
			
			this.$el.on( 'mouseenter.hoverdir, mouseleave.hoverdir', function( event ) {
				
				var $el			= $(this),
					evType		= event.type,
					$hoverElem	= $el.find( '.services_rollover' ),
					direction	= _self._getDir( $el, { x : event.pageX, y : event.pageY } ),
					cssPos    =   _self._getPosition( direction, $el );
				
				
				if( evType === 'mouseenter' ) {
					
					$hoverElem.css( { "left" : cssPos.from, "top" : cssPos.to } );
					
					clearTimeout( _self.tmhover );
					
					_self.tmhover	= setTimeout( function() {
						
						$hoverElem.show( 0, function() {
							$(this).stop().animate( { "top" : 0, "left" : 0 } , 300 );
						} );
						
					
					}, _self.options.hoverDelay );
					
				}
				else {
				
					$hoverElem.stop().animate( { "left" : cssPos.from, "top" : cssPos.to }, 300, function(){
                                            $hoverElem.hide();
                                        } );
					
					clearTimeout( _self.tmhover );
					
				}
					
			} );
			
		},
		_getDir				: function( $el, coordinates ) {
			
				/** the width and height of the current div **/
			var w = $el.width(),
				h = $el.height(),

				/** calculate the x and y to get an angle to the center of the div from that x and y. **/
				/** gets the x value relative to the center of the DIV and "normalize" it **/
				x = ( coordinates.x - $el.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
				y = ( coordinates.y - $el.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),
			
				/** the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);**/
				/** first calculate the angle of the point, 
				add 180 deg to get rid of the negative values
				divide by 90 to get the quadrant
				add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
				direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 )  % 4;
			
			return direction;
			
		},
		_getPosition			: function( direction, $el ) {
			
			var fromLeft, fromTop;
			
			switch( direction ) {
				case 0:
					// from top
					if ( !this.options.reverse ) { fromLeft = 0, fromTop = - $el.height() }
                                        else {  fromLeft = 0, fromTop = - $el.height()  }
					
					break;
				case 1:
					// from right
					if ( !this.options.reverse ) { fromLeft = $el.width()  , fromTop = 0}
                                        else {  fromLeft = - $el.width() , fromTop = 0 }
					break;
				case 2:
					// from bottom
					if ( !this.options.reverse ) { fromLeft = 0 , fromTop = $el.height() }
                                        else {  fromLeft = 0, fromTop = - $el.height()  }
					break;
				case 3:
					// from left
					if ( !this.options.reverse ) {fromLeft = -$el.width()  , fromTop = 0}
                                        else {  fromLeft =  $el.width(), fromTop = 0 }
					break;
			};
			
			return { from : fromLeft, to: fromTop };
					
		}
	};
	
	var logError 			= function( message ) {
		if ( this.console ) {
			console.error( message );
		}
	};
	
	$.fn.hoverdir			= function( options ) {
	
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				var instance = $.data( this, 'hoverdir' );
				
				if ( !instance ) {
					logError( "cannot call methods on hoverdir prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for hoverdir instance" );
					return;
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
			
				var instance = $.data( this, 'hoverdir' );
				if ( !instance ) {
					$.data( this, 'hoverdir', new $.HoverDir( options, this ) );
				}
			});
		
		}
		
		return this;
		
	};
	
})( jQuery );


// Generated by CoffeeScript 1.6.3
/*
Easy pie chart is a jquery plugin to display simple animated pie charts for only one value

Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.

Built on top of the jQuery library (http://jquery.com)

@source: http://github.com/rendro/easy-pie-chart/
@autor: Robert Fleischmann
@version: 1.2.5

Inspired by: http://dribbble.com/shots/631074-Simple-Pie-Charts-II?list=popular&offset=210
Thanks to Philip Thrasher for the jquery plugin boilerplate for coffee script
*/

(function($) {
  $.easyPieChart = function(el, options) {
    var addScaleLine, animateLine, drawLine, easeInOutQuad, rAF, renderBackground, renderScale, renderTrack,
      _this = this;
    this.el = el;
    this.$el = $(el);
    this.$el.data("easyPieChart", this);
    this.init = function() {
      var percent, scaleBy;
      _this.options = $.extend({}, $.easyPieChart.defaultOptions, options);
      percent = parseInt(_this.$el.data('percent'), 10);
      _this.percentage = 0;
      _this.canvas = $("<canvas width='" + _this.options.size + "' height='" + _this.options.size + "'></canvas>").get(0);
      _this.$el.append(_this.canvas);
      if (typeof G_vmlCanvasManager !== "undefined" && G_vmlCanvasManager !== null) {
        G_vmlCanvasManager.initElement(_this.canvas);
      }
      _this.ctx = _this.canvas.getContext('2d');
      if (window.devicePixelRatio > 1) {
        scaleBy = window.devicePixelRatio;
        $(_this.canvas).css({
          width: _this.options.size,
          height: _this.options.size
        });
        _this.canvas.width *= scaleBy;
        _this.canvas.height *= scaleBy;
        _this.ctx.scale(scaleBy, scaleBy);
      }
      _this.ctx.translate(_this.options.size / 2, _this.options.size / 2);
      _this.ctx.rotate(_this.options.rotate * Math.PI / 180);
      _this.$el.addClass('easyPieChart');
      _this.$el.css({
        width: _this.options.size,
        height: _this.options.size,
        lineHeight: "" + _this.options.size + "px"
      });
      _this.update(percent);
      return _this;
    };
    this.update = function(percent) {
      percent = parseFloat(percent) || 0;
      if (_this.options.animate === false) {
        drawLine(percent);
      } else {
        if (_this.options.delay) {
          animateLine(_this.percentage, 0);
          setTimeout(function() {
            return animateLine(_this.percentage, percent);
          }, _this.options.delay);
        } else {
          animateLine(_this.percentage, percent);
        }
      }
      return _this;
    };
    renderScale = function() {
      var i, _i, _results;
      _this.ctx.fillStyle = _this.options.scaleColor;
      _this.ctx.lineWidth = 1;
      _results = [];
      for (i = _i = 0; _i <= 24; i = ++_i) {
        _results.push(addScaleLine(i));
      }
      return _results;
    };
    addScaleLine = function(i) {
      var offset;
      offset = i % 6 === 0 ? 0 : _this.options.size * 0.017;
      _this.ctx.save();
      _this.ctx.rotate(i * Math.PI / 12);
      _this.ctx.fillRect(_this.options.size / 2 - offset, 0, -_this.options.size * 0.05 + offset, 1);
      _this.ctx.restore();
    };
    renderTrack = function() {
      var offset;
      offset = _this.options.size / 2 - _this.options.lineWidth / 2;
      if (_this.options.scaleColor !== false) {
        offset -= _this.options.size * 0.08;
      }
      _this.ctx.beginPath();
      _this.ctx.arc(0, 0, offset, 0, Math.PI * 2, true);
      _this.ctx.closePath();
      _this.ctx.strokeStyle = _this.options.trackColor;
      _this.ctx.lineWidth = _this.options.lineWidth;
      _this.ctx.stroke();
    };
    renderBackground = function() {
      if (_this.options.scaleColor !== false) {
        renderScale();
      }
      if (_this.options.trackColor !== false) {
        renderTrack();
      }
    };
    drawLine = function(percent) {
      var offset;
      renderBackground();
      _this.ctx.strokeStyle = $.isFunction(_this.options.barColor) ? _this.options.barColor(percent) : _this.options.barColor;
      _this.ctx.lineCap = _this.options.lineCap;
      _this.ctx.lineWidth = _this.options.lineWidth;
      offset = _this.options.size / 2 - _this.options.lineWidth / 2;
      if (_this.options.scaleColor !== false) {
        offset -= _this.options.size * 0.08;
      }
      _this.ctx.save();
      _this.ctx.rotate(-Math.PI / 2);
      _this.ctx.beginPath();
      _this.ctx.arc(0, 0, offset, 0, Math.PI * 2 * percent / 100, false);
      _this.ctx.stroke();
      _this.ctx.restore();
    };
    rAF = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    })();
    animateLine = function(from, to) {
      var anim, startTime;
      _this.options.onStart.call(_this);
      _this.percentage = to;
      Date.now || (Date.now = function() {
        return +(new Date);
      });
      startTime = Date.now();
      anim = function() {
        var currentValue, process;
        process = Math.min(Date.now() - startTime, _this.options.animate);
        _this.ctx.clearRect(-_this.options.size / 2, -_this.options.size / 2, _this.options.size, _this.options.size);
        renderBackground.call(_this);
        currentValue = [easeInOutQuad(process, from, to - from, _this.options.animate)];
        _this.options.onStep.call(_this, currentValue);
        drawLine.call(_this, currentValue);
        if (process >= _this.options.animate) {
          return _this.options.onStop.call(_this, currentValue, to);
        } else {
          return rAF(anim);
        }
      };
      rAF(anim);
    };
    easeInOutQuad = function(t, b, c, d) {
      var easeIn, easing;
      easeIn = function(t) {
        return Math.pow(t, 2);
      };
      easing = function(t) {
        if (t < 1) {
          return easeIn(t);
        } else {
          return 2 - easeIn((t / 2) * -2 + 2);
        }
      };
      t /= d / 2;
      return c / 2 * easing(t) + b;
    };
    return this.init();
  };
  $.easyPieChart.defaultOptions = {
    barColor: '#ef1e25',
    trackColor: '#f2f2f2',
    scaleColor: '#dfe0e0',
    lineCap: 'round',
    rotate: 0,
    size: 150,
    lineWidth: 3,
    animate: false,
    delay: false,
    onStart: $.noop,
    onStop: $.noop,
    onStep: $.noop
  };
  $.fn.easyPieChart = function(options) {
    return $.each(this, function(i, el) {
      var $el, instanceOptions;
      $el = $(el);
      if (!$el.data('easyPieChart')) {
        instanceOptions = $.extend({}, options, $el.data());
        return $el.data('easyPieChart', new $.easyPieChart(el, instanceOptions));
      }
    });
  };
  return void 0;
})(jQuery);