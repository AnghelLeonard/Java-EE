(function(){$.widget("primeui.puiprogressbar",{options:{value:0,labelTemplate:"{value}%",complete:null,easing:"easeInOutCirc",effectSpeed:"normal",showLabel:true},_create:function(){this.element.addClass("pui-progressbar ui-widget ui-widget-content ui-corner-all").append('<div class="pui-progressbar-value ui-widget-header ui-corner-all"></div>').append('<div class="pui-progressbar-label"></div>');
this.jqValue=this.element.children(".pui-progressbar-value");
this.jqLabel=this.element.children(".pui-progressbar-label");
if(this.options.value!==0){this._setValue(this.options.value,false)
}this.enableARIA()
},_setValue:function(g,e){var h=(e===undefined||e)?true:false;
if(g>=0&&g<=100){if(g===0){this.jqValue.hide().css("width","0%").removeClass("ui-corner-right");
this.jqLabel.hide()
}else{if(h){this.jqValue.show().animate({width:g+"%"},this.options.effectSpeed,this.options.easing)
}else{this.jqValue.show().css("width",g+"%")
}if(this.options.labelTemplate&&this.options.showLabel){var f=this.options.labelTemplate.replace(/{value}/gi,g);
this.jqLabel.html(f).show()
}if(g===100){this._trigger("complete")
}}this.options.value=g;
this.element.attr("aria-valuenow",g)
}},_getValue:function(){return this.options.value
},enableARIA:function(){this.element.attr("role","progressbar").attr("aria-valuemin",0).attr("aria-valuenow",this.options.value).attr("aria-valuemax",100)
},_setOption:function(d,c){if(d==="value"){this._setValue(c)
}$.Widget.prototype._setOption.apply(this,arguments)
},_destroy:function(){}})
})();