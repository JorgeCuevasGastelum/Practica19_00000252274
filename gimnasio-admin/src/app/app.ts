// app.ts — el componente raíz: el tablero del panel.
// Las clases viven en una signal; el resumen sale de ellas con computed(),
// así que se recalcula solo cuando el catálogo cambia (vaciar / restaurar).
import { Component, computed, signal } from '@angular/core';
import { CLASES_LOCALES } from './datos/clases-locales';
import type { Clase } from './modelos/clase';
import { TarjetaClase } from './tarjeta-clase/tarjeta-clase';

@Component({
  // Standalone: el componente dice qué otros componentes usa su template.
  imports: [TarjetaClase],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly clases = signal<Clase[]>(CLASES_LOCALES);

  // El resumen de arriba del tablero.
  protected readonly total = computed(() => this.clases().length);
  protected readonly minutosSemana = computed(() =>
    this.clases().reduce((suma, c) => suma + c.duracionMin, 0),
  );
  protected readonly deUnaHora = computed(() => this.clases().filter((c) => c.duracionMin >= 60).length);

  protected vaciar() {
    this.clases.set([]);
  }

  protected restaurar() {
    this.clases.set(CLASES_LOCALES);
  }
}
