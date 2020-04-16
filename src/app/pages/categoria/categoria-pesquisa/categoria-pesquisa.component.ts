import {Component, Directive, EventEmitter, OnInit, Input, Output, QueryList, ViewChildren} from '@angular/core';
import {CategoriaFiltro, CategoriaService} from '../categoria.service';
import {Categoria} from '../../../model/Categoria';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../../helpers/notification.service';

export type SortColumn = keyof Categoria | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {'asc': 'desc', 'desc': '', '': 'asc'};
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
  selector: 'ngbd-modal-confirm',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{title}}</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{description}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel')">Cancel</button>
      <button type="button" class="btn btn-primary" (click)="modal.close('Ok')">Ok</button>
    </div>
  `
})
export class NgbdModalConfirm {
  @Input() title;
  @Input() description;

  constructor(public modal: NgbActiveModal) {
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
    private spinnerService: NgxSpinnerService,
    private toastr: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.pesquisar(0);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.spinnerService.show();

    this.categoriaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.categorias = resultado.categorias;
        this.categoriaAux = resultado.categorias;
        this.spinnerService.hide();
      })
      .catch(erro => {
        console.log('error: ', erro);
        this.spinnerService.hide();
      });
  }

  confirmarExclusao(categoria: Categoria) {
    const modalRef = this.modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.title = 'Deletar Categoria';
    modalRef.componentInstance.description = `Deseja realmente deletar a categoria ${categoria.name}?`;
    modalRef.result.then((result) => {
      if (result == 'Ok') {
        this.excluir(categoria);
      }
    });

  }

  excluir(categoria: Categoria) {
    this.categoriaService.excluir(categoria.id)
      .then(() => {
        this.pesquisar();
        this.toastr.showSuccess(`Categoria ${categoria.name} excluída com sucesso!'`);
      })
      .catch(erro => {
        this.toastr.showError(`Erro ao excluir categoria ${categoria.name}`);
      });
  }

}
