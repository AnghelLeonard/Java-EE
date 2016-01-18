(function(){$.widget("primeui.puiselectbutton",{options:{choices:null,formfield:null,unselectable:false,tabindex:"0",multiple:false},_create:function(){this.element.addClass("pui-selectbutton pui-buttonset ui-widget ui-corner-all").attr("tabindex");
if(this.options.choices){this.element.addClass("pui-buttonset-"+this.options.choices.length);
for(var c=0;
c<this.options.choices.length;
c++){this.element.append('<div class="pui-button ui-widget ui-state-default pui-button-text-only" tabindex="'+this.options.tabindex+'" data-value="'+this.options.choices[c].value+'"><span class="pui-button-text ui-c">'+this.options.choices[c].label+"</span></div>")
}}this.buttons=this.element.children("div.pui-button");
this.buttons.filter(":first-child").addClass("ui-corner-left");
this.buttons.filter(":last-child").addClass("ui-corner-right");
if(!this.options.multiple){this.input=$('<input type="hidden"></input>').appendTo(this.element)
}else{this.input=$('<select class="ui-helper-hidden-accessible" multiple></select>').appendTo(this.element);
for(var c=0;
c<this.options.choices.length;
c++){var d='<option value = "'+this.options.choices[c].value+'"></option>';
this.input.append(d)
}this.selectOptions=this.input.children("option")
}if(this.options.formfield){this.input.attr("name",this.options.formfield)
}this._bindEvents()
},_bindEvents:function(){var b=this;
this.buttons.on("mouseover",function(){var a=$(this);
if(!a.hasClass("ui-state-active")){a.addClass("ui-state-hover")
}}).on("mouseout",function(){$(this).removeClass("ui-state-hover")
}).on("click",function(d){var a=$(this);
if($(this).hasClass("ui-state-active")){if(b.options.unselectable){b.unselectOption(a);
b._trigger("change",d)
}}else{if(b.options.multiple){b.selectOption(a)
}else{b.unselectOption(a.siblings(".ui-state-active"));
b.selectOption(a)
}b._trigger("change",d)
}}).on("focus",function(){$(this).addClass("ui-state-focus")
}).on("blur",function(){$(this).removeClass("ui-state-focus")
}).on("keydown",function(d){var a=$.ui.keyCode;
if(d.which===a.ENTER){b.element.trigger("click");
d.preventDefault()
}}).on("keydown",function(d){var a=$.ui.keyCode;
if(d.which===a.SPACE||d.which===a.ENTER||d.which===a.NUMPAD_ENTER){$(this).trigger("click");
d.preventDefault()
}})
},selectOption:function(c){var d=$.isNumeric(c)?this.element.children(".pui-button").eq(c):c;
if(this.options.multiple){this.selectOptions.eq(d.index()).prop("selected",true)
}else{this.input.val(d.data("value"))
}d.addClass("ui-state-active")
},unselectOption:function(c){var d=$.isNumeric(c)?this.element.children(".pui-button").eq(c):c;
if(this.options.multiple){this.selectOptions.eq(d.index()).prop("selected",false)
}else{this.input.val("")
}d.removeClass("ui-state-active");
d.removeClass("ui-state-focus")
}})
})();