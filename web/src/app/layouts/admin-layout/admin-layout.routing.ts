import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { OrderComponent } from 'app/order/order.component';
import { CreateOrderComponent } from 'app/order/pages/create-order/create-order.component';
import { ManageTableComponent } from 'app/manage-table/manage-table.component';
import { RecipeComponent } from 'app/recipe/recipe.component';
import { UpdateOrderComponent } from 'app/order/pages/update-order/update-order.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'order',
        children: [
            {
                path: '',
                component: OrderComponent,
            },
            {
                path: 'create',
                component: CreateOrderComponent,
            },
            {
                path: 'edit/:id',
                component: UpdateOrderComponent,
            }
        ]
    },
    {
        path: 'table', children: [
            {
                path: '',
                component: ManageTableComponent,
            },
        ]
    },
    {
        path: 'recipe', children: [
            {
                path: '',
                component: RecipeComponent,
            },
        ]
    },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'dashboard', component: DashboardComponent },
    // { path: 'table-list', component: TableListComponent },
    // { path: 'typography', component: TypographyComponent },
    // { path: 'icons', component: IconsComponent },
    // { path: 'maps', component: MapsComponent },
    // { path: 'notifications', component: NotificationsComponent },
    // { path: 'upgrade', component: UpgradeComponent },
];
