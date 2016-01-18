(function(){$.widget("primeui.puidatagrid",{options:{columns:3,datasource:null,paginator:null,header:null,footer:null,content:null,lazy:false,template:null},_create:function(){this.id=this.element.attr("id");
if(!this.id){this.id=this.element.uniqueId().attr("id")
}this.element.addClass("pui-datagrid ui-widget");
if(this.options.header){this.element.append('<div class="pui-datagrid-header ui-widget-header ui-corner-top">'+this.options.header+"</div>")
}this.content=$('<div class="pui-datagrid-content ui-widget-content pui-grid pui-grid-responsive"></div>').appendTo(this.element);
if(this.options.footer){this.element.append('<div class="pui-datagrid-footer ui-widget-header ui-corner-top">'+this.options.footer+"</div>")
}if(this.options.datasource){this._initDatasource()
}},_onDataInit:function(b){this._onDataUpdate(b);
this._initPaginator()
},_onDataUpdate:function(b){this.data=b;
if(!this.data){this.data=[]
}this.reset();
this._renderData()
},_onLazyLoad:function(b){this.data=b;
if(!this.data){this.data=[]
}this._renderData()
},reset:function(){if(this.paginator){this.paginator.puipaginator("setState",{page:0,totalRecords:this.options.lazy?this.options.paginator.totalRecords:this.data.length})
}},paginate:function(){if(this.options.lazy){this.options.datasource.call(this,this._onLazyLoad,this._createStateMeta())
}else{this._renderData()
}},_renderData:function(){if(this.data){this.content.html("");
var o=this._getFirst(),k=this.options.lazy?0:o,n=this._getRows(),l=null;
for(var p=k;
p<(k+n);
p++){var m=this.data[p];
if(m){if(p%this.options.columns===0){l=$('<div class="pui-grid-row"></div>').appendTo(this.content)
}var j=$('<div class="pui-datagrid-column '+PUI.getGridColumn(this.options.columns)+'"></div>').appendTo(l),i=this._createItemContent(m);
j.append(i)
}}}},_getFirst:function(){if(this.paginator){var c=this.paginator.puipaginator("option","page"),d=this.paginator.puipaginator("option","rows");
return(c*d)
}else{return 0
}},_getRows:function(){if(this.options.paginator){return this.paginator?this.paginator.puipaginator("option","rows"):this.options.paginator.rows
}else{return this.data?this.data.length:0
}},_createStateMeta:function(){var b={first:this._getFirst(),rows:this._getRows()};
return b
},_initPaginator:function(){var b=this;
if(this.options.paginator){this.options.paginator.paginate=function(a,d){b.paginate()
};
this.options.paginator.totalRecords=this.options.lazy?this.options.paginator.totalRecords:this.data.length;
this.paginator=$("<div></div>").insertAfter(this.content).puipaginator(this.options.paginator)
}},_initDatasource:function(){if($.isArray(this.options.datasource)){this._onDataInit(this.options.datasource)
}else{if($.type(this.options.datasource)==="string"){var d=this,c=this.options.datasource;
this.options.datasource=function(){$.ajax({type:"GET",url:c,dataType:"json",context:d,success:function(a){this._onDataInit(a)
}})
}
}if($.type(this.options.datasource)==="function"){if(this.options.lazy){this.options.datasource.call(this,this._onDataInit,{first:0,rows:this._getRows()})
}else{this.options.datasource.call(this,this._onDataInit)
}}}},_updateDatasource:function(b){this.options.datasource=b;
if($.isArray(this.options.datasource)){this._onDataUpdate(this.options.datasource)
}else{if($.type(this.options.datasource)==="function"){if(this.options.lazy){this.options.datasource.call(this,this._onDataUpdate,{first:0,rows:this._getRows()})
}else{this.options.datasource.call(this,this._onDataUpdate)
}}}},_setOption:function(d,c){if(d==="datasource"){this._updateDatasource(c)
}else{$.Widget.prototype._setOption.apply(this,arguments)
}},_createItemContent:function(c){if(this.options.template){var d=this.options.template.html();
Mustache.parse(d);
return Mustache.render(d,c)
}else{return this.options.content.call(this,c)
}}})
})();