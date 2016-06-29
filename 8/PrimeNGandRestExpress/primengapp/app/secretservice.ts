import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SecretService {
  constructor (private http: Http) {}

  private _authUrl = 'http://localhost:8086/';
  
  sendSecretID(secretid: string, jwt: string) {

    var _newSecretUrlWithParams = this._authUrl + 'secret/' + secretid;
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + jwt);

    return this.http.get(_newSecretUrlWithParams, {headers: headers})
                    .toPromise()
                    .then(res =>  res.json())
                    .then(data => { 
                      console.log(data); 
                      return data; 
                     }) 
                    .catch(this.handleError)                  
  }  

 private handleError (error: any) {
   // In a real world app, we might use a remote logging infrastructure
   // We'd also dig deeper into the error to get a better message
   let errMsg = (error) ? JSON.stringify(error) : 'Server error';
   console.error(errMsg); // log to console instead

   return Promise.reject(errMsg);
 }
}