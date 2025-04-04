import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
  id: number;
  username: string;
  role: 'user' | 'manager';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  users: any[] = [];

  private jsonUrl = 'assets/users.json';

  private mockUsers: User[] = []
  constructor(private http: HttpClient) {
    this.fetchAndLogData();
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<User | null> {
    const user = this.mockUsers.find(u => u.username === username);
    
    if (user && username === password) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(user);
    }
    
    return of(null);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(requiredRole: 'user' | 'manager'): boolean {
    const currentUser = this.getCurrentUser();
    return !!currentUser && currentUser.role === requiredRole;
  }

  getUsers(): Observable<any> {
    console.log(this.http.get<any>(this.jsonUrl))
    return this.http.get<any>(this.jsonUrl);
  }

  private fetchAndLogData(): void {
    this.getUsers().subscribe(
      (data) => {
        console.log('fetched data:', data);
        this.mockUsers = data; 
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
