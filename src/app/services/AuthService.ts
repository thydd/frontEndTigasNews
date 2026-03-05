import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Token } from "../models/token/token.model";
import { ILoginRequest } from "../models/Login/ILoginRequest.interface";

@Injectable({providedIn: 'root'})
export class AuthService{

  private readonly _httpClient: HttpClient;
  private readonly _accessTokenKey = "access_token";
  private readonly _tokenExpiresAtKey = "token_expires_at";

  constructor(httpClient: HttpClient){
    this._httpClient = httpClient   
  }
  
  public login(payload : ILoginRequest): Observable<Token>{
    return this._httpClient
    .post<Token>("https://localhost:7282/api/Auth/Login", payload)
    .pipe(
      tap((response) => {
        const expiresInSeconds = Number(response.expiresIn);
        const hasValidToken = typeof response.accessToken === "string" && response.accessToken.trim().length > 0;
        const hasValidExpiration = Number.isFinite(expiresInSeconds) && expiresInSeconds > 0;

        if (!hasValidToken || !hasValidExpiration) {
          this.logout();
          throw new Error("Resposta de autenticacao invalida.");
        }

        const expiresAt = Date.now() + (expiresInSeconds * 1000);

        localStorage.setItem(this._accessTokenKey, response.accessToken);
        localStorage.setItem(this._tokenExpiresAtKey, expiresAt.toString());
      }),

      catchError((error: unknown) => {
      if (error instanceof Error && error.message === "Resposta de autenticacao invalida.") {
        return throwError(() => error);
      }

      const httpError = error as HttpErrorResponse;

      if (httpError.status === 404) {
        return throwError(() => new Error("Email ou senha inválidos."));
      }
      if (httpError.status === 0) {
        return throwError(() => new Error("Não foi possível conectar com a API."));
      }
        return throwError(() => new Error("Erro ao autenticar."));
      })
    );
  }

  public logout(){
    localStorage.removeItem(this._accessTokenKey);
    localStorage.removeItem(this._tokenExpiresAtKey);
  }

  public isAuthenticated(): boolean{
    const token = localStorage.getItem(this._accessTokenKey);
    const expiresAtRaw = localStorage.getItem(this._tokenExpiresAtKey);

    if (!token || !expiresAtRaw) {
      return false;
    }

    const expiresAt = Number(expiresAtRaw);
    if (!Number.isFinite(expiresAt) || expiresAt <= 0) {
      return false;
    }

    return Date.now() < expiresAt;
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(this._accessTokenKey)
  }

}