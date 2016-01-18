(function(){$.widget("primeui.puitreetable",{options:{nodes:null,lazy:false,selectionMode:null,header:null},_create:function(){this.id=this.element.attr("id");
if(!this.id){this.id=this.element.uniqueId().attr("id")
}this.element.addClass("pui-treetable ui-widget");
this.tableWrapper=$('<div class="pui-treetable-tablewrapper" />').appendTo(this.element);
this.table=$("<table><thead></thead><tbody></tbody></table>").appendTo(this.tableWrapper);
this.thead=this.table.children("thead");
this.tbody=this.table.children("tbody").addClass("pui-treetable-data");
var c=this;
if(this.options.columns){var d=$("<tr></tr>").appendTo(this.thead);
$.each(this.options.columns,function(b,f){var a=$('<th class="ui-state-default"></th>').data("field",f.field).appendTo(d);
if(f.headerClass){a.addClass(f.headerClass)
}if(f.headerStyle){a.attr("style",f.headerStyle)
}if(f.headerText){a.text(f.headerText)
}})
}if(this.options.header){this.element.prepend('<div class="pui-treetable-header ui-widget-header ui-corner-top">'+this.options.header+"</div>")
}if(this.options.footer){this.element.append('<div class="pui-treetable-footer ui-widget-header ui-corner-bottom">'+this.options.footer+"</div>")
}if($.isArray(this.options.nodes)){this._renderNodes(this.options.nodes,null,true)
}else{if($.type(this.options.nodes)==="function"){this.options.nodes.call(this,{},this._initData)
}else{throw"Unsupported type. nodes option can be either an array or a function"
}}this._bindEvents()
},_initData:function(b){this._renderNodes(b,null,true)
},_renderNodes:function(F,i,w){for(var y=0;
y<F.length;
y++){var C=F[y],D=C.data,u=this.options.lazy?C.leaf:!(C.children&&C.children.length),j=$('<tr class="ui-widget-content"></tr>'),z=i?i.data("depth")+1:0,t=i?i.data("rowkey"):null,E=t?t+"_"+y:y.toString();
j.data({depth:z,rowkey:E,parentrowkey:t,puidata:D});
if(!w){j.addClass("ui-helper-hidden")
}for(var A=0;
A<this.options.columns.length;
A++){var B=$("<td />").appendTo(j),s=this.options.columns[A];
if(s.bodyClass){B.addClass(s.bodyClass)
}if(s.bodyStyle){B.attr("style",s.bodyStyle)
}if(A===0){var x=$('<span class="pui-treetable-toggler pui-icon fa fa-fw fa-caret-right pui-c"></span>');
x.css("margin-left",z*16+"px");
if(u){x.css("visibility","hidden")
}x.appendTo(B)
}if(s.content){var v=s.content.call(this,D);
if($.type(v)==="string"){B.text(v)
}else{B.append(v)
}}else{B.append(D[s.field])
}}if(i){j.insertAfter(i)
}else{j.appendTo(this.tbody)
}if(!u){this._renderNodes(C.children,j,C.expanded)
}}},_bindEvents:function(){var f=this,e="> tr > td:first-child > .pui-treetable-toggler";
this.tbody.off("click.puitreetable",e).on("click.puitreetable",e,null,function(b){var c=$(this),a=c.closest("tr");
if(!a.data("processing")){a.data("processing",true);
if(c.hasClass("fa-caret-right")){f.expandNode(a)
}else{f.collapseNode(a)
}}});
if(this.options.selectionMode){this.selection=[];
var d="> tr";
this.tbody.off("mouseover.puitreetable mouseout.puitreetable click.puitreetable",d).on("mouseover.puitreetable",d,null,function(a){var b=$(this);
if(!b.hasClass("ui-state-highlight")){b.addClass("ui-state-hover")
}}).on("mouseout.puitreetable",d,null,function(a){var b=$(this);
if(!b.hasClass("ui-state-highlight")){b.removeClass("ui-state-hover")
}}).on("click.puitreetable",d,null,function(a){f.onRowClick(a,$(this))
})
}},expandNode:function(b){this._trigger("beforeExpand",null,{node:b,data:b.data("puidata")});
if(this.options.lazy&&!b.data("puiloaded")){this.options.nodes.call(this,{node:b,data:b.data("puidata")},this._handleNodeData)
}else{this._showNodeChildren(b,false);
this._trigger("afterExpand",null,{node:b,data:b.data("puidata")})
}},_handleNodeData:function(c,d){this._renderNodes(c,d,true);
this._showNodeChildren(d,false);
d.data("puiloaded",true);
this._trigger("afterExpand",null,{node:d,data:d.data("puidata")})
},_showNodeChildren:function(i,j){if(!j){i.data("expanded",true).attr("aria-expanded",true).find(".pui-treetable-toggler:first").addClass("fa-caret-down").removeClass("fa-caret-right")
}var f=this._getChildren(i);
for(var g=0;
g<f.length;
g++){var h=f[g];
h.removeClass("ui-helper-hidden");
if(h.data("expanded")){this._showNodeChildren(h,true)
}}i.data("processing",false)
},collapseNode:function(b){this._trigger("beforeCollapse",null,{node:b,data:b.data("puidata")});
this._hideNodeChildren(b,false);
b.data("processing",false);
this._trigger("afterCollapse",null,{node:b,data:b.data("puidata")})
},_hideNodeChildren:function(i,j){if(!j){i.data("expanded",false).attr("aria-expanded",false).find(".pui-treetable-toggler:first").addClass("fa-caret-right").removeClass("fa-caret-down")
}var f=this._getChildren(i);
for(var g=0;
g<f.length;
g++){var h=f[g];
h.addClass("ui-helper-hidden");
if(h.data("expanded")){this._hideNodeChildren(h,true)
}}},onRowClick:function(e,g){if(!$(e.target).is(":input,:button,a,.pui-c")){var f=g.hasClass("ui-state-highlight"),h=e.metaKey||e.ctrlKey;
if(f&&h){this.unselectNode(g)
}else{if(this.isSingleSelection()||(this.isMultipleSelection()&&!h)){this.unselectAllNodes()
}this.selectNode(g)
}PUI.clearSelection()
}},selectNode:function(c,d){c.removeClass("ui-state-hover").addClass("ui-state-highlight").attr("aria-selected",true);
if(!d){this._trigger("nodeSelect",{},{node:c,data:c.data("puidata")})
}},unselectNode:function(c,d){c.removeClass("ui-state-highlight").attr("aria-selected",false);
if(!d){this._trigger("nodeUnselect",{},{node:c,data:c.data("puidata")})
}},unselectAllNodes:function(){var c=this.tbody.children("tr.ui-state-highlight");
for(var d=0;
d<c.length;
d++){this.unselectNode(c.eq(d),true)
}},isSingleSelection:function(){return this.options.selectionMode==="single"
},isMultipleSelection:function(){return this.options.selectionMode==="multiple"
},_getChildren:function(k){var n=k.data("rowkey"),j=k.nextAll(),l=[];
for(var m=0;
m<j.length;
m++){var i=j.eq(m),h=i.data("parentrowkey");
if(h===n){l.push(i)
}}return l
}})
})();