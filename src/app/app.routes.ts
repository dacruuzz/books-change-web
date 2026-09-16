import { Routes } from '@angular/router';
import { environment } from '../environments/environment';

export const routes: Routes = [
    ...(!environment.production
        ?
        [
            {
                path: 'playground',
                loadComponent: () =>
                    import('./playground/playground.page').then(m => m.PlaygroundPage),
            }
        ]
        :
        []
    )
];
