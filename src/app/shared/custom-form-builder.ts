import { FormBuilder } from "@angular/forms";

export class CustomFormBuilder {
    constructor(private fb: FormBuilder) {}

    createAddressForm() {
        return this.fb.group({
            locationNumber: '',
            street: '',
            village: '',
            commune: '',
            khan: '',
            city: '',
            country: '',
        })
    }
}
