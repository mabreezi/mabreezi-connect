import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ItemService } from './Item.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Item',
	templateUrl: './Item.component.html',
	styleUrls: ['./Item.component.css'],
  providers: [ItemService]
})
export class ItemComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          itemName = new FormControl("", Validators.required);
        
  
      
          itemId = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          mainExchange = new FormControl("", Validators.required);
        
  
      
          quantity = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceItem:ItemService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          itemName:this.itemName,
        
    
        
          itemId:this.itemId,
        
    
        
          description:this.description,
        
    
        
          mainExchange:this.mainExchange,
        
    
        
          quantity:this.quantity,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceItem.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.kibaati.Item",
      
        
          "itemName":this.itemName.value,
        
      
        
          "itemId":this.itemId.value,
        
      
        
          "description":this.description.value,
        
      
        
          "mainExchange":this.mainExchange.value,
        
      
        
          "quantity":this.quantity.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "itemName":null,
        
      
        
          "itemId":null,
        
      
        
          "description":null,
        
      
        
          "mainExchange":null,
        
      
        
          "quantity":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceItem.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "itemName":null,
        
      
        
          "itemId":null,
        
      
        
          "description":null,
        
      
        
          "mainExchange":null,
        
      
        
          "quantity":null,
        
      
        
          "owner":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.kibaati.Item",
      
        
          
            "itemName":this.itemName.value,
          
        
    
        
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "mainExchange":this.mainExchange.value,
          
        
    
        
          
            "quantity":this.quantity.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceItem.updateAsset(form.get("itemId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceItem.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceItem.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "itemName":null,
          
        
          
            "itemId":null,
          
        
          
            "description":null,
          
        
          
            "mainExchange":null,
          
        
          
            "quantity":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.itemName){
          
            formObject.itemName = result.itemName;
          
        }else{
          formObject.itemName = null;
        }
      
        if(result.itemId){
          
            formObject.itemId = result.itemId;
          
        }else{
          formObject.itemId = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
        }
      
        if(result.mainExchange){
          
            formObject.mainExchange = result.mainExchange;
          
        }else{
          formObject.mainExchange = null;
        }
      
        if(result.quantity){
          
            formObject.quantity = result.quantity;
          
        }else{
          formObject.quantity = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "itemName":null,
        
      
        
          "itemId":null,
        
      
        
          "description":null,
        
      
        
          "mainExchange":null,
        
      
        
          "quantity":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
