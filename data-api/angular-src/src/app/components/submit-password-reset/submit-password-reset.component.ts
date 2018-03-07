import { ActivatedRoute, Router } from '@angular/router';
import { ValidateService } from './../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-password-reset',
  templateUrl: './submit-password-reset.component.html',
  styleUrls: ['./submit-password-reset.component.scss']
})
export class SubmitPasswordResetComponent implements OnInit {
  email:String;
  password:String;
  passwordB:String;
  token:String;
  
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
    console.log(this.token);
  }

  passwordResetSubmit(){

    const user= {
      email:this.email,
      password:this.password,
      passwordB:this.passwordB,
      token:this.token
    }

    if(this.validateService.validatePassword(user)){
      this.authService.resetPasswordRequestSubmission(user).subscribe(res=>{
        this.flashMessage.show(res.msg , {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/login']);
      }, error => {
        error = error.json();
        this.flashMessage.show(error.msg , {cssClass: 'alert-danger', timeout: 3000});
      })
    }else{
      this.flashMessage.show('Your passwords are not identical', {cssClass: 'alert-danger', timeout: 3000});
    }
  }

}
