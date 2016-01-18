(function(){$.widget("primeui.puipassword",{options:{promptLabel:"Please enter a password",weakLabel:"Weak",goodLabel:"Medium",strongLabel:"Strong",inline:false},_create:function(){this.element.puiinputtext().addClass("pui-password");
if(!this.element.prop(":disabled")){var b='<div class="pui-password-panel ui-widget ui-state-highlight ui-corner-all ui-helper-hidden">';
b+='<div class="pui-password-meter" style="background-position:0pt 0pt">&nbsp;</div>';
b+='<div class="pui-password-info">'+this.options.promptLabel+"</div>";
b+="</div>";
this.panel=$(b).insertAfter(this.element);
this.meter=this.panel.children("div.pui-password-meter");
this.infoText=this.panel.children("div.pui-password-info");
if(this.options.inline){this.panel.addClass("pui-password-panel-inline")
}else{this.panel.addClass("pui-password-panel-overlay").appendTo("body")
}this._bindEvents()
}},_destroy:function(){this.panel.remove()
},_bindEvents:function(){var c=this;
this.element.on("focus.puipassword",function(){c.show()
}).on("blur.puipassword",function(){c.hide()
}).on("keyup.puipassword",function(){var b=c.element.val(),h=null,g=null;
if(b.length===0){h=c.options.promptLabel;
g="0px 0px"
}else{var a=c._testStrength(c.element.val());
if(a<30){h=c.options.weakLabel;
g="0px -10px"
}else{if(a>=30&&a<80){h=c.options.goodLabel;
g="0px -20px"
}else{if(a>=80){h=c.options.strongLabel;
g="0px -30px"
}}}}c.meter.css("background-position",g);
c.infoText.text(h)
});
if(!this.options.inline){var d="resize."+this.element.attr("id");
$(window).unbind(d).bind(d,function(){if(c.panel.is(":visible")){c.align()
}})
}},_unbindEvents:function(){this.element.off("focus.puipassword blur.puipassword keyup.puipassword")
},_testStrength:function(g){var e=0,h=0,f=this;
h=g.match("[0-9]");
e+=f._normalize(h?h.length:1/4,1)*25;
h=g.match("[a-zA-Z]");
e+=f._normalize(h?h.length:1/2,3)*10;
h=g.match("[!@#$%^&*?_~.,;=]");
e+=f._normalize(h?h.length:1/6,1)*35;
h=g.match("[A-Z]");
e+=f._normalize(h?h.length:1/6,1)*30;
e*=g.length/8;
return e>100?100:e
},_normalize:function(e,f){var d=e-f;
if(d<=0){return e/f
}else{return 1+0.5*(e/(e+f/4))
}},align:function(){this.panel.css({left:"",top:"","z-index":++PUI.zindex}).position({my:"left top",at:"right top",of:this.element})
},show:function(){if(!this.options.inline){this.align();
this.panel.fadeIn()
}else{this.panel.slideDown()
}},hide:function(){if(this.options.inline){this.panel.slideUp()
}else{this.panel.fadeOut()
}},disable:function(){this.element.puiinputtext("disable");
this._unbindEvents()
},enable:function(){this.element.puiinputtext("enable");
this._bindEvents()
}})
})();