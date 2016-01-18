(function(){$.widget("primeui.puidialog",{options:{draggable:true,resizable:true,location:"center",minWidth:150,minHeight:25,height:"auto",width:"300px",visible:false,modal:false,showEffect:null,hideEffect:null,effectOptions:{},effectSpeed:"normal",closeOnEscape:true,rtl:false,closable:true,minimizable:false,maximizable:false,appendTo:null,buttons:null,responsive:false,title:null},_create:function(){this.id=this.element.attr("id");
if(!this.id){this.id=this.element.uniqueId().attr("id")
}this.element.addClass("pui-dialog ui-widget ui-widget-content ui-helper-hidden ui-corner-all pui-shadow").contents().wrapAll('<div class="pui-dialog-content ui-widget-content" />');
var g=this.options.title||this.element.attr("title");
this.element.prepend('<div class="pui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top"><span id="'+this.element.attr("id")+'_label" class="pui-dialog-title">'+g+"</span>").removeAttr("title");
if(this.options.buttons){this.footer=$('<div class="pui-dialog-buttonpane ui-widget-content ui-helper-clearfix"></div>').appendTo(this.element);
for(var e=0;
e<this.options.buttons.length;
e++){var h=this.options.buttons[e],f=$('<button type="button"></button>').appendTo(this.footer);
if(h.text){f.text(h.text)
}f.puibutton(h)
}}if(this.options.rtl){this.element.addClass("pui-dialog-rtl")
}this.content=this.element.children(".pui-dialog-content");
this.titlebar=this.element.children(".pui-dialog-titlebar");
if(this.options.closable){this._renderHeaderIcon("pui-dialog-titlebar-close","fa-close")
}if(this.options.maximizable){this._renderHeaderIcon("pui-dialog-titlebar-maximize","fa-sort")
}if(this.options.minimizable){this._renderHeaderIcon("pui-dialog-titlebar-minimize","fa-minus")
}this.icons=this.titlebar.children(".pui-dialog-titlebar-icon");
this.closeIcon=this.titlebar.children(".pui-dialog-titlebar-close");
this.minimizeIcon=this.titlebar.children(".pui-dialog-titlebar-minimize");
this.maximizeIcon=this.titlebar.children(".pui-dialog-titlebar-maximize");
this.blockEvents="focus.puidialog mousedown.puidialog mouseup.puidialog keydown.puidialog keyup.puidialog";
this.parent=this.element.parent();
this.element.css({width:this.options.width,height:"auto"});
this.content.height(this.options.height);
this._bindEvents();
if(this.options.draggable){this._setupDraggable()
}if(this.options.resizable){this._setupResizable()
}if(this.options.appendTo){this.element.appendTo(this.options.appendTo)
}if(this.options.responsive){this.resizeNS="resize."+this.id
}if($(document.body).children(".pui-dialog-docking-zone").length===0){$(document.body).append('<div class="pui-dialog-docking-zone"></div>')
}this._applyARIA();
if(this.options.visible){this.show()
}},_renderHeaderIcon:function(d,c){this.titlebar.append('<a class="pui-dialog-titlebar-icon '+d+' ui-corner-all" href="#" role="button"><span class="pui-icon fa fa-fw '+c+'"></span></a>')
},_enableModality:function(){var c=this,d=$(document);
this.modality=$('<div id="'+this.element.attr("id")+'_modal" class="ui-widget-overlay pui-dialog-mask"></div>').appendTo(document.body).css("z-index",this.element.css("z-index")-1);
d.bind("keydown.puidialog",function(b){if(b.keyCode==$.ui.keyCode.TAB){var g=c.content.find(":tabbable"),a=g.filter(":first"),h=g.filter(":last");
if(b.target===h[0]&&!b.shiftKey){a.focus(1);
return false
}else{if(b.target===a[0]&&b.shiftKey){h.focus(1);
return false
}}}}).bind(this.blockEvents,function(a){if($(a.target).zIndex()<c.element.zIndex()){return false
}})
},_disableModality:function(){this.modality.remove();
this.modality=null;
$(document).unbind(this.blockEvents).unbind("keydown.dialog")
},show:function(){if(this.element.is(":visible")){return
}if(!this.positionInitialized){this._initPosition()
}this._trigger("beforeShow",null);
if(this.options.showEffect){var b=this;
this.element.show(this.options.showEffect,this.options.effectOptions,this.options.effectSpeed,function(){b._postShow()
})
}else{this.element.show();
this._postShow()
}this._moveToTop();
if(this.options.modal){this._enableModality()
}},_postShow:function(){this._trigger("afterShow",null);
this.element.attr({"aria-hidden":false,"aria-live":"polite"});
this._applyFocus();
if(this.options.responsive){this._bindResizeListener()
}},hide:function(){if(this.element.is(":hidden")){return
}this._trigger("beforeHide",null);
if(this.options.hideEffect){var b=this;
this.element.hide(this.options.hideEffect,this.options.effectOptions,this.options.effectSpeed,function(){b._postHide()
})
}else{this.element.hide();
this._postHide()
}if(this.options.modal){this._disableModality()
}},_postHide:function(){this._trigger("afterHide",null);
this.element.attr({"aria-hidden":true,"aria-live":"off"});
if(this.options.responsive){this._unbindResizeListener()
}},_applyFocus:function(){this.element.find(":not(:submit):not(:button):input:visible:enabled:first").focus()
},_bindEvents:function(){var b=this;
this.element.mousedown(function(a){if(!$(a.target).data("ui-widget-overlay")){b._moveToTop()
}});
this.icons.mouseover(function(){$(this).addClass("ui-state-hover")
}).mouseout(function(){$(this).removeClass("ui-state-hover")
});
this.closeIcon.on("click.puidialog",function(a){b.hide();
a.preventDefault()
});
this.maximizeIcon.click(function(a){b.toggleMaximize();
a.preventDefault()
});
this.minimizeIcon.click(function(a){b.toggleMinimize();
a.preventDefault()
});
if(this.options.closeOnEscape){$(document).on("keydown.dialog_"+this.element.attr("id"),function(e){var f=$.ui.keyCode,a=parseInt(b.element.css("z-index"),10)===PUI.zindex;
if(e.which===f.ESCAPE&&b.element.is(":visible")&&a){b.hide()
}})
}},_setupDraggable:function(){this.element.draggable({cancel:".pui-dialog-content, .pui-dialog-titlebar-close",handle:".pui-dialog-titlebar",containment:"document"})
},_setupResizable:function(){var b=this;
this.element.resizable({minWidth:this.options.minWidth,minHeight:this.options.minHeight,alsoResize:this.content,containment:"document",start:function(a,d){b.element.data("offset",b.element.offset())
},stop:function(a,f){var e=b.element.data("offset");
b.element.css("position","fixed");
b.element.offset(e)
}});
this.resizers=this.element.children(".ui-resizable-handle")
},_initPosition:function(){this.element.css({left:0,top:0});
if(/(center|left|top|right|bottom)/.test(this.options.location)){this.options.location=this.options.location.replace(","," ");
this.element.position({my:"center",at:this.options.location,collision:"fit",of:window,using:function(a){var c=a.left<0?0:a.left,b=a.top<0?0:a.top;
$(this).css({left:c,top:b})
}})
}else{var d=this.options.position.split(","),e=$.trim(d[0]),f=$.trim(d[1]);
this.element.offset({left:e,top:f})
}this.positionInitialized=true
},_moveToTop:function(){this.element.css("z-index",++PUI.zindex)
},toggleMaximize:function(){if(this.minimized){this.toggleMinimize()
}if(this.maximized){this.element.removeClass("pui-dialog-maximized");
this._restoreState();
this.maximizeIcon.removeClass("ui-state-hover");
this.maximized=false
}else{this._saveState();
var b=$(window);
this.element.addClass("pui-dialog-maximized").css({width:b.width()-6,height:b.height()}).offset({top:b.scrollTop(),left:b.scrollLeft()});
this.content.css({width:"auto",height:"auto"});
this.maximizeIcon.removeClass("ui-state-hover");
this.maximized=true;
this._trigger("maximize")
}},toggleMinimize:function(){var e=true,f=$(document.body).children(".pui-dialog-docking-zone");
if(this.maximized){this.toggleMaximize();
e=false
}var d=this;
if(this.minimized){this.element.appendTo(this.parent).removeClass("pui-dialog-minimized").css({position:"fixed","float":"none"});
this._restoreState();
this.content.show();
this.minimizeIcon.removeClass("ui-state-hover");
this.minimized=false;
if(this.options.resizable){this.resizers.show()
}if(this.footer){this.footer.show()
}}else{this._saveState();
if(e){this.element.effect("transfer",{to:f,className:"pui-dialog-minimizing"},500,function(){d._dock(f);
d.element.addClass("pui-dialog-minimized")
})
}else{this._dock(f)
}}},_dock:function(b){this.element.appendTo(b).css("position","static");
this.element.css({height:"auto",width:"auto","float":"left"});
this.content.hide();
this.minimizeIcon.removeClass("ui-state-hover").children(".ui-icon").removeClass("ui-icon-minus").addClass("ui-icon-plus");
this.minimized=true;
if(this.options.resizable){this.resizers.hide()
}if(this.footer){this.footer.hide()
}b.css("z-index",++PUI.zindex);
this._trigger("minimize")
},_saveState:function(){this.state={width:this.element.width(),height:this.element.height()};
var b=$(window);
this.state.offset=this.element.offset();
this.state.windowScrollLeft=b.scrollLeft();
this.state.windowScrollTop=b.scrollTop()
},_restoreState:function(){this.element.width(this.state.width).height(this.state.height);
var b=$(window);
this.element.offset({top:this.state.offset.top+(b.scrollTop()-this.state.windowScrollTop),left:this.state.offset.left+(b.scrollLeft()-this.state.windowScrollLeft)})
},_applyARIA:function(){this.element.attr({role:"dialog","aria-labelledby":this.element.attr("id")+"_title","aria-hidden":!this.options.visible});
this.titlebar.children("a.pui-dialog-titlebar-icon").attr("role","button")
},_bindResizeListener:function(){var b=this;
$(window).on(this.resizeNS,function(a){if(a.target===window){b._initPosition()
}})
},_unbindResizeListener:function(){$(window).off(this.resizeNS)
}})
})();