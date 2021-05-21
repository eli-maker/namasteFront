import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './components/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { ReadComponent } from './components/read/read.component';
import { UpdateComponent } from './components/update/update.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'read', component: ReadComponent },
  { path: 'update', component: UpdateComponent },
  
];

export const routing = RouterModule.forRoot(appRoutes);
