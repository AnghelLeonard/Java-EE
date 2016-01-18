(function(){$.widget("primeui.puiterminal",{options:{welcomeMessage:"",prompt:"prime $",handler:null},_create:function(){this.element.addClass("pui-terminal ui-widget ui-widget-content ui-corner-all").append("<div>"+this.options.welcomeMessage+"</div>").append('<div class="pui-terminal-content"></div>').append('<div><span class="pui-terminal-prompt">'+this.options.prompt+'</span><input type="text" class="pui-terminal-input" autocomplete="off"></div>');
this.promptContainer=this.element.find("> div:last-child > span.pui-terminal-prompt");
this.content=this.element.children(".pui-terminal-content");
this.input=this.promptContainer.next();
this.commands=[];
this.commandIndex=0;
this._bindEvents()
},_bindEvents:function(){var b=this;
this.input.on("keydown.terminal",function(d){var a=$.ui.keyCode;
switch(d.which){case a.UP:if(b.commandIndex>0){b.input.val(b.commands[--b.commandIndex])
}d.preventDefault();
break;
case a.DOWN:if(b.commandIndex<(b.commands.length-1)){b.input.val(b.commands[++b.commandIndex])
}else{b.commandIndex=b.commands.length;
b.input.val("")
}d.preventDefault();
break;
case a.ENTER:case a.NUMPAD_ENTER:b._processCommand();
d.preventDefault();
break
}});
this.element.on("click",function(){b.input.trigger("focus")
})
},_processCommand:function(){var b=this.input.val();
this.commands.push();
this.commandIndex++;
if(this.options.handler&&$.type(this.options.handler)==="function"){this.options.handler.call(this,b,this._updateContent)
}},_updateContent:function(d){var c=$("<div></div>");
c.append("<span>"+this.options.prompt+'</span><span class="pui-terminal-command">'+this.input.val()+"</span>").append("<div>"+d+"</div>").appendTo(this.content);
this.input.val("");
this.element.scrollTop(this.content.height())
},clear:function(){this.content.html("");
this.input.val("")
}})
})();