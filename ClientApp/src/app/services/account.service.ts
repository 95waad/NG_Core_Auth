import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';


/*
 * The @Injectable decorator has been applied to the AccountService class. 
 * This decorator is used to tell Angular that this class will be used as a service,  
 * by doing this other classes are allowed to access the functionality of our account service class through a feature called dependency injection. 
*/ 

@Injectable({
  providedIn: 'root'
})

 export class AccountService {

    // Need HttpClient to communicate over HTTP with Web API
    constructor(private http : HttpClient) { }

    // Url to access our Web API’s
    private baseUrlLogin : string = "/api/account/login";

    // User related properties
    private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
    private UserName    = new BehaviorSubject<string>(localStorage.getItem('username'));
    private UserRole    = new BehaviorSubject<string>(localStorage.getItem('userRole'));

    //Login Method
    login(username: string, password: string) 
    {
        return this.http.post<any>(this.baseUrlLogin, {username, password}).pipe(
              

            );
    }


    checkLoginStatus() : boolean 
    {
        return false;
    }


  
    

}
