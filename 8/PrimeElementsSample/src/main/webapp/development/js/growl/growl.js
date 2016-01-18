(function(){$.widget("primeui.puigrowl",{options:{sticky:false,life:3000},_create:function(){var b=this.element;
b.addClass("pui-growl ui-widget").appendTo(document.body)
},show:function(d){var c=this;
this.clear();
$.each(d,function(b,a){c._renderMessage(a)
})
},clear:function(){this.element.children("div.pui-growl-item-container").remove()
},_renderMessage:function(f){var e='<div class="pui-growl-item-container ui-state-highlight ui-corner-all ui-helper-hidden" aria-live="polite">';
e+='<div class="pui-growl-item pui-shadow">';
e+='<div class="pui-growl-icon-close fa fa-close" style="display:none"></div>';
e+='<span class="pui-growl-image fa fa-2x '+this._getIcon(f.severity)+" pui-growl-image-"+f.severity+'"/>';
e+='<div class="pui-growl-message">';
e+='<span class="pui-growl-title">'+f.summary+"</span>";
e+="<p>"+(f.detail||"")+"</p>";
e+='</div><div style="clear: both;"></div></div></div>';
var d=$(e);
this._bindMessageEvents(d);
d.appendTo(this.element).fadeIn()
},_removeMessage:function(b){b.fadeTo("normal",0,function(){b.slideUp("normal","easeInOutCirc",function(){b.remove()
})
})
},_bindMessageEvents:function(e){var f=this,d=this.options.sticky;
e.on("mouseover.puigrowl",function(){var a=$(this);
if(!a.is(":animated")){a.find("div.pui-growl-icon-close:first").show()
}}).on("mouseout.puigrowl",function(){$(this).find("div.pui-growl-icon-close:first").hide()
});
e.find("div.pui-growl-icon-close").on("click.puigrowl",function(){f._removeMessage(e);
if(!d){window.clearTimeout(e.data("timeout"))
}});
if(!d){this._setRemovalTimeout(e)
}},_setRemovalTimeout:function(e){var f=this;
var d=window.setTimeout(function(){f._removeMessage(e)
},this.options.life);
e.data("timeout",d)
},_getIcon:function(b){switch(b){case"info":return"fa-info-circle";
break;
case"warn":return"fa-warning";
break;
case"error":return"fa-close";
break;
default:return"fa-info-circle";
break
}}})
})();