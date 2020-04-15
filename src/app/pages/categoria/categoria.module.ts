import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriaPesquisaComponent, NgbdModalConfirm, NgbdSortableHeader} from './categoria-pesquisa/categoria-pesquisa.component';
import {CategoriaRoutingModule} from './categoria-routing.module';
import {CategoriaService} from './categoria.service';
import {GenerateRowIndexesPipe} from '../../helpers/generate-row-indexes.pipe';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    NgbDropdownModule,
    NgxSpinnerModule,
    NgbModule
  ],
  declarations: [
    CategoriaPesquisaComponent,
    NgbdSortableHeader,
    GenerateRowIndexesPipe,
    NgbdModalConfirm
  ],
  exports: [],
  providers: [
    CategoriaService
  ]
})
export class CategoriaModule {
}
