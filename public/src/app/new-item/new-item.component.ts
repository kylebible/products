import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/http.service";
import { Item } from "app/item";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  item = new Item()

  items = [];
	constructor(private _httpService: HttpService, private _router: Router) {
		_httpService.observedItems.subscribe(
			(updatedItems) => {  this.items = updatedItems; },
			(err) => { console.log('error')},
			() => { }
		)
	}

  addItem() {
    this._httpService.create(this.item)
    .then( item => { 
      this.items.push(item)
      this._httpService.updateItems(this.items)
     })
    .catch( err => { console.log(err); })
    this._router.navigate(['/products'])
  }

  ngOnInit() {
  }

}
