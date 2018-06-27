import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BranchService } from "../../branches/branch.service";
import { MyErrorStateMatcher } from "../../shared/MyErrorStateMatcher";
import { CustomFormBuilder } from "../../shared/custom-form-builder";
import { LeadService } from "../lead.service";

@Component({
  selector: "app-lead-new",
  templateUrl: "./lead-new.component.html",
  styleUrls: ["./lead-new.component.scss"]
})
export class LeadNewComponent implements OnInit {
  newLeadForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  branches;

  constructor(
    private fb: FormBuilder,
    private branchesService: BranchService,
    private leadService: LeadService
  ) {}

  ngOnInit() {
    

    this.newLeadForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      // address: this.fb.group({
      //   locationNumber: "",
      //   street: "",
      //   village: "",
      //   commune: "",
      //   khan: "",
      //   city: ["", 
      //     [
      //       Validators.required, 
      //       Validators.pattern("")
      //     ]]
      //   // country: 'Cambodia',
      // }),
      address: CustomFormBuilder.createAddressForm(this.fb), 
      // phones: this.fb.group({
      //   primaryphone: "",
      //   secondaryphone: ""
      // }),
      phones: CustomFormBuilder.createPhonesForm(this.fb),
      comment: ""
    });

    this.branches = this.branchesService.getBranches();
  }

  get firstname() {
    return this.newLeadForm.get('firstname');
  }

  get lastname() {
    return this.newLeadForm.get('lastname');
  }

  get city() {
    return this.newLeadForm.get('address.city');
  }

  get address() {
    return this.newLeadForm.get('ddress');
  }

  get phones() {
    return this.newLeadForm.get('phones');
  }


  save() {
    console.log("new lead forms is valid", this.newLeadForm.valid);
    let lead = Object.assign({}, this.newLeadForm.value);
    lead.status = 'open';
    console.log("Lead object", lead);

    this.leadService.add(lead).catch(
      err => {
        console.log('Failed to save create new lead', err);
        
        
        
      }
    );

  }
}
