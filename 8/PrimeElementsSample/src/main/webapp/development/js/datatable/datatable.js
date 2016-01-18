(function(){$.widget("primeui.puidatatable",{options:{columns:null,datasource:null,paginator:null,selectionMode:null,caption:null,footer:null,sortField:null,sortOrder:null,keepSelectionInLazyMode:false,scrollable:false,scrollHeight:null,scrollWidth:null,responsive:false,expandableRows:false,expandedRowContent:null,rowExpandMode:"multiple",draggableColumns:false,resizableColumns:false,columnResizeMode:"fit",draggableRows:false,filterDelay:300,stickyHeader:false,editMode:null,tabindex:0,emptyMessage:"No records found",sort:null,rowSelect:null,rowUnselect:null,rowSelectContextMenu:null,rowCollapse:null,rowExpand:null,colReorder:null,colResize:null,rowReorder:null,cellEdit:null,},_create:function(){this.id=this.element.attr("id");
if(!this.id){this.id=this.element.uniqueId().attr("id")
}this.element.addClass("pui-datatable ui-widget");
if(this.options.responsive){this.element.addClass("pui-datatable-reflow")
}if(this.options.scrollable){this._createScrollableDatatable()
}else{this._createRegularDatatable()
}if(this.options.datasource){if($.isArray(this.options.datasource)){this._onDataInit(this.options.datasource)
}else{if($.type(this.options.datasource)==="string"){var d=this,c=this.options.datasource;
this.options.datasource=function(){$.ajax({type:"GET",url:c,dataType:"json",context:d,success:function(a){this._onDataInit(a)
}})
}
}if($.type(this.options.datasource)==="function"){if(this.options.lazy){this.options.datasource.call(this,this._onDataInit,{first:0,sortField:this.options.sortField,sortOrder:this.options.sortOrder})
}else{this.options.datasource.call(this,this._onDataInit)
}}}}},_createRegularDatatable:function(){this.tableWrapper=$('<div class="pui-datatable-tablewrapper" />').appendTo(this.element);
this.table=$("<table><thead></thead><tbody></tbody></table>").appendTo(this.tableWrapper);
this.thead=this.table.children("thead");
this.tbody=this.table.children("tbody").addClass("pui-datatable-data");
if(this.containsFooter()){this.tfoot=this.thead.after("<tfoot></tfoot>").next()
}},_createScrollableDatatable:function(){this.element.append('<div class="ui-widget-header pui-datatable-scrollable-header"><div class="pui-datatable-scrollable-header-box"><table><thead></thead></table></div></div>').append('<div class="pui-datatable-scrollable-body"><table><tbody></tbody></table></div>');
this.thead=this.element.find("> .pui-datatable-scrollable-header > .pui-datatable-scrollable-header-box > table > thead");
this.tbody=this.element.find("> .pui-datatable-scrollable-body > table > tbody");
if(this.containsFooter()){this.element.append('<div class="ui-widget-header pui-datatable-scrollable-footer"><div class="pui-datatable-scrollable-footer-box"><table><tfoot></tfoot></table></div></div>');
this.tfoot=this.element.find("> .pui-datatable-scrollable-footer > .pui-datatable-scrollable-footer-box > table > tfoot")
}},_initialize:function(){var b=this;
this._initHeader();
this._initFooter();
if(this.options.caption){this.element.prepend('<div class="pui-datatable-caption ui-widget-header">'+this.options.caption+"</div>")
}if(this.options.paginator){this.options.paginator.paginate=function(a,d){b.paginate()
};
this.options.paginator.totalRecords=this.options.lazy?this.options.paginator.totalRecords:this.data.length;
this.paginator=$("<div></div>").insertAfter(this.tableWrapper).puipaginator(this.options.paginator)
}if(this.options.footer){this.element.append('<div class="pui-datatable-footer ui-widget-header">'+this.options.footer+"</div>")
}if(this._isSortingEnabled()){this._initSorting()
}if(this.hasFiltering){this._initFiltering()
}if(this.options.selectionMode){this._initSelection()
}if(this.options.expandableRows){this._initExpandableRows()
}if(this.options.draggableColumns){this._initDraggableColumns()
}if(this.options.stickyHeader){this._initStickyHeader()
}if(this.options.sortField&&this.options.sortOrder){this._indicateInitialSortColumn();
this.sort(this.options.sortField,this.options.sortOrder)
}else{this._renderData()
}if(this.options.scrollable){this._initScrolling()
}if(this.options.resizableColumns){this._initResizableColumns()
}if(this.options.draggableRows){this._initDraggableRows()
}if(this.options.editMode){this._initEditing()
}},_initHeader:function(){if(this.options.headerRows){for(var b=0;
b<this.options.headerRows.length;
b++){this._initHeaderColumns(this.options.headerRows[b].columns)
}}else{if(this.options.columns){this._initHeaderColumns(this.options.columns)
}}},_initFooter:function(){if(this.containsFooter()){if(this.options.footerRows){for(var b=0;
b<this.options.footerRows.length;
b++){this._initFooterColumns(this.options.footerRows[b].columns)
}}else{if(this.options.columns){this._initFooterColumns(this.options.columns)
}}}},_initHeaderColumns:function(e){var d=$("<tr></tr>").appendTo(this.thead),f=this;
$.each(e,function(b,c){var h=$('<th class="ui-state-default"><span class="pui-column-title"></span></th>').data("field",c.field).uniqueId().appendTo(d);
if(c.headerClass){h.addClass(c.headerClass)
}if(c.headerStyle){h.attr("style",c.headerStyle)
}if(c.headerText){h.children(".pui-column-title").text(c.headerText)
}else{if(c.headerContent){h.children(".pui-column-title").append(c.headerContent.call(this,c))
}}if(c.rowspan){h.attr("rowspan",c.rowspan)
}if(c.colspan){h.attr("colspan",c.colspan)
}if(c.sortable){h.addClass("pui-sortable-column").data("order",0).append('<span class="pui-sortable-column-icon fa fa-fw fa-sort"></span>')
}if(c.filter){f.hasFiltering=true;
var a=$('<input type="text" class="pui-column-filter" />').puiinputtext().data({field:c.field,filtermatchmode:c.filterMatchMode||"startsWith"}).appendTo(h);
if(c.filterFunction){a.on("filter",function(l,k,g){return c.filterFunction.call(f,k,g)
})
}}})
},_initFooterColumns:function(d){var c=$("<tr></tr>").appendTo(this.tfoot);
$.each(d,function(a,b){var f=$('<td class="ui-state-default"></td>');
if(b.footerText){f.text(b.footerText)
}if(b.rowspan){f.attr("rowspan",b.rowspan)
}if(b.colspan){f.attr("colspan",b.colspan)
}f.appendTo(c)
})
},_indicateInitialSortColumn:function(){this.sortableColumns=this.thead.find("> tr > th.pui-sortable-column");
var b=this;
$.each(this.sortableColumns,function(a,j){var h=$(j),i=h.data();
if(b.options.sortField===i.field){var g=h.children(".pui-sortable-column-icon");
h.data("order",b.options.sortOrder).removeClass("ui-state-hover").addClass("ui-state-active");
if(b.options.sortOrder===-1){g.removeClass("fa-sort fa-sort-asc").addClass("fa-sort-desc")
}else{if(b.options.sortOrder===1){g.removeClass("fa-sort fa-sort-desc").addClass("fa-sort-asc")
}}}})
},_onDataInit:function(b){this.data=b;
if(!this.data){this.data=[]
}this._initialize()
},_onDataUpdate:function(b){this.data=b;
if(!this.data){this.data=[]
}this.reset();
this._renderData()
},_onLazyLoad:function(b){this.data=b;
if(!this.data){this.data=[]
}this._renderData()
},reset:function(){if(this.options.selectionMode){this.selection=[]
}if(this.paginator){this.paginator.puipaginator("setState",{page:0,totalRecords:this.options.lazy?this.options.paginator.totalRecords:this.data.length})
}this.thead.children("th.pui-sortable-column").data("order",0).filter(".ui-state-active").removeClass("ui-state-active").children("span.pui-sortable-column-icon").removeClass("fa-sort-asc fa-sort-desc").addClass("fa-sort")
},_initSorting:function(){var c=this,d=this.thead.find("> tr > th.pui-sortable-column");
d.on("mouseover.puidatatable",function(){var a=$(this);
if(!a.hasClass("ui-state-active")){a.addClass("ui-state-hover")
}}).on("mouseout.puidatatable",function(){var a=$(this);
if(!a.hasClass("ui-state-active")){a.removeClass("ui-state-hover")
}}).on("click.puidatatable",function(b){if(!$(b.target).is("th,span")){return
}var i=$(this),k=i.data("field"),l=i.data("order"),j=(l===0)?1:(l*-1),a=i.children(".pui-sortable-column-icon");
i.siblings().filter(".ui-state-active").data("order",0).removeClass("ui-state-active").children("span.pui-sortable-column-icon").removeClass("fa-sort-asc fa-sort-desc").addClass("fa-sort");
c.options.sortField=k;
c.options.sortOrder=j;
c.sort(k,j);
i.data("order",j).removeClass("ui-state-hover").addClass("ui-state-active");
if(j===-1){a.removeClass("fa-sort fa-sort-asc").addClass("fa-sort-desc")
}else{if(j===1){a.removeClass("fa-sort fa-sort-desc").addClass("fa-sort-asc")
}}c._trigger("sort",b,{sortOrder:j,sortField:k})
})
},paginate:function(){if(this.options.lazy){if(this.options.selectionMode&&!this.options.keepSelectionInLazyMode){this.selection=[]
}this.options.datasource.call(this,this._onLazyLoad,this._createStateMeta())
}else{this._renderData()
}},sort:function(c,d){if(this.options.selectionMode){this.selection=[]
}if(this.options.lazy){this.options.datasource.call(this,this._onLazyLoad,this._createStateMeta())
}else{this.data.sort(function(i,a){var b=i[c],h=a[c],j=null;
if(typeof b=="string"||b instanceof String){if(b.localeCompare){return(d*b.localeCompare(h))
}else{if(b.toLowerCase){b=b.toLowerCase()
}if(h.toLowerCase){h=h.toLowerCase()
}j=(b<h)?-1:(b>h)?1:0
}}else{j=(b<h)?-1:(b>h)?1:0
}return(d*j)
});
if(this.options.selectionMode){this.selection=[]
}if(this.paginator){this.paginator.puipaginator("option","page",0)
}this._renderData()
}},sortByField:function(g,h){var a=g.name.toLowerCase();
var b=h.name.toLowerCase();
return((a<b)?-1:((a>b)?1:0))
},_renderData:function(){this.tbody.html("");
var C=this.filteredData||this.data;
if(C&&C.length){var r=this._getFirst(),x=this.options.lazy?0:r,i=this._getRows();
for(var y=x;
y<(x+i);
y++){var A=C[y];
if(A){var j=$('<tr class="ui-widget-content" />').appendTo(this.tbody),v=(y%2===0)?"pui-datatable-even":"pui-datatable-odd",t=y;
j.addClass(v);
if(this.options.lazy){t+=r
}if(this.options.selectionMode&&PUI.inArray(this.selection,t)){j.addClass("ui-state-highlight")
}j.data("rowindex",t);
for(var z=0;
z<this.options.columns.length;
z++){var B=$("<td />").appendTo(j),s=this.options.columns[z];
if(s.bodyClass){B.addClass(s.bodyClass)
}if(s.bodyStyle){B.attr("style",s.bodyStyle)
}if(s.editor){B.addClass("pui-editable-column").data({editor:s.editor,rowdata:A,field:s.field})
}if(s.content){var w=s.content.call(this,A);
if($.type(w)==="string"){B.html(w)
}else{B.append(w)
}}else{if(s.rowToggler){B.append('<div class="pui-row-toggler fa fa-fw fa-chevron-circle-right pui-c"></div>')
}else{if(s.field){B.text(A[s.field])
}}}if(this.options.responsive&&s.headerText){B.prepend('<span class="pui-column-title">'+s.headerText+"</span>")
}}}}}else{var u=$('<tr class="ui-widget-content"></tr>').appendTo(this.tbody);
var D=$("<td></td>").attr("colspan",this.options.columns.length).appendTo(u);
D.html(this.options.emptyMessage)
}},_getFirst:function(){if(this.paginator){var c=this.paginator.puipaginator("option","page"),d=this.paginator.puipaginator("option","rows");
return(c*d)
}else{return 0
}},_getRows:function(){return this.paginator?this.paginator.puipaginator("option","rows"):this.data.length
},_isSortingEnabled:function(){var c=this.options.columns;
if(c){for(var d=0;
d<c.length;
d++){if(c[d].sortable){return true
}}}return false
},_initSelection:function(){var b=this;
this.selection=[];
this.rowSelector="> tr.ui-widget-content:not(.pui-datatable-empty-message,.pui-datatable-unselectable)";
if(this._isMultipleSelection()){this.originRowIndex=0;
this.cursorIndex=null
}this.tbody.off("mouseover.puidatatable mouseout.puidatatable mousedown.puidatatable click.puidatatable",this.rowSelector).on("mouseover.datatable",this.rowSelector,null,function(){var a=$(this);
if(!a.hasClass("ui-state-highlight")){a.addClass("ui-state-hover")
}}).on("mouseout.datatable",this.rowSelector,null,function(){var a=$(this);
if(!a.hasClass("ui-state-highlight")){a.removeClass("ui-state-hover")
}}).on("mousedown.datatable",this.rowSelector,null,function(){b.mousedownOnRow=true
}).on("click.datatable",this.rowSelector,null,function(a){b._onRowClick(a,this);
b.mousedownOnRow=false
});
this._bindSelectionKeyEvents()
},_onRowClick:function(m,n){if(!$(m.target).is(":input,:button,a,.pui-c")){var k=$(n),o=k.hasClass("ui-state-highlight"),l=m.metaKey||m.ctrlKey,i=m.shiftKey;
this.focusedRow=k;
if(o&&l){this.unselectRow(k)
}else{if(this._isSingleSelection()||(this._isMultipleSelection()&&!l&&!i)){if(this._isMultipleSelection()){var p=this.getSelection();
for(var j=0;
j<p.length;
j++){this._trigger("rowUnselect",null,p[j])
}}this.unselectAllRows()
}this.selectRow(k,false,m)
}PUI.clearSelection()
}},onRowRightClick:function(l,g){var j=$(g),i=this._getRowIndex(j),k=this.data[i],h=j.hasClass("ui-state-highlight");
if(this._isSingleSelection()||!h){this.unselectAllRows()
}this.selectRow(j,true);
this.dataSelectedByContextMenu=k;
this._trigger("rowSelectContextMenu",l,k);
PUI.clearSelection()
},_bindSelectionKeyEvents:function(){var b=this;
this.tbody.attr("tabindex",this.options.tabindex).on("focus",function(a){if(!b.mousedownOnRow){b.focusedRow=b.tbody.children("tr.ui-widget-content").eq(0);
b.focusedRow.addClass("ui-state-hover")
}}).on("blur",function(){if(b.focusedRow){b.focusedRow.removeClass("ui-state-hover");
b.focusedRow=null
}}).on("keydown",function(h){var i=$.ui.keyCode,a=h.which;
if(b.focusedRow){switch(a){case i.UP:var e=b.focusedRow.prev("tr.ui-widget-content");
if(e.length){b.focusedRow.removeClass("ui-state-hover");
b.focusedRow=e;
b.focusedRow.addClass("ui-state-hover")
}h.preventDefault();
break;
case i.DOWN:var j=b.focusedRow.next("tr.ui-widget-content");
if(j.length){b.focusedRow.removeClass("ui-state-hover");
b.focusedRow=j;
b.focusedRow.addClass("ui-state-hover")
}h.preventDefault();
break;
case i.ENTER:case i.NUMPAD_ENTER:case i.SPACE:h.target=b.focusedRow.children().eq(0).get(0);
b._onRowClick(h,b.focusedRow.get(0));
h.preventDefault();
break;
default:break
}}})
},_isSingleSelection:function(){return this.options.selectionMode==="single"
},_isMultipleSelection:function(){return this.options.selectionMode==="multiple"
},unselectAllRows:function(){this.tbody.children("tr.ui-state-highlight").removeClass("ui-state-highlight").attr("aria-selected",false);
this.selection=[]
},unselectRow:function(d,e){var f=this._getRowIndex(d);
d.removeClass("ui-state-highlight").attr("aria-selected",false);
this._removeSelection(f);
if(!e){this._trigger("rowUnselect",null,this.data[f])
}},selectRow:function(i,g,f){var h=this._getRowIndex(i),j=this.data[h];
i.removeClass("ui-state-hover").addClass("ui-state-highlight").attr("aria-selected",true);
this._addSelection(h);
if(!g){if(this.options.lazy){j=this.data[h-this._getFirst()]
}this._trigger("rowSelect",f,j)
}},getSelection:function(){var f=this.options.lazy?this._getFirst():0,d=[];
for(var e=0;
e<this.selection.length;
e++){if(this.data.length>this.selection[e]-f&&this.selection[e]-f>0){d.push(this.data[this.selection[e]-f])
}}return d
},_removeSelection:function(b){this.selection=$.grep(this.selection,function(a){return a!==b
})
},_addSelection:function(b){if(!this._isSelected(b)){this.selection.push(b)
}},_isSelected:function(b){return PUI.inArray(this.selection,b)
},_getRowIndex:function(b){return b.data("rowindex")
},_initExpandableRows:function(){var c=this,d="> tr > td > div.pui-row-toggler";
this.tbody.off("click",d).on("click",d,null,function(){c.toggleExpansion($(this))
}).on("keydown",d,null,function(a){var e=a.which,b=$.ui.keyCode;
if((e===b.ENTER||e===b.NUMPAD_ENTER)){c.toggleExpansion($(this));
a.preventDefault()
}})
},toggleExpansion:function(d){var f=d.closest("tr"),e=d.hasClass("fa-chevron-circle-down");
if(e){d.addClass("fa-chevron-circle-right").removeClass("fa-chevron-circle-down").attr("aria-expanded",false);
this.collapseRow(f);
this._trigger("rowCollapse",null,this.data[this._getRowIndex(f)])
}else{if(this.options.rowExpandMode==="single"){this.collapseAllRows()
}d.addClass("fa-chevron-circle-down").removeClass("fa-chevron-circle-right").attr("aria-expanded",true);
this.loadExpandedRowContent(f)
}},loadExpandedRowContent:function(d){var f=this._getRowIndex(d),e=$('<tr class="pui-expanded-row-content pui-datatable-unselectable ui-widget-content"><td colspan="'+this.options.columns.length+'"></td></tr>');
e.children("td").append(this.options.expandedRowContent.call(this,this.data[f]));
d.addClass("pui-expanded-row").after(e);
this._trigger("rowExpand",null,this.data[this._getRowIndex(d)])
},collapseRow:function(b){b.removeClass("pui-expanded-row").next(".pui-expanded-row-content").remove()
},collapseAllRows:function(){var b=this;
this.getExpandedRows().each(function(){var g=$(this);
b.collapseRow(g);
var j=g.children("td");
for(var a=0;
a<j.length;
a++){var i=j.eq(a),h=i.children(".pui-row-toggler");
if(h.length){h.addClass("fa-chevron-circle-right").removeClass("fa-chevron-circle-down")
}}})
},getExpandedRows:function(){return this.tbody.children(".pui-expanded-row")
},_createStateMeta:function(){var b={first:this._getFirst(),rows:this._getRows(),sortField:this.options.sortField,sortOrder:this.options.sortOrder,filters:this.filterMetaMap};
return b
},_updateDatasource:function(b){this.options.datasource=b;
if($.isArray(this.options.datasource)){this._onDataUpdate(this.options.datasource)
}else{if($.type(this.options.datasource)==="function"){if(this.options.lazy){this.options.datasource.call(this,this._onDataUpdate,{first:0,sortField:this.options.sortField,sortorder:this.options.sortOrder})
}else{this.options.datasource.call(this,this._onDataUpdate)
}}}},_setOption:function(d,c){if(d==="datasource"){this._updateDatasource(c)
}else{$.Widget.prototype._setOption.apply(this,arguments)
}},_initScrolling:function(){this.scrollHeader=this.element.children(".pui-datatable-scrollable-header");
this.scrollBody=this.element.children(".pui-datatable-scrollable-body");
this.scrollHeaderBox=this.scrollHeader.children(".pui-datatable-scrollable-header-box");
this.headerTable=this.scrollHeaderBox.children("table");
this.bodyTable=this.scrollBody.children("table");
this.percentageScrollHeight=this.options.scrollHeight&&(this.options.scrollHeight.indexOf("%")!==-1);
this.percentageScrollWidth=this.options.scrollWidth&&(this.options.scrollWidth.indexOf("%")!==-1);
var f=this,d=this.getScrollbarWidth()+"px";
if(this.options.scrollHeight){if(this.percentageScrollHeight){this.adjustScrollHeight()
}else{this.scrollBody.css("max-height",this.options.scrollHeight+"px")
}if(this.hasVerticalOverflow()){this.scrollHeaderBox.css("margin-right",d)
}}this.fixColumnWidths();
if(this.options.scrollWidth){if(this.percentageScrollWidth){this.adjustScrollWidth()
}else{this.setScrollWidth(parseInt(this.options.scrollWidth))
}}this.cloneHead();
this.scrollBody.on("scroll.dataTable",function(){var a=f.scrollBody.scrollLeft();
f.scrollHeaderBox.css("margin-left",-a)
});
this.scrollHeader.on("scroll.dataTable",function(){f.scrollHeader.scrollLeft(0)
});
var e="resize."+this.id;
$(window).off(e).on(e,function(){if(f.element.is(":visible")){if(f.percentageScrollHeight){f.adjustScrollHeight()
}if(f.percentageScrollWidth){f.adjustScrollWidth()
}}})
},cloneHead:function(){this.theadClone=this.thead.clone();
this.theadClone.find("th").each(function(){var a=$(this);
a.attr("id",a.attr("id")+"_clone");
$(this).children().not(".pui-column-title").remove()
});
this.theadClone.removeAttr("id").addClass("pui-datatable-scrollable-theadclone").height(0).prependTo(this.bodyTable);
if(this.options.scrollWidth){var b=this.theadClone.find("> tr > th.pui-sortable-column");
b.each(function(){$(this).data("original",$(this).attr("id").split("_clone")[0])
});
b.on("blur.dataTable",function(){$(PUI.escapeClientId($(this).data("original"))).removeClass("ui-state-focus")
}).on("focus.dataTable",function(){$(PUI.escapeClientId($(this).data("original"))).addClass("ui-state-focus")
}).on("keydown.dataTable",function(e){var a=e.which,f=$.ui.keyCode;
if((a===f.ENTER||a===f.NUMPAD_ENTER)&&$(e.target).is(":not(:input)")){$(PUI.escapeClientId($(this).data("original"))).trigger("click.dataTable",(e.metaKey||e.ctrlKey));
e.preventDefault()
}})
}},adjustScrollHeight:function(){var k=this.element.parent().innerHeight()*(parseInt(this.options.scrollHeight)/100),i=this.element.children(".pui-datatable-header").outerHeight(true),g=this.element.children(".pui-datatable-footer").outerHeight(true),l=(this.scrollHeader.outerHeight(true)+this.scrollFooter.outerHeight(true)),j=this.paginator?this.paginator.getContainerHeight(true):0,h=(k-(l+j+i+g));
this.scrollBody.css("max-height",h+"px")
},adjustScrollWidth:function(){var b=parseInt((this.element.parent().innerWidth()*(parseInt(this.options.scrollWidth)/100)));
this.setScrollWidth(b)
},setOuterWidth:function(e,d){var f=e.outerWidth()-e.width();
e.width(d-f)
},setScrollWidth:function(d){var c=this;
this.element.children(".ui-widget-header").each(function(){c.setOuterWidth($(this),d)
});
this.scrollHeader.width(d);
this.scrollBody.css("margin-right",0).width(d)
},alignScrollBody:function(){var b=this.hasVerticalOverflow()?this.getScrollbarWidth()+"px":"0px";
this.scrollHeaderBox.css("margin-right",b)
},getScrollbarWidth:function(){if(!this.scrollbarWidth){this.scrollbarWidth=PUI.browser.webkit?"15":PUI.calculateScrollbarWidth()
}return this.scrollbarWidth
},hasVerticalOverflow:function(){return(this.options.scrollHeight&&this.bodyTable.outerHeight()>this.scrollBody.outerHeight())
},restoreScrollState:function(){var d=this.scrollStateHolder.val(),c=d.split(",");
this.scrollBody.scrollLeft(c[0]);
this.scrollBody.scrollTop(c[1])
},saveScrollState:function(){var b=this.scrollBody.scrollLeft()+","+this.scrollBody.scrollTop();
this.scrollStateHolder.val(b)
},clearScrollState:function(){this.scrollStateHolder.val("0,0")
},fixColumnWidths:function(){if(!this.columnWidthsFixed){if(this.options.scrollable){this.scrollHeaderBox.find("> table > thead > tr > th").each(function(){var c=$(this),d=c.width();
c.width(d)
})
}else{this.element.find("> .pui-datatable-tablewrapper > table > thead > tr > th").each(function(){var b=$(this);
b.width(b.width())
})
}this.columnWidthsFixed=true
}},_initDraggableColumns:function(){var b=this;
this.dragIndicatorTop=$('<span class="fa fa-arrow-down" style="position:absolute"/></span>').hide().appendTo(this.element);
this.dragIndicatorBottom=$('<span class="fa fa-arrow-up" style="position:absolute"/></span>').hide().appendTo(this.element);
this.thead.find("> tr > th").draggable({appendTo:"body",opacity:0.75,cursor:"move",scope:this.id,cancel:":input,.ui-column-resizer",drag:function(n,l){var j=l.helper.data("droppable-column");
if(j){var o=j.offset(),a=o.top-10,p=o.top+j.height()+8,m=null;
if(n.originalEvent.pageX>=o.left+(j.width()/2)){var k=j.next();
if(k.length==1){m=k.offset().left-9
}else{m=j.offset().left+j.innerWidth()-9
}l.helper.data("drop-location",1)
}else{m=o.left-9;
l.helper.data("drop-location",-1)
}b.dragIndicatorTop.offset({left:m,top:a-3}).show();
b.dragIndicatorBottom.offset({left:m,top:p-3}).show()
}},stop:function(a,d){b.dragIndicatorTop.css({left:0,top:0}).hide();
b.dragIndicatorBottom.css({left:0,top:0}).hide()
},helper:function(){var d=$(this),a=$('<div class="ui-widget ui-state-default" style="padding:4px 10px;text-align:center;"></div>');
a.width(d.width());
a.height(d.height());
a.html(d.html());
return a.get(0)
}}).droppable({hoverClass:"ui-state-highlight",tolerance:"pointer",scope:this.id,over:function(a,d){d.helper.data("droppable-column",$(this))
},drop:function(w,q){var a=q.draggable,t=q.helper.data("drop-location"),s=$(this),u=null,o=null;
var p=b.tbody.find("> tr:not(.ui-expanded-row-content) > td:nth-child("+(a.index()+1)+")"),n=b.tbody.find("> tr:not(.ui-expanded-row-content) > td:nth-child("+(s.index()+1)+")");
if(b.containsFooter()){var x=b.tfoot.find("> tr > td"),u=x.eq(a.index()),o=x.eq(s.index())
}if(t>0){a.insertAfter(s);
p.each(function(d,c){$(this).insertAfter(n.eq(d))
});
if(u&&o){u.insertAfter(o)
}if(b.options.scrollable){var r=$(document.getElementById(a.attr("id")+"_clone")),v=$(document.getElementById(s.attr("id")+"_clone"));
r.insertAfter(v)
}}else{a.insertBefore(s);
p.each(function(d,c){$(this).insertBefore(n.eq(d))
});
if(u&&o){u.insertBefore(o)
}if(b.options.scrollable){var r=$(document.getElementById(a.attr("id")+"_clone")),v=$(document.getElementById(s.attr("id")+"_clone"));
r.insertBefore(v)
}}b._trigger("colReorder",null,{dragIndex:a.index(),dropIndex:s.index()})
}})
},containsFooter:function(){if(this.hasFooter===undefined){this.hasFooter=this.options.footerRows!==undefined;
if(!this.hasFooter){if(this.options.columns){for(var b=0;
b<this.options.columns.length;
b++){if(this.options.columns[b].footerText!==undefined){this.hasFooter=true;
break
}}}}}return this.hasFooter
},_initResizableColumns:function(){this.element.addClass("pui-datatable-resizable");
this.thead.find("> tr > th").addClass("pui-resizable-column");
this.resizerHelper=$('<div class="pui-column-resizer-helper ui-state-highlight"></div>').appendTo(this.element);
this.addResizers();
var d=this.thead.find("> tr > th > span.pui-column-resizer"),c=this;
setTimeout(function(){c.fixColumnWidths()
},5);
d.draggable({axis:"x",start:function(b,a){a.helper.data("originalposition",a.helper.offset());
var f=c.options.scrollable?c.scrollBody.height():c.thead.parent().height()-c.thead.height()-1;
c.resizerHelper.height(f);
c.resizerHelper.show()
},drag:function(b,a){c.resizerHelper.offset({left:a.helper.offset().left+a.helper.width()/2,top:c.thead.offset().top+c.thead.height()})
},stop:function(b,a){a.helper.css({left:"",top:"0px",right:"0px"});
c.resize(b,a);
c.resizerHelper.hide();
if(c.options.columnResizeMode==="expand"){setTimeout(function(){c._trigger("colResize",null,{element:a.helper.parent()})
},5)
}else{c._trigger("colResize",null,{element:a.helper.parent()})
}if(c.options.stickyHeader){c.thead.find(".pui-column-filter").prop("disabled",false);
c.clone=c.thead.clone(true);
c.cloneContainer.find("thead").remove();
c.cloneContainer.children("table").append(c.clone);
c.thead.find(".ui-column-filter").prop("disabled",true)
}},containment:this.element})
},resize:function(x,p){var w,u,q=null,v=null,t=null,n=(this.options.columnResizeMode==="expand"),m=this.thead.parent(),w=p.helper.parent(),u=w.next();
q=(p.position.left-p.originalPosition.left),v=(w.width()+q),t=(u.width()-q);
if((v>15&&t>15)||(n&&v>15)){if(n){m.width(m.width()+q);
setTimeout(function(){w.width(v)
},1)
}else{w.width(v);
u.width(t)
}if(this.options.scrollable){var r=this.theadClone.parent(),o=w.index();
if(n){var s=this;
r.width(r.width()+q);
this.footerTable.width(this.footerTable.width()+q);
setTimeout(function(){if(s.hasColumnGroup){s.theadClone.find("> tr:first").children("th").eq(o).width(v);
s.footerTable.find("> tfoot > tr:first").children("th").eq(o).width(v)
}else{s.theadClone.find(PUI.escapeClientId(w.attr("id")+"_clone")).width(v);
s.footerCols.eq(o).width(v)
}},1)
}else{this.theadClone.find(PUI.escapeClientId(w.attr("id")+"_clone")).width(v);
this.theadClone.find(PUI.escapeClientId(u.attr("id")+"_clone")).width(t)
}}}},addResizers:function(){var b=this.thead.find("> tr > th.pui-resizable-column");
b.prepend('<span class="pui-column-resizer">&nbsp;</span>');
if(this.options.columnResizeMode==="fit"){b.filter(":last-child").children("span.pui-column-resizer").hide()
}},_initDraggableRows:function(){var b=this;
this.tbody.sortable({placeholder:"pui-datatable-rowordering ui-state-active",cursor:"move",handle:"td,span:not(.ui-c)",appendTo:document.body,helper:function(j,i){var m=i.children(),k=$('<div class="pui-datatable ui-widget"><table><tbody></tbody></table></div>'),n=i.clone(),a=n.children();
for(var l=0;
l<a.length;
l++){a.eq(l).width(m.eq(l).width())
}n.appendTo(k.find("tbody"));
return k
},update:function(a,d){b.syncRowParity();
b._trigger("rowReorder",null,{fromIndex:d.item.data("ri"),toIndex:b._getFirst()+d.item.index()})
},change:function(a,d){if(b.options.scrollable){PUI.scrollInView(b.scrollBody,d.placeholder)
}}})
},syncRowParity:function(){var d=this.tbody.children("tr.ui-widget-content");
for(var e=this._getFirst();
e<d.length;
e++){var f=d.eq(e);
f.data("ri",e).removeClass("pui-datatable-even pui-datatable-odd");
if(e%2===0){f.addClass("pui-datatable-even")
}else{f.addClass("pui-datatable-odd")
}}},getContextMenuSelection:function(b){return this.dataSelectedByContextMenu
},_initFiltering:function(){var b=this;
this.filterElements=this.thead.find(".pui-column-filter");
this.filterElements.on("keyup",function(){if(b.filterTimeout){clearTimeout(b.filterTimeout)
}b.filterTimeout=setTimeout(function(){b.filter();
b.filterTimeout=null
},b.options.filterDelay)
})
},filter:function(){this.filterMetaMap=[];
for(var p=0;
p<this.filterElements.length;
p++){var n=this.filterElements.eq(p),o=n.val();
if(o&&$.trim(o)!==""){this.filterMetaMap.push({field:n.data("field"),filterMatchMode:n.data("filtermatchmode"),value:o.toLowerCase(),element:n})
}}if(this.options.lazy){this.options.datasource.call(this,this._onLazyLoad,this._createStateMeta())
}else{if(this.filterMetaMap.length){this.filteredData=[];
for(var p=0;
p<this.data.length;
p++){var m=true;
for(var q=0;
q<this.filterMetaMap.length;
q++){var s=this.filterMetaMap[q],i=s.value,j=s.field,r=this.data[p][j];
if(s.filterMatchMode==="custom"){m=s.element.triggerHandler("filter",[r,i])
}else{var t=this.filterConstraints[s.filterMatchMode];
if(!t(r,i)){m=false
}}if(!m){break
}}if(m){this.filteredData.push(this.data[p])
}}}else{this.filteredData=null
}if(this.paginator){this.paginator.puipaginator("option","totalRecords",this.filteredData?this.filteredData.length:this.data?this.data.length:0)
}this._renderData()
}},filterConstraints:{startsWith:function(c,d){if(d===undefined||d===null||$.trim(d)===""){return true
}if(c===undefined||c===null){return false
}return c.toString().toLowerCase().slice(0,d.length)===d
},contains:function(c,d){if(d===undefined||d===null||$.trim(d)===""){return true
}if(c===undefined||c===null){return false
}return c.toString().toLowerCase().indexOf(d)!==-1
}},_initStickyHeader:function(){var g=this.thead.parent(),i=g.offset(),k=$(window),l=this,j="scroll."+this.id,h="resize.sticky-"+this.id;
this.cloneContainer=$('<div class="pui-datatable pui-datatable-sticky ui-widget"><table></table></div>');
this.clone=this.thead.clone(true);
this.cloneContainer.children("table").append(this.clone);
this.cloneContainer.css({position:"absolute",width:g.outerWidth(),top:i.top,left:i.left,"z-index":++PUI.zindex}).appendTo(this.element);
k.off(j).on(j,function(){var a=k.scrollTop(),b=g.offset();
if(a>b.top){l.cloneContainer.css({position:"fixed",top:"0px"}).addClass("pui-shadow pui-sticky");
if(a>=(b.top+l.tbody.height())){l.cloneContainer.hide()
}else{l.cloneContainer.show()
}}else{l.cloneContainer.css({position:"absolute",top:b.top}).removeClass("pui-shadow pui-sticky")
}}).off(h).on(h,function(){l.cloneContainer.width(g.outerWidth())
});
this.thead.find(".pui-column-filter").prop("disabled",true)
},_initEditing:function(){var d="> tr > td.pui-editable-column",c=this;
this.tbody.off("click",d).on("click",d,null,function(a){var b=$(this);
if(!b.hasClass("pui-cell-editing")){c._showCellEditor(b);
a.stopPropagation()
}})
},_showCellEditor:function(e){var d=this.editors[e.data("editor")].call(),f=this;
d.val(e.data("rowdata")[e.data("field")]);
e.addClass("pui-cell-editing").html("").append(d);
d.focus().on("change",function(){f._onCellEditorChange(e)
}).on("blur",function(){f._onCellEditorBlur(e)
}).on("keydown",function(a){var k=a.which,b=$.ui.keyCode;
if((k===b.ENTER||k===b.NUMPAD_ENTER)){$(this).trigger("change").trigger("blur");
a.preventDefault()
}else{if(k===b.TAB){if(a.shiftKey){var c=e.prevAll("td.pui-editable-column").eq(0);
if(!c.length){c=e.parent().prev("tr").children("td.pui-editable-column:last")
}if(c.length){f._showCellEditor(c)
}}else{var j=e.nextAll("td.pui-editable-column").eq(0);
if(!j.length){j=e.parent().next("tr").children("td.pui-editable-column").eq(0)
}if(j.length){f._showCellEditor(j)
}}a.preventDefault()
}else{if(k===b.ESCAPE){f._onCellEditorBlur(e)
}}}})
},_onCellEditorChange:function(e){var d=e.children(".pui-cell-editor").val();
var f=this._trigger("cellEdit",null,{oldValue:e.data("rowdata")[e.data("field")],newValue:d,data:e.data("rowdata"),field:e.data("field")});
if(f!==false){e.data("rowdata")[e.data("field")]=d
}},_onCellEditorBlur:function(b){b.removeClass("pui-cell-editing").text(b.data("rowdata")[b.data("field")]).children(".pui-cell-editor").remove()
},editors:{input:function(){return $('<input type="text" class="pui-cell-editor"/>')
}}})
})();