(function(){var b={"{FirstPageLink}":{markup:'<span class="pui-paginator-first pui-paginator-element ui-state-default ui-corner-all"><span class="fa fa-step-backward"></span></span>',create:function(d){var a=$(this.markup);
if(d.options.page===0){a.addClass("ui-state-disabled")
}a.on("click.puipaginator",function(){if(!$(this).hasClass("ui-state-disabled")){d.option("page",0)
}});
return a
},update:function(a,d){if(d.page===0){a.addClass("ui-state-disabled").removeClass("ui-state-hover ui-state-active")
}else{a.removeClass("ui-state-disabled")
}}},"{PreviousPageLink}":{markup:'<span class="pui-paginator-prev pui-paginator-element ui-state-default ui-corner-all"><span class="fa fa-backward"></span></span>',create:function(d){var a=$(this.markup);
if(d.options.page===0){a.addClass("ui-state-disabled")
}a.on("click.puipaginator",function(){if(!$(this).hasClass("ui-state-disabled")){d.option("page",d.options.page-1)
}});
return a
},update:function(a,d){if(d.page===0){a.addClass("ui-state-disabled").removeClass("ui-state-hover ui-state-active")
}else{a.removeClass("ui-state-disabled")
}}},"{NextPageLink}":{markup:'<span class="pui-paginator-next pui-paginator-element ui-state-default ui-corner-all"><span class="fa fa-forward"></span></span>',create:function(d){var a=$(this.markup);
if(d.options.page===(d.getPageCount()-1)){a.addClass("ui-state-disabled").removeClass("ui-state-hover ui-state-active")
}a.on("click.puipaginator",function(){if(!$(this).hasClass("ui-state-disabled")){d.option("page",d.options.page+1)
}});
return a
},update:function(a,d){if(d.page===(d.pageCount-1)){a.addClass("ui-state-disabled").removeClass("ui-state-hover ui-state-active")
}else{a.removeClass("ui-state-disabled")
}}},"{LastPageLink}":{markup:'<span class="pui-paginator-last pui-paginator-element ui-state-default ui-corner-all"><span class="fa fa-step-forward"></span></span>',create:function(d){var a=$(this.markup);
if(d.options.page===(d.getPageCount()-1)){a.addClass("ui-state-disabled").removeClass("ui-state-hover ui-state-active")
}a.on("click.puipaginator",function(){if(!$(this).hasClass("ui-state-disabled")){d.option("page",d.getPageCount()-1)
}});
return a
},update:function(a,d){if(d.page===(d.pageCount-1)){a.addClass("ui-state-disabled").removeClass("ui-state-hover ui-state-active")
}else{a.removeClass("ui-state-disabled")
}}},"{PageLinks}":{markup:'<span class="pui-paginator-pages"></span>',create:function(i){var m=$(this.markup),p=this.calculateBoundaries({page:i.options.page,pageLinks:i.options.pageLinks,pageCount:i.getPageCount()}),k=p[0],a=p[1];
for(var n=k;
n<=a;
n++){var l=(n+1),o=$('<span class="pui-paginator-page pui-paginator-element ui-state-default ui-corner-all">'+l+"</span>");
if(n===i.options.page){o.addClass("ui-state-active")
}o.on("click.puipaginator",function(c){var d=$(this);
if(!d.hasClass("ui-state-disabled")&&!d.hasClass("ui-state-active")){i.option("page",parseInt(d.text(),10)-1)
}});
m.append(o)
}return m
},update:function(p,t,i){var m=p.children(),r=this.calculateBoundaries({page:t.page,pageLinks:t.pageLinks,pageCount:t.pageCount}),s=r[0],q=r[1];
m.remove();
for(var o=s;
o<=q;
o++){var a=(o+1),n=$('<span class="pui-paginator-page pui-paginator-element ui-state-default ui-corner-all">'+a+"</span>");
if(o===t.page){n.addClass("ui-state-active")
}n.on("click.puipaginator",function(c){var d=$(this);
if(!d.hasClass("ui-state-disabled")&&!d.hasClass("ui-state-active")){i.option("page",parseInt(d.text(),10)-1)
}});
i._bindHover(n);
p.append(n)
}},calculateBoundaries:function(o){var n=o.page,j=o.pageLinks,p=o.pageCount,m=Math.min(j,p);
var k=Math.max(0,parseInt(Math.ceil(n-((m)/2)),10)),a=Math.min(p-1,k+m-1);
var l=j-(a-k+1);
k=Math.max(0,k-l);
return[k,a]
}}};
$.widget("primeui.puipaginator",{options:{pageLinks:5,totalRecords:0,page:0,rows:0,template:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink}"},_create:function(){this.element.addClass("pui-paginator ui-widget-header");
this.paginatorElements=[];
var a=this.options.template.split(/[ ]+/);
for(var j=0;
j<a.length;
j++){var g=a[j],h=b[g];
if(h){var i=h.create(this);
this.paginatorElements[g]=i;
this.element.append(i)
}}this._bindEvents()
},_bindEvents:function(){this._bindHover(this.element.find("span.pui-paginator-element"))
},_bindHover:function(a){a.on("mouseover.puipaginator",function(){var d=$(this);
if(!d.hasClass("ui-state-active")&&!d.hasClass("ui-state-disabled")){d.addClass("ui-state-hover")
}}).on("mouseout.puipaginator",function(){var d=$(this);
if(d.hasClass("ui-state-hover")){d.removeClass("ui-state-hover")
}})
},_setOption:function(a,d){if(a==="page"){this.setPage(d)
}else{if(a==="totalRecords"){this.setTotalRecords(d)
}else{$.Widget.prototype._setOption.apply(this,arguments)
}}},setPage:function(f,a){var h=this.getPageCount();
if(f>=0&&f<h){var g={first:this.options.rows*f,rows:this.options.rows,page:f,pageCount:h,pageLinks:this.options.pageLinks};
this.options.page=f;
if(!a){this._trigger("paginate",null,g)
}this.updateUI(g)
}},setState:function(a){this.options.totalRecords=a.totalRecords;
this.setPage(a.page,true)
},updateUI:function(d){for(var a in this.paginatorElements){b[a].update(this.paginatorElements[a],d,this)
}},getPageCount:function(){return Math.ceil(this.options.totalRecords/this.options.rows)||1
},setTotalRecords:function(a){this.options.totalRecords=a;
this.setPage(0,true)
}})
})();