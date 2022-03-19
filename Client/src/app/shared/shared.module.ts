import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginHeaderComponent } from './components/pagin-header/pagin-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [PaginHeaderComponent, PagerComponent],
  imports: [CommonModule, PaginationModule.forRoot(), CarouselModule.forRoot()],
  exports: [
    PaginationModule,
    PaginHeaderComponent,
    PagerComponent,
    CarouselModule,
  ],
})
export class SharedModule {}
