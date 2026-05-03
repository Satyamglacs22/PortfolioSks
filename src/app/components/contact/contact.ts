import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  // Form State
  isSending = signal(false);
  isSuccess = signal(false);
  isError = signal(false);

  async sendEmail(e: Event) {
    e.preventDefault();
    
    // IMPORTANT: Sign up at https://www.emailjs.com/ to get your IDs
    // These are placeholders - replace them with your real IDs from your EmailJS dashboard
    const SERVICE_ID = 'service_kllmns5'; 
    const TEMPLATE_ID = 'template_ctsbcfc';
    const PUBLIC_KEY = 'l3Wp-52Jx7PnY0_JR';

    this.isSending.set(true);
    this.isSuccess.set(false);
    this.isError.set(false);

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        e.target as HTMLFormElement,
        PUBLIC_KEY
      );
      
      this.isSuccess.set(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Email failed to send:', error);
      this.isError.set(true);
    } finally {
      this.isSending.set(false);
    }
  }
}
