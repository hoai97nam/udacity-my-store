import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  @Input() name!: string;
  @Input() price!: number;

  constructor(private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    this.name = state?.['name'];
    this.price = state?.['price'];
  }

  ngOnInit(): void {}

  Back2List() {
    this.router.navigate(['/list']);
  }
}
