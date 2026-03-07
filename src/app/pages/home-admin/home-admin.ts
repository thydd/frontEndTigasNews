import { Component, inject, OnInit} from '@angular/core';
import { PostService } from '../../services/PostService';
import { Post } from '../../models/post/post.model';
import { finalize, timeout } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-admin',
  imports: [RouterLink, MatMenuModule, MatButtonModule, MatDialogModule],
  templateUrl: './home-admin.html',
  styleUrl: './home-admin.css',
})
export class HomeAdmin implements OnInit{
  private readonly _postService = inject(PostService)
  posts: Post[] = []
  isLoading = false
  errorMessage = ''

  private loadPosts(){
    this.isLoading = true
    this.errorMessage = ''

    this._postService.listPosts().pipe(timeout(5000), finalize(() => {this.isLoading = false})).subscribe({
      next: (data) => {this.posts = data},
      error: () => {this.errorMessage = 'Error ao carregar posts'},
      complete: () => {}
    })
  }

  createPost(){
    
  }

  updatePost(){

  }

  deletePost(){

  }

  ngOnInit(){
    this.loadPosts()
  }
}
