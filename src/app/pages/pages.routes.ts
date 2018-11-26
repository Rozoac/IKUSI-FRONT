import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficosComponent } from './graficos/graficos.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../services/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const PAGES_ROUTES: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
      { path: 'graficos', component: GraficosComponent, data: { titulo: 'Graficas' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }},
      { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' }},
      { path: 'usuarios', component: UsuariosComponent},
      { path: 'proyecto', component: ProyectosComponent},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTER = RouterModule.forChild(PAGES_ROUTES);
