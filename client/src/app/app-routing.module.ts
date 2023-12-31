import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists/lists.component';
import { MessagesComponent } from './messages/messages/messages.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { authGuard } from './_guards/authGuard';
import { TestErrorComponent } from './error/test-error/test-error.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';
import { addDetailsMemberResolver } from './_forms/_resolvers/dataresolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import {  adminGuard } from './_guards/admin.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",                                                                                          // decides when guards and resolvers will be run
    canActivate: [authGuard],                                                                                                       // protects children
    children: [{ path: 'members', component: MemberListComponent },
    { path: 'members/:username', component: MemberDetailComponent, resolve: { member: addDetailsMemberResolver } },
    { path: "member/edit", component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard] },
    { path: 'lists', component: ListsComponent },
    { path: 'messages', component: MessagesComponent },
    { path: "admin", component: AdminPanelComponent, canActivate:[adminGuard ]}, 
  ]
  },
  { path: "errors", component: TestErrorComponent },
  { path: "server-error", component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
