
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { FabricComponent } from './fabric/fabric.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: 'employee-list', component: EmployeeListComponent},
      {
        path:'',component:EmployeeComponent
      },
      {
        path:"emp-update/:id",component:EmployeeUpdateComponent
      },
      {
        path:"fabric",component:FabricComponent
      }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
