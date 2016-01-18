(function(){$.widget("primeui.puilistbox",{options:{scrollHeight:200,content:null,data:null,template:null,style:null,styleClass:null},_create:function(){this.element.wrap('<div class="pui-listbox pui-inputtext ui-widget ui-widget-content ui-corner-all"><div class="ui-helper-hidden-accessible"></div></div>');
this.container=this.element.parent().parent();
this.listContainer=$('<ul class="pui-listbox-list"></ul>').appendTo(this.container);
this.options.multiple=this.element.prop("multiple");
if(this.options.style){this.container.attr("style",this.options.style)
}if(this.options.styleClass){this.container.addClass(this.options.styleClass)
}if(this.options.data){this._populateInputFromData()
}this._populateContainerFromOptions();
this._restrictHeight();
this._bindEvents()
},_populateInputFromData:function(){for(var c=0;
c<this.options.data.length;
c++){var d=this.options.data[c];
if(d.label){this.element.append('<option value="'+d.value+'">'+d.label+"</option>")
}else{this.element.append('<option value="'+d+'">'+d+"</option>")
}}},_populateContainerFromOptions:function(){this.choices=this.element.children("option");
for(var c=0;
c<this.choices.length;
c++){var d=this.choices.eq(c);
this.listContainer.append('<li class="pui-listbox-item ui-corner-all">'+this._createItemContent(d.get(0))+"</li>")
}this.items=this.listContainer.find(".pui-listbox-item:not(.ui-state-disabled)")
},_restrictHeight:function(){if(this.container.height()>this.options.scrollHeight){this.container.height(this.options.scrollHeight)
}},_bindEvents:function(){var b=this;
this.items.on("mouseover.puilistbox",function(){var a=$(this);
if(!a.hasClass("ui-state-highlight")){a.addClass("ui-state-hover")
}}).on("mouseout.puilistbox",function(){$(this).removeClass("ui-state-hover")
}).on("dblclick.puilistbox",function(a){b.element.trigger("dblclick");
PUI.clearSelection();
a.preventDefault()
}).on("click.puilistbox",function(a){if(b.options.multiple){b._clickMultiple(a,$(this))
}else{b._clickSingle(a,$(this))
}});
this.element.on("focus.puilistbox",function(){b.container.addClass("ui-state-focus")
}).on("blur.puilistbox",function(){b.container.removeClass("ui-state-focus")
})
},_clickSingle:function(d,e){var f=this.items.filter(".ui-state-highlight");
if(e.index()!==f.index()){if(f.length){this.unselectItem(f)
}this.selectItem(e);
this.element.trigger("change")
}this.element.trigger("click");
PUI.clearSelection();
d.preventDefault()
},_clickMultiple:function(t,l){var r=this.items.filter(".ui-state-highlight"),o=(t.metaKey||t.ctrlKey),s=(!o&&r.length===1&&r.index()===l.index());
if(!t.shiftKey){if(!o){this.unselectAll()
}if(o&&l.hasClass("ui-state-highlight")){this.unselectItem(l)
}else{this.selectItem(l);
this.cursorItem=l
}}else{if(this.cursorItem){this.unselectAll();
var n=l.index(),i=this.cursorItem.index(),m=(n>i)?i:n,p=(n>i)?(n+1):(i+1);
for(var q=m;
q<p;
q++){this.selectItem(this.items.eq(q))
}}else{this.selectItem(l);
this.cursorItem=l
}}if(!s){this.element.trigger("change")
}this.element.trigger("click");
PUI.clearSelection();
t.preventDefault()
},unselectAll:function(){this.items.removeClass("ui-state-highlight ui-state-hover");
this.choices.filter(":selected").prop("selected",false)
},selectItem:function(c){var d=null;
if($.type(c)==="number"){d=this.items.eq(c)
}else{d=c
}d.addClass("ui-state-highlight").removeClass("ui-state-hover");
this.choices.eq(d.index()).prop("selected",true);
this._trigger("itemSelect",null,this.choices.eq(d.index()))
},unselectItem:function(c){var d=null;
if($.type(c)==="number"){d=this.items.eq(c)
}else{d=c
}d.removeClass("ui-state-highlight");
this.choices.eq(d.index()).prop("selected",false);
this._trigger("itemUnselect",null,this.choices.eq(d.index()))
},_setOption:function(d,c){$.Widget.prototype._setOption.apply(this,arguments);
if(d==="data"){this.element.empty();
this.listContainer.empty();
this._populateInputFromData();
this._populateContainerFromOptions();
this._restrictHeight();
this._bindEvents()
}},_unbindEvents:function(){this.items.off("mouseover.puilistbox click.puilistbox dblclick.puilistbox")
},disable:function(){this._unbindEvents();
this.items.addClass("ui-state-disabled")
},enable:function(){this._bindEvents();
this.items.removeClass("ui-state-disabled")
},_createItemContent:function(d){if(this.options.template){var c=this.options.template.html();
Mustache.parse(c);
return Mustache.render(c,d)
}else{if(this.options.content){return this.options.content.call(this,d)
}else{return d.label
}}}})
})();