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


	events = [{id:0, name:"Climathon", street:"Impact Hub Zürich - Colab", place:"131 Sihlquai", city:"8005 Zürich", icon:"https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Html-256.png", lat:47.3859, long:8.5327, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 83, points: 13, tags:['development', 'hacking', 'programming', 'environment', 'ideas', 'creativ', 'hackathon', 'startup'], friends: 10},
    				  {id:1, name:"Free The Frogs!", street:"Highway", place:"Limmatquai 144", city:"8001 Zürich", icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Creative-Tail-Animal-frog.svg/2000px-Creative-Tail-Animal-frog.svg.png", lat:47.3769, long:8.5437, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 83, points: 13, tags:['animals', 'children', 'free', 'organized'], friends: 0}];

	achivements = ["https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Medal-2-256.png",
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
