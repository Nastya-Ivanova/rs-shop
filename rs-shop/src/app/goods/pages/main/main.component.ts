import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GetItemsService } from '../../sevices/get-items.service';
import { IItem } from '../../types/item.type';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  items$: Observable<IItem[]> = of([]);

  constructor(private getItemsService: GetItemsService) {}

  ngOnInit() {
    this.items$ = this.getItemsService.getItems();
    //.pipe(map((item, index) => (item.image = this.slides[index])));
    //.subscribe(items => {this.items$ = items});
  }
}
