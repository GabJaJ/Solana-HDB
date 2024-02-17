import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('./home-page.components').then((m) => m.HomePageComponent),
    },
    {
        path: 'settings',
        loadComponent: () =>
            import('./settings-page.components').then((m) => m.SettingsPageComponent),
    },
    {
        path: 'balance',
        loadComponent: () =>
            import('./balance-page.components').then((m) => m.BalancePageComponent),
    },
    {
        path: '**',
        redirectTo: '',
    },

];
