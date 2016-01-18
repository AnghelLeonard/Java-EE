(function(){$.widget("primeui.puibasemenu",{options:{popup:false,trigger:null,my:"left top",at:"left bottom",triggerEvent:"click"},_create:function(){if(this.options.popup){this._initPopup()
}},_initPopup:function(){var b=this;
this.element.closest(".pui-menu").addClass("pui-menu-dynamic pui-shadow").appendTo(document.body);
if($.type(this.options.trigger)==="string"){this.options.trigger=$(this.options.trigger)
}this.positionConfig={my:this.options.my,at:this.options.at,of:this.options.trigger};
this.options.trigger.on(this.options.triggerEvent+".pui-menu",function(a){if(b.element.is(":visible")){b.hide()
}else{b.show()
}a.preventDefault()
});
$(document.body).on("click.pui-menu",function(g){var a=b.element.closest(".pui-menu");
if(a.is(":hidden")){return
}var h=$(g.target);
if(h.is(b.options.trigger.get(0))||b.options.trigger.has(h).length>0){return
}var e=a.offset();
if(g.pageX<e.left||g.pageX>e.left+a.width()||g.pageY<e.top||g.pageY>e.top+a.height()){b.hide(g)
}});
$(window).on("resize.pui-menu",function(){if(b.element.closest(".pui-menu").is(":visible")){b.align()
}})
},show:function(){this.align();
this.element.closest(".pui-menu").css("z-index",++PUI.zindex).show()
},hide:function(){this.element.closest(".pui-menu").fadeOut("fast")
},align:function(){this.element.closest(".pui-menu").css({left:"",top:""}).position(this.positionConfig)
}})
})();
(function(){$.widget("primeui.puimenu",$.primeui.puibasemenu,{options:{},_create:function(){this.element.addClass("pui-menu-list ui-helper-reset").wrap('<div class="pui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix" />');
this.element.children("li").each(function(){var f=$(this);
if(f.children("h3").length>0){f.addClass("ui-widget-header ui-corner-all")
}else{f.addClass("pui-menuitem ui-widget ui-corner-all");
var e=f.children("a"),d=e.data("icon");
e.addClass("pui-menuitem-link ui-corner-all").contents().wrap('<span class="pui-menuitem-text" />');
if(d){e.prepend('<span class="pui-menuitem-icon fa fa-fw '+d+'"></span>')
}}});
this.menuitemLinks=this.element.find(".pui-menuitem-link:not(.ui-state-disabled)");
this._bindEvents();
this._super()
},_bindEvents:function(){var b=this;
this.menuitemLinks.on("mouseenter.pui-menu",function(a){$(this).addClass("ui-state-hover")
}).on("mouseleave.pui-menu",function(a){$(this).removeClass("ui-state-hover")
});
if(this.options.popup){this.menuitemLinks.on("click.pui-menu",function(){b.hide()
})
}}})
})();
(function(){$.widget("primeui.puibreadcrumb",{_create:function(){this.element.wrap('<div class="pui-breadcrumb ui-module ui-widget ui-widget-header ui-helper-clearfix ui-corner-all" role="menu">');
this.element.children("li").each(function(d){var f=$(this);
f.attr("role","menuitem");
var e=f.children("a");
e.addClass("pui-menuitem-link ui-corner-all").contents().wrap('<span class="pui-menuitem-text" />');
if(d>0){f.before('<li class="pui-breadcrumb-chevron fa fa-chevron-right"></li>')
}else{f.before('<li class="fa fa-home"></li>')
}})
}})
})();
(function(){$.widget("primeui.puitieredmenu",$.primeui.puibasemenu,{options:{autoDisplay:true},_create:function(){this._render();
this.links=this.element.find(".pui-menuitem-link:not(.ui-state-disabled)");
this._bindEvents();
this._super()
},_render:function(){var b=this;
this.element.addClass("pui-menu-list ui-helper-reset").wrap('<div class="pui-tieredmenu pui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix" />');
this.element.parent().uniqueId();
this.options.id=this.element.parent().attr("id");
this.element.find("li").each(function(){var g=$(this),a=g.children("a"),h=a.data("icon");
a.addClass("pui-menuitem-link ui-corner-all").contents().wrap('<span class="pui-menuitem-text" />');
if(h){a.prepend('<span class="pui-menuitem-icon fa fa-fw '+h+'"></span>')
}g.addClass("pui-menuitem ui-widget ui-corner-all");
if(g.children("ul").length>0){var f=g.parent().hasClass("pui-menu-child")?"fa-caret-right":b._getRootSubmenuIcon();
g.addClass("pui-menu-parent");
g.children("ul").addClass("ui-widget-content pui-menu-list ui-corner-all ui-helper-clearfix pui-menu-child pui-shadow");
a.prepend('<span class="pui-submenu-icon fa fa-fw '+f+'"></span>')
}})
},_bindEvents:function(){this._bindItemEvents();
this._bindDocumentHandler()
},_bindItemEvents:function(){var b=this;
this.links.on("mouseenter.pui-menu",function(){var a=$(this),g=a.parent(),h=b.options.autoDisplay;
var f=g.siblings(".pui-menuitem-active");
if(f.length===1){b._deactivate(f)
}if(h||b.active){if(g.hasClass("pui-menuitem-active")){b._reactivate(g)
}else{b._activate(g)
}}else{b._highlight(g)
}});
if(this.options.autoDisplay===false){this.rootLinks=this.element.find("> .pui-menuitem > .pui-menuitem-link");
this.rootLinks.data("primeui-tieredmenu-rootlink",this.options.id).find("*").data("primeui-tieredmenu-rootlink",this.options.id);
this.rootLinks.on("click.pui-menu",function(e){var h=$(this),g=h.parent(),a=g.children("ul.pui-menu-child");
if(a.length===1){if(a.is(":visible")){b.active=false;
b._deactivate(g)
}else{b.active=true;
b._highlight(g);
b._showSubmenu(g,a)
}}})
}this.element.parent().find("ul.pui-menu-list").on("mouseleave.pui-menu",function(a){if(b.activeitem){b._deactivate(b.activeitem)
}a.stopPropagation()
})
},_bindDocumentHandler:function(){var b=this;
$(document.body).on("click.pui-menu",function(d){var a=$(d.target);
if(a.data("primeui-tieredmenu-rootlink")===b.options.id){return
}b.active=false;
b.element.find("li.pui-menuitem-active").each(function(){b._deactivate($(this),true)
})
})
},_deactivate:function(c,d){this.activeitem=null;
c.children("a.pui-menuitem-link").removeClass("ui-state-hover");
c.removeClass("pui-menuitem-active");
if(d){c.children("ul.pui-menu-child:visible").fadeOut("fast")
}else{c.children("ul.pui-menu-child:visible").hide()
}},_activate:function(c){this._highlight(c);
var d=c.children("ul.pui-menu-child");
if(d.length===1){this._showSubmenu(c,d)
}},_reactivate:function(g){this.activeitem=g;
var h=g.children("ul.pui-menu-child"),e=h.children("li.pui-menuitem-active:first"),f=this;
if(e.length===1){f._deactivate(e)
}},_highlight:function(b){this.activeitem=b;
b.children("a.pui-menuitem-link").addClass("ui-state-hover");
b.addClass("pui-menuitem-active")
},_showSubmenu:function(c,d){d.css({left:c.outerWidth(),top:0,"z-index":++PUI.zindex});
d.show()
},_getRootSubmenuIcon:function(){return"fa-caret-right"
}})
})();
(function(){$.widget("primeui.puimenubar",$.primeui.puitieredmenu,{options:{autoDisplay:true},_create:function(){this._super();
this.element.parent().removeClass("pui-tieredmenu").addClass("pui-menubar")
},_showSubmenu:function(h,j){var i=$(window),f=null,g={"z-index":++PUI.zindex};
if(h.parent().hasClass("pui-menu-child")){g.left=h.outerWidth();
g.top=0;
f=h.offset().top-i.scrollTop()
}else{g.left=0;
g.top=h.outerHeight();
f=h.offset().top+g.top-i.scrollTop()
}j.css("height","auto");
if((f+j.outerHeight())>i.height()){g.overflow="auto";
g.height=i.height()-(f+20)
}j.css(g).show()
},_getRootSubmenuIcon:function(){return"fa-caret-down"
}})
})();
(function(){$.widget("primeui.puislidemenu",$.primeui.puibasemenu,{_create:function(){this._render();
this.rootList=this.element;
this.content=this.element.parent();
this.wrapper=this.content.parent();
this.container=this.wrapper.parent();
this.submenus=this.container.find("ul.pui-menu-list");
this.links=this.element.find("a.pui-menuitem-link:not(.ui-state-disabled)");
this.backward=this.wrapper.children("div.pui-slidemenu-backward");
this.stack=[];
this.jqWidth=this.container.width();
if(!this.element.hasClass("pui-menu-dynamic")){var b=this;
setTimeout(function(){b._applyDimensions()
},100)
}this._super();
this._bindEvents()
},_render:function(){this.element.addClass("pui-menu-list ui-helper-reset").wrap('<div class="pui-menu pui-slidemenu ui-widget ui-widget-content ui-corner-all"/>').wrap('<div class="pui-slidemenu-wrapper" />').after('<div class="pui-slidemenu-backward ui-widget-header ui-corner-all">\n                    <span class="pui-icon fa fa-fw fa-caret-left"></span>Back</div>').wrap('<div class="pui-slidemenu-content" />');
this.element.parent().uniqueId();
this.options.id=this.element.parent().attr("id");
this.element.find("li").each(function(){var f=$(this),e=f.children("a"),d=e.data("icon");
e.addClass("pui-menuitem-link ui-corner-all").contents().wrap('<span class="pui-menuitem-text" />');
if(d){e.prepend('<span class="pui-menuitem-icon fa fa-fw '+d+'"></span>')
}f.addClass("pui-menuitem ui-widget ui-corner-all");
if(f.children("ul").length>0){f.addClass("pui-menu-parent");
f.children("ul").addClass("ui-widget-content pui-menu-list ui-corner-all ui-helper-clearfix pui-menu-child ui-shadow");
e.prepend('<span class="pui-submenu-icon fa fa-fw fa-caret-right"></span>')
}})
},_bindEvents:function(){var b=this;
this.links.on("mouseenter.pui-menu",function(){$(this).addClass("ui-state-hover")
}).on("mouseleave.pui-menu",function(){$(this).removeClass("ui-state-hover")
}).on("click.pui-menu",function(){var d=$(this),a=d.next();
if(a.length==1){b._forward(a)
}});
this.backward.on("click.pui-menu",function(){b._back()
})
},_forward:function(d){var f=this;
this._push(d);
var e=-1*(this._depth()*this.jqWidth);
d.show().css({left:this.jqWidth});
this.rootList.animate({left:e},500,"easeInOutCirc",function(){if(f.backward.is(":hidden")){f.backward.fadeIn("fast")
}})
},_back:function(){if(!this.rootList.is(":animated")){var h=this,e=this._pop(),g=this._depth();
var f=-1*(g*this.jqWidth);
this.rootList.animate({left:f},500,"easeInOutCirc",function(){if(e){e.hide()
}if(g===0){h.backward.fadeOut("fast")
}})
}},_push:function(b){this.stack.push(b)
},_pop:function(){return this.stack.pop()
},_last:function(){return this.stack[this.stack.length-1]
},_depth:function(){return this.stack.length
},_applyDimensions:function(){this.submenus.width(this.container.width());
this.wrapper.height(this.rootList.outerHeight(true)+this.backward.outerHeight(true));
this.content.height(this.rootList.outerHeight(true));
this.rendered=true
},show:function(){this.align();
this.container.css("z-index",++PUI.zindex).show();
if(!this.rendered){this._applyDimensions()
}}})
})();
(function(){$.widget("primeui.puicontextmenu",$.primeui.puitieredmenu,{options:{autoDisplay:true,target:null,event:"contextmenu"},_create:function(){this._super();
this.element.parent().removeClass("pui-tieredmenu").addClass("pui-contextmenu pui-menu-dynamic pui-shadow");
var b=this;
if(this.options.target){if($.type(this.options.trigger)==="string"){this.options.trigger=$(this.options.trigger)
}}else{this.options.target=$(document)
}if(!this.element.parent().parent().is(document.body)){this.element.parent().appendTo("body")
}if(this.options.target.hasClass("pui-datatable")){b._bindDataTable()
}else{this.options.target.on(this.options.event+".pui-contextmenu",function(a){b.show(a)
})
}},_bindItemEvents:function(){this._super();
var b=this;
this.links.bind("click",function(){b._hide()
})
},_bindDocumentHandler:function(){var b=this;
$(document.body).on("click.pui-contextmenu",function(a){if(b.element.parent().is(":hidden")){return
}b._hide()
})
},_bindDataTable:function(){var e="#"+this.options.target.attr("id")+" tbody.pui-datatable-data > tr.ui-widget-content:not(.pui-datatable-empty-message)",d=this.options.event+".pui-datatable",f=this;
$(document).off(d,e).on(d,e,null,function(a){f.options.target.puidatatable("onRowRightClick",d,$(this));
f.show(a)
})
},show:function(i){$(document.body).children(".pui-contextmenu:visible").hide();
var j=$(window),k=i.pageX,l=i.pageY,e=this.element.parent().outerWidth(),h=this.element.parent().outerHeight();
if((k+e)>(j.width())+j.scrollLeft()){k=k-e
}if((l+h)>(j.height()+j.scrollTop())){l=l-h
}if(this.options.beforeShow){this.options.beforeShow.call(this)
}this.element.parent().css({left:k,top:l,"z-index":++PUI.zindex}).show();
i.preventDefault();
i.stopPropagation()
},_hide:function(){var b=this;
this.element.parent().find("li.pui-menuitem-active").each(function(){b._deactivate($(this),true)
});
this.element.parent().fadeOut("fast")
},isVisible:function(){return this.element.parent().is(":visible")
},getTarget:function(){return this.jqTarget
}})
})();