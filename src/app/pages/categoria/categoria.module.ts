import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriaPesquisaComponent, NgbdModalConfirm, NgbdSortableHeader} from './categoria-pesquisa/categoria-pesquisa.component';
import {CategoriaRoutingModule} from './categoria-routing.module';
import {CategoriaService} from './categoria.service';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule} from 'ngx-spinner';
import {HelpersModule} from '../../helpers/helpers.module';
import {CategoriaCadastroComponent} from './categoria-cadastro/categoria-cadastro.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    NgbDropdownModule,
    NgxSpinnerModule,
    NgbModule,
    HelpersModule,
    ReactiveFormsModule
  ],
  declarations: [
    CategoriaPesquisaComponent,
    CategoriaCadastroComponent,
    NgbdSortableHeader,
    NgbdModalConfirm
  ],
  exports: [],
  providers: [
    CategoriaService,
    HelpersModule,
    FormBuilder
  ]
})
export class CategoriaModule {
}
