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
        this.page = 0;
    };
    ProductsPaginator.prototype.loadProductsLazy = function (event) {
        var _this = this;
        this.page = event.first / event.rows;
        this.productService.getProductsPage(this.page, event.rows).then(function (root) {
            _this.root = root;
            _this.items = _this.root._embedded.items;
            _this.totalRecords = _this.root.page.totalElements;
            // display some HATEOAS
            _this.listHATEOAS();
        });
        // state metadata from event
        // event.first = First row offset
        // event.rows = Number of rows per page
        // event.sortField = Field name to sort with
        // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        // filters: FilterMetadata object having field as key and filter value, filter matchMode as value                               
    };
    ProductsPaginator.prototype.listHATEOAS = function () {
        // before using Spring Data REST HATEOAS, you may want to check if PrimeNG doesn't already have the feature
        alert("Search: " + this.root._links.search.href + "\n" +
            "Profile: " + this.root._links.profile.href + "\n" +
            "Current page (self): " + this.root._links.self.href + "\n" +
            "Page size: " + this.root.page.size + "\n" +
            "Total elements: " + this.root.page.totalElements + "\n" +
            "Total pages: " + this.root.page.totalPages + "\n" +
            "Number: " + this.root.page.number + "\n" +
            "First page: " + (this.root._links.first ? this.root._links.first.href : "Not available") + "\n" +
            "Previous page: " + (this.root._links.prev ? this.root._links.prev.href : "Not available") + "\n" +
            "Next page: " + (this.root._links.next ? this.root._links.next.href : "Not available") + "\n" +
            "Last page: " + (this.root._links.last ? this.root._links.last.href : "Not available") + "\n" +
            "...");
    };
    ProductsPaginator = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n        <p-dataTable [value]=\"items\" [lazy]=\"true\" [rows]=\"5\" [paginator]=\"true\" \n            [totalRecords]=\"totalRecords\" (onLazyLoad)=\"loadProductsLazy($event)\">\n        <header>List of Items</header>        \n        ><p-column field=\"name\" header=\"name\"><a href=\"#\">Text</a></p-column>\n        <p-column field=\"code\" header=\"code\"></p-column>        \n    </p-dataTable>                    \n    ",
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Header, router_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, productservice_1.ProductService]
        }), 
        __metadata('design:paramtypes', [productservice_1.ProductService])
    ], ProductsPaginator);
    return ProductsPaginator;
}());
exports.ProductsPaginator = ProductsPaginator;
//# sourceMappingURL=app.component.js.map