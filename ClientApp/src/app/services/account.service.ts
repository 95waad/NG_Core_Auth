import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
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
    constructor(private http : HttpClient, private router : Router) { }

    // Url to access our Web API’s
    private baseUrlLogin : string = "/api/account/login";

    // User related properties
    private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
    private UserName    = new BehaviorSubject<string>(localStorage.getItem('username'));
    private UserRole    = new BehaviorSubject<string>(localStorage.getItem('userRole'));

    //Login Method
    login(username: string, password: string) 
    {
        // pipe() let you combine multiple functions into a single function. 
        // pipe() runs the composed functions in sequence.
        return this.http.post<any>(this.baseUrlLogin, {username, password}).pipe(


            map(result => {

                // login successful if there's a jwt token in the response
                if(result && result.token) 
                {
                      // store user details and jwt token in local storage to keep user logged in between page refreshes

                    this.loginStatus.next(true);
                    localStorage.setItem('loginStatus', '1');
                    localStorage.setItem('jwt', result.token);
                    localStorage.setItem('username', result.username);
                    localStorage.setItem('expiration', result.expiration);
                    localStorage.setItem('userRole', result.userRole);

                }

                 return result;

            })
              
            );
    }

    logout() 
    {
        // Set Loginstatus to false and delete saved jwt cookie
        this.loginStatus.next(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
        localStorage.removeItem('expiration');
        localStorage.setItem('loginStatus', '0');
        this.router.navigate(['/login']);
        console.log("Logged Out Successfully");

    }



    checkLoginStatus() : boolean 
    {
        return false;
    }



    get isLoggesIn() 
    {
        return this.loginStatus.asObservable();
    }

    get currentUserName() 
    {
        return this.UserName.asObservable();
    }

   get currentUserRole() 
    {
        return this.UserRole.asObservable();
    }
    

}
