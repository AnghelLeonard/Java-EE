(function(){$.widget("primeui.puidropdown",{options:{effect:"fade",effectSpeed:"normal",filter:false,filterMatchMode:"startsWith",caseSensitiveFilter:false,filterFunction:null,data:null,content:null,scrollHeight:200,appendTo:"body",editable:false},_create:function(){if(this.options.data){for(var j=0;
j<this.options.data.length;
j++){var g=this.options.data[j];
if(g.label){this.element.append('<option value="'+g.value+'">'+g.label+"</option>")
}else{this.element.append('<option value="'+g+'">'+g+"</option>")
}}}this.element.wrap('<div class="pui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix" />').wrap('<div class="ui-helper-hidden-accessible" />');
this.container=this.element.closest(".pui-dropdown");
this.focusElementContainer=$('<div class="ui-helper-hidden-accessible"><input type="text" /></div>').appendTo(this.container);
this.focusElement=this.focusElementContainer.children("input");
this.label=this.options.editable?$('<input type="text" class="pui-dropdown-label pui-inputtext ui-corner-all"">'):$('<label class="pui-dropdown-label pui-inputtext ui-corner-all"/>');
this.label.appendTo(this.container);
this.menuIcon=$('<div class="pui-dropdown-trigger ui-state-default ui-corner-right"><span class="pui-icon fa fa-fw fa-caret-down"></span></div>').appendTo(this.container);
this.panel=$('<div class="pui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden pui-shadow" />');
if(this.options.appendTo==="self"){this.panel.appendTo(this.container)
}else{this.panel.appendTo(this.options.appendTo)
}this.itemsWrapper=$('<div class="pui-dropdown-items-wrapper" />').appendTo(this.panel);
this.itemsContainer=$('<ul class="pui-dropdown-items pui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"></ul>').appendTo(this.itemsWrapper);
this.disabled=this.element.prop("disabled");
this.choices=this.element.children("option");
this.optGroupsSize=this.itemsContainer.children("li.puiselectonemenu-item-group").length;
if(this.options.filter){this.filterContainer=$('<div class="pui-dropdown-filter-container" />').prependTo(this.panel);
this.filterInput=$('<input type="text" autocomplete="off" class="pui-dropdown-filter pui-inputtext ui-widget ui-state-default ui-corner-all" />').appendTo(this.filterContainer);
this.filterContainer.append('<span class="pui-icon fa fa-search"></span>')
}this._generateItems();
if(this.options.scrollHeight&&this.panel.outerHeight()>this.options.scrollHeight){this.itemsWrapper.height(this.options.scrollHeight)
}var h=this,i=this.choices.filter(":selected");
this.choices.filter(":disabled").each(function(){h.items.eq($(this).index()).addClass("ui-state-disabled")
});
this.triggers=this.options.editable?this.menuIcon:this.container.children(".pui-dropdown-trigger, .pui-dropdown-label");
if(this.options.editable){var f=this.label.val();
if(f===i.text()){this._highlightItem(this.items.eq(i.index()))
}else{this.items.eq(0).addClass("ui-state-highlight");
this.customInput=true;
this.customInputVal=f
}}else{this._highlightItem(this.items.eq(i.index()))
}if(!this.disabled){this._bindEvents();
this._bindConstantEvents()
}},_generateItems:function(){for(var f=0;
f<this.choices.length;
f++){var e=this.choices.eq(f),g=e.text(),h=this.options.content?this.options.content.call(this,this.options.data[f]):g;
this.itemsContainer.append('<li data-label="'+g+'" class="pui-dropdown-item pui-dropdown-list-item ui-corner-all">'+h+"</li>")
}this.items=this.itemsContainer.children(".pui-dropdown-item")
},_bindEvents:function(){var b=this;
this.items.filter(":not(.ui-state-disabled)").each(function(a,d){b._bindItemEvents($(d))
});
this.triggers.on("mouseenter.puidropdown",function(){if(!b.container.hasClass("ui-state-focus")){b.container.addClass("ui-state-hover");
b.menuIcon.addClass("ui-state-hover")
}}).on("mouseleave.puidropdown",function(){b.container.removeClass("ui-state-hover");
b.menuIcon.removeClass("ui-state-hover")
}).on("click.puidropdown",function(a){if(b.panel.is(":hidden")){b._show()
}else{b._hide();
b._revert()
}b.container.removeClass("ui-state-hover");
b.menuIcon.removeClass("ui-state-hover");
b.focusElement.trigger("focus.puidropdown");
a.preventDefault()
});
this.focusElement.on("focus.puidropdown",function(){b.container.addClass("ui-state-focus");
b.menuIcon.addClass("ui-state-focus")
}).on("blur.puidropdown",function(){b.container.removeClass("ui-state-focus");
b.menuIcon.removeClass("ui-state-focus")
});
if(this.options.editable){this.label.on("change.pui-dropdown",function(){b._triggerChange(true);
b.customInput=true;
b.customInputVal=$(this).val();
b.items.filter(".ui-state-highlight").removeClass("ui-state-highlight");
b.items.eq(0).addClass("ui-state-highlight")
})
}this._bindKeyEvents();
if(this.options.filter){this._setupFilterMatcher();
this.filterInput.puiinputtext();
this.filterInput.on("keyup.pui-dropdown",function(){b._filter($(this).val())
})
}},_bindItemEvents:function(d){var c=this;
d.on("mouseover.puidropdown",function(){var a=$(this);
if(!a.hasClass("ui-state-highlight")){$(this).addClass("ui-state-hover")
}}).on("mouseout.puidropdown",function(){$(this).removeClass("ui-state-hover")
}).on("click.puidropdown",function(){c._selectItem($(this))
})
},_bindConstantEvents:function(){var b=this;
$(document.body).bind("mousedown.pui-dropdown",function(a){if(b.panel.is(":hidden")){return
}var d=b.panel.offset();
if(a.target===b.label.get(0)||a.target===b.menuIcon.get(0)||a.target===b.menuIcon.children().get(0)){return
}if(a.pageX<d.left||a.pageX>d.left+b.panel.width()||a.pageY<d.top||a.pageY>d.top+b.panel.height()){b._hide();
b._revert()
}});
this.resizeNS="resize."+this.id;
this._unbindResize();
this._bindResize()
},_bindKeyEvents:function(){var b=this;
this.focusElement.on("keydown.puiselectonemenu",function(m){var a=$.ui.keyCode,e=m.which,p;
switch(e){case a.UP:case a.LEFT:p=b._getActiveItem();
var r=p.prevAll(":not(.ui-state-disabled,.ui-selectonemenu-item-group):first");
if(r.length==1){if(b.panel.is(":hidden")){b._selectItem(r)
}else{b._highlightItem(r);
PUI.scrollInView(b.itemsWrapper,r)
}}m.preventDefault();
break;
case a.DOWN:case a.RIGHT:p=b._getActiveItem();
var o=p.nextAll(":not(.ui-state-disabled,.ui-selectonemenu-item-group):first");
if(o.length==1){if(b.panel.is(":hidden")){if(m.altKey){b._show()
}else{b._selectItem(o)
}}else{b._highlightItem(o);
PUI.scrollInView(b.itemsWrapper,o)
}}m.preventDefault();
break;
case a.ENTER:case a.NUMPAD_ENTER:if(b.panel.is(":hidden")){b._show()
}else{b._selectItem(b._getActiveItem())
}m.preventDefault();
break;
case a.TAB:if(b.panel.is(":visible")){b._revert();
b._hide()
}break;
case a.ESCAPE:if(b.panel.is(":visible")){b._revert();
b._hide()
}break;
default:var q=String.fromCharCode((96<=e&&e<=105)?e-48:e),k=b.items.filter(".ui-state-highlight");
var n=b._search(q,k.index()+1,b.options.length);
if(!n){n=b._search(q,0,k.index())
}if(n){if(b.panel.is(":hidden")){b._selectItem(n)
}else{b._highlightItem(n);
PUI.scrollInView(b.itemsWrapper,n)
}}break
}})
},_selectItem:function(i,g){var j=this.choices.eq(this._resolveItemIndex(i)),k=this.choices.filter(":selected"),h=j.val()==k.val(),l=null;
if(this.options.editable){l=(!h)||(j.text()!=this.label.val())
}else{l=!h
}if(l){this._highlightItem(i);
this.element.val(j.val());
this._triggerChange();
if(this.options.editable){this.customInput=false
}}if(!g){this.focusElement.trigger("focus.puidropdown")
}if(this.panel.is(":visible")){this._hide()
}},_highlightItem:function(b){this.items.filter(".ui-state-highlight").removeClass("ui-state-highlight");
b.addClass("ui-state-highlight");
this._setLabel(b.data("label"))
},_triggerChange:function(b){this.changed=false;
if(this.options.change){this._trigger("change")
}if(!b){this.value=this.choices.filter(":selected").val()
}},_resolveItemIndex:function(b){if(this.optGroupsSize===0){return b.index()
}else{return b.index()-b.prevAll("li.pui-dropdown-item-group").length
}},_setLabel:function(b){if(this.options.editable){this.label.val(b)
}else{if(b==="&nbsp;"){this.label.html("&nbsp;")
}else{this.label.text(b)
}}},_bindResize:function(){var b=this;
$(window).bind(this.resizeNS,function(a){if(b.panel.is(":visible")){b._alignPanel()
}})
},_unbindResize:function(){$(window).unbind(this.resizeNS)
},_unbindEvents:function(){this.items.off();
this.triggers.off();
this.label.off()
},_alignPanelWidth:function(){if(!this.panelWidthAdjusted){var b=this.container.outerWidth();
if(this.panel.outerWidth()<b){this.panel.width(b)
}this.panelWidthAdjusted=true
}},_alignPanel:function(){if(this.panel.parent().is(this.container)){this.panel.css({left:"0px",top:this.container.outerHeight()+"px"}).width(this.container.outerWidth())
}else{this._alignPanelWidth();
this.panel.css({left:"",top:""}).position({my:"left top",at:"left bottom",of:this.container,collision:"flipfit"})
}},_show:function(){this._alignPanel();
this.panel.css("z-index",++PUI.zindex);
if(this.options.effect!=="none"){this.panel.show(this.options.effect,{},this.options.effectSpeed)
}else{this.panel.show()
}this.preShowValue=this.choices.filter(":selected")
},_hide:function(){this.panel.hide()
},_revert:function(){if(this.options.editable&&this.customInput){this._setLabel(this.customInputVal);
this.items.filter(".ui-state-active").removeClass("ui-state-active");
this.items.eq(0).addClass("ui-state-active")
}else{this._highlightItem(this.items.eq(this.preShowValue.index()))
}},_getActiveItem:function(){return this.items.filter(".ui-state-highlight")
},_setupFilterMatcher:function(){this.filterMatchers={startsWith:this._startsWithFilter,contains:this._containsFilter,endsWith:this._endsWithFilter,custom:this.options.filterFunction};
this.filterMatcher=this.filterMatchers[this.options.filterMatchMode]
},_startsWithFilter:function(c,d){return c.indexOf(d)===0
},_containsFilter:function(c,d){return c.indexOf(d)!==-1
},_endsWithFilter:function(c,d){return c.indexOf(d,c.length-d.length)!==-1
},_filter:function(j){this.initialHeight=this.initialHeight||this.itemsWrapper.height();
var i=this.options.caseSensitiveFilter?$.trim(j):$.trim(j).toLowerCase();
if(i===""){this.items.filter(":hidden").show()
}else{for(var h=0;
h<this.choices.length;
h++){var l=this.choices.eq(h),g=this.options.caseSensitiveFilter?l.text():l.text().toLowerCase(),k=this.items.eq(h);
if(this.filterMatcher(g,i)){k.show()
}else{k.hide()
}}}if(this.itemsContainer.height()<this.initialHeight){this.itemsWrapper.css("height","auto")
}else{this.itemsWrapper.height(this.initialHeight)
}},_search:function(i,h,g){for(var f=h;
f<g;
f++){var j=this.choices.eq(f);
if(j.text().indexOf(i)===0){return this.items.eq(f)
}}return null
},getSelectedValue:function(){return this.element.val()
},getSelectedLabel:function(){return this.choices.filter(":selected").text()
},selectValue:function(c){var d=this.choices.filter('[value="'+c+'"]');
this._selectItem(this.items.eq(d.index()),true)
},addOption:function(l){var i=(l.value!==undefined||l.value!==null)?l.value:l,g=(l.label!==undefined||l.label!==null)?l.label:l,j=this.options.content?this.options.content.call(this,l):g,k=$('<li data-label="'+g+'" class="pui-dropdown-item pui-dropdown-list-item ui-corner-all">'+j+"</li>"),h=$('<option value="'+i+'">'+g+"</option>");
h.appendTo(this.element);
this._bindItemEvents(k);
k.appendTo(this.itemsContainer);
this.items.push(k[0]);
this.choices=this.element.children("option");
if(this.items.length===1){this.selectValue(i);
this._highlightItem(k)
}},removeAllOptions:function(){this.element.empty();
this.itemsContainer.empty();
this.items.length=0;
this.choices.length=0;
this.element.val("");
this.label.text("")
},_setOption:function(d,f){$.Widget.prototype._setOption.apply(this,arguments);
if(d==="data"){this.removeAllOptions();
for(var e=0;
e<this.options.data.length;
e++){this.addOption(this.options.data[e])
}if(this.options.scrollHeight&&this.panel.outerHeight()>this.options.scrollHeight){this.itemsWrapper.height(this.options.scrollHeight)
}}},disable:function(){this._unbindEvents();
this.label.addClass("ui-state-disabled");
this.menuIcon.addClass("ui-state-disabled")
},enable:function(){this._bindEvents();
this.label.removeClass("ui-state-disabled");
this.menuIcon.removeClass("ui-state-disabled")
},getEditableText:function(){return this.label.val()
}})
})();