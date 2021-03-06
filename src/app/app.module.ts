import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/Input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatRippleModule } from '@angular/material/core';
import {MatOptionModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material'


import {DatePipe, CommonModule} from '@angular/common'

import {DatePipe} from '@angular/common'

import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchJobComponent } from './search-job/search-job.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { LookupComponent } from './components/lookup/lookup.component';
import { ViewrecordComponent } from './components/viewrecord/viewrecord.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginPageComponent,
    FooterComponent,
    LoginComponent,
    NavigationComponent,
    ResetpasswordComponent,
    UserprofileComponent,
    SearchJobComponent,
    EmailVerificationComponent,
    LookupComponent,
    ViewrecordComponent,
    FilterPipe,
  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    NgbModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatToolbarModule,
    MatDialogModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule, 
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatOptionModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDividerModule
   ],

  providers: [DatePipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent],
})


export class AppModule { }

