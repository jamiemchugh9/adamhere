import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './-helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

//routing
import { routing } from './app.routing';

//components
import { AppComponent } from './app.component';
import { AlertComponent } from './-directives/index';
import { AuthGuard } from './-guards/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { BmiCalculatorComponent } from './bmi-calculator/index';
import { NutritionixComponent } from './nutritionix/nutritionix.component';


//services
import { AlertService, AuthenticationService, UserService } from './-services/index';

import { NutritionixService } from './nutritionix/nutritionix.service';
import { BmiService } from 'app/bmi-calculator/bmi.service';
import { UserdataService } from './-services/userdata.service';





@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BmiCalculatorComponent,
    NutritionixComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    NutritionixService,
    BmiService,
    UserdataService,
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
