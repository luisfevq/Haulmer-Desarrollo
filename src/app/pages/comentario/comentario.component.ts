import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';

// Route
import { ActivatedRoute } from '@angular/router';

//Servicios
import { NewsService } from '../../news.service';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { NewsInterfaz } from '../../../model/new';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComentarioComponent implements OnInit, OnDestroy {


  comment:NewsInterfaz[] = [];
  id:string;

  displayedColumns: string[] = ['coment'];
  dataSource = new MatTableDataSource<NewsInterfaz>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnDestroy() {
    // this.ref.detach(); // try this
  }
  ngOnInit() {
    // this.ref.detach();
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 50;
    this.id = this.route.snapshot.paramMap.get('id');
    this.showComents(parseInt(this.id));
  }

  
  cargando:boolean = true;

  constructor(private route: ActivatedRoute, private ref: ChangeDetectorRef, public newsService: NewsService) { }

  showComents(id:number){
    this.newsService.getComentarioById(id)
    .subscribe((data:any) => {
      let arr = data.kids;
      // console.log(arr);  
        arr.forEach(element => {      
          // console.log(element);  
          this.newsService.comentarios(element)
            .subscribe((data:any)=>{
              // console.log(data.text); 
              let news = {
                id: data.id,
                title: data.title,
                url: data.url,
                coment: data.text
              };

              this.comment.push(news);
              // setTimeout(() => {
                this.dataSource.data = this.comment;
                
                if (!this.ref['destroyed']) {
                  // this.changeDetectionRef.detectChanges();
                  this.ref.detectChanges();
                }
                // this.ref.detectChanges();
              // }, 1000);
              // this.ref.detectChanges();
              this.cargando = false;      
            });          
        });
      });
  }

}
