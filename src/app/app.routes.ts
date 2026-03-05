import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PostDetail } from './pages/post-detail/post-detail';
import { AdminLogin } from './pages/admin-login/admin-login';
import { HomeAdmin } from './pages/home-admin/home-admin';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'posts/:postId', component: PostDetail},
  {path: 'eotigas', component: AdminLogin},
  {path: 'homeAdmin', component: HomeAdmin}
];
