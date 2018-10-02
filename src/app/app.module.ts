import { NewsService } from './news.service';
import { NgModule } from '@angular/core';

// Pages
import { AppComponent } from './app.component';
import { NewsComponent } from './pages/news/news.component'; 
import { ComentarioComponent } from './pages/comentario/comentario.component';

// MD
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// APIS
import { HttpClientModule } from '@angular/common/http';

//Routes
import { RouterModule } from '@angular/router';
import { Page404Component } from './pages/page404/page404.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ComentarioComponent,
    NewsComponent,
    Page404Component
  ],
  imports: [
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: 'top', component: NewsComponent },
      { path: 'story/:id', component: ComentarioComponent },
      { path: '', redirectTo: '/top', pathMatch: 'full' },
      { path: '**', component: Page404Component }
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
