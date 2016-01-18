(function(){$.widget("primeui.puidatascroller",{options:{header:null,buffer:0.9,chunkSize:10,datasource:null,lazy:false,content:null,template:null,mode:"document",loader:null,scrollHeight:null,totalSize:null},_create:function(){this.id=this.element.attr("id");
if(!this.id){this.id=this.element.uniqueId().attr("id")
}this.element.addClass("pui-datascroller ui-widget");
if(this.options.header){this.header=this.element.append('<div class="pui-datascroller-header ui-widget-header ui-corner-top">'+this.options.header+"</div>").children(".pui-datascroller-header")
}this.content=this.element.append('<div class="pui-datascroller-content ui-widget-content ui-corner-bottom"></div>').children(".pui-datascroller-content");
this.list=this.content.append('<ul class="pui-datascroller-list"></ul>').children(".pui-datascroller-list");
this.loaderContainer=this.content.append('<div class="pui-datascroller-loader"></div>').children(".pui-datascroller-loader");
this.loadStatus=$('<div class="pui-datascroller-loading"></div>');
this.loading=false;
this.allLoaded=false;
this.offset=0;
if(this.options.mode==="self"){this.element.addClass("pui-datascroller-inline");
if(this.options.scrollHeight){this.content.css("height",this.options.scrollHeight)
}}if(this.options.loader){this.bindManualLoader()
}else{this.bindScrollListener()
}if(this.options.datasource){if($.isArray(this.options.datasource)){this._onDataInit(this.options.datasource)
}else{if($.type(this.options.datasource)==="string"){var d=this,c=this.options.datasource;
this.options.datasource=function(){$.ajax({type:"GET",url:c,dataType:"json",context:d,success:function(a){this._onDataInit(a)
}})
}
}if($.type(this.options.datasource)==="function"){if(this.options.lazy){this.options.datasource.call(this,this._onLazyLoad,{first:this.offset})
}else{this.options.datasource.call(this,this._onDataInit)
}}}}},_onDataInit:function(b){this.data=b||[];
this.options.totalSize=this.data.length;
this._load()
},_onLazyLoad:function(b){this._renderData(b,0,this.options.chunkSize);
this._onloadComplete()
},bindScrollListener:function(){var g=this;
if(this.options.mode==="document"){var h=$(window),e=$(document),g=this,f="scroll."+this.id;
h.off(f).on(f,function(){if(h.scrollTop()>=((e.height()*g.options.buffer)-h.height())&&g.shouldLoad()){g._load()
}})
}else{this.content.on("scroll",function(){var a=this.scrollTop,b=this.scrollHeight,c=this.clientHeight;
if((a>=((b*g.options.buffer)-(c)))&&g.shouldLoad()){g._load()
}})
}},bindManualLoader:function(){var b=this;
this.options.loader.on("click.dataScroller",function(a){b._load();
a.preventDefault()
})
},_load:function(){this.loading=true;
this.loadStatus.appendTo(this.loaderContainer);
if(this.options.loader){this.options.loader.hide()
}if(this.options.lazy){this.options.datasource.call(this,this._onLazyLoad,{first:this.offset})
}else{this._renderData(this.data,this.offset,(this.offset+this.options.chunkSize));
this._onloadComplete()
}},_renderData:function(j,i,h){if(j&&j.length){for(var g=i;
g<h;
g++){var k=$('<li class="pui-datascroller-item"></li>'),l=this._createItemContent(j[g]);
k.append(l);
this.list.append(k)
}}},shouldLoad:function(){return(!this.loading&&!this.allLoaded)
},_createItemContent:function(c){if(this.options.template){var d=this.options.template.html();
Mustache.parse(d);
return Mustache.render(d,c)
}else{return this.options.content.call(this,c)
}},_onloadComplete:function(){this.offset+=this.options.chunkSize;
this.loading=false;
this.allLoaded=this.offset>=this.options.totalSize;
this.loadStatus.remove();
if(this.options.loader&&!this.allLoaded){this.options.loader.show()
}}})
})();