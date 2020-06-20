import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { LoginComponent } from './login/login.component';
 import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
 import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthGuard } from './auth.guard';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';


const routes: Routes = [
   {path:'', component: LoginComponent},
   {path:'register', component: UserLoginPageComponent},
   {path:'home', component: NavigationComponent, canActivate :[ AuthGuard]},
   {path:'resetpassword/:Userid',component:ResetpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
