import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/Input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/Form-field';
import {MatDialogModule } from '@angular/material/Dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/Icon';
import { MatCheckboxModule } from '@angular/material/Checkbox';
import { MatToolbarModule } from '@angular/material/Toolbar';
import {RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatRippleModule, MatOptionModule } from '@angular/material/core';




import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginPageComponent,
    FooterComponent,
    LoginComponent,
    NavigationComponent,
    ResetpasswordComponent,
    UserprofileComponent
    
  ],
  imports: [
    BrowserModule,
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
    MatToolbarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatOptionModule
    ],

  providers: [],
  bootstrap: [AppComponent],

})


export class AppModule { }

