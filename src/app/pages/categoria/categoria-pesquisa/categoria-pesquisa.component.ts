import {Component, OnInit} from '@angular/core';
import {CategoriaFiltro, CategoriaService} from '../categoria.service';

@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.component.html',
  styleUrls: ['./categoria-pesquisa.component.css']
})
export class CategoriaPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new CategoriaFiltro();
  categorias = [];

  constructor(
    private categoriaService: CategoriaService,
  ) {
  }

  ngOnInit() {
    this.pesquisar(0);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.categoriaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.categorias = resultado.categorias;
      })
      .catch(erro => console.log('error: ', erro));
  }

  // aoMudarPagina(event: LazyLoadEvent) {
  //   const pagina = event.first / event.rows;
  //   this.pesquisar(pagina);
  // }

  // confirmarExclusao(categoria: any) {
  //   this.confirmation.confirm({
  //     message: 'Tem certeza que deseja excluir?',
  //     accept: () => {
  //       this.excluir(categoria);
  //     }
  //   });
  // }

  // excluir(categoria: any) {
  //   this.categoriaService.excluir(categoria.codigo)
  //     .then(() => {
  //       if (this.grid.first === 0) {
  //         this.pesquisar();
  //       } else {
  //         this.grid.first = 0;
  //       }
  //
  //       this.toasty.success('Pesssoa excluída com sucesso!');
  //     })
  //     .catch(erro => console.log("error: ", erro));
  // }

}
