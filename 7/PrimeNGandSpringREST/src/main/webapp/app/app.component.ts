import {Component, OnInit} from '@angular/core';
import {ProductService} from './productservice';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Product} from './product'
import {DataTable, Column, Header} from 'primeng/primeng';
import {HTTP_PROVIDERS} from '@angular/http';

@Component({
	selector: 'my-app',	
	template: `
        <p-dataTable [value]="products" [rows]="10" [paginator]="true" [pageLinks]="3" [rowsPerPageOptions]="[5,10,20]">
        <header>List of Products</header>
        <p-column field="idproducts" header="id"></p-column>
        <p-column field="name" header="name"></p-column>        
    </p-dataTable>                    
    `,
    directives: [DataTable, Column, Header, ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,ProductService]
})

export class ProductsPaginator implements OnInit {

    products: Product[];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts().then(products => this.products = products);
    }
}