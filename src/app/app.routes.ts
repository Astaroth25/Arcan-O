import { Routes } from '@angular/router';
import { Home } from './Features/home/home';

export const routes: Routes = [
    {path: 'home', component: Home, title: 'Arcan-O | Home'},
    {path: '**', redirectTo: 'home'}
];
