import { Component } from '@angular/core';
import { HomePage} from '../../pages/home/home'
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
  	this.navCtrl.setRoot(HomePage)
  }

}
