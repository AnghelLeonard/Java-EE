(function(){$.widget("primeui.puispinner",{options:{step:1,min:undefined,max:undefined,prefix:null,suffix:null},_create:function(){var d=this.element,c=d.prop("disabled");
d.puiinputtext().addClass("pui-spinner-input").wrap('<span class="pui-spinner ui-widget ui-corner-all" />');
this.wrapper=d.parent();
this.wrapper.append('<a class="pui-spinner-button pui-spinner-up ui-corner-tr pui-button ui-widget ui-state-default pui-button-text-only"><span class="pui-button-text"><span class="pui-icon fa fa-fw fa-caret-up"></span></span></a><a class="pui-spinner-button pui-spinner-down ui-corner-br pui-button ui-widget ui-state-default pui-button-text-only"><span class="pui-button-text"><span class="pui-icon fa fa-fw fa-caret-down"></span></span></a>');
this.upButton=this.wrapper.children("a.pui-spinner-up");
this.downButton=this.wrapper.children("a.pui-spinner-down");
this.options.step=this.options.step||1;
if(parseInt(this.options.step,10)===0){this.options.precision=this.options.step.toString().split(/[,]|[.]/)[1].length
}this._initValue();
if(!c&&!d.prop("readonly")){this._bindEvents()
}if(c){this.wrapper.addClass("ui-state-disabled")
}d.attr({role:"spinner","aria-multiline":false,"aria-valuenow":this.value});
if(this.options.min!==undefined){d.attr("aria-valuemin",this.options.min)
}if(this.options.max!==undefined){d.attr("aria-valuemax",this.options.max)
}if(d.prop("disabled")){d.attr("aria-disabled",true)
}if(d.prop("readonly")){d.attr("aria-readonly",true)
}},_bindEvents:function(){var b=this;
this.wrapper.children(".pui-spinner-button").mouseover(function(){$(this).addClass("ui-state-hover")
}).mouseout(function(){$(this).removeClass("ui-state-hover ui-state-active");
if(b.timer){window.clearInterval(b.timer)
}}).mouseup(function(){window.clearInterval(b.timer);
$(this).removeClass("ui-state-active").addClass("ui-state-hover")
}).mousedown(function(e){var f=$(this),a=f.hasClass("pui-spinner-up")?1:-1;
f.removeClass("ui-state-hover").addClass("ui-state-active");
if(b.element.is(":not(:focus)")){b.element.focus()
}b._repeat(null,a);
e.preventDefault()
});
this.element.keydown(function(d){var a=$.ui.keyCode;
switch(d.which){case a.UP:b._spin(b.options.step);
break;
case a.DOWN:b._spin(-1*b.options.step);
break;
default:break
}}).keyup(function(){b._updateValue()
}).blur(function(){b._format()
}).focus(function(){b.element.val(b.value)
});
this.element.bind("mousewheel",function(a,d){if(b.element.is(":focus")){if(d>0){b._spin(b.options.step)
}else{b._spin(-1*b.options.step)
}return false
}})
},_repeat:function(f,e){var g=this,h=f||500;
window.clearTimeout(this.timer);
this.timer=window.setTimeout(function(){g._repeat(40,e)
},h);
this._spin(this.options.step*e)
},_toFixed:function(f,e){var d=Math.pow(10,e||0);
return String(Math.round(f*d)/d)
},_spin:function(d){var f,e=this.value?this.value:0;
if(this.options.precision){f=parseFloat(this._toFixed(e+d,this.options.precision))
}else{f=parseInt(e+d,10)
}if(this.options.min!==undefined&&f<this.options.min){f=this.options.min
}if(this.options.max!==undefined&&f>this.options.max){f=this.options.max
}this.element.val(f).attr("aria-valuenow",f);
this.value=f;
this.element.trigger("change")
},_updateValue:function(){var b=this.element.val();
if(b===""){if(this.options.min!==undefined){this.value=this.options.min
}else{this.value=0
}}else{if(this.options.step){b=parseFloat(b)
}else{b=parseInt(b,10)
}if(!isNaN(b)){this.value=b
}}},_initValue:function(){var b=this.element.val();
if(b===""){if(this.options.min!==undefined){this.value=this.options.min
}else{this.value=0
}}else{if(this.options.prefix){b=b.split(this.options.prefix)[1]
}if(this.options.suffix){b=b.split(this.options.suffix)[0]
}if(this.options.step){this.value=parseFloat(b)
}else{this.value=parseInt(b,10)
}}},_format:function(){var b=this.value;
if(this.options.prefix){b=this.options.prefix+b
}if(this.options.suffix){b=b+this.options.suffix
}this.element.val(b)
},_unbindEvents:function(){this.wrapper.children(".pui-spinner-button").off();
this.element.off()
},enable:function(){this.wrapper.removeClass("ui-state-disabled");
this.element.puiinputtext("enable");
this._bindEvents()
},disable:function(){this.wrapper.addClass("ui-state-disabled");
this.element.puiinputtext("disable");
this._unbindEvents()
}})
})();