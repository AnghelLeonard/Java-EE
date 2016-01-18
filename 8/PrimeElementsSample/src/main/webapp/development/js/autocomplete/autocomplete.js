(function(){$.widget("primeui.puiautocomplete",{options:{delay:300,minQueryLength:1,multiple:false,dropdown:false,scrollHeight:200,forceSelection:false,effect:null,effectOptions:{},effectSpeed:"normal",content:null,caseSensitive:false},_create:function(){this.element.wrap('<span class="pui-autocomplete ui-widget" />');
this.element.puiinputtext();
this.panel=$('<div class="pui-autocomplete-panel ui-widget-content ui-corner-all ui-helper-hidden pui-shadow"></div>').appendTo("body");
if(this.options.multiple){this.element.wrap('<ul class="pui-autocomplete-multiple ui-widget pui-inputtext ui-state-default ui-corner-all"><li class="pui-autocomplete-input-token"></li></ul>');
this.inputContainer=this.element.parent();
this.multiContainer=this.inputContainer.parent()
}else{if(this.options.dropdown){this.dropdown=$('<button type="button" class="pui-autocomplete-dropdown pui-button ui-widget ui-state-default ui-corner-right pui-button-icon-only"><span class="pui-icon fa fa-fw fa-caret-down"></span><span class="pui-button-text">&nbsp;</span></button>').insertAfter(this.element);
this.element.removeClass("ui-corner-all").addClass("ui-corner-left")
}}this._bindEvents()
},_bindEvents:function(){var b=this;
this._bindKeyEvents();
if(this.options.dropdown){this.dropdown.on("mouseenter.puiautocomplete",function(){if(!b.element.prop("disabled")){b.dropdown.addClass("ui-state-hover")
}}).on("mouseleave.puiautocomplete",function(){b.dropdown.removeClass("ui-state-hover")
}).on("mousedown.puiautocomplete",function(){if(!b.element.prop("disabled")){b.dropdown.addClass("ui-state-active")
}}).on("mouseup.puiautocomplete",function(){if(!b.element.prop("disabled")){b.dropdown.removeClass("ui-state-active");
b.search("");
b.element.focus()
}}).on("focus.puiautocomplete",function(){b.dropdown.addClass("ui-state-focus")
}).on("blur.puiautocomplete",function(){b.dropdown.removeClass("ui-state-focus")
}).on("keydown.puiautocomplete",function(d){var a=$.ui.keyCode;
if(d.which==a.ENTER||d.which==a.NUMPAD_ENTER){b.search("");
b.input.focus();
d.preventDefault()
}})
}if(this.options.multiple){this.multiContainer.on("hover.puiautocomplete",function(){$(this).toggleClass("ui-state-hover")
}).on("click.puiautocomplete",function(){b.element.trigger("focus")
});
this.element.on("focus.pui-autocomplete",function(){b.multiContainer.addClass("ui-state-focus")
}).on("blur.pui-autocomplete",function(a){b.multiContainer.removeClass("ui-state-focus")
})
}if(this.options.forceSelection){this.currentItems=[this.element.val()];
this.element.on("blur.puiautocomplete",function(){var e=$(this).val(),f=false;
for(var a=0;
a<b.currentItems.length;
a++){if(b.currentItems[a]===e){f=true;
break
}}if(!f){b.element.val("")
}})
}$(document.body).bind("mousedown.puiautocomplete",function(a){if(b.panel.is(":hidden")){return
}if(a.target===b.element.get(0)){return
}var d=b.panel.offset();
if(a.pageX<d.left||a.pageX>d.left+b.panel.width()||a.pageY<d.top||a.pageY>d.top+b.panel.height()){b.hide()
}});
$(window).bind("resize."+this.element.id,function(){if(b.panel.is(":visible")){b._alignPanel()
}})
},_bindKeyEvents:function(){var b=this;
this.element.on("keyup.puiautocomplete",function(e){var h=$.ui.keyCode,a=e.which,i=true;
if(a==h.UP||a==h.LEFT||a==h.DOWN||a==h.RIGHT||a==h.TAB||a==h.SHIFT||a==h.ENTER||a==h.NUMPAD_ENTER){i=false
}if(i){var j=b.element.val();
if(!j.length){b.hide()
}if(j.length>=b.options.minQueryLength){if(b.timeout){window.clearTimeout(b.timeout)
}b.timeout=window.setTimeout(function(){b.search(j)
},b.options.delay)
}}}).on("keydown.puiautocomplete",function(e){if(b.panel.is(":visible")){var h=$.ui.keyCode,i=b.items.filter(".ui-state-highlight");
switch(e.which){case h.UP:case h.LEFT:var j=i.prev();
if(j.length==1){i.removeClass("ui-state-highlight");
j.addClass("ui-state-highlight");
if(b.options.scrollHeight){PUI.scrollInView(b.panel,j)
}}e.preventDefault();
break;
case h.DOWN:case h.RIGHT:var a=i.next();
if(a.length==1){i.removeClass("ui-state-highlight");
a.addClass("ui-state-highlight");
if(b.options.scrollHeight){PUI.scrollInView(b.panel,a)
}}e.preventDefault();
break;
case h.ENTER:case h.NUMPAD_ENTER:i.trigger("click");
e.preventDefault();
break;
case h.ALT:case 224:break;
case h.TAB:i.trigger("click");
b.hide();
break
}}})
},_bindDynamicEvents:function(){var b=this;
this.items.on("mouseover.puiautocomplete",function(){var a=$(this);
if(!a.hasClass("ui-state-highlight")){b.items.filter(".ui-state-highlight").removeClass("ui-state-highlight");
a.addClass("ui-state-highlight")
}}).on("click.puiautocomplete",function(e){var f=$(this);
if(b.options.multiple){var a='<li class="pui-autocomplete-token ui-state-active ui-corner-all ui-helper-hidden">';
a+='<span class="pui-autocomplete-token-icon fa fa-fw fa-close" />';
a+='<span class="pui-autocomplete-token-label">'+f.data("label")+"</span></li>";
$(a).data(f.data()).insertBefore(b.inputContainer).fadeIn().children(".pui-autocomplete-token-icon").on("click.pui-autocomplete",function(c){var d=$(this).parent();
b._removeItem(d);
b._trigger("unselect",c,d)
});
b.element.val("").trigger("focus")
}else{b.element.val(f.data("label")).focus()
}b._trigger("select",e,f);
b.hide()
})
},search:function(k){this.query=this.options.caseSensitive?k:k.toLowerCase();
var m={query:this.query};
if(this.options.completeSource){if($.isArray(this.options.completeSource)){var i=this.options.completeSource,l=[],j=($.trim(k)==="");
for(var p=0;
p<i.length;
p++){var n=i[p],o=n.label||n;
if(!this.options.caseSensitive){o=o.toLowerCase()
}if(j||o.indexOf(this.query)===0){l.push({label:i[p],value:n})
}}this._handleData(l)
}else{this.options.completeSource.call(this,m,this._handleData)
}}},_handleData:function(l){var j=this;
this.panel.html("");
this.listContainer=$('<ul class="pui-autocomplete-items pui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"></ul>').appendTo(this.panel);
for(var h=0;
h<l.length;
h++){var n=$('<li class="pui-autocomplete-item pui-autocomplete-list-item ui-corner-all"></li>');
n.data(l[h]);
if(this.options.content){n.html(this.options.content.call(this,l[h]))
}else{n.text(l[h].label)
}this.listContainer.append(n)
}this.items=this.listContainer.children(".pui-autocomplete-item");
this._bindDynamicEvents();
if(this.items.length>0){var k=j.items.eq(0),m=this.panel.is(":hidden");
k.addClass("ui-state-highlight");
if(j.query.length>0&&!j.options.content){j.items.each(function(){var c=$(this),a=c.html(),d=new RegExp(PUI.escapeRegExp(j.query),"gi"),b=a.replace(d,'<span class="pui-autocomplete-query">$&</span>');
c.html(b)
})
}if(this.options.forceSelection){this.currentItems=[];
$.each(l,function(b,a){j.currentItems.push(a.label)
})
}if(j.options.scrollHeight){var i=m?j.panel.height():j.panel.children().height();
if(i>j.options.scrollHeight){j.panel.height(j.options.scrollHeight)
}else{j.panel.css("height","auto")
}}if(m){j.show()
}else{j._alignPanel()
}}else{this.panel.hide()
}},show:function(){this._alignPanel();
if(this.options.effect){this.panel.show(this.options.effect,{},this.options.effectSpeed)
}else{this.panel.show()
}},hide:function(){this.panel.hide();
this.panel.css("height","auto")
},_removeItem:function(b){b.fadeOut("fast",function(){var a=$(this);
a.remove()
})
},_alignPanel:function(){var c=null;
if(this.options.multiple){c=this.multiContainer.innerWidth()-(this.element.position().left-this.multiContainer.position().left)
}else{if(this.panel.is(":visible")){c=this.panel.children(".pui-autocomplete-items").outerWidth()
}else{this.panel.css({visibility:"hidden",display:"block"});
c=this.panel.children(".pui-autocomplete-items").outerWidth();
this.panel.css({visibility:"visible",display:"none"})
}var d=this.element.outerWidth();
if(c<d){c=d
}}this.panel.css({left:"",top:"",width:c,"z-index":++PUI.zindex}).position({my:"left top",at:"left bottom",of:this.element})
}})
})();