import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Item } from 'src/app/interfaces/item';
import { UserData } from 'src/app/interfaces/userInfo';
import { AppApisService } from 'src/app/services/app-apis.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  itemsInCart: Item[] = [];
  user!: UserData;
  total!: number;

  constructor(private service: AppApisService, private router: Router) {}

  ngOnInit(): void {
    this.user = {
      fullName: 'John Doe',
      address: '123 Main St, City, Country',
      creditCardNumber: '1234 5678 9012 3456',
    };
    this.service.itemsInCart$.subscribe((res: Item[]) => {
      this.itemsInCart = res;
      this.total = res.reduce(
        (acc: any, curr) =>
          (acc += curr.price * (curr.amount ? curr.amount : 0)),
        0
      );
    });
  }
  ngOnDestroy(){
    this.itemsInCart = []
  }
  onSubmit() {
    const navigationExtras = {
      state: { name: this.user.fullName, price: this.total },
    };
    this.router.navigate(['/confirm'], navigationExtras);
  }
  amountChange(amount: any, id:any){
    if (amount == 0) {
      this.service.removeFromCart(id)
    } else {
      this.service.updateAmount(id, amount);
    }
    
  }
}
