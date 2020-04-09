import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Categoria} from '../../model/Categoria';

export class CategoriaFiltro {
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class CategoriaService {

  categoriaUrl = 'https://back-end-sge.herokuapp.com/api/category';

  constructor(private httpClient: HttpClient) {
  }

  pesquisar(filtro: CategoriaFiltro): Promise<any> {
    const params = new HttpParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    return this.httpClient.get(`${this.categoriaUrl}`, {params})
      .toPromise()
      .then((response: any) => {
        const categorias = response.content;

        const resultado = {
          categorias,
          total: response.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.httpClient.get(this.categoriaUrl)
      .toPromise()
      .then((response: any) => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.httpClient.delete(`${this.categoriaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(categoria: Categoria): Promise<Categoria> {
    return this.httpClient.post(this.categoriaUrl, JSON.stringify(categoria))
      .toPromise()
      .then((response: any) => response.content);
  }

  atualizar(categoria: Categoria): Promise<Categoria> {
    return this.httpClient.put(`${this.categoriaUrl}/${categoria.id}`,
      JSON.stringify(categoria))
      .toPromise()
      .then((response: any) => response.content as Categoria);
  }

  buscarPorCodigo(codigo: number): Promise<Categoria> {
    return this.httpClient.get(`${this.categoriaUrl}/${codigo}`)
      .toPromise()
      .then((response: any) => response.content as Categoria);
  }

}
