import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GetItemsService } from '../../services/get-items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IItem } from '../../types/item.type';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
  // categoryId = '';
  // subCategoryId = '';
  // items$!: Observable<IItem[]>;

  constructor(private getItemsService: GetItemsService, private router: ActivatedRoute) {}

  ngOnInit() {
    // this.categoryId = this.router.snapshot.params.categoryId;
    // this.subCategoryId = this.router.snapshot.params.subCategoryId;
    //
    // this.items$ = this.getItemsService.getItems(this.categoryId, this.subCategoryId, 0, 10);
  }
}
