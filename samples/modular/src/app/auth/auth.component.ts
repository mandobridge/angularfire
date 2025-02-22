import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import {
  Auth,
  authState,
  signInAnonymously,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from '@mandobridge/angularfire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@mandobridge/angularfire/performance';

@Component({
  selector: 'app-auth',
  template: `
    <p>
      Auth!
      <code>{{ (user | async)?.uid }}</code>
      <button (click)="login()" *ngIf="showLoginButton">
        Log in with Google
      </button>
      <button (click)="loginAnonymously()" *ngIf="showLoginButton">
        Log in anonymously
      </button>
      <button (click)="logout()" *ngIf="showLogoutButton">Log out</button>
    </p>
  `,
  styles: [],
})
export class AuthComponent implements OnInit, OnDestroy {
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(@Optional() private auth: Auth) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth)
        .pipe(
          traceUntilFirst('auth'),
          map((u) => !!u)
        )
        .subscribe((isLoggedIn) => {
          this.showLoginButton = !isLoggedIn;
          this.showLogoutButton = isLoggedIn;
        });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async loginAnonymously() {
    return await signInAnonymously(this.auth);
  }

  async logout() {
    return await signOut(this.auth);
  }
}
