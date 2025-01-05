import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';


@NgModule({
  declarations: [
    ClientComponent,
    ClientDashboardComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule
  ]
})
export class ClientModule { }
