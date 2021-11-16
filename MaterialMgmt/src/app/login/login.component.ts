import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName:string="";
  password:string="";
  loginForm:FormGroup; 

  loginFun(){
    console.log(this.loginForm.value);
  }

  constructor() {
    this.loginForm = new FormGroup({
      userName:new FormControl(),
      password:new FormControl()

    });
   }

  ngOnInit(): void {
    new FormGroup({
      userName:new FormControl("admin"),
      password:new FormControl("admin123")
    });
  }
}
