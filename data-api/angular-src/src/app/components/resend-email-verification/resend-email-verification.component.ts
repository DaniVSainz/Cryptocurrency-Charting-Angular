import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resend-email-verification',
  templateUrl: './resend-email-verification.component.html',
  styleUrls: ['./resend-email-verification.component.scss']
})
export class ResendEmailVerificationComponent implements OnInit {
  email:String;
  success:Boolean=false;

  constructor(private authService:AuthService,
              private flashMessage:FlashMessagesService){}

  ngOnInit() {
  }

  resendEmailVerification(){
    this.authService.resendVerificationEmail(this.email).subscribe(res=>{
      this.success=true;
      this.flashMessage.show(res.msg, {cssClass: 'alert-success', timeout: 3000});
    })
  }
}
