import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  CustomerArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  // age:Date | undefined;
  customername: string ="";
  customeraddress: string ="";
  mobile:String="";
  age:Number=0;
  currentCustomerID = "";

  constructor(private http: HttpClient,private router:Router )
  {
    this.getAllCustomer();
  }
  getAllCustomer()
  {
    
    this.http.get("http://localhost:8084/api/v1/customer/getAllCustomer")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.CustomerArray = resultData;
    });
  }
  register()
  {
  
    let bodyData = {
      "customername" : this.customername,
      "customeraddress" : this.customeraddress,
      "mobile" : this.mobile,
      "age":this.age,
    };
    this.http.post("http://localhost:8084/api/v1/customer/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully");
        this.getAllCustomer();
 
        this.customername = '';
      this.customeraddress = '';
        this.mobile="";
        this.age=0;
    });
  }
  setUpdate(id:any)
  {
  //   console.log("i am in the edit button");
  //   console.log(data)
  //  this.customername = data.customername;
  //  this.customeraddress = data.customeraddress;
  //  this.mobile = data.mobile;
  //  this.currentCustomerID = data.customerid;
  //  this.age=data.age;
  console.log("first",id);
  this.router.navigate([`/emp-update/${id}`]);

  }
  UpdateRecords()
  {
    let bodyData = {
      "customerid" : this.currentCustomerID,
      "customername" : this.customername,
      "customeraddress" : this.customeraddress,
      "mobile" : this.mobile,
      "age":this.age
    };
    
    this.http.put("http://localhost:8084/api/v1/employee-list/update",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Updateddd")
        this.getAllCustomer();
        this.customername = '';
        this.customeraddress = '';
        this.mobile="";
        this.age=0;
    });
  }
  save()
  {
    if(this.currentCustomerID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
  }
  setDelete(data: any)
  {
    
    
    this.http.delete("http://localhost:8084/api/v1/customer/deletecustomer"+ "/"+ data.customerid,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Deletedddd")
        this.getAllCustomer();
 
        this.customername = '';
      this.customeraddress = '';
        this.mobile="";
        this.age=0;
  
    });
  }
}
