import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideWalletAdapter } from '@heavy-duty/wallet-adapter';
import { provideHttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), 
    provideAnimationsAsync(), 
    provideWalletAdapter(),
    provideHttpClient(),
    importProvidersFrom([MatDialogModule, MatSnackBarModule]),
  ],
};
