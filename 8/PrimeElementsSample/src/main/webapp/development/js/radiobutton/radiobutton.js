(function(){var b={};
$.widget("primeui.puiradiobutton",{_create:function(){this.element.wrap('<div class="pui-radiobutton ui-widget"><div class="ui-helper-hidden-accessible"></div></div>');
this.container=this.element.parent().parent();
this.box=$('<div class="pui-radiobutton-box ui-widget pui-radiobutton-relative ui-state-default">').appendTo(this.container);
this.icon=$('<span class="pui-radiobutton-icon pui-icon"></span>').appendTo(this.box);
this.disabled=this.element.prop("disabled");
this.label=$('label[for="'+this.element.attr("id")+'"]');
if(this.element.prop("checked")){this.box.addClass("ui-state-active");
this.icon.addClass("fa fa-fw fa-circle");
b[this.element.attr("name")]=this.box
}if(this.disabled){this.box.addClass("ui-state-disabled")
}else{this._bindEvents()
}},_bindEvents:function(){var a=this;
this.box.on("mouseover.puiradiobutton",function(){if(!a._isChecked()){a.box.addClass("ui-state-hover")
}}).on("mouseout.puiradiobutton",function(){if(!a._isChecked()){a.box.removeClass("ui-state-hover")
}}).on("click.puiradiobutton",function(){if(!a._isChecked()){a.element.trigger("click");
if(PUI.browser.msie&&parseInt(PUI.browser.version,10)<9){a.element.trigger("change")
}}});
if(this.label.length>0){this.label.on("click.puiradiobutton",function(d){a.element.trigger("click");
d.preventDefault()
})
}this.element.focus(function(){if(a._isChecked()){a.box.removeClass("ui-state-active")
}a.box.addClass("ui-state-focus")
}).blur(function(){if(a._isChecked()){a.box.addClass("ui-state-active")
}a.box.removeClass("ui-state-focus")
}).change(function(e){var f=a.element.attr("name");
if(b[f]){b[f].removeClass("ui-state-active ui-state-focus ui-state-hover").children(".pui-radiobutton-icon").removeClass("fa fa-fw fa-circle")
}a.icon.addClass("fa fa-fw fa-circle");
if(!a.element.is(":focus")){a.box.addClass("ui-state-active")
}b[f]=a.box;
a._trigger("change",null)
})
},_isChecked:function(){return this.element.prop("checked")
},_unbindEvents:function(){this.box.off();
if(this.label.length>0){this.label.off()
}},enable:function(){this._bindEvents();
this.box.removeClass("ui-state-disabled")
},disable:function(){this._unbindEvents();
this.box.addClass("ui-state-disabled")
}})
})();