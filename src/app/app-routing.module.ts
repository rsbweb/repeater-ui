import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNames } from './models/routes.model';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { OpenIssuesComponent } from './user-page/open-issues/open-issues.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewIssuesComponent } from './view-issues/view-issues.component';

const routes: Routes = [
  {
    path: PageNames.LOGIN_URL,
    component: LoginPageComponent,
  },
  {
    path: PageNames.ADMIN_URL,
    component: AdminPageComponent,
  },
  {
    path: PageNames.USER_URL,
    component: UserPageComponent,
  },
  {
    path: PageNames.OPEN_ISSUES_URL,
    component: OpenIssuesComponent,
  },
  {
    path: PageNames.ADD_USER_URL,
    component: AddUserComponent,
  },
  {
    path: PageNames.VIEW_ALL_ISSUES,
    component: ViewIssuesComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
