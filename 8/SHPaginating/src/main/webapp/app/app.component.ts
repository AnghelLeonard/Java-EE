import {Component, OnInit} from '@angular/core';
import {ProductService} from './productservice';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DataTable, Column, Header} from 'primeng/primeng';
import {HTTP_PROVIDERS} from '@angular/http';
import {Root} from './json/root';
import {Items} from './json/items';
import {LazyLoadEvent} from './lazyloadevent/lazyloadevent';

@Component({
	selector: 'my-app',	
	template: `
        <p-dataTable [value]="items" [lazy]="true" [rows]="5" [paginator]="true" 
            [totalRecords]="totalRecords" (onLazyLoad)="loadProductsLazy($event)">
        <header>List of Items</header>        
        ><p-column field="name" header="name"><a href="#">Text</a></p-column>
        <p-column field="code" header="code"></p-column>        
    </p-dataTable>                    
    `, 
    directives: [DataTable, Column, Header, ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,ProductService]
})

export class ProductsPaginator implements OnInit {
       
    totalRecords: number;
    root: Root;
    items: Items[];    
    page: number;

    constructor(private productService: ProductService) { }  

    ngOnInit() {        
        this.page = 0;
    }

    loadProductsLazy(event: LazyLoadEvent) {
    
	this.page = event.first/event.rows;	
     
    this.productService.getProductsPage(this.page, event.rows).then(root => {
         this.root = root;
         this.items = this.root._embedded.items;
         this.totalRecords = this.root.page.totalElements;              

         // display some HATEOAS
         this.listHATEOAS();
        });

        // state metadata from event
        // event.first = First row offset
        // event.rows = Number of rows per page
        // event.sortField = Field name to sort with
        // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        // filters: FilterMetadata object having field as key and filter value, filter matchMode as value                               
    }

    private listHATEOAS()  {
        // before using Spring Data REST HATEOAS, you may want to check if PrimeNG doesn't already have the feature
    	alert("Search: " + this.root._links.search.href + "\n" +
    	      "Profile: " + this.root._links.profile.href + "\n" + 
    	      "Current page (self): " + this.root._links.self.href + "\n" + 
    	      "Page size: " + this.root.page.size + "\n" + 
    	      "Total elements: "+ this.root.page.totalElements + "\n" + 
    	      "Total pages: " + this.root.page.totalPages + "\n" + 
    	      "Number: " + this.root.page.number + "\n" + 
    	      "First page: " + (this.root._links.first ? this.root._links.first.href : "Not available")  + "\n" + 
    	      "Previous page: " + (this.root._links.prev ? this.root._links.prev.href : "Not available") + "\n" + 
    	      "Next page: " + (this.root._links.next ? this.root._links.next.href : "Not available") + "\n" + 
    	      "Last page: " + (this.root._links.last ? this.root._links.last.href : "Not available") + "\n" + 
    	      "...");

    }
}