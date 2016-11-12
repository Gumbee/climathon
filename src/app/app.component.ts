import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { firebaseConfig } from '../../config/config';
import firebase from 'firebase';

import { ProfilePage } from '../pages/profile/profile';
import { MarketPage } from '../pages/market/market';
import { EventCreatorPage } from '../pages/event-creator/event-creator'
import { MyEventsPage } from '../pages/my-events/my-events'

@Component({
  templateUrl: '../app/app.html'
})
export class MyApp {
  @ViewChild('content') navCtrl;
  rootPage = MarketPage;

  constructor(platform: Platform, public menuCtrl: MenuController) {
    
    firebase.initializeApp(firebaseConfig);
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page: string){
    setTimeout(()=>{
      this.menuCtrl.close();

      switch (page) {
        case "Profile":
          this.navCtrl.setRoot(ProfilePage);
          break;
        case "Market":
          this.navCtrl.setRoot(MarketPage);
          break;  
        case "MyEvents":
          this.navCtrl.setRoot(MyEventsPage);
          break;
        case "NewEvent":
          this.navCtrl.setRoot(EventCreatorPage);
          break;
        default:
          break;
      }

    }, 0);

  }

}
