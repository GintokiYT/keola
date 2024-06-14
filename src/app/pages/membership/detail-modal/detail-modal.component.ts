import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, input, model } from '@angular/core';

@Component({
  selector: 'app-detail-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.scss'
})
export class DetailModalComponent {

  private readonly URL_CRONOGRAMA = "https://inclubtest.com:2053/api/payment/schedule/vouchers/";
  private readonly URL_PAYMENT = "https://inclubtest.com:2053/api/payment/validate";
  statusModal = model();
  currentId = input();
  http = inject(HttpClient);
  schedules: any[] = [];

  ngOnInit() {
    document.body.classList.add('overflow-hidden');
    this.getData();
  }

  getData() {
    this.http.get(this.URL_CRONOGRAMA + this.currentId() + '/12853')
    .subscribe({
      next: ( data: any) => {
        console.log(data);
        this.schedules = data.objModel;
        console.log(this.schedules);
      }
    })
  }

  fetchAceptar(id: number) {
    const body = {
      IdSuscription: 12853,
      ListIdPaymentsValidate: [ id ],
      IsAcceptedPayment: 1,
      ReasonRejection: {
        id: id,
        Detalle: ""
      }
    }
    this.http.post(this.URL_PAYMENT, body)
    .subscribe({
      next: (data: any) => {
        console.log(data);
      }
    })
    this.statusModal.set(false);
  }

  fetchRechazar(id: number) {
    const body = {
      IdSuscription: 12853,
      ListIdPaymentsValidate: [ id ],
      IsAcceptedPayment: 0,
      ReasonRejection: {
        id: 1,
        Detalle: "EL CÓDIGO DE OPERACIÓN ES INCORRECTO O NO EXISTE"
      }
    }
    this.http.post(this.URL_PAYMENT, body)
    .subscribe({
      next: (data: any) => {
        console.log(data);
      }
    })
    this.statusModal.set(false);
  }

  ngOnDestroy() {
    document.body.classList.remove('overflow-hidden');
  }

  closeModal() {
    this.statusModal.set(false);
  }

  transformCurrency(amount: number) {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}
