import { Component, inject, OnInit} from '@angular/core';
import { PostService } from '../../services/PostService';
import { Post } from '../../models/post/post.model';
import { finalize, timeout } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Dialog } from '../../components/dialog/dialog';
import { IDialog } from '../../models/dialog/IDialog.interface';

@Component({
  selector: 'app-home-admin',
  imports: [RouterLink, MatMenuModule, MatButtonModule, MatDialogModule],
  templateUrl: './home-admin.html',
  styleUrl: './home-admin.css',
})
export class HomeAdmin implements OnInit{
  private readonly _postService = inject(PostService)
  private readonly _dialog = inject(MatDialog)
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
    const dialogRef = this._dialog.open(Dialog, {
      width: '600px',
      height: '500px',
      data: {
        variant: 'createDialog',
        title: 'Criar Post',
      } as IDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this._postService.createPost(result).subscribe({
        next: () => this.loadPosts(),
        error: () => this.errorMessage = 'Error ao criar post'
      })
    })
  }

  updatePost(){
    const dialogRef = this._dialog.open(Dialog, {
      width: '600px',
      height: '500px',
      data: {
        variant: 'updateDialog',
        title: 'Atualizar Post',
      } as IDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this._postService.updatePost(result).subscribe({
        next: () => this.loadPosts(),
        error: () => this.errorMessage = 'Error ao atualizar o post'
      })
    })
  }

  deletePost(){
    const dialogRef = this._dialog.open(Dialog, {
      width: '400px',
      height: '200px',
      data: {
        variant: 'deleteDialog',
        title: 'Deletar Post',
        message: 'Informe o ID do post a ser deletado.'
      } as IDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this._postService.deletePost(result.id).subscribe({
        next: () => this.loadPosts(),
        error: () => this.errorMessage = 'Error ao deletar post'
      })
    })
  }

  ngOnInit(){
    this.loadPosts()
  }
}
