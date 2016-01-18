(function(){$.widget("primeui.puipicklist",{options:{effect:"fade",effectSpeed:"fast",sourceCaption:null,targetCaption:null,filter:false,filterFunction:null,filterMatchMode:"startsWith",dragdrop:true,sourceData:null,targetData:null,content:null,template:null,responsive:false},_create:function(){this.element.uniqueId().addClass("pui-picklist ui-widget ui-helper-clearfix");
if(this.options.responsive){this.element.addClass("pui-picklist-responsive")
}this.inputs=this.element.children("select");
this.items=$();
this.sourceInput=this.inputs.eq(0);
this.targetInput=this.inputs.eq(1);
if(this.options.sourceData){this._populateInputFromData(this.sourceInput,this.options.sourceData)
}if(this.options.targetData){this._populateInputFromData(this.targetInput,this.options.targetData)
}this.sourceList=this._createList(this.sourceInput,"pui-picklist-source",this.options.sourceCaption);
this._createButtons();
this.targetList=this._createList(this.targetInput,"pui-picklist-target",this.options.targetCaption);
if(this.options.showSourceControls){this.element.prepend(this._createListControls(this.sourceList,"pui-picklist-source-controls"))
}if(this.options.showTargetControls){this.element.append(this._createListControls(this.targetList,"pui-picklist-target-controls"))
}this._bindEvents()
},_populateInputFromData:function(e,g){for(var h=0;
h<g.length;
h++){var f=g[h];
if(f.label){e.append('<option value="'+f.value+'">'+f.label+"</option>")
}else{e.append('<option value="'+f+'">'+f+"</option>")
}}},_createList:function(i,f,j){var g=$('<div class="pui-picklist-listwrapper '+f+'-wrapper"></div>'),h=$('<ul class="ui-widget-content pui-picklist-list '+f+'"></ul>');
if(this.options.filter){g.append('<div class="pui-picklist-filter-container"><input type="text" class="pui-picklist-filter" /><span class="pui-icon fa fa-fw fa-search"></span></div>');
g.find("> .pui-picklist-filter-container > input").puiinputtext()
}if(j){g.append('<div class="pui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr">'+j+"</div>");
h.addClass("ui-corner-bottom")
}else{h.addClass("ui-corner-all")
}this._populateContainerFromOptions(i,h);
g.append(h);
i.addClass("ui-helper-hidden").appendTo(g);
g.appendTo(this.element);
return h
},_populateContainerFromOptions:function(i,k,m){var l=i.children("option");
for(var p=0;
p<l.length;
p++){var j=l.eq(p),n=this._createItemContent(j.get(0)),o=$('<li class="pui-picklist-item ui-corner-all"></li>').data({"item-label":j.text(),"item-value":j.val()});
if($.type(n)==="string"){o.html(n)
}else{o.append(n)
}this.items=this.items.add(o);
k.append(o)
}},_createButtons:function(){var c=this,d=$('<div class="pui-picklist-buttons"><div class="pui-picklist-buttons-cell"></div>');
d.children("div").append(this._createButton("fa-angle-right","pui-picklist-button-add",function(){c._add()
})).append(this._createButton("fa-angle-double-right","pui-picklist-button-addall",function(){c._addAll()
})).append(this._createButton("fa-angle-left","pui-picklist-button-remove",function(){c._remove()
})).append(this._createButton("fa-angle-double-left","pui-picklist-button-removeall",function(){c._removeAll()
}));
this.element.append(d)
},_createListControls:function(h,f){var g=this,e=$('<div class="'+f+' pui-picklist-buttons"><div class="pui-picklist-buttons-cell"></div>');
e.children("div").append(this._createButton("fa-angle-up","pui-picklist-button-move-up",function(){g._moveUp(h)
})).append(this._createButton("fa-angle-double-up","pui-picklist-button-move-top",function(){g._moveTop(h)
})).append(this._createButton("fa-angle-down","pui-picklist-button-move-down",function(){g._moveDown(h)
})).append(this._createButton("fa-angle-double-down","pui-picklist-button-move-bottom",function(){g._moveBottom(h)
}));
return e
},_createButton:function(g,f,h){var e=$('<button class="'+f+'" type="button"></button>').puibutton({icon:g,click:function(){h();
$(this).removeClass("ui-state-hover ui-state-focus")
}});
return e
},_bindEvents:function(){var b=this;
this.items.on("mouseover.puipicklist",function(d){var a=$(this);
if(!a.hasClass("ui-state-highlight")){$(this).addClass("ui-state-hover")
}}).on("mouseout.puipicklist",function(a){$(this).removeClass("ui-state-hover")
}).on("click.puipicklist",function(p){var e=$(this),o=(p.metaKey||p.ctrlKey);
if(!p.shiftKey){if(!o){b.unselectAll()
}if(o&&e.hasClass("ui-state-highlight")){b.unselectItem(e)
}else{b.selectItem(e);
b.cursorItem=e
}}else{b.unselectAll();
if(b.cursorItem&&(b.cursorItem.parent().is(e.parent()))){var n=e.index(),a=b.cursorItem.index(),i=(n>a)?a:n,q=(n>a)?(n+1):(a+1),m=e.parent();
for(var r=i;
r<q;
r++){b.selectItem(m.children("li.ui-picklist-item").eq(r))
}}else{b.selectItem(e);
b.cursorItem=e
}}}).on("dblclick.pickList",function(){var a=$(this);
if($(this).closest(".pui-picklist-listwrapper").hasClass("pui-picklist-source")){b._transfer(a,b.sourceList,b.targetList,"dblclick")
}else{b._transfer(a,b.targetList,b.sourceList,"dblclick")
}PUI.clearSelection()
});
if(this.options.filter){this._setupFilterMatcher();
this.element.find("> .pui-picklist-source-wrapper > .pui-picklist-filter-container > input").on("keyup",function(a){b._filter(this.value,b.sourceList)
});
this.element.find("> .pui-picklist-target-wrapper > .pui-picklist-filter-container > input").on("keyup",function(a){b._filter(this.value,b.targetList)
})
}if(this.options.dragdrop){this.element.find("> .pui-picklist-listwrapper > ul.pui-picklist-list").sortable({cancel:".ui-state-disabled",connectWith:"#"+this.element.attr("id")+" .pui-picklist-list",revert:1,update:function(a,d){b.unselectItem(d.item);
b._saveState()
},receive:function(a,d){b._triggerTransferEvent(d.item,d.sender,d.item.closest("ul.pui-picklist-list"),"dragdrop")
}})
}},selectItem:function(b){b.removeClass("ui-state-hover").addClass("ui-state-highlight")
},unselectItem:function(b){b.removeClass("ui-state-highlight")
},unselectAll:function(){var c=this.items.filter(".ui-state-highlight");
for(var d=0;
d<c.length;
d++){this.unselectItem(c.eq(d))
}},_add:function(){var b=this.sourceList.children("li.pui-picklist-item.ui-state-highlight");
this._transfer(b,this.sourceList,this.targetList,"command")
},_addAll:function(){var b=this.sourceList.children("li.pui-picklist-item:visible:not(.ui-state-disabled)");
this._transfer(b,this.sourceList,this.targetList,"command")
},_remove:function(){var b=this.targetList.children("li.pui-picklist-item.ui-state-highlight");
this._transfer(b,this.targetList,this.sourceList,"command")
},_removeAll:function(){var b=this.targetList.children("li.pui-picklist-item:visible:not(.ui-state-disabled)");
this._transfer(b,this.targetList,this.sourceList,"command")
},_moveUp:function(j){var i=this,k=i.options.effect,g=j.children(".ui-state-highlight"),h=g.length,l=0;
g.each(function(){var a=$(this);
if(!a.is(":first-child")){if(k){a.hide(i.options.effect,{},i.options.effectSpeed,function(){a.insertBefore(a.prev()).show(i.options.effect,{},i.options.effectSpeed,function(){l++;
if(l===h){i._saveState()
}})
})
}else{a.hide().insertBefore(a.prev()).show()
}}});
if(!k){this._saveState()
}},_moveTop:function(j){var i=this,k=i.options.effect,g=j.children(".ui-state-highlight"),h=g.length,l=0;
j.children(".ui-state-highlight").each(function(){var a=$(this);
if(!a.is(":first-child")){if(k){a.hide(i.options.effect,{},i.options.effectSpeed,function(){a.prependTo(a.parent()).show(i.options.effect,{},i.options.effectSpeed,function(){l++;
if(l===h){i._saveState()
}})
})
}else{a.hide().prependTo(a.parent()).show()
}}});
if(!k){this._saveState()
}},_moveDown:function(j){var i=this,k=i.options.effect,g=j.children(".ui-state-highlight"),h=g.length,l=0;
$(j.children(".ui-state-highlight").get().reverse()).each(function(){var a=$(this);
if(!a.is(":last-child")){if(k){a.hide(i.options.effect,{},i.options.effectSpeed,function(){a.insertAfter(a.next()).show(i.options.effect,{},i.options.effectSpeed,function(){l++;
if(l===h){i._saveState()
}})
})
}else{a.hide().insertAfter(a.next()).show()
}}});
if(!k){this._saveState()
}},_moveBottom:function(j){var i=this,k=i.options.effect,g=j.children(".ui-state-highlight"),h=g.length,l=0;
j.children(".ui-state-highlight").each(function(){var a=$(this);
if(!a.is(":last-child")){if(k){a.hide(i.options.effect,{},i.options.effectSpeed,function(){a.appendTo(a.parent()).show(i.options.effect,{},i.options.effectSpeed,function(){l++;
if(l===h){i._saveState()
}})
})
}else{a.hide().appendTo(a.parent()).show()
}}});
if(!k){this._saveState()
}},_transfer:function(h,j,k,m){var l=this,i=h.length,n=0;
if(this.options.effect){h.hide(this.options.effect,{},this.options.effectSpeed,function(){var a=$(this);
l.unselectItem(a);
a.appendTo(k).show(l.options.effect,{},l.options.effectSpeed,function(){n++;
if(n===i){l._saveState();
l._triggerTransferEvent(h,j,k,m)
}})
})
}else{h.hide().removeClass("ui-state-highlight ui-state-hover").appendTo(k).show();
this._saveState();
this._triggerTransferEvent(h,j,k,m)
}},_triggerTransferEvent:function(g,h,i,f){var j={};
j.items=g;
j.from=h;
j.to=i;
j.type=f;
this._trigger("transfer",null,j)
},_saveState:function(){this.sourceInput.children().remove();
this.targetInput.children().remove();
this._generateItems(this.sourceList,this.sourceInput);
this._generateItems(this.targetList,this.targetInput);
this.cursorItem=null
},_generateItems:function(c,d){c.children(".pui-picklist-item").each(function(){var b=$(this),a=b.data("item-value"),f=b.data("item-label");
d.append('<option value="'+a+'" selected="selected">'+f+"</option>")
})
},_setupFilterMatcher:function(){this.filterMatchers={startsWith:this._startsWithFilter,contains:this._containsFilter,endsWith:this._endsWithFilter,custom:this.options.filterFunction};
this.filterMatcher=this.filterMatchers[this.options.filterMatchMode]
},_filter:function(k,l){var j=$.trim(k).toLowerCase(),i=l.children("li.pui-picklist-item");
if(j===""){i.filter(":hidden").show()
}else{for(var h=0;
h<i.length;
h++){var m=i.eq(h),n=m.data("item-label");
if(this.filterMatcher(n,j)){m.show()
}else{m.hide()
}}}},_startsWithFilter:function(c,d){return c.toLowerCase().indexOf(d)===0
},_containsFilter:function(c,d){return c.toLowerCase().indexOf(d)!==-1
},_endsWithFilter:function(c,d){return c.indexOf(d,c.length-d.length)!==-1
},_setOption:function(d,c){$.Widget.prototype._setOption.apply(this,arguments);
if(d==="sourceData"){this._setOptionData(this.sourceInput,this.sourceList,this.options.sourceData)
}if(d==="targetData"){this._setOptionData(this.targetInput,this.targetList,this.options.targetData)
}},_setOptionData:function(e,f,d){e.empty();
f.empty();
this._populateInputFromData(e,d);
this._populateContainerFromOptions(e,f,d);
this._bindEvents()
},_unbindEvents:function(){this.items.off("mouseover.puipicklist mouseout.puipicklist click.puipicklist dblclick.pickList")
},disable:function(){this._unbindEvents();
this.items.addClass("ui-state-disabled");
this.element.find(".pui-picklist-buttons > button").each(function(d,c){$(c).puibutton("disable")
})
},enable:function(){this._bindEvents();
this.items.removeClass("ui-state-disabled");
this.element.find(".pui-picklist-buttons > button").each(function(d,c){$(c).puibutton("enable")
})
},_createItemContent:function(d){if(this.options.template){var c=this.options.template.html();
Mustache.parse(c);
return Mustache.render(c,d)
}else{if(this.options.content){return this.options.content.call(this,d)
}else{return d.label
}}}})
})();