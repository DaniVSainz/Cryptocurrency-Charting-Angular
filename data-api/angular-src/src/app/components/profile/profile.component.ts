import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:Object;

  constructor(private authService:AuthService, private router:Router,private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
     err => {
       this.flashMessage.show(err, {cssClass: 'alert-danger', timeout: 3000});
    });
  }

  deleteAccount(){
    this.authService.deleteUser().subscribe(
      res=>{
        console.log(res);
        this.authService.logout();
      },err=>{
        console.log(err);
      }
    )
  }

}
