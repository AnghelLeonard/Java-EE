(function(){$.widget("primeui.puiorderlist",{options:{controlsLocation:"none",dragdrop:true,effect:"fade",caption:null,responsive:false,datasource:null,content:null,template:null},_create:function(){this._createDom();
if(this.options.datasource){if($.isArray(this.options.datasource)){this._generateOptionElements(this.options.datasource)
}else{if($.type(this.options.datasource)==="function"){this.options.datasource.call(this,this._generateOptionElements)
}}}this.optionElements=this.element.children("option");
this._createListElement();
this._bindEvents()
},_createDom:function(){this.element.addClass("ui-helper-hidden");
if(this.options.controlsLocation!=="none"){this.element.wrap('<div class="pui-grid-col-10"></div>')
}else{this.element.wrap('<div class="pui-grid-col-12"></div>')
}this.element.parent().wrap('<div class="pui-orderlist pui-grid ui-widget"><div class="pui-grid-row"></div></div>');
this.container=this.element.closest(".pui-orderlist");
if(this.options.controlsLocation!=="none"){this.element.parent().before('<div class="pui-orderlist-controls pui-grid-col-2"></div>');
this._createButtons()
}if(this.options.responsive){this.container.addClass("pui-grid-responsive")
}},_generateOptionElements:function(f){for(var d=0;
d<f.length;
d++){var e=f[d];
if(e.label){this.element.append('<option value="'+e.value+'">'+e.label+"</option>")
}else{this.element.append('<option value="'+e+'">'+e+"</option>")
}}},_createListElement:function(){this.list=$('<ul class="ui-widget-content pui-orderlist-list"></ul>').insertBefore(this.element);
for(var e=0;
e<this.optionElements.length;
e++){var f=this.optionElements.eq(e),g=this._createItemContent(f.get(0)),h=$('<li class="pui-orderlist-item ui-corner-all"></li>');
if($.type(g)==="string"){h.html(g)
}else{h.append(g)
}h.data("item-value",f.attr("value")).appendTo(this.list)
}this.items=this.list.children(".pui-orderlist-item");
if(this.options.caption){this.list.addClass("ui-corner-bottom").before('<div class="pui-orderlist-caption ui-widget-header ui-corner-top">'+this.options.caption+"</div>")
}else{this.list.addClass("ui-corner-all")
}},_createButtons:function(){var c=this,d=this.element.parent().prev();
d.append(this._createButton("fa-angle-up","pui-orderlist-button-moveup",function(){c._moveUp()
})).append(this._createButton("fa-angle-double-up","pui-orderlist-button-move-top",function(){c._moveTop()
})).append(this._createButton("fa-angle-down","pui-orderlist-button-move-down",function(){c._moveDown()
})).append(this._createButton("fa-angle-double-down","pui-orderlist-move-bottom",function(){c._moveBottom()
}))
},_createButton:function(g,f,h){var e=$('<button class="'+f+'" type="button"></button>').puibutton({icon:g,click:function(){h();
$(this).removeClass("ui-state-hover ui-state-focus")
}});
return e
},_bindEvents:function(){var b=this;
this.items.on("mouseover.puiorderlist",function(d){var a=$(this);
if(!a.hasClass("ui-state-highlight")){$(this).addClass("ui-state-hover")
}}).on("mouseout.puiorderlist",function(d){var a=$(this);
if(!a.hasClass("ui-state-highlight")){$(this).removeClass("ui-state-hover")
}}).on("mousedown.puiorderlist",function(f){var a=$(this),e=(f.metaKey||f.ctrlKey);
if(!e){a.removeClass("ui-state-hover").addClass("ui-state-highlight").siblings(".ui-state-highlight").removeClass("ui-state-highlight")
}else{if(a.hasClass("ui-state-highlight")){a.removeClass("ui-state-highlight")
}else{a.removeClass("ui-state-hover").addClass("ui-state-highlight")
}}});
if(this.options.dragdrop){this.list.sortable({revert:1,start:function(a,d){},update:function(a,d){b.onDragDrop(a,d)
}})
}},_moveUp:function(){var e=this,g=this.items.filter(".ui-state-highlight"),h=g.length,f=0;
g.each(function(){var a=$(this);
if(!a.is(":first-child")){a.hide(e.options.effect,{},"fast",function(){a.insertBefore(a.prev()).show(e.options.effect,{},"fast",function(){f++;
if(h===f){e._saveState();
e._fireReorderEvent()
}})
})
}else{h--
}})
},_moveTop:function(){var e=this,g=this.items.filter(".ui-state-highlight"),h=g.length,f=0;
g.each(function(){var a=$(this);
if(!a.is(":first-child")){a.hide(e.options.effect,{},"fast",function(){a.prependTo(a.parent()).show(e.options.effect,{},"fast",function(){f++;
if(h===f){e._saveState();
e._fireReorderEvent()
}})
})
}else{h--
}})
},_moveDown:function(){var e=this,g=$(this.items.filter(".ui-state-highlight").get().reverse()),h=g.length,f=0;
g.each(function(){var a=$(this);
if(!a.is(":last-child")){a.hide(e.options.effect,{},"fast",function(){a.insertAfter(a.next()).show(e.options.effect,{},"fast",function(){f++;
if(h===f){e._saveState();
e._fireReorderEvent()
}})
})
}else{h--
}})
},_moveBottom:function(){var e=this,g=this.items.filter(".ui-state-highlight"),h=g.length,f=0;
g.each(function(){var a=$(this);
if(!a.is(":last-child")){a.hide(e.options.effect,{},"fast",function(){a.appendTo(a.parent()).show(e.options.effect,{},"fast",function(){f++;
if(h===f){e._saveState();
e._fireReorderEvent()
}})
})
}else{h--
}})
},_saveState:function(){this.element.children().remove();
this._generateOptions()
},_fireReorderEvent:function(){this._trigger("reorder",null)
},onDragDrop:function(d,c){c.item.removeClass("ui-state-highlight");
this._saveState();
this._fireReorderEvent()
},_generateOptions:function(){var b=this;
this.list.children(".pui-orderlist-item").each(function(){var a=$(this),d=a.data("item-value");
b.element.append('<option value="'+d+'" selected="selected">'+d+"</option>")
})
},_createItemContent:function(d){if(this.options.template){var c=this.options.template.html();
Mustache.parse(c);
return Mustache.render(c,d)
}else{if(this.options.content){return this.options.content.call(this,d)
}else{return d.label
}}}})
})();