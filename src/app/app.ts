import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  currencies = ['MYR', 'USD', 'INR', 'EUR', 'GBP', 'NPR'];
  fromCurrency = 'MYR';
  toCurrency = 'NPR';
  amount = 1;
  result: number | null = null;

  constructor(private currencyService: CurrencyService) {}

  onExchange() {
    const payload = {
      fromCurrency: this.fromCurrency,
      toCurrency: this.toCurrency,
      amount: this.amount
    };

    this.currencyService.exchangeCurrency(payload).subscribe(response => {
      debugger;
      this.result = response.amountReceived;
    });
  }

  onBook() {
    if (!this.result) {
      alert('Please convert currency first before booking!');
      return;
    }

    const bookingPayload = {
      fromCurrency: this.fromCurrency,
      toCurrency: this.toCurrency,
      amount: this.amount,
      convertedAmount: this.result,
      bookingDate: new Date()
    };

    this.currencyService.bookExchange(bookingPayload).subscribe(res => {
      alert('Currency exchange booked successfully!');
    });
  }
}
