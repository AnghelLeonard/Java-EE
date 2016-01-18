(function(){$.widget("primeui.puitabview",{options:{activeIndex:0,orientation:"top"},_create:function(){var b=this.element;
b.addClass("pui-tabview ui-widget ui-widget-content ui-corner-all ui-hidden-container").children("ul").addClass("pui-tabview-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").children("li").addClass("ui-state-default ui-corner-top");
b.addClass("pui-tabview-"+this.options.orientation);
b.children("div").addClass("pui-tabview-panels").children().addClass("pui-tabview-panel ui-widget-content ui-corner-bottom");
b.find("> ul.pui-tabview-nav > li").eq(this.options.activeIndex).addClass("pui-tabview-selected ui-state-active");
b.find("> div.pui-tabview-panels > div.pui-tabview-panel:not(:eq("+this.options.activeIndex+"))").addClass("ui-helper-hidden");
this.navContainer=b.children(".pui-tabview-nav");
this.panelContainer=b.children(".pui-tabview-panels");
this._bindEvents()
},_bindEvents:function(){var b=this;
this.navContainer.children("li").on("mouseover.tabview",function(d){var a=$(this);
if(!a.hasClass("ui-state-disabled")&&!a.hasClass("ui-state-active")){a.addClass("ui-state-hover")
}}).on("mouseout.tabview",function(d){var a=$(this);
if(!a.hasClass("ui-state-disabled")&&!a.hasClass("ui-state-active")){a.removeClass("ui-state-hover")
}}).on("click.tabview",function(e){var f=$(this);
if($(e.target).is(":not(.fa-close)")){var a=f.index();
if(!f.hasClass("ui-state-disabled")&&a!=b.options.selected){b.select(a)
}}e.preventDefault()
});
this.navContainer.find("li .fa-close").on("click.tabview",function(d){var a=$(this).parent().index();
b.remove(a);
d.preventDefault()
})
},select:function(n){this.options.selected=n;
var h=this.panelContainer.children().eq(n),j=this.navContainer.children(),k=j.filter(".ui-state-active"),i=j.eq(h.index()),l=this.panelContainer.children(".pui-tabview-panel:visible"),m=this;
l.attr("aria-hidden",true);
k.attr("aria-expanded",false);
h.attr("aria-hidden",false);
i.attr("aria-expanded",true);
if(this.options.effect){l.hide(this.options.effect.name,null,this.options.effect.duration,function(){k.removeClass("pui-tabview-selected ui-state-active");
i.removeClass("ui-state-hover").addClass("pui-tabview-selected ui-state-active");
h.show(m.options.name,null,m.options.effect.duration,function(){m._trigger("change",null,{index:n})
})
})
}else{k.removeClass("pui-tabview-selected ui-state-active");
l.hide();
i.removeClass("ui-state-hover").addClass("pui-tabview-selected ui-state-active");
h.show();
m._trigger("change",null,{index:n})
}},remove:function(e){var g=this.navContainer.children().eq(e),f=this.panelContainer.children().eq(e);
this._trigger("close",null,{index:e});
g.remove();
f.remove();
if(e==this.options.selected){var h=this.options.selected==this.getLength()?this.options.selected-1:this.options.selected;
this.select(h)
}},getLength:function(){return this.navContainer.children().length
},getActiveIndex:function(){return this.options.selected
},_markAsLoaded:function(b){b.data("loaded",true)
},_isLoaded:function(b){return b.data("loaded")===true
},disable:function(b){this.navContainer.children().eq(b).addClass("ui-state-disabled")
},enable:function(b){this.navContainer.children().eq(b).removeClass("ui-state-disabled")
}})
})();