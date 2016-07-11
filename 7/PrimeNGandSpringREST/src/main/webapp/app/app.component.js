"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var productservice_1 = require('./productservice');
var router_1 = require('@angular/router');
var primeng_1 = require('primeng/primeng');
var http_1 = require('@angular/http');
var ProductsPaginator = (function () {
    function ProductsPaginator(productService) {
        this.productService = productService;
    }
    ProductsPaginator.prototype.ngOnInit = function () {
        var _this = this;
        this.productService.getProducts().then(function (products) { return _this.products = products; });
    };
    ProductsPaginator = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n        <p-dataTable [value]=\"products\" [rows]=\"10\" [paginator]=\"true\" [pageLinks]=\"3\" [rowsPerPageOptions]=\"[5,10,20]\">\n        <header>List of Products</header>\n        <p-column field=\"idproducts\" header=\"id\"></p-column>\n        <p-column field=\"name\" header=\"name\"></p-column>        \n    </p-dataTable>                    \n    ",
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Header, router_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, productservice_1.ProductService]
        }), 
        __metadata('design:paramtypes', [productservice_1.ProductService])
    ], ProductsPaginator);
    return ProductsPaginator;
}());
exports.ProductsPaginator = ProductsPaginator;
//# sourceMappingURL=app.component.js.map