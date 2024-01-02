import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { username: 'admin', password: 'adminpass', role: 'admin' },
    { username: 'user', password: 'userpass', role: 'user' }
  ];

  private currentUser: { username: string; role: string } | null = null;

  loggedIn = false;

  logIn(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {{
      this.currentUser = { username: user.username, role: user.role };
      return true;
    }}
    return false;
  }

  logOut(): void{
    this.currentUser = null;
  }

  isLogged(): boolean{
    return this.currentUser !== null;
  }

  isAdmin(): boolean{
    return this.currentUser?.role === 'admin';
    
  }

  constructor() { }
}
