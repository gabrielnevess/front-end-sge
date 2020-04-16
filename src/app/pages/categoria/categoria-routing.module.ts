import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CategoriaPesquisaComponent} from './categoria-pesquisa/categoria-pesquisa.component';
import {CategoriaCadastroComponent} from './categoria-cadastro/categoria-cadastro.component';

const routes: Routes = [
  {path: 'categoria', component: CategoriaPesquisaComponent},
  {path: 'categoria/novo', component: CategoriaCadastroComponent},
  {path: 'categoria/:codigo', component: CategoriaCadastroComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CategoriaRoutingModule {
}
