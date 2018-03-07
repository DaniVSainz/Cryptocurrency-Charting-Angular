import { ActivatedRoute, Router } from '@angular/router';
import { ValidateService } from './../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  token:String;
  msg:String = '';

  constructor(private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private validateService:ValidateService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit() {
    this.route.params.subscribe(params=>{
    this.token = params.token;
    })
    this.verifyEmail();
  }

  // ngAfterViewInit(){
  //   this.verifyEmail();
  // }


  verifyEmail(){
    this.authService.verifyEmail(this.token).subscribe(res=>{
      this.msg = res.msg;
      this.flashMessage.show(res.msg, {cssClass: 'alert-success', timeout: 5000})
      this.router.navigate(['login']);
    }, err =>{
      err = err.json();
      this.msg = err.msg;
      this.flashMessage.show(err.msg, {cssClass: 'alert-danger', timeout: 5000})
    })
  };

}
