import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginSuccess:boolean=false;
  loginError:string='';
constructor(private fb:FormBuilder,private api:ApiService, private loginRouter:Router){}




   loginForm=this.fb.group({ //formGroup
  // username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]], //formArray
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})
//form control passed to html form
login(){
if(this.loginForm.valid)
{
console.log(this.loginForm);
console.log(this.loginForm.value);
let acno=this.loginForm.value.acno;
let password=this.loginForm.value.password;
//api call for login (success case)

this.api.login(acno,password).subscribe((response:any)=>{


  //success
  this.loginSuccess=true;

  //To set the current username into the local storage
  localStorage.setItem('currentUser',response.currentUser)

  //To set the current balance into the local storage
  localStorage.setItem('balanceamount',response.balance)


  //To set the currentAcno  into the local storage
   localStorage.setItem('currentAcno',response.currentAcno)

  //To set the token into the local storage
  localStorage.setItem('token',response.token)

  // alert('login successfull');
  setTimeout(()=>{
    this.loginRouter.navigateByUrl('/dashboard');
  },2000)
 
},
(response)=>{
 
  this.loginError=response.error.message
  setTimeout(()=>{
    this.loginForm.reset();
    this.loginError=''
      },2000)
}

)


}
else{
alert('Invalid form')
}



}
}

