import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
})
export class PagerComponent implements OnInit {
  constructor() {}

  @Input() totalCount!: number;
  @Input() pageSize!: number;
  @Output() pageChanged = new EventEmitter<number>();

  ngOnInit(): void {}

  onPagerChange(event: any) {
    this.pageChanged.emit(event.page);
  }
}