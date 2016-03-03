import {Injectable}     from 'angular2/core';
import {Http}           from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HelloService {
  constructor (private http: Http) {}

  private _helloUrl = 'resources/sayhello/hello'; 

  goSayHello (name: string) : Observable<string>  {  
      
    var _paramUrl = this._helloUrl + "?name=" + name;  

    return this.http.get(_paramUrl)
                    .map(res =>  <string> res.text())
                    .do(data => console.log(data)) 
                    .catch(this.handleError)                  
  }
  
  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
                        