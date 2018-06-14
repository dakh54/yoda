import { FormBuilder } from "@angular/forms";

export class CustomFormBuilder {
    constructor(private fb: FormBuilder) {}

    createAddressForm() {
        return this.fb.group({
            house: '',
            street: '',
            village: '',
            commune: '',
            khan: '',
            city: '',
            country: 'Cambodia'
        })
    }
}