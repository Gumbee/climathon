import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventPage } from '../../pages/event/event';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {


	private events = [{id:0, name:"Climathon", street:"Impact Hub Zürich - Colab", place:"131 Sihlquai", city:"8005 Zürich", icon:"https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Html-256.png"}
					, {id:1, name:"Clean the River", street:"Magic River", place:"42 Waterland", city:"1234 Zürich", icon:"https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/calendar-256.png"}];

	private achivements = ["https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Medal-2-256.png",
							"https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Party-Poppers-256.png",
							"https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Wind-Wheel-256.png",
							"https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Student-3-256.png"];


	constructor(public navCtrl: NavController) {}

	openEvent(id: number){
		console.log("There");
		setTimeout(()=>{
			this.navCtrl.push(EventPage, {id: id});
		}, 300);
	}

}
