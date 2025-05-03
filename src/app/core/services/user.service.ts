import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  //users$ = this.usersSubject.asObservable();

  createUser(user: Omit<User, 'userId'>): Observable<User> {
    const newUser: User = {
      ...user,
      userId: this.generateUserId()
    }

    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, newUser])

    return of(newUser)
  }

  private generateUserId(): string{
    return 'USER_' + Math.random().toString(36).substring(2, 9);
  }
}