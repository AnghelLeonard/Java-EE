(function(){$.widget("primeui.puitooltip",{options:{showEvent:"mouseover",hideEvent:"mouseout",showEffect:"fade",hideEffect:null,showEffectSpeed:"normal",hideEffectSpeed:"normal",my:"left top",at:"right bottom",showDelay:150,content:null},_create:function(){this.options.showEvent=this.options.showEvent+".puitooltip";
this.options.hideEvent=this.options.hideEvent+".puitooltip";
if(this.element.get(0)===document){this._bindGlobal()
}else{this._bindTarget()
}},_bindGlobal:function(){this.container=$('<div class="pui-tooltip pui-tooltip-global ui-widget ui-widget-content ui-corner-all pui-shadow" />').appendTo(document.body);
this.globalSelector="a,:input,:button,img";
var c=this;
$(document).off(this.options.showEvent+" "+this.options.hideEvent,this.globalSelector).on(this.options.showEvent,this.globalSelector,null,function(){var b=$(this),a=b.attr("title");
if(a){c.container.text(a);
c.globalTitle=a;
c.target=b;
b.attr("title","");
c.show()
}}).on(this.options.hideEvent,this.globalSelector,null,function(){var a=$(this);
if(c.globalTitle){c.container.hide();
a.attr("title",c.globalTitle);
c.globalTitle=null;
c.target=null
}});
var d="resize.puitooltip";
$(window).unbind(d).bind(d,function(){if(c.container.is(":visible")){c._align()
}})
},_bindTarget:function(){this.container=$('<div class="pui-tooltip ui-widget ui-widget-content ui-corner-all pui-shadow" />').appendTo(document.body);
var c=this;
this.element.off(this.options.showEvent+" "+this.options.hideEvent).on(this.options.showEvent,function(){c.show()
}).on(this.options.hideEvent,function(){c.hide()
});
this.container.html(this.options.content);
this.element.removeAttr("title");
this.target=this.element;
var d="resize."+this.element.attr("id");
$(window).unbind(d).bind(d,function(){if(c.container.is(":visible")){c._align()
}})
},_align:function(){this.container.css({left:"",top:"","z-index":++PUI.zindex}).position({my:this.options.my,at:this.options.at,of:this.target})
},show:function(){var b=this;
this.timeout=window.setTimeout(function(){b._align();
b.container.show(b.options.showEffect,{},b.options.showEffectSpeed)
},this.options.showDelay)
},hide:function(){window.clearTimeout(this.timeout);
this.container.hide(this.options.hideEffect,{},this.options.hideEffectSpeed,function(){$(this).css("z-index","")
})
}})
})();