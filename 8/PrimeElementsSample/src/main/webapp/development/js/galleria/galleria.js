(function(){$.widget("primeui.puigalleria",{options:{panelWidth:600,panelHeight:400,frameWidth:60,frameHeight:40,activeIndex:0,showFilmstrip:true,autoPlay:true,transitionInterval:4000,effect:"fade",effectSpeed:250,effectOptions:{},showCaption:true,customContent:false},_create:function(){this.element.addClass("pui-galleria ui-widget ui-widget-content ui-corner-all");
this.panelWrapper=this.element.children("ul");
this.panelWrapper.addClass("pui-galleria-panel-wrapper");
this.panels=this.panelWrapper.children("li");
this.panels.addClass("pui-galleria-panel ui-helper-hidden");
this.element.width(this.options.panelWidth);
this.panelWrapper.width(this.options.panelWidth).height(this.options.panelHeight);
this.panels.width(this.options.panelWidth).height(this.options.panelHeight);
if(this.options.showFilmstrip){this._renderStrip();
this._bindEvents()
}if(this.options.customContent){this.panels.children("img").remove();
this.panels.children("div").addClass("pui-galleria-panel-content")
}var b=this.panels.eq(this.options.activeIndex);
b.removeClass("ui-helper-hidden");
if(this.options.showCaption){this._showCaption(b)
}this.element.css("visibility","visible");
if(this.options.autoPlay){this.startSlideshow()
}},_renderStrip:function(){var g='style="width:'+this.options.frameWidth+"px;height:"+this.options.frameHeight+'px;"';
this.stripWrapper=$('<div class="pui-galleria-filmstrip-wrapper"></div>').width(this.element.width()-50).height(this.options.frameHeight).appendTo(this.element);
this.strip=$('<ul class="pui-galleria-filmstrip"></div>').appendTo(this.stripWrapper);
for(var j=0;
j<this.panels.length;
j++){var h=this.panels.eq(j).children("img"),f=(j==this.options.activeIndex)?"pui-galleria-frame pui-galleria-frame-active":"pui-galleria-frame",i='<li class="'+f+'" '+g+'><div class="pui-galleria-frame-content" '+g+'><img src="'+h.attr("src")+'" class="pui-galleria-frame-image" '+g+"/></div></li>";
this.strip.append(i)
}this.frames=this.strip.children("li.pui-galleria-frame");
this.element.append('<div class="pui-galleria-nav-prev fa fa-fw fa-chevron-circle-left" style="bottom:'+(this.options.frameHeight/2)+'px"></div><div class="pui-galleria-nav-next fa fa-fw fa-chevron-circle-right" style="bottom:'+(this.options.frameHeight/2)+'px"></div>');
if(this.options.showCaption){this.caption=$('<div class="pui-galleria-caption"></div>').css({bottom:this.stripWrapper.outerHeight()+10,width:this.panelWrapper.width()}).appendTo(this.element)
}},_bindEvents:function(){var b=this;
this.element.children("div.pui-galleria-nav-prev").on("click.puigalleria",function(){if(b.slideshowActive){b.stopSlideshow()
}if(!b.isAnimating()){b.prev()
}});
this.element.children("div.pui-galleria-nav-next").on("click.puigalleria",function(){if(b.slideshowActive){b.stopSlideshow()
}if(!b.isAnimating()){b.next()
}});
this.strip.children("li.pui-galleria-frame").on("click.puigalleria",function(){if(b.slideshowActive){b.stopSlideshow()
}b.select($(this).index(),false)
})
},startSlideshow:function(){var b=this;
this.interval=window.setInterval(function(){b.next()
},this.options.transitionInterval);
this.slideshowActive=true
},stopSlideshow:function(){window.clearInterval(this.interval);
this.slideshowActive=false
},isSlideshowActive:function(){return this.slideshowActive
},select:function(p,m){if(p!==this.options.activeIndex){if(this.options.showCaption){this._hideCaption()
}var v=this.panels.eq(this.options.activeIndex),u=this.panels.eq(p);
v.hide(this.options.effect,this.options.effectOptions,this.options.effectSpeed);
u.show(this.options.effect,this.options.effectOptions,this.options.effectSpeed);
if(this.options.showFilmstrip){var t=this.frames.eq(this.options.activeIndex),r=this.frames.eq(p);
t.removeClass("pui-galleria-frame-active").css("opacity","");
r.animate({opacity:1},this.options.effectSpeed,null,function(){$(this).addClass("pui-galleria-frame-active")
});
if((m===undefined||m===true)){var o=r.position().left,l=this.options.frameWidth+parseInt(r.css("margin-right"),10),n=this.strip.position().left,s=o+n,q=s+this.options.frameWidth;
if(q>this.stripWrapper.width()){this.strip.animate({left:"-="+l},this.options.effectSpeed,"easeInOutCirc")
}else{if(s<0){this.strip.animate({left:"+="+l},this.options.effectSpeed,"easeInOutCirc")
}}}}if(this.options.showCaption){this._showCaption(u)
}this.options.activeIndex=p
}},_hideCaption:function(){this.caption.slideUp(this.options.effectSpeed)
},_showCaption:function(d){var c=d.children("img");
this.caption.html("<h4>"+c.attr("title")+"</h4><p>"+c.attr("alt")+"</p>").slideDown(this.options.effectSpeed)
},prev:function(){if(this.options.activeIndex!==0){this.select(this.options.activeIndex-1)
}},next:function(){if(this.options.activeIndex!==(this.panels.length-1)){this.select(this.options.activeIndex+1)
}else{this.select(0,false);
this.strip.animate({left:0},this.options.effectSpeed,"easeInOutCirc")
}},isAnimating:function(){return this.strip.is(":animated")
}})
})();