import { Component } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
    
})
export class HeaderComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver) { }

  // onLogout() {
  //   this.authService.logout();
  // }
}
