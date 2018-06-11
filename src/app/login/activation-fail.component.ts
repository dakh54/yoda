import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-activation-fail',
  templateUrl: './activation-fail.component.html',
  styleUrls: ['./activation-fail.component.scss']
})
export class ActivationFailComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.authenticated) {
      
    }
    
  }



}
