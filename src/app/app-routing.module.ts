import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LoginComponent, RegisterComponent, HomeComponent, PerfilComponent, AdminComponent} from '@mean/public';
import { HomeGuard, LoginGuard, PerfilGuard, AdminGuard } from "./guards";
//Importa el decorador NgModule desde el módulo @angular/core. Importa los símbolos Routes, RouterModule y PreloadAllModules desde el módulo @angular/router.
//Importa los componentes LoginComponent, RegisterComponent y HomeComponent desde el módulo @mean/public.
//Importa los guardias HomeGuard y LoginGuard desde el archivo guards.

//Define un arreglo de rutas que se utilizarán en la aplicación.
const routes: Routes = [
  { //La ruta raíz (''), que se redirige al componente HomeComponent y utiliza el guardia HomeGuard para verificar si el usuario está autenticado.
    path: '',
    component: HomeComponent,
    canActivate: [HomeGuard]
  },

  { //La ruta de login ('login'), que se redirige al componente LoginComponent y utiliza el guardia LoginGuard para verificar si el usuario está autenticado.
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },

  { //La ruta de registro ('register'), que se redirige al componente RegisterComponent.
    path: 'register',
    component: RegisterComponent
  },
  { //Ruta para el perfil
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [PerfilGuard]
  },
  { //Ruta para el admin
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },

  { //La ruta de catch-all ('**'), que se redirige a la ruta raíz ('') si no se encuentra una ruta que coincida.
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  }
];

//Define el módulo AppRoutingModule
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
  //Importa el módulo RouterModule y configura las rutas utilizando el método forRoot. También se utiliza la estrategia de precarga PreloadAllModules para precargar todos los módulos.
  //Exporta el módulo RouterModule para que esté disponible en otros módulos.
})

export class AppRoutingModule {}
