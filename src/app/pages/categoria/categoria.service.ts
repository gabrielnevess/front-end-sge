import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Categoria} from '../../model/Categoria';
import {environment} from '../../../environments/environment';

export class CategoriaFiltro {
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class CategoriaService {

  categoriaUrl = '';

  constructor(private httpClient: HttpClient) {
    this.categoriaUrl = `${environment.apiUrl}/category`;
  }

  pesquisar(filtro: CategoriaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        offset: filtro.pagina.toString(),
        limit: filtro.itensPorPagina.toString()
      }
    });

    return this.httpClient.get(`${this.categoriaUrl}`, {params})
      .toPromise()
      .then((response: any) => {
        const categorias = response.content;

        const resultado = {
          categorias,
          total: response.totalPages
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.httpClient.delete(`${this.categoriaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(categoria: Categoria): Promise<Categoria> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.httpClient.post(this.categoriaUrl, JSON.stringify(categoria), {headers: headers})
      .toPromise()
      .then((response: any) => response as Categoria);
  }

  atualizar(categoria: Categoria): Promise<Categoria> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.httpClient.put(`${this.categoriaUrl}/${categoria.id}`, JSON.stringify(categoria), {headers: headers})
      .toPromise()
      .then(() => null);
  }

  buscarPorCodigo(codigo: number): Promise<Categoria> {
    return this.httpClient.get(`${this.categoriaUrl}/${codigo}`)
      .toPromise()
      .then((response: any) => response as Categoria);
  }

}
