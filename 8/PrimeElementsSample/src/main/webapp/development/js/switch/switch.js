(function(){$.widget("primeui.puiswitch",{options:{onLabel:"On",offLabel:"Off",change:null},_create:function(){this.element.wrap('<div class="pui-inputswitch ui-widget ui-widget-content ui-corner-all"></div>');
this.container=this.element.parent();
this.element.wrap('<div class="ui-helper-hidden-accessible"></div>');
this.container.prepend('<div class="pui-inputswitch-off"></div><div class="pui-inputswitch-on ui-state-active"></div><div class="pui-inputswitch-handle ui-state-default"></div>');
this.onContainer=this.container.children(".pui-inputswitch-on");
this.offContainer=this.container.children(".pui-inputswitch-off");
this.onContainer.append("<span>"+this.options.onLabel+"</span>");
this.offContainer.append("<span>"+this.options.offLabel+"</span>");
this.onLabel=this.onContainer.children("span");
this.offLabel=this.offContainer.children("span");
this.handle=this.container.children(".pui-inputswitch-handle");
var n=this.onContainer.width(),m=this.offContainer.width(),k=this.offLabel.innerWidth()-this.offLabel.width(),j=this.handle.outerWidth()-this.handle.innerWidth();
var l=(n>m)?n:m,h=l;
this.handle.css({width:h});
h=this.handle.width();
l=l+h+6;
var i=l-h-k-j;
this.container.css({width:l});
this.onLabel.width(i);
this.offLabel.width(i);
this.offContainer.css({width:this.container.width()-5});
this.offset=this.container.width()-this.handle.outerWidth();
if(this.element.prop("checked")){this.handle.css({left:this.offset});
this.onContainer.css({width:this.offset});
this.offLabel.css({"margin-right":-this.offset})
}else{this.onContainer.css({width:0});
this.onLabel.css({"margin-left":-this.offset})
}if(!this.element.prop("disabled")){this._bindEvents()
}},_bindEvents:function(){var b=this;
this.container.on("click.inputSwitch",function(a){b.toggle();
b.element.trigger("focus")
});
this.element.on("focus.inputSwitch",function(a){b.handle.addClass("ui-state-focus")
}).on("blur.inputSwitch",function(a){b.handle.removeClass("ui-state-focus")
}).on("keydown.inputSwitch",function(d){var a=$.ui.keyCode;
if(d.which===a.SPACE){d.preventDefault()
}}).on("keyup.inputSwitch",function(d){var a=$.ui.keyCode;
if(d.which===a.SPACE){b.toggle();
d.preventDefault()
}}).on("change.inputSwitch",function(a){if(b.element.prop("checked")){b._checkUI()
}else{b._uncheckUI()
}b._trigger("change",a)
})
},toggle:function(){if(this.element.prop("checked")){this.uncheck()
}else{this.check()
}},check:function(){this.element.prop("checked",true).trigger("change")
},uncheck:function(){this.element.prop("checked",false).trigger("change")
},_checkUI:function(){this.onContainer.animate({width:this.offset},200);
this.onLabel.animate({marginLeft:0},200);
this.offLabel.animate({marginRight:-this.offset},200);
this.handle.animate({left:this.offset},200)
},_uncheckUI:function(){this.onContainer.animate({width:0},200);
this.onLabel.animate({marginLeft:-this.offset},200);
this.offLabel.animate({marginRight:0},200);
this.handle.animate({left:0},200)
}})
})();