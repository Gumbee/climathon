import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EventPage } from '../../pages/event/event'
import { EventCreatorPage } from '../../pages/event-creator/event-creator'

@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html'
})
export class MyEventsPage {

	segment: string = 'myEvents';

	// hardcoded data: will be replaced by data from Firebase soon...
	eventsUpcoming = [{id:2, name:"Down with Nestlé!", street:"Bahnhof", place:"Bahnhofstrasse", city:"8001 Zürich", icon:"http://www.rural-water-supply.net/_ressources/images/default/260/7-34-2-1377776946.png", lat:47.3789, long:8.5327, fund: 100, sponsors:"ETH Zürich and the City of Zürich", participants: 19, points: 29, tags:['waterpollution', 'corporation', 'protest', 'ressourcewaste'], friends: 0, likes: 0},
					  {id:3, name:"Clean the River", street:"Magic River", place:"42 Waterland", city:"8001 Zürich", icon:"https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/calendar-256.png", lat:47.3569, long:8.5427, fund: 100, sponsors:"ETH Zürich and the City of Zürich", participants: 56, points: 29, tags:['waterpollution', 'team', 'animals', 'apero', 'eth'], friends: 1, likes: 34}];

	eventsFinished = [{id:0, name:"Climathon", street:"Impact Hub Zürich - Colab", place:"131 Sihlquai", city:"8005 Zürich", icon:"https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Html-256.png", lat:47.3859, long:8.5327, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 83, points: 13, tags:['development', 'hacking', 'programming', 'environment', 'ideas', 'creativ', 'hackathon', 'startup'], friends: 10, likes: 14},
    				  {id:1, name:"Free The Frogs!", street:"Highway", place:"Limmatquai 144", city:"8001 Zürich", icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Creative-Tail-Animal-frog.svg/2000px-Creative-Tail-Animal-frog.svg.png", lat:47.3769, long:8.5437, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 5, points: 13, tags:['animals', 'children', 'free', 'organized'], friends: 0, likes: 2}];


 	myEvents = [{id:8, name:"Build An App...", street:"Processor Street", place:"MemoryBus", city:"8001 PCLand", icon:"https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/dev-256.png", lat:47.3569, long:8.5427, fund: 100, sponsors:"ETH Zürich and the City of Zürich", participants: 12, points: 29, tags:['development', 'hacking', 'programming', 'environment', 'ideas', 'creativ', 'hackathon', 'startup'], friends: 0, likes: 1}];

	filteredEventsUpcoming;
	filteredEventsFinished;
	filteredMyEvents;

	constructor(public navCtrl: NavController) {
		this.filteredMyEvents = this.myEvents;
		this.filteredEventsFinished = this.eventsFinished;
		this.filteredEventsUpcoming = this.eventsUpcoming;
	}

	openEvent(id: number){
		setTimeout(()=>{
			this.navCtrl.push(EventPage, {id: id});
		}, 100);
	}

	createEvent(){
		setTimeout(()=>{
			this.navCtrl.push(EventCreatorPage);
		}, 100);
	}

	onSearchInput(event: any){
		let val = event.target.value;

		this.filteredEventsFinished = this.getFilteredArray(this.eventsFinished, val);
		this.filteredEventsUpcoming = this.getFilteredArray(this.eventsUpcoming, val);
		this.filteredMyEvents = this.getFilteredArray(this.myEvents, val);
	}

	getFilteredArray(toFilter: any, val: string){
		if (val && val.trim() != '') {
			return toFilter.filter((item) => {
		      	let found = false;
		      	
		      	for(let tag of item.tags){
		      		if(tag.toLowerCase().indexOf(val.toLowerCase()) > -1) found = true;
		      	}

		        return found ||(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
	      	});
		}
		return toFilter;
	}

	onClear(event: any) {
		this.filteredEventsFinished = this.getFilteredArray(this.eventsFinished, '');
		this.filteredEventsUpcoming = this.getFilteredArray(this.eventsUpcoming, '');
		this.filteredMyEvents = this.getFilteredArray(this.myEvents, '');
	}

}
