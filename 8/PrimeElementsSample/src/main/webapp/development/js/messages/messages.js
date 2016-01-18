(function(){$.widget("primeui.puimessages",{options:{closable:true},_create:function(){this.element.addClass("pui-messages ui-widget ui-corner-all");
if(this.options.closable){this.closer=$('<a href="#" class="pui-messages-close"><i class="fa fa-close"></i></a>').appendTo(this.element)
}this.element.append('<span class="pui-messages-icon fa fa-2x"></span>');
this.msgContainer=$("<ul></ul>").appendTo(this.element);
this._bindEvents()
},_bindEvents:function(){var b=this;
if(this.options.closable){this.closer.on("click",function(a){b.element.slideUp();
a.preventDefault()
})
}},show:function(e,f){this.clear();
this.element.removeClass("pui-messages-info pui-messages-warn pui-messages-error").addClass("pui-messages-"+e);
this.element.children(".pui-messages-icon").removeClass("fa-info-circle fa-close fa-warning").addClass(this._getIcon(e));
if($.isArray(f)){for(var d=0;
d<f.length;
d++){this._showMessage(f[d])
}}else{this._showMessage(f)
}this.element.show()
},_showMessage:function(b){this.msgContainer.append('<li><span class="pui-messages-summary">'+b.summary+'</span><span class="pui-messages-detail">'+b.detail+"</span></li>")
},clear:function(){this.msgContainer.children().remove();
this.element.hide()
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