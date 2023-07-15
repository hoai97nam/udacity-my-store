import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Item } from 'src/app/interfaces/item';
import { AppApisService } from 'src/app/services/app-apis.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  product$!: Observable<Item>;
  id!: number;
  numbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  selectedAmount: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AppApisService
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.service.getDetail(Number(params.get('id')));
      })
    );
  }
  add2Cart(i: Item){
    i.amount = this.selectedAmount;
    this.service.addToCart(i);
  }
  onSelect(e: any) {
    this.selectedAmount = Number(e);
  }
}
