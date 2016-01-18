(function(){$.widget("primeui.puiinputtext",{_create:function(){var d=this.element,c=d.prop("disabled");
d.addClass("pui-inputtext ui-widget ui-state-default ui-corner-all");
if(c){d.addClass("ui-state-disabled")
}else{this._enableMouseEffects()
}d.attr("role","textbox").attr("aria-disabled",c).attr("aria-readonly",d.prop("readonly")).attr("aria-multiline",d.is("textarea"))
},_destroy:function(){},_enableMouseEffects:function(){var b=this.element;
b.hover(function(){b.toggleClass("ui-state-hover")
}).focus(function(){b.addClass("ui-state-focus")
}).blur(function(){b.removeClass("ui-state-focus")
})
},_disableMouseEffects:function(){var b=this.element;
b.off("mouseenter mouseleave focus blur")
},disable:function(){this.element.prop("disabled",true);
this.element.attr("aria-disabled",true);
this.element.addClass("ui-state-disabled");
this.element.removeClass("ui-state-focus ui-state-hover");
this._disableMouseEffects()
},enable:function(){this.element.prop("disabled",false);
this.element.attr("aria-disabled",false);
this.element.removeClass("ui-state-disabled");
this._enableMouseEffects()
}})
})();