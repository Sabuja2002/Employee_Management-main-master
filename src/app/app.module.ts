


import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';

import {EmployeeListComponent} from './employee-list/employee-list.component'
import { RouterModule } from '@angular/router';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { FabricComponent } from './fabric/fabric.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FabricjsEditorModule } from "../../angular-editor-fabric-js-master/projects/angular-editor-fabric-js/src/lib/angular-editor-fabric-js.module";

@NgModule({
    declarations: [
        AppComponent,
        EmployeeComponent,
        EmployeeListComponent,
        EmployeeUpdateComponent,
        FabricComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        FabricjsEditorModule,
    ]
})
export class AppModule { }
