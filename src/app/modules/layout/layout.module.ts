import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ContentComponent } from './components/content/content.component';
import { CoreComponent } from './components/core/core.component';
import { NavbarComponent } from './components/sidebar/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    ContentComponent,
    CoreComponent,
    NavbarComponent
  ],
  imports: [CommonModule, MatIconModule]
})
export class LayoutModule {}
