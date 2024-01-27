import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule }from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { RouterModule, Routes } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { AdminAuthGuard } from './shared/admin-auth.guard';
import { HttpClientModule } from '@angular/common/http';

const routes : Routes = [
  {path: 'home', component: AssignmentsComponent},
  {path: 'add', component: AddAssignmentComponent},
  {
    path: 'assignment/:id',
    component: AssignmentDetailComponent,
    canActivate: [AuthGuard]
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [AdminAuthGuard]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    FormsModule, MatDatepickerModule, MatNativeDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    RouterModule.forRoot(routes),
    MatSlideToggleModule,
    HttpClientModule
  ],
  providers: [AuthGuard, AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
