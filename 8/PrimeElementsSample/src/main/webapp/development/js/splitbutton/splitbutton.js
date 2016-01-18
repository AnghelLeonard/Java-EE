(function(){$.widget("primeui.puisplitbutton",{options:{icon:null,iconPos:"left",items:null},_create:function(){this.element.wrap('<div class="pui-splitbutton pui-buttonset ui-widget"></div>');
this.container=this.element.parent().uniqueId();
this.menuButton=this.container.append('<button class="pui-splitbutton-menubutton" type="button"></button>').children(".pui-splitbutton-menubutton");
this.options.disabled=this.element.prop("disabled");
if(this.options.disabled){this.menuButton.prop("disabled",true)
}this.element.puibutton(this.options).removeClass("ui-corner-all").addClass("ui-corner-left");
this.menuButton.puibutton({icon:"fa-caret-down"}).removeClass("ui-corner-all").addClass("ui-corner-right");
if(this.options.items&&this.options.items.length){this._renderPanel();
this._bindEvents()
}},_renderPanel:function(){this.menu=$('<div class="pui-menu pui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix pui-shadow"></div>').append('<ul class="pui-menu-list ui-helper-reset"></ul>');
this.menuList=this.menu.children(".pui-menu-list");
for(var f=0;
f<this.options.items.length;
f++){var h=this.options.items[f],g=$('<li class="pui-menuitem ui-widget ui-corner-all" role="menuitem"></li>'),e=$('<a class="pui-menuitem-link ui-corner-all"><span class="pui-menuitem-icon fa fa-fw '+h.icon+'"></span><span class="pui-menuitem-text">'+h.text+"</span></a>");
if(h.url){e.attr("href",h.url)
}if(h.click){e.on("click.puisplitbutton",h.click)
}g.append(e).appendTo(this.menuList)
}this.menu.appendTo(this.options.appendTo||this.container);
this.options.position={my:"left top",at:"left bottom",of:this.element.parent()}
},_bindEvents:function(){var c=this;
this.menuButton.on("click.puisplitbutton",function(){if(c.menu.is(":hidden")){c.show()
}else{c.hide()
}});
this.menuList.children().on("mouseover.puisplitbutton",function(a){$(this).addClass("ui-state-hover")
}).on("mouseout.puisplitbutton",function(a){$(this).removeClass("ui-state-hover")
}).on("click.puisplitbutton",function(){c.hide()
});
$(document.body).bind("mousedown."+this.container.attr("id"),function(b){if(c.menu.is(":hidden")){return
}var e=$(b.target);
if(e.is(c.element)||c.element.has(e).length>0){return
}var a=c.menu.offset();
if(b.pageX<a.left||b.pageX>a.left+c.menu.width()||b.pageY<a.top||b.pageY>a.top+c.menu.height()){c.element.removeClass("ui-state-focus ui-state-hover");
c.hide()
}});
var d="resize."+this.container.attr("id");
$(window).unbind(d).bind(d,function(){if(c.menu.is(":visible")){c._alignPanel()
}})
},show:function(){this.menuButton.trigger("focus");
this.menu.show();
this._alignPanel();
this._trigger("show",null)
},hide:function(){this.menuButton.removeClass("ui-state-focus");
this.menu.fadeOut("fast");
this._trigger("hide",null)
},_alignPanel:function(){this.menu.css({left:"",top:"","z-index":++PUI.zindex}).position(this.options.position)
},disable:function(){this.element.puibutton("disable");
this.menuButton.puibutton("disable")
},enable:function(){this.element.puibutton("enable");
this.menuButton.puibutton("enable")
}})
})();