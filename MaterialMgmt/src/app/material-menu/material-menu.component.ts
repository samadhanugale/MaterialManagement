import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModel } from '../materialDash/material-dash.model';
import { JsonApiService } from '../shared/json-api.service';

@Component({
  selector: 'app-material-menu',
  templateUrl: './material-menu.component.html',
  styleUrls: ['./material-menu.component.css']
})
export class MaterialMenuComponent implements OnInit {

  formVal!: FormGroup;
  //Created object of class to post data
  materialModelObj:MaterialModel = new MaterialModel();

  materialData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  submitted = false;
  showMsg: boolean = false;
  constructor(private formBuilder: FormBuilder, private api:JsonApiService) {
    
   }

  ngOnInit(): void {
    

    this.formVal = this.formBuilder.group({
      name: ['',Validators.required],
      type: ['',Validators.required],
      weight: ['',Validators.required],
      price: ['',Validators.required],
      quantity: ['',Validators.required]
    });
    this.getMaterial();
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
  postMaterialDetails(){
    this.materialModelObj.name = this.formVal.value.name;
    this.materialModelObj.type = this.formVal.value.type;
    this.materialModelObj.weight = this.formVal.value.weight;
    this.materialModelObj.price = this.formVal.value.price;
    this.materialModelObj.quantity = this.formVal.value.quantity;

    this.api.postMaterial(this.materialModelObj)
    .subscribe(res=>{
      console.log(res);
      // alert("Material Added");
      let cancl = document.getElementById('cancel');
      cancl?.click();
      //Resetting the form
      this.formVal.reset();
      this.showMsg= true;
      this.getMaterial();
    },
    err=>{
      alert("Error!");
    }
    )
  }
  clickAddMaterial(){
    this.formVal.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getMaterial(){
    this.api.getMaterial().subscribe(res=>{
      this.materialData = res;

    })
  }
  deleteMaterial(a:any){
    this.api.deleteMaterial(a.id).subscribe(res=>{
      
      this.getMaterial();
    })
  }

  onEdit(a:any){
    
    this.materialModelObj.id = a.id;
    this.formVal.controls['name'].setValue(a.name);
    this.formVal.controls['type'].setValue(a.type);
    this.formVal.controls['weight'].setValue(a.weight);
    this.formVal.controls['price'].setValue(a.price);
    this.formVal.controls['quantity'].setValue(a.quantity);
     
  }
  updateMaterialDetails(){
    this.materialModelObj.name = this.formVal.value.name;
    this.materialModelObj.type = this.formVal.value.type;
    this.materialModelObj.weight = this.formVal.value.weight;
    this.materialModelObj.price = this.formVal.value.price;
    this.materialModelObj.quantity = this.formVal.value.quantity;

    this.api.updateMaterial(this.materialModelObj,this.materialModelObj.id)
    .subscribe((res: any)=>{
      // alert("Updated");
      let cancl = document.getElementById('cancel');
      cancl?.click();
      //Resetting the form
      this.formVal.reset();
      this.getMaterial();
    })

  }

}
