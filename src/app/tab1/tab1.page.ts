import { Component, ViewEncapsulation } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab1Page {
  private pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }
  private picture;

  constructor(private cameraPreview: CameraPreview, private platform: Platform, private http: HttpClient) {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    }

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        alert("success " + res)
      },
      (err) => {
        alert("error " + err)
      });
  }

  // Take a picture
  takePic() {
    if (this.platform.is("ios")) {
      this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
        this.picture = 'data:image/jpeg;base64,' + imageData;
        this.sendPicture(this.picture)
      }, (err) => {
        console.log(err);
        this.picture = 'assets/img/test.jpg';
      });
    }
    else if (this.platform.is("android")) {
      this.cameraPreview.takeSnapshot(this.pictureOpts).then((imageData) => {
        this.picture = 'data:image/jpeg;base64,' + imageData;
        this.sendPicture(this.picture)
      }, (err) => {
        console.log(err);
        this.picture = 'assets/img/test.jpg';
      });
    }

  }

  // Send picture to backend
  sendPicture(image) {
    let body = {
      owner: "Baptiste",
      image: image
    };
    this.http.post("https://4a519ccb.ngrok.io/sendPic", body)
      .subscribe(data => {
        alert('image uploadé !');
      })
  }

}
