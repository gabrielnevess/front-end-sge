import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CategoriaPesquisaComponent} from './categoria-pesquisa/categoria-pesquisa.component';

const routes: Routes = [
  {path: 'categoria', component: CategoriaPesquisaComponent},
  // { path: 'categoria/nova', component: CategoriaCadastroComponent },
  // { path: 'categoria/:codigo', component: CategoriaCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CategoriaRoutingModule {
}
