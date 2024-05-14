import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

//Importa la función platformBrowserDynamic desde el módulo @angular/platform-browser-dynamic.
//Importa el módulo AppModule desde el archivo app.module.ts.

//Utiliza la función platformBrowserDynamic para bootstrap el módulo AppModule. Esto inicia la aplicación Angular y renderiza el componente raíz en el navegador.
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err)); //Captura cualquier error que ocurra durante el proceso de bootstrap y lo imprime en la consola con un mensaje de error.
