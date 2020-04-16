import {Title} from '@angular/platform-browser';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Categoria} from '../../../model/Categoria';
import {CategoriaService} from '../categoria.service';
import {ErrorHandlerService} from '../../../helpers/error-handler.service';
import {NotificationService} from '../../../helpers/notification.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-categoria-cadastro',
  templateUrl: './categoria-cadastro.component.html',
  styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

  categorias = [];
  formulario: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder,
    private toastr: NotificationService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit() {
    this.configurarFormulario();

    const codigoCategoria = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Categoria');

    if (codigoCategoria) {
      this.carregarCategoria(codigoCategoria);
    }

  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      name: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(3)]],
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : {obrigatoriedade: true});
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo: {tamanho: valor}};
    };
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  carregarCategoria(codigo: number) {

    this.spinnerService.show();
    this.categoriaService.buscarPorCodigo(codigo)
      .then(categoria => {
        this.formulario.patchValue(categoria);
        this.atualizarTituloEdicao();
        this.spinnerService.hide();
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.spinnerService.hide();
      });
  }

  salvar() {
    if (this.editando) {
      this.atualizarCategoria();
    } else {
      this.adicionarCategoria();
    }
  }

  adicionarCategoria() {
    this.categoriaService.adicionar(this.formulario.value)
      .then(_ => {
        this.toastr.showSuccess('Categoria adicionada com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCategoria() {
    this.categoriaService.atualizar(this.formulario.value)
      .then(_ => {
        this.formulario.patchValue(this.formulario.value);

        this.toastr.showSuccess('Categoria alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    setTimeout(function () {
      this.categoria = new Categoria();
    }.bind(this), 1);

    this.router.navigate(['/categoria/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de categoria: ${this.formulario.get('name').value}`);
  }
}
