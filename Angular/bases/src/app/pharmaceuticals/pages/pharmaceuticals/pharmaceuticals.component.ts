import { Component, OnInit } from '@angular/core';
import { Drug } from '../../interfaces/drug.interface';
import { EPharmaType } from '../../interfaces/enums.interface';

@Component({
  selector: 'app-pharmaceuticals',
  templateUrl: './pharmaceuticals.component.html',
  styleUrls: ['./pharmaceuticals.component.css']
})
export class PharmaceuticalsComponent implements OnInit {

  pharmaceuticals: Drug[] = [
    {
      name: 'Ibuprofeno',
      price: 10,
      type: EPharmaType.Analgesico
    },
    {
      name: 'Lidocaina',
      price: 10,
      type: EPharmaType.Anestesico
    },
    {
      name: 'Diazepam',
      price: 10,
      type: EPharmaType.Ansiolitico
    },
    {
      name: 'Amoxicilina',
      price: 10,
      type: EPharmaType.Antibiotico
    },
    {
      name: 'Atropina',
      price: 10,
      type: EPharmaType.Anticolinergico
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onNewDrug(drug: Drug) {
    console.log(drug);
    this.pharmaceuticals.push(drug);
  }

}
