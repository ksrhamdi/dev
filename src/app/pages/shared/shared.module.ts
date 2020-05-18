import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {MatInputModule,MatSelectModule,MatRadioModule,MatDividerModule,MatTableModule,MatDialogModule, MatToolbarModule,MatCheckboxModule, MatIconModule, MatFormFieldModule, MatButtonModule, MatMenuModule, MatListModule } from '@angular/material';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AvatarModule } from 'ngx-avatar';
import {MatBadgeModule} from '@angular/material';




const avatarColors = ['#FFB6C1', '#2c3e50', '#95a5a6', '#f39c12', '#1abc9c'];


@NgModule({
  declarations: [
    SidebarComponent,
 

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule,
    MatTableModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    AvatarModule.forRoot({
      colors: avatarColors
    }),
  ],

  exports: [
   
    SidebarComponent,

   
    
  ]
})
export class SharedModule { }

