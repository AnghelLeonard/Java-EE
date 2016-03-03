import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
export declare class HelloService {
    private http;
    constructor(http: Http);
    private _helloUrl;
    goSayHello(name: string): Observable<string>;
    private handleError(error);
}
