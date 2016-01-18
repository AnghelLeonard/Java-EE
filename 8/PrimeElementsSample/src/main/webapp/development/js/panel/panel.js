(function(){$.widget("primeui.puipanel",{options:{toggleable:false,toggleDuration:"normal",toggleOrientation:"vertical",collapsed:false,closable:false,closeDuration:"slow",title:null},_create:function(){this.element.addClass("pui-panel ui-widget ui-widget-content ui-corner-all").contents().wrapAll('<div class="pui-panel-content ui-widget-content" />');
var f=this.element.attr("title")||this.options.title;
if(f){this.element.prepend('<div class="pui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all"><span class="ui-panel-title">'+f+"</span></div>").removeAttr("title")
}this.header=this.element.children("div.pui-panel-titlebar");
this.title=this.header.children("span.ui-panel-title");
this.content=this.element.children("div.pui-panel-content");
var d=this;
if(this.options.closable){this.closer=$('<a class="pui-panel-titlebar-icon ui-corner-all ui-state-default" href="#"><span class="pui-icon fa fa-fw fa-close"></span></a>').appendTo(this.header).on("click.puipanel",function(a){d.close();
a.preventDefault()
})
}if(this.options.toggleable){var e=this.options.collapsed?"fa-plus":"fa-minus";
this.toggler=$('<a class="pui-panel-titlebar-icon ui-corner-all ui-state-default" href="#"><span class="pui-icon fa fa-fw '+e+'"></span></a>').appendTo(this.header).on("click.puipanel",function(a){d.toggle();
a.preventDefault()
});
if(this.options.collapsed){this.content.hide()
}}this._bindEvents()
},_bindEvents:function(){this.header.find("a.pui-panel-titlebar-icon").on("mouseenter.puipanel",function(){$(this).addClass("ui-state-hover")
}).on("mouseleave.puipanel",function(){$(this).removeClass("ui-state-hover")
})
},close:function(){var b=this;
this._trigger("beforeClose",null);
this.element.fadeOut(this.options.closeDuration,function(){b._trigger("afterClose",null)
})
},toggle:function(){if(this.options.collapsed){this.expand()
}else{this.collapse()
}},expand:function(){this.toggler.children(".pui-icon").removeClass("fa-plus").addClass("fa-minus");
if(this.options.toggleOrientation==="vertical"){this._slideDown()
}else{if(this.options.toggleOrientation==="horizontal"){this._slideRight()
}}},collapse:function(){this.toggler.children(".pui-icon").removeClass("fa-minus").addClass("fa-plus");
if(this.options.toggleOrientation==="vertical"){this._slideUp()
}else{if(this.options.toggleOrientation==="horizontal"){this._slideLeft()
}}},_slideUp:function(){var b=this;
this._trigger("beforeCollapse");
this.content.slideUp(this.options.toggleDuration,"easeInOutCirc",function(){b._trigger("afterCollapse");
b.options.collapsed=!b.options.collapsed
})
},_slideDown:function(){var b=this;
this._trigger("beforeExpand");
this.content.slideDown(this.options.toggleDuration,"easeInOutCirc",function(){b._trigger("afterExpand");
b.options.collapsed=!b.options.collapsed
})
},_slideLeft:function(){var b=this;
this.originalWidth=this.element.width();
this.title.hide();
this.toggler.hide();
this.content.hide();
this.element.animate({width:"42px"},this.options.toggleSpeed,"easeInOutCirc",function(){b.toggler.show();
b.element.addClass("pui-panel-collapsed-h");
b.options.collapsed=!b.options.collapsed
})
},_slideRight:function(){var c=this,d=this.originalWidth||"100%";
this.toggler.hide();
this.element.animate({width:d},this.options.toggleSpeed,"easeInOutCirc",function(){c.element.removeClass("pui-panel-collapsed-h");
c.title.show();
c.toggler.show();
c.options.collapsed=!c.options.collapsed;
c.content.css({visibility:"visible",display:"block",height:"auto"})
})
}})
})();