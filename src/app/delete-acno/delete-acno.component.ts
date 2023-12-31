import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-acno',
  templateUrl: './delete-acno.component.html',
  styleUrls: ['./delete-acno.component.css']
})
export class DeleteAcnoComponent {

 @Input()  deleteAcno:any//1

 @Output() onCancel = new EventEmitter();//it help us to create a new user defined event
 @Output() onDelete=new EventEmitter

 cancel(){
   this.onCancel.emit() //Emits an event containing  a given value
   
 }

 deleteFromChild(){
  this.onDelete.emit() //emits an event for  deletion
 }
}
