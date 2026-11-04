// <app-tarjeta-clase> — la tarjeta de UNA clase.
// El padre le pasa la clase con [clase]="..."; es obligatoria: sin ella
// el compilador marca error en el template del padre.
import { Component, computed, input } from '@angular/core';
import type { Clase } from '../modelos/clase';

@Component({
  imports: [],
  selector: 'app-tarjeta-clase',
  styleUrl: './tarjeta-clase.css',
  templateUrl: './tarjeta-clase.html',
})
export class TarjetaClase {
  // input.required(): una signal de sólo lectura con lo que mandó el padre.
  readonly clase = input.required<Clase>();

  // «Larga» = 60 minutos o más.
  protected readonly larga = computed(() => this.clase().duracionMin >= 60);
}
