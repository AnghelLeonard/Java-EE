import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  constructor (private http: Http) {}

  private _authUrl = 'http://localhost:8587/';

  private _newClientUrl = this._authUrl + 'clients.json';   
  private _newJWTUrl = this._authUrl + 'jwts.json';
  private _verifyJWTUrl = this._authUrl + 'jwts';

  serviceNewClient (client: string, password: string) {  
      
    var _json = JSON.stringify({"application": client, "secret": password});    

    return this.http.post(this._newClientUrl, _json, {})
                    .toPromise()
                    .then(res =>  res.json())
                    .then(data => { 
                      console.log(data); 
                      return data; 
                     })
                    .catch(this.handleError)                  
  }

  serviceGetJWT(password: string, apiKey: string) {

    var _newJWTUrlWithParams = this._newJWTUrl + '?' + 'apiKey=' + apiKey + '&secret=' + password;

    return this.http.get(_newJWTUrlWithParams)
                    .toPromise()
                    .then(res =>  res.json())
                    .then(data => { 
                      console.log(data); 
                      return data; 
                     }) 
                    .catch(this.handleError)                  
  }  

  serviceVerifyJWT(jwt: string) {

    var _verifyJWTUrlWithParams = this._verifyJWTUrl + '/' + jwt;

    return this.http.get(_verifyJWTUrlWithParams)
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