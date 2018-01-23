import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Item } from '../org.kibaati';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ItemService {

	
		private NAMESPACE: string = 'Item';
	



    constructor(private dataService: DataService<Item>) {
    };

    public getAll(): Observable<Item[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Item> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Item> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Item> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Item> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
