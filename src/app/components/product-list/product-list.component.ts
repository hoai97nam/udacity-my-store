import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/interfaces/item';
import { AppApisService } from 'src/app/services/app-apis.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private apiService: AppApisService, 
    private router: Router,
    ) {}
  itemList!: Item[];

  ngOnInit(): void {
    this.apiService.fetchData().subscribe((res: Item[]) => {
      this.itemList = res;
    });
  }

  add2Cart(item: Item){
    this.apiService.addToCart(item);
  }

  go2Detail(id: number){
    this.router.navigate([`list/${id}`]);
  }
}
