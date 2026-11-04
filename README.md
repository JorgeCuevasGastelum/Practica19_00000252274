# Practica 19 — El panel del gimnasio: el tablero en Angular
## Jorge Cuevas Gastelum - 00000252274
## Topico de Aplicaciones Web 7:30 - 9:00 P:M

El panel de administracion del gimnasio, ahora en Angular. Por ahora es solo
el tablero y usa datos locales, todavia sin API. Arriba hay un resumen con el
total de clases, los minutos a la semana y cuantas duran una hora o mas, y
abajo una tarjeta por clase. Dos botones vacian y restauran el catalogo.

El proyecto se creo con `ng new gimnasio-admin --ssr=false --routing=false
--skip-tests` y el componente de la tarjeta con
`ng generate component tarjeta-clase`.

Lo nuevo esta en src/app/app.ts y app.html (el tablero y el resumen) y en
src/app/tarjeta-clase/ (la tarjeta). Del codigo base se copiaron
src/styles.css, public/ (el logo y las 8 imagenes), src/app/modelos/ y
src/app/datos/.

Necesita Node 22.22.3, 24.15 o mas nuevo. Se levanta con `npm install` y
`npm start` y se abre en http://localhost:4200.

Las capturas estan en la carpeta evidencias/.


## Preguntas — Ejercicio 1

### 1. ¿Que archivo de Angular hace el papel de main.tsx, de App.tsx y de vite.config.ts?

- **main.tsx → src/main.ts.** Es el punto de entrada. En React se hacia
  createRoot(...).render(<App />) y aqui se hace
  bootstrapApplication(App, appConfig). Los dos arrancan la app con el
  componente raiz.
- **App.tsx → src/app/app.ts.** Es el componente raiz. La diferencia es que
  en Angular el componente se parte en tres archivos: la clase en app.ts, el
  template en app.html y los estilos en app.css. En React todo iba junto en
  el .tsx.
- **vite.config.ts → angular.json.** Ahi esta la configuracion del build y
  del servidor de desarrollo: de donde sale el codigo, que estilos se
  cargan, la carpeta public/, a donde va el build y el puerto. Angular usa
  esbuild y Vite por dentro, pero no se configuran directo, todo pasa por
  angular.json.

El index.html es el mismo en los dos: la pagina con el hueco donde se pinta
la app (`<div id="root">` en React, `<app-root>` aqui).


## Preguntas — Ejercicio 2

### 1. ¿Por que clase() lleva parentesis y para que sirve track?

Porque input.required() no regresa la clase, regresa una signal que la
contiene. Una signal se lee llamandola como funcion: clase() da el valor
actual. Al leerla asi, Angular sabe que ese pedazo del template depende de
la clase y solo lo vuelve a pintar cuando cambia. Si se escribe sin
parentesis, se estaria pintando la funcion y no la clase.

El track le dice a Angular como reconocer cada elemento de la lista; aqui
es track clase.id. Cuando la lista cambia, Angular compara por id: las
tarjetas que siguen ahi las reutiliza, solo crea las nuevas y quita las que
ya no estan, en vez de borrar y volver a pintar todo. Es lo mismo que el key
en React, pero en Angular es obligatorio.

### 2. Provocar y capturar los errores NG5002 y NG8001

**NG5002** es un error del parser del template, cuando el template esta mal
escrito. Se provoca quitando el track del @for en app.html:

```
@for (clase of clases()) {
```

```
X [ERROR] NG5002: @for loop must have a "track" expression
```

**NG8001** sale cuando el template usa una etiqueta que Angular no conoce.
Se provoca escribiendo mal el selector en app.html, por ejemplo
`<app-tarjeta [clase]="clase" />`. Tambien sale si se quita TarjetaClase del
arreglo imports de app.ts: en un componente standalone, el template solo
conoce los componentes que se importan ahi.

```
X [ERROR] NG8001: 'app-tarjeta' is not a known element
```

Los dos son errores de compilacion, no del navegador: el ng serve no deja
pasar el template y la pagina muestra el error encima.
