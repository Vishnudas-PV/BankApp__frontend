import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 deleteConfirmStatus:boolean = false //delete confirmation content
  deleteSuccesMsg:string ='';
 acno:any //for parent to child data communication
 transferSuccess:string=''
 transferError:string=''

  user:String='';// To hold the currentUser name
  balance:string='' //To hold the current Balance amount
  currentAcno:string='';
  isCollapse:boolean = false;
  constructor(private fb:FormBuilder,private api:ApiService,private logoutroute:Router){

  }
  ngOnInit(): void {

    if(!localStorage.getItem("token"))
    {
      alert('Please login')
      this.logoutroute.navigateByUrl('')
    }
    if(localStorage.getItem('currentUser')){
      this.user=localStorage.getItem('currentUser')||'';
    
      
    }
    // if(localStorage.getItem('balanceamount')){
    //   this.balance=localStorage.getItem('balanceamount')||'';
    // }

    if(localStorage.getItem('currentAcno')){
      this.currentAcno=localStorage.getItem('currentAcno')||'';
    }
  }
   //create a formGroup and array
  transferForm=this.fb.group({
   
    creditAcountNumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    transferPassword:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

    
  })
  //fund transfer
  transfer(){
    if(this.transferForm.valid){
      let creditAcno=this.transferForm.value.creditAcountNumber;
      let password=this.transferForm.value.transferPassword;
      let amount=this.transferForm.value.amount;
      this.api.fundTransfer(creditAcno,password,amount).subscribe((result:any)=>{
        console.log(result);
        this.transferSuccess=result.message;

        setTimeout(()=>{
          this.transferSuccess=''
          this.transferForm.reset()
        },3000)
        
      },
      (result:any)=>{
        console.log(result.error.message);
        this.transferError=result.error.message;
        setTimeout(()=>{
          this.transferError=''
          this.transferForm.reset()
        },3000)
        
      }
      )
    // alert('Form Clicked')
    // console.log(this.transferForm.value);
    // let creditAccountNumber=this.transferForm.value.creditAcountNumber;
    // let amount=this.transferForm.value.amount;
    // let transferPassword=this.transferForm.value.transferPassword;
    
    // console.log(creditAccountNumber,amount,transferPassword);
    
    
  }
  else{
    alert('Please Enter the Valid Parameters')
  }
}

  collapse(){
    this.isCollapse =!this.isCollapse;
  }

  getBalance(){
  
    this.api.getBalance(this.currentAcno).subscribe((result:any)=>{
      this.balance=result.balance
    },
    (result:any)=>{
      alert(result.error.message)
    })
  }


  //resetButton
  resetButton(){
    this.transferForm.reset()
  
  }

 logout(){
this.logoutroute.navigateByUrl('');
localStorage.clear();

 }

 deleteAccount(){
  //data to be shared with the child accounts
  this.acno=localStorage.getItem('currentAcno')//1
 this.deleteConfirmStatus = true;
 }
 
 cancelDeleteConfirm(){
  this.acno=''
  this.deleteConfirmStatus= false;
 }

 deletefromParent(){
  this.api.deleteAccount().subscribe((result:any)=>{
    localStorage.clear()//remove the details from the local storage
    this.deleteSuccesMsg=result.message //Account delete Successfully
    
    setTimeout(()=>{
      this.logoutroute.navigateByUrl('') //redirected back to login page
    },3000)


  })
 }

}
