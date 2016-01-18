(function(){$.widget("primeui.puifieldset",{options:{toggleable:false,toggleDuration:"normal",collapsed:false},_create:function(){this.element.addClass("pui-fieldset ui-widget ui-widget-content ui-corner-all").children("legend").addClass("pui-fieldset-legend ui-corner-all ui-state-default");
this.element.contents().wrapAll('<div class="pui-fieldset-content" />');
this.content=this.element.children("div.pui-fieldset-content");
this.legend=this.content.children("legend.pui-fieldset-legend");
this.legend.prependTo(this.element);
if(this.options.toggleable){this.element.addClass("pui-fieldset-toggleable");
this.toggler=$('<span class="pui-fieldset-toggler fa fa-fw" />').prependTo(this.legend);
this._bindEvents();
if(this.options.collapsed){this.content.hide();
this.toggler.addClass("fa-plus")
}else{this.toggler.addClass("fa-minus")
}}},_bindEvents:function(){var b=this;
this.legend.on("click.puifieldset",function(a){b.toggle(a)
}).on("mouseover.puifieldset",function(){b.legend.addClass("ui-state-hover")
}).on("mouseout.puifieldset",function(){b.legend.removeClass("ui-state-hover ui-state-active")
}).on("mousedown.puifieldset",function(){b.legend.removeClass("ui-state-hover").addClass("ui-state-active")
}).on("mouseup.puifieldset",function(){b.legend.removeClass("ui-state-active").addClass("ui-state-hover")
})
},toggle:function(c){var d=this;
this._trigger("beforeToggle",c);
if(this.options.collapsed){this.toggler.removeClass("fa-plus").addClass("fa-minus")
}else{this.toggler.removeClass("fa-minus").addClass("fa-plus")
}this.content.slideToggle(this.options.toggleSpeed,"easeInOutCirc",function(){d._trigger("afterToggle",c);
d.options.collapsed=!d.options.collapsed
})
}})
})();