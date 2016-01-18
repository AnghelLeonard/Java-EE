(function(){$.widget("primeui.puitree",{options:{nodes:null,lazy:false,animate:false,selectionMode:null,icons:null},_create:function(){this.element.uniqueId().addClass("pui-tree ui-widget ui-widget-content ui-corner-all").append('<ul class="pui-tree-container"></ul>');
this.rootContainer=this.element.children(".pui-tree-container");
if(this.options.selectionMode){this.selection=[]
}this._bindEvents();
if($.type(this.options.nodes)==="array"){this._renderNodes(this.options.nodes,this.rootContainer)
}else{if($.type(this.options.nodes)==="function"){this.options.nodes.call(this,{},this._initData)
}else{throw"Unsupported type. nodes option can be either an array or a function"
}}},_renderNodes:function(d,e){for(var f=0;
f<d.length;
f++){this._renderNode(d[f],e)
}},_renderNode:function(B,C){var u=this.options.lazy?B.leaf:!(B.children&&B.children.length),A=B.iconType||"def",w=B.expanded,s=this.options.selectionMode?(B.selectable===false?false:true):false,y=u?"pui-treenode-leaf-icon":(B.expanded?"pui-tree-toggler fa fa-fw fa-caret-down":"pui-tree-toggler fa fa-fw fa-caret-right"),x=u?"pui-treenode pui-treenode-leaf":"pui-treenode pui-treenode-parent",i=$('<li class="'+x+'"></li>'),q=$('<span class="pui-treenode-content"></span>');
i.data("puidata",B.data).appendTo(C);
if(s){q.addClass("pui-treenode-selectable")
}q.append('<span class="'+y+'"></span>').append('<span class="pui-treenode-icon"></span>').append('<span class="pui-treenode-label ui-corner-all">'+B.label+"</span>").appendTo(i);
var D=this.options.icons&&this.options.icons[A];
if(D){var v=q.children(".pui-treenode-icon"),t=($.type(D)==="string")?D:(w?D.expanded:D.collapsed);
v.addClass("fa fa-fw "+t)
}if(!u){var r=$('<ul class="pui-treenode-children"></ul>');
if(!B.expanded){r.hide()
}r.appendTo(i);
if(B.children){for(var z=0;
z<B.children.length;
z++){this._renderNode(B.children[z],r)
}}}},_initData:function(b){this._renderNodes(b,this.rootContainer)
},_handleNodeData:function(c,d){this._renderNodes(c,d.children(".pui-treenode-children"));
this._showNodeChildren(d);
d.data("puiloaded",true)
},_bindEvents:function(){var h=this,j=this.element.attr("id"),f="#"+j+" .pui-tree-toggler";
$(document).off("click.puitree-"+j,f).on("click.puitree-"+j,f,null,function(a){var c=$(this),b=c.closest("li");
if(b.hasClass("pui-treenode-expanded")){h.collapseNode(b)
}else{h.expandNode(b)
}});
if(this.options.selectionMode){var g="#"+j+" .pui-treenode-selectable .pui-treenode-label",i="#"+j+" .pui-treenode-selectable.pui-treenode-content";
$(document).off("mouseout.puitree-"+j+" mouseover.puitree-"+j,g).on("mouseout.puitree-"+j,g,null,function(){$(this).removeClass("ui-state-hover")
}).on("mouseover.puitree-"+j,g,null,function(){$(this).addClass("ui-state-hover")
}).off("click.puitree-"+j,i).on("click.puitree-"+j,i,null,function(a){h._nodeClick(a,$(this))
})
}},expandNode:function(b){this._trigger("beforeExpand",null,{node:b,data:b.data("puidata")});
if(this.options.lazy&&!b.data("puiloaded")){this.options.nodes.call(this,{node:b,data:b.data("puidata")},this._handleNodeData)
}else{this._showNodeChildren(b)
}},collapseNode:function(h){this._trigger("beforeCollapse",null,{node:h,data:h.data("puidata")});
h.removeClass("pui-treenode-expanded");
var g=h.iconType||"def",j=this.options.icons&&this.options.icons[g];
if(j&&$.type(j)!=="string"){h.find("> .pui-treenode-content > .pui-treenode-icon").removeClass(j.expanded).addClass(j.collapsed)
}var i=h.find("> .pui-treenode-content > .pui-tree-toggler"),f=h.children(".pui-treenode-children");
i.addClass("fa-caret-right").removeClass("fa-caret-down");
if(this.options.animate){f.slideUp("fast")
}else{f.hide()
}this._trigger("afterCollapse",null,{node:h,data:h.data("puidata")})
},_showNodeChildren:function(g){g.addClass("pui-treenode-expanded").attr("aria-expanded",true);
var f=g.iconType||"def",e=this.options.icons&&this.options.icons[f];
if(e&&$.type(e)!=="string"){g.find("> .pui-treenode-content > .pui-treenode-icon").removeClass(e.collapsed).addClass(e.expanded)
}var h=g.find("> .pui-treenode-content > .pui-tree-toggler");
h.addClass("fa-caret-down").removeClass("fa-caret-right");
if(this.options.animate){g.children(".pui-treenode-children").slideDown("fast")
}else{g.children(".pui-treenode-children").show()
}this._trigger("afterExpand",null,{node:g,data:g.data("puidata")})
},_nodeClick:function(i,g){PUI.clearSelection();
if($(i.target).is(":not(.pui-tree-toggler)")){var j=g.parent();
var f=this._isNodeSelected(j.data("puidata")),h=i.metaKey||i.ctrlKey;
if(f&&h){this.unselectNode(j)
}else{if(this._isSingleSelection()||(this._isMultipleSelection()&&!h)){this.unselectAllNodes()
}this.selectNode(j)
}}},selectNode:function(b){b.attr("aria-selected",true).find("> .pui-treenode-content > .pui-treenode-label").removeClass("ui-state-hover").addClass("ui-state-highlight");
this._addToSelection(b.data("puidata"));
this._trigger("nodeSelect",null,{node:b,data:b.data("puidata")})
},unselectNode:function(b){b.attr("aria-selected",false).find("> .pui-treenode-content > .pui-treenode-label").removeClass("ui-state-highlight ui-state-hover");
this._removeFromSelection(b.data("puidata"));
this._trigger("nodeUnselect",null,{node:b,data:b.data("puidata")})
},unselectAllNodes:function(){this.selection=[];
this.element.find(".pui-treenode-label.ui-state-highlight").each(function(){$(this).removeClass("ui-state-highlight").closest(".ui-treenode").attr("aria-selected",false)
})
},_addToSelection:function(c){if(c){var d=this._isNodeSelected(c);
if(!d){this.selection.push(c)
}}},_removeFromSelection:function(h){if(h){var f=-1;
for(var e=0;
e<this.selection.length;
e++){var g=this.selection[e];
if(g&&(JSON.stringify(g)===JSON.stringify(h))){f=e;
break
}}if(f>=0){this.selection.splice(f,1)
}}},_isNodeSelected:function(h){var e=false;
if(h){for(var f=0;
f<this.selection.length;
f++){var g=this.selection[f];
if(g&&(JSON.stringify(g)===JSON.stringify(h))){e=true;
break
}}}return e
},_isSingleSelection:function(){return this.options.selectionMode&&this.options.selectionMode==="single"
},_isMultipleSelection:function(){return this.options.selectionMode&&this.options.selectionMode==="multiple"
}})
})();