import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IItem } from '../../types/item.type';
import { GetItemService } from '../../services/get-item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
  item$!: Observable<IItem>;
  itemId = '';
  categoryName = '';
  subcategoryName = '';

  constructor(private getItemService: GetItemService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.itemId = this.router.snapshot.params.itemId;
    this.item$ = this.getItemService.getItem(this.itemId);
    this.categoryName = this.router.snapshot.queryParams.categoryName;
    this.subcategoryName = this.router.snapshot.queryParams.subcategoryName;
  }
}
