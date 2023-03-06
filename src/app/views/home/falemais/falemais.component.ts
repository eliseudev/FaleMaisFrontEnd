import { Component, OnInit } from '@angular/core';
import { ListarPlanos } from 'src/app/shared/model/ListarPlanos.model';
import { ListarTarifas } from 'src/app/shared/model/ListarTarifas.model';
import { FalemaisService } from 'src/app/shared/service/falemais.service';
import { formatNumber } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';

@Component({
  selector: 'app-falemais',
  templateUrl: './falemais.component.html',
  styleUrls: ['./falemais.component.css']
})

export class FalemaisComponent implements OnInit {
  displayedColumns: string[] = ['origem', 'destino', 'valor'];
  dataSource: ListarTarifas[];
  origemsDDD = testddd;
  planos: ListarPlanos[];
  calcularTaxa: number;
  calcularTaxaPlano: number;

  constructor(
    private service: FalemaisService,
  ) { }

  ngOnInit() {
    this.getListarTarifas();
    this.getListarPlanos();
   }
origem: string;
destino: string;
plano: string;
duracao: number;
valorGratuito: string;

toReal(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

origemValor(value){
  this.origem = value;
}

destinoValor(value){
  this.destino = value;
}

planoId(value){
  this.plano = value;
}

async duracaoValor(value){
  this.duracao = value;
  await this.getCalcular(this.origem, this.destino, this.duracao, this.plano);
}

   getListarTarifas(){
    this.service.getListarTarifas().subscribe(
      data =>{
        this.dataSource = data
      });
   }

   getListarPlanos(){
    this.service.getListarPlanos().subscribe(
      data => {
        this.planos = data
      }
    )
   }

   getCalcular(origem: string, destino: string, duracao: number, planoId: string){
      this.service.getCalcularTaxas(origem, destino, duracao).subscribe(
        data => {
          this.calcularTaxa = data;
        }
      )
      this.service.getCalcularTaxasPlano(origem, destino, duracao, planoId).subscribe(
        data => {
          this.calcularTaxaPlano = data;
        }
      )
   }

   valorCurrency(valor: string): string{
      if(valor != '0') {
        return this.toReal(parseInt(valor)).toString();
      }
      return 'Grátis';
   }
}

export interface OrigemDDD {
  value: string;
  viewValue: string;
}

const testddd: OrigemDDD[] = [
  {value: '011', viewValue: '011'},
  {value: '016', viewValue: '016'},
  {value: '017', viewValue: '017'},
  {value: '018', viewValue: '018'}
];
