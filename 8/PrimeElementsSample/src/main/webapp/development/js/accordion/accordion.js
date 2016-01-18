(function(){$.widget("primeui.puiaccordion",{options:{activeIndex:0,multiple:false},_create:function(){if(this.options.multiple){this.options.activeIndex=[]
}var b=this;
this.element.addClass("pui-accordion ui-widget ui-helper-reset");
this.element.children("h3").addClass("pui-accordion-header ui-helper-reset ui-state-default").each(function(j){var g=$(this),h=g.html(),i=(j==b.options.activeIndex)?"ui-state-active ui-corner-top":"ui-corner-all",a=(j==b.options.activeIndex)?"pui-icon fa fa-fw fa-caret-down":"pui-icon fa fa-fw fa-caret-right";
g.addClass(i).html('<span class="'+a+'"></span><a href="#">'+h+"</a>")
});
this.element.children("div").each(function(a){var d=$(this);
d.addClass("pui-accordion-content ui-helper-reset ui-widget-content");
if(a!=b.options.activeIndex){d.addClass("ui-helper-hidden")
}});
this.headers=this.element.children(".pui-accordion-header");
this.panels=this.element.children(".pui-accordion-content");
this.headers.children("a").disableSelection();
this._bindEvents()
},_bindEvents:function(){var b=this;
this.headers.mouseover(function(){var a=$(this);
if(!a.hasClass("ui-state-active")&&!a.hasClass("ui-state-disabled")){a.addClass("ui-state-hover")
}}).mouseout(function(){var a=$(this);
if(!a.hasClass("ui-state-active")&&!a.hasClass("ui-state-disabled")){a.removeClass("ui-state-hover")
}}).click(function(e){var f=$(this);
if(!f.hasClass("ui-state-disabled")){var a=f.index()/2;
if(f.hasClass("ui-state-active")){b.unselect(a)
}else{b.select(a)
}}e.preventDefault()
})
},select:function(c){var d=this.panels.eq(c);
this._trigger("change",d);
if(this.options.multiple){this._addToSelection(c)
}else{this.options.activeIndex=c
}this._show(d)
},unselect:function(d){var e=this.panels.eq(d),f=e.prev();
f.attr("aria-expanded",false).children(".pui-icon").removeClass("fa-caret-down").addClass("fa-caret-right");
f.removeClass("ui-state-active ui-corner-top").addClass("ui-corner-all");
e.attr("aria-hidden",true).slideUp();
this._removeFromSelection(d)
},_show:function(d){if(!this.options.multiple){var f=this.headers.filter(".ui-state-active");
f.children(".pui-icon").removeClass("fa-caret-down").addClass("fa-caret-right");
f.attr("aria-expanded",false).removeClass("ui-state-active ui-corner-top").addClass("ui-corner-all").next().attr("aria-hidden",true).slideUp()
}var e=d.prev();
e.attr("aria-expanded",true).addClass("ui-state-active ui-corner-top").removeClass("ui-state-hover ui-corner-all").children(".pui-icon").removeClass("fa-caret-right").addClass("fa-caret-down");
d.attr("aria-hidden",false).slideDown("normal")
},_addToSelection:function(b){this.options.activeIndex.push(b)
},_removeFromSelection:function(b){this.options.activeIndex=$.grep(this.options.activeIndex,function(a){return a!=b
})
}})
})();