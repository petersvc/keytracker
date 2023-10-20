import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    ContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
