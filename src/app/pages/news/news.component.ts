import { Component, ViewChild, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

// Angular Material
import {MatPaginator, MatTableDataSource} from '@angular/material';

// Servicios
import { NewsService } from '../../news.service';

// Interfaz , Clase
import { NewsInterfaz } from '../../../model/new';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit, OnDestroy {

  topNews:NewsInterfaz[] = [];
  cargando:boolean = true;

  displayedColumns: string[] = ['id','title','coment'];
  dataSource = new MatTableDataSource<NewsInterfaz>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  

  ngOnInit() { 
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 50;
    this.showTopNews();
  }
  ngOnDestroy(){    
    this.changeDetectorRefs.detach();
  }

  constructor(public newsService: NewsService, private changeDetectorRefs: ChangeDetectorRef){}

  showTopNews() {
    this.newsService.getTop()
      .subscribe((data: any) => {
        this.cargando = false;
        data.forEach(element => {
          this.newsService.getNewById(element)
            .subscribe((data:any) => {
              
              let news = {
                id: data.id,
                title: data.title,
                url: data.url,
                coment: data.coment
              };

              this.topNews.push(news);
              this.dataSource.data = this.topNews;
              if (!this.changeDetectorRefs['destroyed']) {
                // this.changeDetectionRef.detectChanges();
                this.changeDetectorRefs.detectChanges();
              }
              
            });          
          });
          // console.log(this.topNews);
      });
  }

}
