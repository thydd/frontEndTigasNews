import { Component, inject, OnInit} from '@angular/core';
import { PostService } from '../../services/PostService';
import { Post } from '../../models/post/post.model';
import { finalize, timeout } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  private readonly _postService = inject(PostService)
  posts: Post[] = []
  isLoading = false
  errorMessage = ''

  private loadPosts(){
    this.isLoading = true
    this.errorMessage = ''

    this._postService.listPosts().pipe(timeout(5000), finalize(() => {this.isLoading = false})).subscribe({
      next: (data) => {this.posts = data},
      error: (err) => {this.errorMessage = 'Error ao carregar posts'},
      complete: () => {}
    })
  }

  ngOnInit(){
    this.loadPosts()
  }

}
