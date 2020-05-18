import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/pages/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/pages/shared/shared.module';
import { MatSidenavModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from '../../login/login.component';
import { AddpactionComponent } from '../../modules/addpaction/addpaction.component';
import { FormsModule } from '@angular/forms';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppRoutingModule } from '../../../app.routing';
import { EnrechirPlandComponent } from '../../modules/enrechir-pland/enrechir-pland.component';
import { AvatarModule } from 'ngx-avatar';
import {AddActionComponent} from '../../modules/add-action/add-action.component';
const avatarColors = ['#FFB6C1', '#2c3e50', '#95a5a6', '#f39c12', '#1abc9c'];
import { MaterialModule } from '../../../material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { GrdFilterPipe } from './search-pipe.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule, MatCheckboxModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { EditActionComponent } from '../../modules/edit-action/edit-action.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    LoginComponent,
    AddpactionComponent,
    EnrechirPlandComponent,
    AddActionComponent,
    GrdFilterPipe,
    EditActionComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MaterialModule,
    RouterModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    NgxPaginationModule,
    MatSelectModule,
    AvatarModule,
    NgSelectModule,
    SharedModule,
    NgSelectModule,
    MatSidenavModule,
    MatSelectModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
 
    BrowserAnimationsModule,
    FileUploadModule,
    FlexLayoutModule,
    FormsModule,
    AvatarModule.forRoot({
      colors: avatarColors
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory : HttpLoaderFactory ,
        deps : [HttpClient]
      }
    }),
    AppRoutingModule,
    
  ],


  providers: [
    
  ]
})
export class DefaultModule { }
