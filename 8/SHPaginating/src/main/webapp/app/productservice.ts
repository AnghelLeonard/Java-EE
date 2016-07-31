import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Root} from './json/root';

@Injectable()
export class ProductService {
    
    constructor(private http: Http) {}
 
    getProductsPage(page: number, size: number) {
        return this.http.get('/SHPaginating/items/?page=' + page + "&size=" + size + "&sort=name&name.dir=asc")
                    .toPromise()
                    .then(res => <Root>res.json())
                    .then(data => { console.log(data);return data; });
    }
}