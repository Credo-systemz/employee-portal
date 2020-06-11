import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'SignUp',component:UserLoginPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
