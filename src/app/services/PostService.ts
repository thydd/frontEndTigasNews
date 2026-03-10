import { HttpClient } from "@angular/common/http";
import { Post } from "../models/post/post.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICreatePostRequest } from "../models/post/ICreatePostRequest.interface";
import { IUpdatePostRequest } from "../models/post/IUpdatePostRequest.interface";

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

  public createPost(request: ICreatePostRequest) : Observable<string>{
    var httpResponse = this._httpClient.post<string>("https://localhost:7282/api/Posts", request)
    return httpResponse
  }

  public updatePost(request: IUpdatePostRequest){
    var httpResponse = this._httpClient.patch(`https://localhost:7282/${request.id}`, request)
    return httpResponse
  }

  public deletePost(postId: string){
    var httpResponse = this._httpClient.delete(`https://localhost:7282/${postId}`)
    return httpResponse
  }
}