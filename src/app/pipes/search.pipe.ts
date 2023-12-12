import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allAccounts:any[],searchTerm:string,propsName:string): any[] {
    const result:any[]=[];
    if(!allAccounts||searchTerm==''|| propsName==''){
      return allAccounts;
    }
    allAccounts.forEach((account:any)=>{
      if(account[propsName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(account)
      }
    })
    return result;
  }

}
