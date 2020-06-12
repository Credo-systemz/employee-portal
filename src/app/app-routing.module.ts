import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { LoginComponent } from './login/login.component';
 import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
 import { NavigationComponent } from './components/navigation/navigation.component';


const routes: Routes = [
   {path:'', component: LoginComponent},
   {path:'register', component: UserLoginPageComponent},
   {path:'home', component: NavigationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
