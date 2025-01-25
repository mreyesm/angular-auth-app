import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'authApp';

  private router = inject(Router);
  private authService = inject(AuthService);

  public finishedAuthCheck = computed<boolean>( () => {
    console.log('finishedAuthCheck status', this.authService.authStatus());
    if(this.authService.authStatus() === AuthStatus.checking){
      return false;
    }
    return true;
  });

  public authStatusChangedEffect = effect( () => {
    console.log('authStatusChangedEffect', this.authService.authStatus());
    switch( this.authService.authStatus()){
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dasboard');
        break;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        break;
    };
    console.log('authStatus: ', this.authService.authStatus());
  });
}
