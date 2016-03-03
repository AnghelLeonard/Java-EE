import {Component} from 'angular2/core';
import {HelloService} from './service';
import {InputText, Button, Messages} from 'primeng/primeng';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router'; // just in case you will need it

@Component({
	selector: 'hello',	
	template: `
        <h3>Say hello to:</h3>               
        <input id="in" type="text" size="30" pInputText [(ngModel)]="text" />
        <button type="button" pButton (click)="sayHello()">Hello {{text}}!</button>            
        <p-messages [value]="msgs"></p-messages>
    `,
    directives:[Messages],
    providers: [HTTP_PROVIDERS, ROUTER_DIRECTIVES, HelloService],
     styles: ['.error {color:red;}']
})

export class AppComponent {   

    constructor (private _helloService: HelloService) {}
    
    msgs: Message[] = [];
    text: string;
    errorMessage: string;       
    
     sayHello() {                       
        this._helloService.goSayHello(this.text)
                   .subscribe(
                     data => this.logMessage(data),
                     error =>  this.errorMessage = <any>error);                                                     
    }
                         
    private logMessage(message: string) {                        
     this.msgs = [];   
     this.msgs.push({severity:'info', summary:'Info Message', detail:message});
    }
}