import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { ListarPlanos } from '../model/ListarPlanos.model';
import { ListarTarifas } from '../model/ListarTarifas.model';

@Injectable({
  providedIn: 'root'
})
export class FalemaisService {
  apiUrl = 'https://localhost:44309/api/SimularPreco/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getListarPlanos(): Observable<ListarPlanos[]>{
    return this.httpClient.get<ListarPlanos[]>(this.apiUrl + 'ListarPlanos')
    .pipe(retry(2), catchError(this.handleError))
  }

  getListarTarifas(): Observable<ListarTarifas[]>{
    let retorno = this.httpClient.get<ListarTarifas[]>(this.apiUrl + 'ListarTarifas')
    return retorno;
  }

  getCalcularTaxas(origem: string, destino: string, duracao: number): Observable<number>{
    let retorno = this.httpClient.get<number>(this.apiUrl + 'SimularPreco?origen='+ origem + '&destino=' + destino + '&duracao=' + duracao)
    return retorno;
  }

  getCalcularTaxasPlano(origem: string, destino: string, duracao: number, planoId: string): Observable<number>{
    let retorno = this.httpClient.get<number>(this.apiUrl + 'SimularPrecoPlano?origen=' + origem + '&destino=' + destino + '&duracao=' + duracao + '&planoId='+ planoId)
    return retorno;
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
