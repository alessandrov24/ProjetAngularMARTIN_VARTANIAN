import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  users = [
    { username: 'user1', password: 'pass1', role: 'user' },
    { username: 'admin', password: 'adminpass', role: 'admin' }
  ];

  currentUser = null;

  constructor() { }

  logIn(username: string, password: string) {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logOut() {
    this.loggedIn = false;
    this.currentUser = null;
  }

  isLogged() {
    return this.loggedIn;
  }

  isAdmin() {
    return this.loggedIn && this.currentUser?.role === 'admin';
  }
}
