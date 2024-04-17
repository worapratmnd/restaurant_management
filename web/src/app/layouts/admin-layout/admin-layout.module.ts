import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { SearchFormComponent } from 'app/order/components/search-form/search-form.component';
import { OrderComponent } from 'app/order/order.component';
import { CreateOrderComponent } from 'app/order/pages/create-order/create-order.component';
import { OrderListComponent } from 'app/order/components/order-list/order-list.component';
import { ManageTableComponent } from 'app/manage-table/manage-table.component';
import { TableListComponent } from 'app/table-list/table-list.component';
import { SearchTableFormComponent } from 'app/manage-table/components/search-table-form/search-table-form.component';
import { PopupTableComponent } from 'app/manage-table/components/popup-table/popup-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ManageTableListComponent } from 'app/manage-table/components/manage-table-list/manage-table-list.component';
import { RecipeComponent } from 'app/recipe/recipe.component';
import { TableFormComponent } from 'app/manage-table/components/table-form/table-form.component';
import { RecipeFormComponent } from 'app/recipe/components/recipe-form/recipe-form.component';
import { RecipeSearchFormComponent } from 'app/recipe/components/recipe-search-form/recipe-search-form.component';
import { RecipeListComponent } from 'app/recipe/components/recipe-list/recipe-list.component';
import { OrderFormComponent } from 'app/order/components/order-form/order-form.component';
import { UpdateOrderComponent } from 'app/order/pages/update-order/update-order.component';
import { UserListComponent } from 'app/user-profile/components/user-list/user-list.component';
import { UserFormComponent } from 'app/user-profile/components/user-form/user-form.component';
import { UserSearchFormComponent } from 'app/user-profile/components/user-search-form/user-search-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    OrderComponent,
    CreateOrderComponent,
    SearchFormComponent,
    OrderListComponent,
    ManageTableComponent,
    TableListComponent,
    ManageTableListComponent,
    SearchTableFormComponent,
    PopupTableComponent,
    RecipeComponent,
    TableFormComponent,
    RecipeFormComponent,
    RecipeSearchFormComponent,
    RecipeListComponent,
    OrderFormComponent,
    UpdateOrderComponent,
    UserListComponent,
    UserFormComponent,
    UserSearchFormComponent,
  ]
})

export class AdminLayoutModule { }
