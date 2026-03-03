import { HttpClient } from "@angular/common/http";
import { Post } from "../models/post/post.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostService{
  private readonly _httpClient: HttpClient;

  constructor(httpClient: HttpClient){
    this._httpClient = httpClient   
  }

  public listPosts() : Observable<Post[]>{
    var httpResponse = this._httpClient.get<Post[]>("https://localhost:7282/api/Posts")
    return httpResponse
  }

  public getPostById(postId: string) : Observable<Post>{
    var httpResponse = this._httpClient.get<Post>(`https://localhost:7282/${postId}`)
    return httpResponse
  }
}