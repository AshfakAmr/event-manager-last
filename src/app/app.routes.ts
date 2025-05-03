import { Routes } from "@angular/router";
import { LoginComponent } from "../app/auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { EventListComponent } from "./events/event-list/event-list.component";
import { AuthGuard } from "./guards/auth.guard";
import { EventFormComponent } from "./events/event-form/event-form.component";
import { EventDetailComponent } from "./events/event-detail/event-detail.component";

export const routes: Routes = [
  { path: "", redirectTo: "auth/login", pathMatch: "full" },

  {
    path: "auth/login",
    component: LoginComponent,
  },
  {
    path: "auth/register",
    component: RegisterComponent,
  },
  {
    path: "events",
    component: EventListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "events/new",
    component: EventFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "events/:id",

    component: EventDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "events/:id/edit",
    component: EventFormComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "auth/login" },
];
