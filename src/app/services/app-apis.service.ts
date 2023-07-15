import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/item';
import { BehaviorSubject, Observable, Subject, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppApisService implements OnInit {
  products: Item[] = [];
  cart: Item[] = [];
  dataSubject = new BehaviorSubject<Item[]>([]);
  itemsInCart$: Observable<Item[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  fetchData() {
    return this.http.get<Item[]>('/assets/data.json');
  }

  getDetail(id: number) {
    return this.fetchData().pipe(
      mergeMap((array) => this.convertToArrayElements(array, id))
    );
  }

  addToCart(item: Item) {
    this.cart = [...this.cart, item];
    this.collapsedItems();
    alert("added to cart")
    this.dataSubject.next(this.cart);
  }
  removeFromCart(id: number) {
    this.cart = [...this.cart.filter((x: Item) => x.id != id)];
    alert("removed from cart")
    this.dataSubject.next(this.cart);
  }

  updateAmount(id: number, amount: number) {
    this.cart.map((x: Item)=> x.id === id ? x.amount = amount : x.amount);
    alert("updated from cart")
    this.dataSubject.next(this.cart);
  }

  private convertToArrayElements(array: Item[], id: number): Observable<Item> {
    return new Observable<Item>((observer) => {
      array.map((item) => {
        if (item.id === id) observer.next(item);
      });
      observer.complete();
    });
  }
  collapsedItems = () => {
    this.cart = this.cart.reduce((acc: any, curr) => {
      const existingItemIndex = acc.findIndex(
        (item: any) => item.id === curr.id
      );
      if (existingItemIndex !== -1) {
        acc[existingItemIndex].amount += curr.amount;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  };
}
