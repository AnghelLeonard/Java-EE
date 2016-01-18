(function(){$.widget("primeui.puiinputtextarea",{options:{autoResize:false,autoComplete:false,maxlength:null,counter:null,counterTemplate:"{0}",minQueryLength:3,queryDelay:700,completeSource:null},_create:function(){var b=this;
this.id=this.element.attr("id");
if(!this.id){this.id=this.element.uniqueId().attr("id")
}this.element.puiinputtext();
if(this.options.autoResize){this.options.rowsDefault=this.element.attr("rows");
this.options.colsDefault=this.element.attr("cols");
this.element.addClass("pui-inputtextarea-resizable");
this.element.keyup(function(){b._resize()
}).focus(function(){b._resize()
}).blur(function(){b._resize()
})
}if(this.options.maxlength){this.element.keyup(function(e){var f=b.element.val(),a=f.length;
if(a>b.options.maxlength){b.element.val(f.substr(0,b.options.maxlength))
}if(b.options.counter){b._updateCounter()
}})
}if(this.options.counter){this._updateCounter()
}if(this.options.autoComplete){this._initAutoComplete()
}},_updateCounter:function(){var g=this.element.val(),h=g.length;
if(this.options.counter){var e=this.options.maxlength-h,f=this.options.counterTemplate.replace("{0}",e);
this.options.counter.text(f)
}},_resize:function(){var g=0,f=this.element.val().split("\n");
for(var e=f.length-1;
e>=0;
--e){g+=Math.floor((f[e].length/this.options.colsDefault)+1)
}var h=(g>=this.options.rowsDefault)?(g+1):this.options.rowsDefault;
this.element.attr("rows",h)
},_initAutoComplete:function(){var d='<div id="'+this.id+'_panel" class="pui-autocomplete-panel ui-widget-content ui-corner-all ui-helper-hidden pui-shadow"></div>',f=this;
this.panel=$(d).appendTo(document.body);
this.element.keyup(function(a){var b=$.ui.keyCode;
switch(a.which){case b.UP:case b.LEFT:case b.DOWN:case b.RIGHT:case b.ENTER:case b.NUMPAD_ENTER:case b.TAB:case b.SPACE:case b.CONTROL:case b.ALT:case b.ESCAPE:case 224:break;
default:var c=f._extractQuery();
if(c&&c.length>=f.options.minQueryLength){if(f.timeout){f._clearTimeout(f.timeout)
}f.timeout=window.setTimeout(function(){f.search(c)
},f.options.queryDelay)
}break
}}).keydown(function(a){var m=f.panel.is(":visible"),b=$.ui.keyCode,c;
switch(a.which){case b.UP:case b.LEFT:if(m){c=f.items.filter(".ui-state-highlight");
var k=c.length===0?f.items.eq(0):c.prev();
if(k.length==1){c.removeClass("ui-state-highlight");
k.addClass("ui-state-highlight");
if(f.options.scrollHeight){PUI.scrollInView(f.panel,k)
}}a.preventDefault()
}else{f._clearTimeout()
}break;
case b.DOWN:case b.RIGHT:if(m){c=f.items.filter(".ui-state-highlight");
var l=c.length===0?_self.items.eq(0):c.next();
if(l.length==1){c.removeClass("ui-state-highlight");
l.addClass("ui-state-highlight");
if(f.options.scrollHeight){PUI.scrollInView(f.panel,l)
}}a.preventDefault()
}else{f._clearTimeout()
}break;
case b.ENTER:case b.NUMPAD_ENTER:if(m){f.items.filter(".ui-state-highlight").trigger("click");
a.preventDefault()
}else{f._clearTimeout()
}break;
case b.SPACE:case b.CONTROL:case b.ALT:case b.BACKSPACE:case b.ESCAPE:case 224:f._clearTimeout();
if(m){f._hide()
}break;
case b.TAB:f._clearTimeout();
if(m){f.items.filter(".ui-state-highlight").trigger("click");
f._hide()
}break
}});
$(document.body).bind("mousedown.puiinputtextarea",function(b){if(f.panel.is(":hidden")){return
}var a=f.panel.offset();
if(b.target===f.element.get(0)){return
}if(b.pageX<a.left||b.pageX>a.left+f.panel.width()||b.pageY<a.top||b.pageY>a.top+f.panel.height()){f._hide()
}});
var e="resize."+this.id;
$(window).unbind(e).bind(e,function(){if(f.panel.is(":visible")){f._hide()
}})
},_bindDynamicEvents:function(){var b=this;
this.items.bind("mouseover",function(){var a=$(this);
if(!a.hasClass("ui-state-highlight")){b.items.filter(".ui-state-highlight").removeClass("ui-state-highlight");
a.addClass("ui-state-highlight")
}}).bind("click",function(g){var h=$(this),f=h.attr("data-item-value"),a=f.substring(b.query.length);
b.element.focus();
b.element.insertText(a,b.element.getSelection().start,true);
b._hide();
b._trigger("itemselect",g,h)
})
},_clearTimeout:function(){if(this.timeout){window.clearTimeout(this.timeout)
}this.timeout=null
},_extractQuery:function(){var d=this.element.getSelection().end,e=/\S+$/.exec(this.element.get(0).value.slice(0,d)),f=e?e[0]:null;
return f
},search:function(c){this.query=c;
var d={query:c};
if(this.options.completeSource){this.options.completeSource.call(this,d,this._handleResponse)
}},_handleResponse:function(h){this.panel.html("");
var g=$('<ul class="pui-autocomplete-items pui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"></ul>');
for(var f=0;
f<h.length;
f++){var e=$('<li class="pui-autocomplete-item pui-autocomplete-list-item ui-corner-all"></li>');
e.attr("data-item-value",h[f].value);
e.text(h[f].label);
g.append(e)
}this.panel.append(g);
this.items=this.panel.find(".pui-autocomplete-item");
this._bindDynamicEvents();
if(this.items.length>0){this.items.eq(0).addClass("ui-state-highlight");
if(this.options.scrollHeight&&this.panel.height()>this.options.scrollHeight){this.panel.height(this.options.scrollHeight)
}if(this.panel.is(":hidden")){this._show()
}else{this._alignPanel()
}}else{this.panel.hide()
}},_alignPanel:function(){var c=this.element.getCaretPosition(),d=this.element.offset();
this.panel.css({left:d.left+c.left,top:d.top+c.top,width:this.element.innerWidth()})
},_show:function(){this._alignPanel();
this.panel.show()
},_hide:function(){this.panel.hide()
},disable:function(){this.element.puiinputtext("disable")
},enable:function(){this.element.puiinputtext("enable")
}})
})();