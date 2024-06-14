import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly URL_LOGIN = "https://inclubtest.com:2053/api/token";
  http = inject(HttpClient);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  form: FormGroup = this.formBuilder.group({
    username: ["", [
      Validators.required
    ]],
    password: ["", [
      Validators.required,
      Validators.maxLength(8)
    ]]
  })

  handleSubmitLogin(event: Event) {
    event.preventDefault();
    this.http.post(this.URL_LOGIN, {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value
    }).subscribe({
      next: (data: any) => {
        localStorage['token'] = data.access_Token;
        this.router.navigate(['membership']);
      },
      error: (error: any) => {
        console.log(error);
        this.form.reset();
      },
    });
  }
}
