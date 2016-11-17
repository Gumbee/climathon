import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../providers/data-service';
import { EventPage } from '../../pages/event/event'
import { EventCreatorPage } from '../../pages/event-creator/event-creator'

@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html'
})
export class MyEventsPage {

	segment: string = 'myEvents';

	// hardcoded data: will be replaced by data from Firebase soon...
	eventsUpcoming : any = [];
	eventsFinished : any = [];
	myEvents : any = [];

	filteredEventsUpcoming;
	filteredEventsFinished;
	filteredMyEvents;

	constructor(public navCtrl: NavController, private dataService: DataService) {

		dataService.getEvents().then((data: any)=>{
			this.myEvents = data.filter(this.getUserEvents);
			this.filteredMyEvents = this.myEvents;

			this.eventsUpcoming = data.filter(this.getUpcomingEvents);
			this.filteredEventsUpcoming = this.eventsUpcoming;

			this.eventsFinished = data.filter(this.getFinishedEvents);
			this.filteredEventsFinished = this.eventsFinished;
		}).catch(()=>{
		});

		this.filteredMyEvents = this.myEvents;
		this.filteredEventsFinished = this.eventsFinished;
		this.filteredEventsUpcoming = this.eventsUpcoming;
	}

	getUserEvents(event: any){
		return event.userID == 1;
	}

	getUpcomingEvents(event: any){
		return event.finished == false && event.participating == true;
	}

	getFinishedEvents(event: any){
		return event.finished == true && event.participating == true;
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
		      	
		      	if(item.tags){
		      		for(let tag of item.tags){
			      		if(tag.toLowerCase().indexOf(val.toLowerCase()) > -1) found = true;
			      	}
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
