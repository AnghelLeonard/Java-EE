import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Product} from './product'

@Injectable()
export class ProductService {
    
    constructor(private http: Http) {}

    getProducts() {
        return this.http.get('/PrimeNGandSpringREST/products')
                    .toPromise()
                    .then(res => <Product[]>res.json())
                    .then(data => { console.log(data); return data; });
    }
}