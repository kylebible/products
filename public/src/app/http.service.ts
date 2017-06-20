import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs'

@Injectable()


export class HttpService {
  observedItems = new BehaviorSubject(null)
  
  updateItems(items: Array<object>) {
    this.observedItems.next(items)
  }

  constructor(private _http: Http) {
   }

    retrieveAll() {
    return this._http.get(`/allproducts`)
    .map( data => data.json() )
    .toPromise();
  }
  retrieveOne(id) {
    return this._http.get(`/products/${id}`)
    .map( data => data.json() )
    .toPromise();
  }
  create(item) {
    console.log("creating new itemsss",item)
    return this._http.post(`/newproduct`, item)
    .map( data => data.json() )
    .toPromise();
  }
  update(product, id) {
    return this._http.put(`/updateproduct/${id}`, product)
    .map( data => data.json() )
    .toPromise();
  }
  delete(id, product) {
    return this._http.put(`/deleteproduct/${id}`, product)
    .map( data => data.json() )
    .toPromise();
  }
  

}
