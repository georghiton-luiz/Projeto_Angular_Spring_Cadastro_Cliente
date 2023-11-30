import { Component } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent {
  //Objeto do tipo Cliente
  cliente = new Cliente();

  //Variavel para visibilidade dos botões
  btnCadastro: boolean = true;

  //Variavel para visibilidade da tabela
  tabela: boolean = true;

  //JSON de clientes
  clientes: Cliente[] = [];

  //Construtor
  constructor(private servico: ClienteService) {}

  //Método de seleção
  selecionar(): void {
    this.servico.selecionar().subscribe((retorno) => (this.clientes = retorno));
  }

  //Metodo de cadastro
  cadastrar(): void {
    this.servico.cadastrar(this.cliente).subscribe((retorno) => {
      //Cadastrar o cliente no vetor
      this.clientes.push(retorno);

      //Limpar formulário
      this.cliente = new Cliente();

      //Mensagem
      alert('Cliente cadastrad com sucesso!');
    });
  }

  //Método para selecionar um cliente especifico
  selecionarCliente(posicao: number): void {
    //Selecionar cliente no vetor
    this.cliente = this.clientes[posicao];

    //Visibilidade dos botões
    this.btnCadastro = false;

    //Visibilidade da tabela
    this.tabela = false;
  }

  ngOnInit() {
    this.selecionar();
  }
}
