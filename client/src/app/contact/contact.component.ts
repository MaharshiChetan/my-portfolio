import { MessageService } from './../services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  processing = false;
  progressClass;
  messageSent = false;
  message;
  cardMessage;
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.createForm(); // Create Angular 2 Form when component loads
  }

  // Function to create contact form
  createForm() {
    this.form = this.formBuilder.group({
      // name Input
      name: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
      ])],
      // Email Input
      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateEmail // Custom validation
      ])],
      // Message Input
      message: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(60), // Minimum length is 8 characters
      ])],
    });
  }

  // Function to validate e-mail is proper format
  validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }
  
  disableForm() {
    this.form.controls['name'].disable();
    this.form.controls['email'].disable();
    this.form.controls['message'].disable();
  }
  
  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['name'].enable();
    this.form.controls['message'].enable();
  }

  // Function to submit form
  onMessageSubmit() {
    this.disableForm();
    this.processing = true;
    const sender = {
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      message: this.form.get('message').value
    }

    this.messageService.sendMessage(sender)
      .subscribe(data => {
        if (!data.success) {
          this.cardMessage = "card-panel red darken - 2";
          this.message = data.message;
          this.processing = false;
          this.messageSent = true;
          this.enableForm();
        } else {
          this.cardMessage = "card-panel teal lighten-2";
          this.message = data.message;
          this.processing = false;
          this.messageSent = true;
        }
      });
  }

  ngOnInit() {
  }

}