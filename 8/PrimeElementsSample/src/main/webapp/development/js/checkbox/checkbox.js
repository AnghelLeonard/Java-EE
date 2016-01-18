(function(){$.widget("primeui.puicheckbox",{_create:function(){this.element.wrap('<div class="pui-chkbox ui-widget"><div class="ui-helper-hidden-accessible"></div></div>');
this.container=this.element.parent().parent();
this.box=$('<div class="pui-chkbox-box ui-widget ui-corner-all ui-state-default">').appendTo(this.container);
this.icon=$('<span class="pui-chkbox-icon pui-c"></span>').appendTo(this.box);
this.disabled=this.element.prop("disabled");
this.label=$('label[for="'+this.element.attr("id")+'"]');
if(this.isChecked()){this.box.addClass("ui-state-active");
this.icon.addClass("fa fa-fw fa-check")
}if(this.disabled){this.box.addClass("ui-state-disabled")
}else{this._bindEvents()
}},_bindEvents:function(){var b=this;
this.box.on("mouseover.puicheckbox",function(){if(!b.isChecked()){b.box.addClass("ui-state-hover")
}}).on("mouseout.puicheckbox",function(){b.box.removeClass("ui-state-hover")
}).on("click.puicheckbox",function(){b.toggle()
});
this.element.focus(function(){if(b.isChecked()){b.box.removeClass("ui-state-active")
}b.box.addClass("ui-state-focus")
}).blur(function(){if(b.isChecked()){b.box.addClass("ui-state-active")
}b.box.removeClass("ui-state-focus")
}).keydown(function(d){var a=$.ui.keyCode;
if(d.which==a.SPACE){d.preventDefault()
}}).keyup(function(d){var a=$.ui.keyCode;
if(d.which==a.SPACE){b.toggle(true);
d.preventDefault()
}});
this.label.on("click.puicheckbox",function(a){b.toggle();
a.preventDefault()
})
},toggle:function(b){if(this.isChecked()){this.uncheck(b)
}else{this.check(b)
}this._trigger("change",null,this.isChecked())
},isChecked:function(){return this.element.prop("checked")
},check:function(c,d){if(!this.isChecked()){this.element.prop("checked",true);
this.icon.addClass("fa fa-fw fa-check");
if(!c){this.box.addClass("ui-state-active")
}if(!d){this.element.trigger("change")
}}},uncheck:function(){if(this.isChecked()){this.element.prop("checked",false);
this.box.removeClass("ui-state-active");
this.icon.removeClass("fa fa-fw fa-check");
this.element.trigger("change")
}},_unbindEvents:function(){this.box.off();
this.element.off("focus blur keydown keyup");
this.label.off()
},disable:function(){this.box.prop("disabled",true);
this.box.attr("aria-disabled",true);
this.box.addClass("ui-state-disabled").removeClass("ui-state-hover");
this._unbindEvents()
},enable:function(){this.box.prop("disabled",false);
this.box.attr("aria-disabled",false);
this.box.removeClass("ui-state-disabled");
this._bindEvents()
}})
})();