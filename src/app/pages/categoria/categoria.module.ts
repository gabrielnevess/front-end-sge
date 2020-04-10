import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriaPesquisaComponent, NgbdSortableHeader} from './categoria-pesquisa/categoria-pesquisa.component';
import {CategoriaRoutingModule} from './categoria-routing.module';
import {CategoriaService} from './categoria.service';
import {GenerateRowIndexesPipe} from '../../helpers/generate-row-indexes.pipe';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    NgbDropdownModule
  ],
  declarations: [
    CategoriaPesquisaComponent,
    NgbdSortableHeader,
    GenerateRowIndexesPipe
  ],
  exports: [],
  providers: [
    CategoriaService
  ],

})
export class CategoriaModule {
}
