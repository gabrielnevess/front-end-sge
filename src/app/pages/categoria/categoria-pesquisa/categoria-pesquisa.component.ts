import { Component, Directive, EventEmitter, OnInit, Input, Output, QueryList, ViewChildren } from '@angular/core';
import {CategoriaFiltro, CategoriaService} from '../categoria.service';
import {Categoria} from '../../../model/Categoria';

export type SortColumn = keyof Categoria | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.component.html',
  styleUrls: ['./categoria-pesquisa.component.css']
})
export class CategoriaPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new CategoriaFiltro();
  categorias = [];
  categoriaAux = [];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.categorias = this.categoriaAux;
    } else {
      this.categorias = [...this.categoriaAux].sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      });
    }
  }

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
        this.categoriaAux = resultado.categorias;
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
