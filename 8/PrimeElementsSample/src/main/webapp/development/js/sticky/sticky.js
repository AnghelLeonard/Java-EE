(function(){$.widget("primeui.puisticky",{_create:function(){this.initialState={top:this.element.offset().top,height:this.element.height()};
this.id=this.element.attr("id");
if(!this.id){this.id=this.element.uniqueId().attr("id")
}this._bindEvents()
},_bindEvents:function(){var g=this,h=$(window),e="scroll."+this.id,f="resize."+this.id;
h.off(e).on(e,function(){if(h.scrollTop()>g.initialState.top){g._fix()
}else{g._restore()
}}).off(f).on(f,function(){if(g.fixed){g.element.width(g.ghost.outerWidth()-(g.element.outerWidth()-g.element.width()))
}})
},_fix:function(){if(!this.fixed){this.element.css({position:"fixed",top:0,"z-index":10000}).addClass("pui-shadow pui-sticky");
this.ghost=$('<div class="pui-sticky-ghost"></div>').height(this.initialState.height).insertBefore(this.element);
this.element.width(this.ghost.outerWidth()-(this.element.outerWidth()-this.element.width()));
this.fixed=true
}},_restore:function(){if(this.fixed){this.element.css({position:"static",top:"auto",width:"auto"}).removeClass("pui-shadow pui-sticky");
this.ghost.remove();
this.fixed=false
}}})
})();