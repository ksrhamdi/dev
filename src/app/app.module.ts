import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from './app.routing';
import { DefaultModule } from './pages/layouts/default/default.module';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatNativeDateModule} from '@angular/material/core';
// import {MatInputModule} from '@angular/material/input';
// import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddpactionComponent } from './pages/modules/addpaction/addpaction.component';
// import { FileUploadModule } from 'ng2-file-upload';
import { MaterialModule } from './material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatButtonModule, MatSelectModule, MatCheckboxModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    NgSelectModule,
    NgxPaginationModule,
    MatRadioModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory : HttpLoaderFactory ,
        deps : [HttpClient]
      }
    }),
    
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
