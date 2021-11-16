import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModel } from '../materialDash/material-dash.model';
import { JsonApiService } from '../shared/json-api.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {
  materialModelObj: MaterialModel = new MaterialModel();
  formVal!: FormGroup;
  materialData!: any;
  constructor(private api: JsonApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formVal = this.formBuilder.group({
      name: [''],
      type: [''],
      weight: [''],
      price: [''],
      quantity: ['']
    });
    this.getMaterial();
  }
  getMaterial() {
    this.api.getMaterial().subscribe(res => {
      this.materialData = res;
    })
  }
  showAdd!: boolean;
  showMsg: boolean = false;
  showUpdate!: boolean;
  submitted = false;
  postMaterialDetails() {
    this.materialModelObj.name = this.formVal.value.name;
    this.materialModelObj.type = this.formVal.value.type;
    this.materialModelObj.weight = this.formVal.value.weight;
    this.materialModelObj.price = this.formVal.value.price;
    this.materialModelObj.quantity = this.formVal.value.quantity;

    this.api.postMaterial(this.materialModelObj)
      .subscribe(res => {
        console.log(res);
        this.formVal.reset();
        this.showMsg= true;
        this.getMaterial();

      },
        err => {
          alert("Error!");
        }
      )
  }
 
  get f() { return this.formVal.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formVal.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formVal.value, null, 4));
}

onReset() {
    this.submitted = false;
    this.formVal.reset();
}
  updateMaterialDetails() {
    this.materialModelObj.name = this.formVal.value.name;
    this.materialModelObj.type = this.formVal.value.type;
    this.materialModelObj.weight = this.formVal.value.weight;
    this.materialModelObj.price = this.formVal.value.price;
    this.materialModelObj.quantity = this.formVal.value.quantity;

    this.api.updateMaterial(this.materialModelObj, this.materialModelObj.id)
      .subscribe((res: any) => {
        // alert("Updated");
        let cancl = document.getElementById('cancel');
        cancl?.click();
        //Resetting the form
        this.formVal.reset();
        this.getMaterial();
      })

  }


}
