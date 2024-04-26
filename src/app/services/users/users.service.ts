import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: User = new User()
  private userSubject: Subject<User> = new Subject<User>()

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) { }

  async createdUser(user: User) {
    const usersCollection = collection(this.firestore, 'Users');
    const userDocRef = doc(usersCollection, user.id);
    const users: User = user
    await setDoc(userDocRef, users);
    this.setUser(users)
  }

  async updateUser(user: User) {
    const userDocRef = doc(this.firestore, 'Users', user.id);
    const users: User = user
    await setDoc(userDocRef, users);
    this.setUser(users)
  }

  async getUser(userUid) {
    const userDocRef = doc(this.firestore, 'Users', userUid);
    const docSnap = await getDoc(userDocRef)
    if (docSnap.exists()) {
      this.setUser(docSnap.data() as any)
    } else {
      console.log("No such document!");
    }
  }

  public setUser(user: User): void {
    this.user = user
    this.userSubject.next(user);
  }

  public getUserEvent(): Observable<User> {
    return this.userSubject.asObservable();
  }

  async canActivate() {
    return await this.isLogged()
  }

  async isLogged() {
    let response = await new Promise<boolean>((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.getUser(user.uid).then(() => resolve(true))
        } else {
          this.router.navigate(['/login']);
          resolve(false)
        }
      });
    })
    return response
  }
}
