import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/PostService';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post/post.model';

@Component({
  selector: 'app-post-detail',
  imports: [],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail implements OnInit{
  private readonly _postService = inject(PostService)
  private readonly _activatedRoute = inject(ActivatedRoute)

  post!: Post | null;
  isLoading = false
  errorMessage = ''

  private loadPost(postId: string){
    this.isLoading = true
    this.errorMessage = ''

    this._postService.getPostById(postId).subscribe({
      next: (data) => {this.post = data},
      error: () => {this.errorMessage = 'Post não encontrado', this.isLoading = false},
      complete: () => {this.isLoading = false}
    })
  }


  ngOnInit(){
    var postId = this._activatedRoute.snapshot.paramMap.get('postId')
    if (postId != null){
      this.loadPost(postId)
    }
    else{
      this.errorMessage = 'Post não existe'
    }
  }

}
