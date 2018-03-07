import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  passwordB: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      passwordB: this.passwordB
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
    this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validatePassword(user)) {
      this.flashMessage.show('Your password were not typed identicaly.Please try again.', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }

    // Register user
    this.authService.registerUser(user).subscribe(
      res=>{
        this.flashMessage.show(res.msg , {cssClass: "alert-success", timeout: 3000});
        this.router.navigate(['/login']);
      },err =>{
        err=err.json();
        this.flashMessage.show(err.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    );
  }
}
