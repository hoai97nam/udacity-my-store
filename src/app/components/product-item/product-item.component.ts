import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { AppApisService } from 'src/app/services/app-apis.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input()
  item!: Item;

  @Output() add2Cart = new EventEmitter<Item>();
  @Output() go2Detail = new EventEmitter<number>();

  numbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  selectedAmount: number = 1;
  constructor(
    private service: AppApisService

  ) {}

  ngOnInit(): void {}

  onSelect(e: any) {
    this.selectedAmount = Number(e);
    if (this.selectedAmount === 0) {
      this.service.removeFromCart(this.selectedAmount);
    }
  }

  add2CartEvent(item: Item) {
    item.amount = this.selectedAmount;
    this.add2Cart.emit(item);
  }
}
