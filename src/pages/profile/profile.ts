import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../providers/data-service';
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


	events : any = [];
	achivements = ["https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Medal-2-256.png",
							"https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Party-Poppers-256.png",
							"https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Wind-Wheel-256.png",
							"https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Student-3-256.png"];


	constructor(public navCtrl: NavController, private dataService: DataService) {
		dataService.getEvents().then((data: any)=>{
			this.events = data.filter(this.getUpcomingEvents);
		}).catch(()=>{
		});
	}

	getUpcomingEvents(event: any){
		return event.participating == true && event.finished == false;
	}

	openEvent(id: number){
		setTimeout(()=>{
			this.navCtrl.push(EventPage, {id: id});
		}, 300);
	}

}
