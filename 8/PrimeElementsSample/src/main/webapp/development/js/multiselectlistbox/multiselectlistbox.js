(function(){$.widget("primeui.puimultiselectlistbox",{options:{caption:null,choices:null,effect:false||"fade",name:null,value:null},_create:function(){this.element.addClass("pui-multiselectlistbox ui-widget ui-helper-clearfix");
this.element.append('<input type="hidden"></input>');
this.element.append('<div class="pui-multiselectlistbox-listcontainer"></div>');
this.container=this.element.children("div");
this.input=this.element.children("input");
var c=this.options.choices;
if(this.options.name){this.input.attr("name",this.options.name)
}if(c){if(this.options.caption){this.container.append('<div class="pui-multiselectlistbox-header ui-widget-header ui-corner-top">'+this.options.caption+"</div>")
}this.container.append('<ul class="pui-multiselectlistbox-list pui-inputfield ui-widget-content ui-corner-bottom"></ul>');
this.rootList=this.container.children("ul");
for(var d=0;
d<c.length;
d++){this._createItemNode(c[d],this.rootList)
}this.items=this.element.find("li.pui-multiselectlistbox-item");
this._bindEvents();
if(this.options.value!==undefined||this.options.value!==null){this.preselect(this.options.value)
}}},_createItemNode:function(f,i){var h=$('<li class="pui-multiselectlistbox-item"><span>'+f.label+"</span></li>");
h.appendTo(i);
if(f.items){h.append('<ul class="ui-helper-hidden"></ul>');
var g=h.children("ul");
for(var j=0;
j<f.items.length;
j++){this._createItemNode(f.items[j],g)
}}else{h.attr("data-value",f.value)
}},_unbindEvents:function(){this.items.off("mouseover.multiSelectListbox mouseout.multiSelectListbox click.multiSelectListbox")
},_bindEvents:function(){var b=this;
this.items.on("mouseover.multiSelectListbox",function(){var a=$(this);
if(!a.hasClass("ui-state-highlight")){$(this).addClass("ui-state-hover")
}}).on("mouseout.multiSelectListbox",function(){var a=$(this);
if(!a.hasClass("ui-state-highlight")){$(this).removeClass("ui-state-hover")
}}).on("click.multiSelectListbox",function(){var a=$(this);
if(!a.hasClass("ui-state-highlight")){b.showOptionGroup(a)
}})
},showOptionGroup:function(e){e.addClass("ui-state-highlight").removeClass("ui-state-hover").siblings().filter(".ui-state-highlight").removeClass("ui-state-highlight");
e.closest(".pui-multiselectlistbox-listcontainer").nextAll().remove();
var f=e.children("ul"),g=e.attr("data-value");
if(g){this.input.val(g)
}if(f.length){var h=$('<div class="pui-multiselectlistbox-listcontainer" style="display:none"></div>');
f.clone(true).appendTo(h).addClass("pui-multiselectlistbox-list pui-inputfield ui-widget-content").removeClass("ui-helper-hidden");
h.prepend('<div class="pui-multiselectlistbox-header ui-widget-header ui-corner-top">'+e.children("span").text()+"</div>").children(".pui-multiselectlistbox-list").addClass("ui-corner-bottom");
this.element.append(h);
if(this.options.effect){h.show(this.options.effect)
}else{h.show()
}}},disable:function(){if(!this.options.disabled){this.options.disabled=true;
this.element.addClass("ui-state-disabled");
this._unbindEvents();
this.container.nextAll().remove()
}},getValue:function(){return this.input.val()
},preselect:function(n){var q=this,l=this.items.filter('[data-value="'+n+'"]');
if(l.length===0){return
}var i=l.parentsUntil(".pui-multiselectlistbox-list"),o=[];
for(var t=(i.length-1);
t>=0;
t--){var s=i.eq(t);
if(s.is("li")){o.push(s.index())
}else{if(s.is("ul")){var p=$('<div class="pui-multiselectlistbox-listcontainer" style="display:none"></div>');
s.clone(true).appendTo(p).addClass("pui-multiselectlistbox-list ui-widget-content ui-corner-all").removeClass("ui-helper-hidden");
p.prepend('<div class="pui-multiselectlistbox-header ui-widget-header ui-corner-top">'+s.prev("span").text()+"</div>").children(".pui-multiselectlistbox-list").addClass("ui-corner-bottom").removeClass("ui-corner-all");
q.element.append(p)
}}}var m=this.element.children("div.pui-multiselectlistbox-listcontainer"),r=m.find(" > ul.pui-multiselectlistbox-list > li.pui-multiselectlistbox-item").filter('[data-value="'+n+'"]');
r.addClass("ui-state-highlight");
for(var t=0;
t<o.length;
t++){m.eq(t).find("> .pui-multiselectlistbox-list > li.pui-multiselectlistbox-item").eq(o[t]).addClass("ui-state-highlight")
}q.element.children("div.pui-multiselectlistbox-listcontainer:hidden").show()
}})
})();