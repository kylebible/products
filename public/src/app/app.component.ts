import { Component } from '@angular/core';
import { HttpService } from "app/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    items = []
    constructor(private _httpService: HttpService) {
    _httpService.retrieveAll()
		.then( items => { this.items = items
    _httpService.updateItems(this.items)})
    .catch( err => { console.log(err); })
    console.log("loaded")
  }
  updateUsers(){
    this._httpService.updateItems(this.items);
  }



}
