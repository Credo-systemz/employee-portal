import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { LoginComponent } from './login/login.component';
 import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { AuthGuard } from './auth.guard';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { SearchJobComponent } from './search-job/search-job.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';


const routes: Routes = [
   {path:'', component: LoginComponent},
   {path:'register', component: UserLoginPageComponent},
   {path:'register/:Userid', component: EmailVerificationComponent},
   {path:'resetpassword/:Userid', component: ResetpasswordComponent},
   {path:'userprofile', component: UserprofileComponent, canActivate:[AuthGuard]},
   {path:'findjob', component: SearchJobComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
