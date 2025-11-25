import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideLottieOptions } from 'ngx-lottie';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// 👇 Lottie player factory (needed by ngx-lottie)
export function playerFactory() {
  return import('lottie-web');
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(), // 👈 required for Lottie
    provideLottieOptions({
      player: playerFactory, // 👈 connect lottie-web player
    }),
  ],
});
