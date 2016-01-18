(function(){$.widget("primeui.puirating",{options:{stars:5,cancel:true,readonly:false,disabled:false},_create:function(){var f=this.element;
f.wrap("<div />");
this.container=f.parent();
this.container.addClass("pui-rating");
var i=f.val(),h=i===""?null:parseInt(i,10);
if(this.options.cancel){this.container.append('<div class="pui-rating-cancel"><a></a></div>')
}for(var j=0;
j<this.options.stars;
j++){var g=(h>j)?"pui-rating-star pui-rating-star-on":"pui-rating-star";
this.container.append('<div class="'+g+'"><a></a></div>')
}this.stars=this.container.children(".pui-rating-star");
if(f.prop("disabled")||this.options.disabled){this.container.addClass("ui-state-disabled")
}else{if(!f.prop("readonly")&&!this.options.readonly){this._bindEvents()
}}},_bindEvents:function(){var b=this;
this.stars.click(function(){var a=b.stars.index(this)+1;
b.setValue(a)
});
this.container.children(".pui-rating-cancel").hover(function(){$(this).toggleClass("pui-rating-cancel-hover")
}).click(function(){b.cancel()
})
},cancel:function(){this.element.val("");
this.stars.filter(".pui-rating-star-on").removeClass("pui-rating-star-on");
this._trigger("oncancel",null)
},getValue:function(){var b=this.element.val();
return b===""?null:parseInt(b,10)
},setValue:function(c){this.element.val(c);
this.stars.removeClass("pui-rating-star-on");
for(var d=0;
d<c;
d++){this.stars.eq(d).addClass("pui-rating-star-on")
}this._trigger("rate",null,c)
},enable:function(){this.container.removeClass("ui-state-disabled");
this._bindEvents()
},disable:function(){this.container.addClass("ui-state-disabled");
this._unbindEvents()
},_unbindEvents:function(){this.stars.off("click");
this.container.children(".pui-rating-cancel").off("hover click")
}})
})();