import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  mobileLength = false;
  nameLength = false;
  addressLength = false;
  addressATR = false;
  CustomerArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  customername: string ="";
  customeraddress: string ="";
  mobile:String="";
  mob:String="";
  dob:Date | undefined;
  currentCustomerID = "";
  flag:Boolean=false;
  

  constructor(private http: HttpClient,private route: ActivatedRoute )
  {
    this.getAllCustomer();
  }
  ngOnInit() {
    const id:any=this.route.snapshot.params['id'];
    this.http.get(`http://localhost:8084/api/v1/customer/${id}`).subscribe((resultData:any)=>{
      console.log(resultData);
      this.customername=resultData.customername;
      this.customeraddress=resultData.customeraddress;
      this.mobile=resultData.mobile;
      this.dob=resultData.age;
    })
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
      "dob":this.dob
    };

    // console.log("hello saved")
    this.http.post("http://localhost:8084/api/v1/customer/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully");
        this.getAllCustomer();
 
        this.customername = '';
      this.customeraddress = '';
        this.mobile="";
        this.dob;
    });
  }
  setUpdate(data: any)
  {
   this.customername = data.customername;
   this.customeraddress = data.customeraddress;
   this.mobile = data.mobile;
   this.dob=data.dob;
   this.currentCustomerID = data.customerid;
  }
  UpdateRecords()
  {
    let bodyData = {
      "customerid" : this.currentCustomerID,
      "customername" : this.customername,
      "customeraddress" : this.customeraddress,
      "mobile" : this.mobile,
      "age":this.dob

    };
    
    this.http.put("http://localhost:8084/api/v1/customer/update",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Updateddd")
        this.getAllCustomer();
        this.customername = '';
        this.customeraddress = '';
        this.mobile="";
        this.dob;
    });
  }
  save()
  {
    
    var containsAtTheRate = false;
    if(this.mobile.length != 10){
      this.mobileLength = true;
    }
    else this.mobileLength = false;
    if(this.customername.length < 1){
      this.nameLength = true;
      //alert('Enter Name');
    }else this.nameLength = false;
    if(this.customeraddress.length < 1){
      this.addressLength = true;
      //alert('Enter Email Address');
    }else{
      this.addressLength = false;
      

      for (let i = 0; i < this.customeraddress.length; i++) {
        if(this.customeraddress[i] == '@'){
          containsAtTheRate = true;
          break;
        }
      }
      if(containsAtTheRate == false){
        this.addressATR = true;
        //alert('Email Address Should Contain @ symbol');
      }else this.addressATR = false;
    }

      // if(containsAtTheRate == false){
      //   alert('Email Address Should Contain @ symbol');
      //   this.flag=true
      //   // console.log("breaked")
      // }
    this.flag = this.mobileLength || this.nameLength || this.addressLength || this.addressATR;
    console.log(this.flag)
    if(this.currentCustomerID == '' && this.flag!=true) {
      console.log("breaked")
      this.register();
    }
    else if(this.flag!=true)
    {
     this.UpdateRecords();
    }  
    else{
      alert("employee not created");
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
        this.dob;
  
    });
  }
}
