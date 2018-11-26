import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';

const APP_ROUTES: Routes = [

    
    { path: 'login' , component: LoginComponent},
    { path: 'register' , component: RegisterComponent},
    { path: '**' , component: NopagefoundComponent }
];

export const APP_ROUTER = RouterModule.forRoot(APP_ROUTES);
