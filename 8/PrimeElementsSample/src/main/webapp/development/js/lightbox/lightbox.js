(function(){$.widget("primeui.puilightbox",{options:{iframeWidth:640,iframeHeight:480,iframe:false},_create:function(){this.options.mode=this.options.iframe?"iframe":(this.element.children("div").length==1)?"inline":"image";
var b='<div class="pui-lightbox ui-widget ui-helper-hidden ui-corner-all pui-shadow">';
b+='<div class="pui-lightbox-content-wrapper">';
b+='<a class="ui-state-default pui-lightbox-nav-left ui-corner-right ui-helper-hidden"><span class="fa fa-fw fa-caret-left"></span></a>';
b+='<div class="pui-lightbox-content ui-corner-all"></div>';
b+='<a class="ui-state-default pui-lightbox-nav-right ui-corner-left ui-helper-hidden"><span class="fa fa-fw fa-caret-right"></span></a>';
b+="</div>";
b+='<div class="pui-lightbox-caption ui-widget-header"><span class="pui-lightbox-caption-text"></span>';
b+='<a class="pui-lightbox-close ui-corner-all" href="#"><span class="fa fa-fw fa-close"></span></a><div style="clear:both" /></div>';
b+="</div>";
this.panel=$(b).appendTo(document.body);
this.contentWrapper=this.panel.children(".pui-lightbox-content-wrapper");
this.content=this.contentWrapper.children(".pui-lightbox-content");
this.caption=this.panel.children(".pui-lightbox-caption");
this.captionText=this.caption.children(".pui-lightbox-caption-text");
this.closeIcon=this.caption.children(".pui-lightbox-close");
if(this.options.mode==="image"){this._setupImaging()
}else{if(this.options.mode==="inline"){this._setupInline()
}else{if(this.options.mode==="iframe"){this._setupIframe()
}}}this._bindCommonEvents();
this.links.data("puilightbox-trigger",true).find("*").data("puilightbox-trigger",true);
this.closeIcon.data("puilightbox-trigger",true).find("*").data("puilightbox-trigger",true)
},_bindCommonEvents:function(){var b=this;
this.closeIcon.hover(function(){$(this).toggleClass("ui-state-hover")
}).click(function(a){b.hide();
a.preventDefault()
});
$(document.body).bind("click.pui-lightbox",function(f){if(b.isHidden()){return
}var a=$(f.target);
if(a.data("puilightbox-trigger")){return
}var e=b.panel.offset();
if(f.pageX<e.left||f.pageX>e.left+b.panel.width()||f.pageY<e.top||f.pageY>e.top+b.panel.height()){b.hide()
}});
$(window).resize(function(){if(!b.isHidden()){$(document.body).children(".ui-widget-overlay").css({width:$(document).width(),height:$(document).height()})
}})
},_setupImaging:function(){var b=this;
this.links=this.element.children("a");
this.content.append('<img class="ui-helper-hidden"></img>');
this.imageDisplay=this.content.children("img");
this.navigators=this.contentWrapper.children("a");
this.imageDisplay.load(function(){var e=$(this);
b._scaleImage(e);
var f=(b.panel.width()-e.width())/2,a=(b.panel.height()-e.height())/2;
b.content.removeClass("pui-lightbox-loading").animate({width:e.width(),height:e.height()},500,function(){e.fadeIn();
b._showNavigators();
b.caption.slideDown()
});
b.panel.animate({left:"+="+f,top:"+="+a},500)
});
this.navigators.hover(function(){$(this).toggleClass("ui-state-hover")
}).click(function(f){var e=$(this),a;
b._hideNavigators();
if(e.hasClass("pui-lightbox-nav-left")){a=b.current===0?b.links.length-1:b.current-1;
b.links.eq(a).trigger("click")
}else{a=b.current==b.links.length-1?0:b.current+1;
b.links.eq(a).trigger("click")
}f.preventDefault()
});
this.links.click(function(d){var a=$(this);
if(b.isHidden()){b.content.addClass("pui-lightbox-loading").width(32).height(32);
b.show()
}else{b.imageDisplay.fadeOut(function(){$(this).css({width:"auto",height:"auto"});
b.content.addClass("pui-lightbox-loading")
});
b.caption.slideUp()
}window.setTimeout(function(){b.imageDisplay.attr("src",a.attr("href"));
b.current=a.index();
var c=a.attr("title");
if(c){b.captionText.html(c)
}},1000);
d.preventDefault()
})
},_scaleImage:function(j){var k=$(window),n=k.width(),h=k.height(),m=j.width(),i=j.height(),l=i/m;
if(m>=n&&l<=1){m=n*0.75;
i=m*l
}else{if(i>=h){i=h*0.75;
m=i/l
}}j.css({width:m+"px",height:i+"px"})
},_setupInline:function(){this.links=this.element.children("a");
this.inline=this.element.children("div").addClass("pui-lightbox-inline");
this.inline.appendTo(this.content).show();
var b=this;
this.links.click(function(a){b.show();
var d=$(this).attr("title");
if(d){b.captionText.html(d);
b.caption.slideDown()
}a.preventDefault()
})
},_setupIframe:function(){var b=this;
this.links=this.element;
this.iframe=$('<iframe frameborder="0" style="width:'+this.options.iframeWidth+"px;height:"+this.options.iframeHeight+'px;border:0 none; display: block;"></iframe>').appendTo(this.content);
if(this.options.iframeTitle){this.iframe.attr("title",this.options.iframeTitle)
}this.element.click(function(a){if(!b.iframeLoaded){b.content.addClass("pui-lightbox-loading").css({width:b.options.iframeWidth,height:b.options.iframeHeight});
b.show();
b.iframe.on("load",function(){b.iframeLoaded=true;
b.content.removeClass("pui-lightbox-loading")
}).attr("src",b.element.attr("href"))
}else{b.show()
}var d=b.element.attr("title");
if(d){b.caption.html(d);
b.caption.slideDown()
}a.preventDefault()
})
},show:function(){this.center();
this.panel.css("z-index",++PUI.zindex).show();
if(!this.modality){this._enableModality()
}this._trigger("show")
},hide:function(){this.panel.fadeOut();
this._disableModality();
this.caption.hide();
if(this.options.mode==="image"){this.imageDisplay.hide().attr("src","").removeAttr("style");
this._hideNavigators()
}this._trigger("hide")
},center:function(){var f=$(window),d=(f.width()/2)-(this.panel.width()/2),e=(f.height()/2)-(this.panel.height()/2);
this.panel.css({left:d,top:e})
},_enableModality:function(){this.modality=$('<div class="ui-widget-overlay"></div>').css({width:$(document).width(),height:$(document).height(),"z-index":this.panel.css("z-index")-1}).appendTo(document.body)
},_disableModality:function(){this.modality.remove();
this.modality=null
},_showNavigators:function(){this.navigators.zIndex(this.imageDisplay.zIndex()+1).show()
},_hideNavigators:function(){this.navigators.hide()
},isHidden:function(){return this.panel.is(":hidden")
},showURL:function(b){if(b.width){this.iframe.attr("width",b.width)
}if(b.height){this.iframe.attr("height",b.height)
}this.iframe.attr("src",b.src);
this.show()
}})
})();