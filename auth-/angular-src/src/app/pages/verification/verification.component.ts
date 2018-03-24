import { MyAuthService } from './../../services/my-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  token:String;
  msg:String = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: MyAuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
    this.token = params.token;
    })
    this.verifyEmail();
  }

  verifyEmail(){
    this.authService.verifyEmail(this.token).subscribe(res=>{
      this.msg = res.msg;
      this.router.navigate(['login']);
    }, err =>{
      err = err.json();
      this.msg = err.msg;
    })
  };

}
