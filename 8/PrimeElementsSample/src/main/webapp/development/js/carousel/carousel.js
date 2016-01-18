(function(){$.widget("primeui.puicarousel",{options:{datasource:null,numVisible:3,firstVisible:0,headerText:null,effectDuration:500,circular:false,breakpoint:560,itemContent:null,responsive:true,autoplayInterval:0,easing:"easeInOutCirc",pageLinks:3,styleClass:null,template:null},_create:function(){this.id=this.element.attr("id");
if(!this.id){this.id=this.element.uniqueId().attr("id")
}this.element.wrap('<div class="pui-carousel ui-widget ui-widget-content ui-corner-all"><div class="pui-carousel-viewport"></div></div>');
this.container=this.element.parent().parent();
this.element.addClass("pui-carousel-items");
this.container.prepend('<div class="pui-carousel-header ui-widget-header"><div class="pui-carousel-header-title"></div></div>');
this.viewport=this.element.parent();
this.header=this.container.children(".pui-carousel-header");
this.header.append('<span class="pui-carousel-button pui-carousel-next-button fa fa-arrow-circle-right"></span><span class="pui-carousel-button pui-carousel-prev-button fa fa-arrow-circle-left"></span>');
if(this.options.headerText){this.header.children(".pui-carousel-header-title").html(this.options.headerText)
}if(this.options.styleClass){this.container.addClass(this.options.styleClass)
}if(this.options.datasource){this._loadData()
}else{this._render()
}},_loadData:function(){if($.isArray(this.options.datasource)){this._render(this.options.datasource)
}else{if($.type(this.options.datasource)==="function"){this.options.datasource.call(this,this._render)
}}},_updateDatasource:function(b){this.options.datasource=b;
this.element.children().remove();
this.header.children(".pui-carousel-page-links").remove();
this.header.children("select").remove();
this._loadData()
},_render:function(d){this.data=d;
if(this.data){for(var e=0;
e<d.length;
e++){var f=this._createItemContent(d[e]);
if($.type(f)==="string"){this.element.append("<li>"+f+"</li>")
}else{this.element.append($("<li></li>").wrapInner(f))
}}}this.items=this.element.children("li");
this.items.addClass("pui-carousel-item ui-widget-content ui-corner-all");
this.itemsCount=this.items.length;
this.columns=this.options.numVisible;
this.first=this.options.firstVisible;
this.page=parseInt(this.first/this.columns);
this.totalPages=Math.ceil(this.itemsCount/this.options.numVisible);
this._renderPageLinks();
this.prevNav=this.header.children(".pui-carousel-prev-button");
this.nextNav=this.header.children(".pui-carousel-next-button");
this.pageLinks=this.header.find("> .pui-carousel-page-links > .pui-carousel-page-link");
this.dropdown=this.header.children(".pui-carousel-dropdown");
this.mobileDropdown=this.header.children(".pui-carousel-mobiledropdown");
this._bindEvents();
if(this.options.responsive){this.refreshDimensions()
}else{this.calculateItemWidths();
this.container.width(this.container.width());
this.updateNavigators()
}},_renderPageLinks:function(){if(this.totalPages<=this.options.pageLinks){this.pageLinksContainer=$('<div class="pui-carousel-page-links"></div>');
for(var c=0;
c<this.totalPages;
c++){this.pageLinksContainer.append('<a href="#" class="pui-carousel-page-link fa fa-circle-o"></a>')
}this.header.append(this.pageLinksContainer)
}else{this.dropdown=$('<select class="pui-carousel-dropdown ui-widget ui-state-default ui-corner-left"></select>');
for(var c=0;
c<this.totalPages;
c++){var d=(c+1);
this.dropdown.append('<option value="'+d+'">'+d+"</option>")
}this.header.append(this.dropdown)
}if(this.options.responsive){this.mobileDropdown=$('<select class="pui-carousel-mobiledropdown ui-widget ui-state-default ui-corner-left"></select>');
for(var c=0;
c<this.itemsCount;
c++){var d=(c+1);
this.mobileDropdown.append('<option value="'+d+'">'+d+"</option>")
}this.header.append(this.mobileDropdown)
}},calculateItemWidths:function(){var c=this.items.eq(0);
if(c.length){var d=c.outerWidth(true)-c.width();
this.items.width((this.viewport.innerWidth()-d*this.columns)/this.columns)
}},refreshDimensions:function(){var b=$(window);
if(b.width()<=this.options.breakpoint){this.columns=1;
this.calculateItemWidths(this.columns);
this.totalPages=this.itemsCount;
this.mobileDropdown.show();
this.pageLinks.hide()
}else{this.columns=this.options.numVisible;
this.calculateItemWidths();
this.totalPages=Math.ceil(this.itemsCount/this.options.numVisible);
this.mobileDropdown.hide();
this.pageLinks.show()
}this.page=parseInt(this.first/this.columns);
this.updateNavigators();
this.element.css("left",(-1*(this.viewport.innerWidth()*this.page)))
},_bindEvents:function(){var c=this;
if(this.eventsBound){return
}this.prevNav.on("click.puicarousel",function(){if(c.page!==0){c.setPage(c.page-1)
}else{if(c.options.circular){c.setPage(c.totalPages-1)
}}});
this.nextNav.on("click.puicarousel",function(){var a=(c.page===(c.totalPages-1));
if(!a){c.setPage(c.page+1)
}else{if(c.options.circular){c.setPage(0)
}}});
this.element.swipe({swipe:function(b,a){if(a==="left"){if(c.page===(c.totalPages-1)){if(c.options.circular){c.setPage(0)
}}else{c.setPage(c.page+1)
}}else{if(a==="right"){if(c.page===0){if(c.options.circular){c.setPage(c.totalPages-1)
}}else{c.setPage(c.page-1)
}}}}});
if(this.pageLinks.length){this.pageLinks.on("click",function(a){c.setPage($(this).index());
a.preventDefault()
})
}this.header.children("select").on("change",function(){c.setPage(parseInt($(this).val())-1)
});
if(this.options.autoplayInterval){this.options.circular=true;
this.startAutoplay()
}if(this.options.responsive){var d="resize."+this.id;
$(window).off(d).on(d,function(){c.refreshDimensions()
})
}this.eventsBound=true
},updateNavigators:function(){if(!this.options.circular){if(this.page===0){this.prevNav.addClass("ui-state-disabled");
this.nextNav.removeClass("ui-state-disabled")
}else{if(this.page===(this.totalPages-1)){this.prevNav.removeClass("ui-state-disabled");
this.nextNav.addClass("ui-state-disabled")
}else{this.prevNav.removeClass("ui-state-disabled");
this.nextNav.removeClass("ui-state-disabled")
}}}if(this.pageLinks.length){this.pageLinks.filter(".fa-dot-circle-o").removeClass("fa-dot-circle-o");
this.pageLinks.eq(this.page).addClass("fa-dot-circle-o")
}if(this.dropdown.length){this.dropdown.val(this.page+1)
}if(this.mobileDropdown.length){this.mobileDropdown.val(this.page+1)
}},setPage:function(c){if(c!==this.page&&!this.element.is(":animated")){var d=this;
this.element.animate({left:-1*(this.viewport.innerWidth()*c),easing:this.options.easing},{duration:this.options.effectDuration,easing:this.options.easing,complete:function(){d.page=c;
d.first=d.page*d.columns;
d.updateNavigators();
d._trigger("pageChange",null,{page:c})
}})
}},startAutoplay:function(){var b=this;
this.interval=setInterval(function(){if(b.page===(b.totalPages-1)){b.setPage(0)
}else{b.setPage(b.page+1)
}},this.options.autoplayInterval)
},stopAutoplay:function(){clearInterval(this.interval)
},_setOption:function(d,c){if(d==="datasource"){this._updateDatasource(c)
}else{$.Widget.prototype._setOption.apply(this,arguments)
}},_createItemContent:function(c){if(this.options.template){var d=this.options.template.html();
Mustache.parse(d);
return Mustache.render(d,c)
}else{return this.options.itemContent.call(this,c)
}}})
})();