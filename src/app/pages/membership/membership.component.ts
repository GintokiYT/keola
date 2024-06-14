import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DetailModalComponent } from './detail-modal/detail-modal.component';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [
    CommonModule,
    DetailModalComponent
  ],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.scss'
})
export class MembershipComponent {

  private readonly URL_MEMBERSHIP = "https://inclubtest.com:2053/api/suscription/payment/12853";
  http = inject(HttpClient);
  suscriptions: any[] = [];
  statusModal: boolean = false;
  currentId: number = 0;

  ngOnInit() {
    this.getMembership();
  }

  getMembership() {
    this.http.get(this.URL_MEMBERSHIP)
    .subscribe({
      next: (data: any) => {
        this.suscriptions = data.objModel.suscriptions;
        console.log(this.suscriptions);
      }
    })
  }

  transformCurrency(amount: number) {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  openModal(id: number) {
    this.currentId = id;
    this.statusModal = true;
  }
}
