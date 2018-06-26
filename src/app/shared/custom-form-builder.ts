import { FormBuilder } from "@angular/forms";

export class CustomFormBuilder {
  // constructor(private fb: FormBuilder) {}

  static createAddressForm(fb: FormBuilder) {
    return fb.group({
      locationNumber: "",
      street: "",
      village: "",
      commune: "",
      khan: "",
      city: "",
      country: "Cambodia"
    });
  }

  static createPhonesForm(fb: FormBuilder) {
    return fb.group({
      primaryphone: "",
      secondaryphone: ""
    });
  }
}
