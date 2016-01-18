(function(){$.widget("primeui.puibutton",{options:{value:null,icon:null,iconPos:"left",click:null},_create:function(){var f=this.element,i=f.text(),h=this.options.value||(i===""?"pui-button":i),j=f.prop("disabled"),g=null;
if(this.options.icon){g=(h==="pui-button")?"pui-button-icon-only":"pui-button-text-icon-"+this.options.iconPos
}else{g="pui-button-text-only"
}if(j){g+=" ui-state-disabled"
}this.element.addClass("pui-button ui-widget ui-state-default ui-corner-all "+g).text("");
if(this.options.icon){this.element.append('<span class="pui-button-icon-'+this.options.iconPos+" pui-icon pui-c fa fa-fw "+this.options.icon+'" />')
}this.element.append('<span class="pui-button-text pui-c">'+h+"</span>");
f.attr("role","button").attr("aria-disabled",j);
if(!j){this._bindEvents()
}},_bindEvents:function(){var d=this.element,c=this;
d.on("mouseover.puibutton",function(){if(!d.prop("disabled")){d.addClass("ui-state-hover")
}}).on("mouseout.puibutton",function(){$(this).removeClass("ui-state-active ui-state-hover")
}).on("mousedown.puibutton",function(){if(!d.hasClass("ui-state-disabled")){d.addClass("ui-state-active").removeClass("ui-state-hover")
}}).on("mouseup.puibutton",function(a){d.removeClass("ui-state-active").addClass("ui-state-hover");
c._trigger("click",a)
}).on("focus.puibutton",function(){d.addClass("ui-state-focus")
}).on("blur.puibutton",function(){d.removeClass("ui-state-focus")
}).on("keydown.puibutton",function(a){if(a.keyCode==$.ui.keyCode.SPACE||a.keyCode==$.ui.keyCode.ENTER||a.keyCode==$.ui.keyCode.NUMPAD_ENTER){d.addClass("ui-state-active")
}}).on("keyup.puibutton",function(){d.removeClass("ui-state-active")
});
return this
},_unbindEvents:function(){this.element.off("mouseover.puibutton mouseout.puibutton mousedown.puibutton mouseup.puibutton focus.puibutton blur.puibutton keydown.puibutton keyup.puibutton")
},disable:function(){this._unbindEvents();
this.element.attr({disabled:"disabled","aria-disabled":true}).addClass("ui-state-disabled")
},enable:function(){if(this.element.prop("disabled")){this._bindEvents();
this.element.removeAttr("disabled").attr("aria-disabled",false).removeClass("ui-state-disabled")
}}})
})();