import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lead-new',
  templateUrl: './lead-new.component.html',
  styleUrls: ['./lead-new.component.scss']
})
export class LeadNewComponent implements OnInit {

  newLeadForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newLeadForm = this.fb.group({
      firstname: ['',[
        Validators.required
      ]],
      lastname: ['', [
        Validators.required
      ]],
      house: '',
      street: '',
      village: '',
      commune: '',
      khan: '',
      city: '',
      country: 'Cambodia',
      primaryphone: '',
      secondaryphone: '',
      comment: ''
    });
  }

  get firstname() {
    return this.newLeadForm.get('firstname');
  }

  get lastname() {
    return this.newLeadForm.get('lastname');
  }

  save(){

  }
}
