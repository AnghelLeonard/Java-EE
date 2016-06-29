import {Component} from '@angular/core';
import {AuthService} from './authservice';
import {SecretService} from './secretservice';
import {InputText, Password, Button, Messages, Message} from 'primeng/primeng';
import {HTTP_PROVIDERS} from '@angular/http';

@Component({
	selector: 'my-app',	
	template: `
        <h3>Authenticate (create new client):</h3>               
        <input id="app" type="text" size="30" pInputText [(ngModel)]="client" placeholder="Required" />
        <input id="pass" type="password" size="30" pPassword [(ngModel)]="password" placeholder="Required" />
        <button type="button" pButton (click)="newClient()">New client: {{client}}</button>            
        <button type="button" pButton (click)="forbiddenResource()">Send ID {{secretid}}</button>            
        <p-messages [value]="msgs_infos"></p-messages> 
        <p-messages [value]="msgs_errors"></p-messages>                    
    `,
    directives:[Messages],
    providers: [HTTP_PROVIDERS, AuthService, SecretService]
})

export class AppComponent {       

    constructor (private _authService: AuthService, private _secretService: SecretService) {}    
    
    private client: string;
    private password: string;
    private jwt: string;
    private secretid = "PrimeNG-Rocks!";

    errorMessage: string;       
    msgs_errors: Message[] = [];    
    msgs_infos: Message[] = [];    
    
     // creating a new client based on client and password
     newClient() {       
            this.logInfoMessage("Creating a new client ...");
            this.msgs_errors = [];
            this._authService.serviceNewClient(this.client, this.password)
                   .then(
                     data => this.getJWT(data["apiKey"]),
                     error =>  this.logErrorMessage(error));                                                     
    }

    // get the JWT based on api key and
    getJWT(apiKey: string) {    

           // check apiKey is not null or empty string

           this.logInfoMessage("Get a new JWT for credentials '" + this.client + "' | '" + this.password + "'");
           this.msgs_errors = [];

           this._authService.serviceGetJWT(this.password, apiKey)
                   .then(
                     data => this.verifyJWT(data),
                     error =>  this.logErrorMessage(error)); 
    }

    // verify that the JWT is valid
    verifyJWT(jwt: string) {

            // check JWT is not null or empty string  

            this.logInfoMessage("Verify if JWT " + jwt.substring(0, 20) + "... is valid");
            this.msgs_errors = [];          

            this._authService.serviceVerifyJWT(jwt)
                   .then(
                     data => this.setJWTInMemory(data, jwt),
                     error =>  this.logErrorMessage(error)); 
    }

    // store JWT in memory, but you better use local/session storage
    private setJWTInMemory(valid: string, jwt: string) {
    
        this.logInfoMessage("Store JWT in memory");
        this.msgs_errors = [];          

        if(valid) {
            this.jwt = jwt;                 
        } else {
            this.logErrorMessage("Your JWT is not valid");
     }

    }

    // access a forbidden resource by passing our JWT
    forbiddenResource() {

        this.logInfoMessage("Accessing the secret service that needs authentication");
        this.msgs_errors = [];          

        //if(this.jwt) {
            this._secretService.sendSecretID(this.secretid, this.jwt)
                   .then(
                     data => this.logInfoMessage(data),
                     error =>  this.logErrorMessage(error)); 
        //} else {            
        //    this.logErrorMessage("I don't think you have a JWT");
        //}        
    }    
                    
    private logErrorMessage(message: string) {    
     this.msgs_errors = [];      
     this.msgs_errors.push({severity:'error', summary:'Error Message', detail:message});
    }                    

    private logInfoMessage(message: string) {          
     this.msgs_infos.push({severity:'info', summary:'Info Message', detail:message});
    }     
}
