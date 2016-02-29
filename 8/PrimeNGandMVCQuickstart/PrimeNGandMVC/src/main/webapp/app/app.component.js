System.register(['angular2/core', './service', 'primeng/primeng', 'angular2/http', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, service_1, primeng_1, http_1, router_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_1_1) {
                service_1 = service_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_helloService) {
                    this._helloService = _helloService;
                    this.msgs = [];
                }
                AppComponent.prototype.sayHello = function () {
                    var _this = this;
                    this._helloService.goSayHello(this.text)
                        .subscribe(function (data) { return _this.logMessage(data); }, function (error) { return _this.errorMessage = error; });
                };
                AppComponent.prototype.logMessage = function (message) {
                    this.msgs = [];
                    this.msgs.push({ severity: 'info', summary: 'Info Message', detail: message });
                };
                AppComponent = __decorate([
                    // just in case you will need it
                    core_1.Component({
                        selector: 'hello',
                        template: "\n        <h3>Say hello to:</h3>               \n        <input id=\"in\" type=\"text\" size=\"30\" pInputText [(ngModel)]=\"text\" />\n        <button type=\"button\" pButton (click)=\"sayHello()\">Hello {{text}}!</button>            \n        <p-messages [value]=\"msgs\"></p-messages>\n    ",
                        directives: [primeng_1.Messages],
                        providers: [http_1.HTTP_PROVIDERS, router_1.ROUTER_DIRECTIVES, service_1.HelloService],
                        styles: ['.error {color:red;}']
                    }), 
                    __metadata('design:paramtypes', [service_1.HelloService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map