import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  pictures = [];

  constructor(private http : HttpClient, private platform : Platform) {
    
  }

  ngAfterViewInit() {
    this.retrievePics();
  }

  retrievePics() {
    this.http.get("https://4a519ccb.ngrok.io/getPics")
      .subscribe(data => {
        this.pictures = JSON.parse(JSON.stringify(data));
        // for(let pic of this.pictures) {
        //   pic.image = "data:image/jpeg;base64, " + pic.image;
        // }
      })
  }

}
