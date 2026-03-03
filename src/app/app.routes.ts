import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PostDetail } from './pages/post-detail/post-detail';

export const routes: Routes = [
  {path: '', component: Home},
  {path: ':postId', component: PostDetail}
];
