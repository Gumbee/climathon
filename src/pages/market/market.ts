import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { EventPage } from '../../pages/event/event';
import { DataService } from '../../providers/data-service';

declare var google;

@Component({
  selector: 'page-market',
  templateUrl: 'market.html'
})
export class MarketPage {

	map: any =  {};
	markers: any[] = [];

	events: any = [];
	otherEvents: any = [];
	filteredEvents: any = [];

	constructor(public navCtrl: NavController, private platform: Platform, private dataService: DataService) {
		this.map = null;
		
		dataService.getEvents().then((data: any)=>{
			this.events = data.filter(this.filterEvents);
			this.filteredEvents = this.events;

			this.initializeMarkers();
		}).catch(()=>{
		});

		let reference = this.dataService.getEventsReference();

		reference.on('value', (data)=>{
			if(data){
				data.forEach((event)=>{
					let temp = event.val();

					for(let i=0;i<this.events.length;i++){
						if(this.events[i].id == event.key && this.events[i].likes != temp.likes){
							this.events[i].likes = temp.likes;
							console.log("changed " + this.events[i]);
						}
					}

				});
			}
		});

		this.filteredEvents = this.events;
	}

	ionViewDidLoad(){
		this.initializeMap();
	}

	filterEvents(event: any){
		return event.finished == false;
	}

	initializeMap() {
	    this.platform.ready().then(() => {
	        setTimeout(()=> {
	        	let mapOptions = {
	                zoom: 14,
	                center: new google.maps.LatLng(47.3769, 8.5417),
	                disableDefaultUI: true,
	                styles: [{featureType: "poi",stylers:[{visibility:"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
	            };

	        	let mapElement = document.getElementById('marketMap');

	            this.map = new google.maps.Map(mapElement, mapOptions);

	        }, 200);
	    });
	}

	initializeMarkers(){
		if(this.map == undefined){
			setTimeout(()=>{
				this.initializeMarkers();
			}, 500);
			return;
		}
		for(let i=0;i<this.events.length;i++){

            let iconOptions = {
	            url: 'assets/markerSlim.png',
	            scaledSize: new google.maps.Size(27, 40),
	        };

        	let markerOptions = {
	            map: this.map,
	            animation: google.maps.Animation.DROP,
	            draggable: false,
	            icon: iconOptions,
	            scaledSize: new google.maps.Size(32, 32),
	            position: new google.maps.LatLng(this.events[i].lat, this.events[i].lng)
	        };

        	let marker = new google.maps.Marker(markerOptions);
	        
	        this.markers.push([marker, i]);
        }
	}

	onSearchInput(event: any){
		let val = event.target.value;

		if (val && val.trim() != '') {
			this.filteredEvents = this.events.filter((item) => {
		      	let found = false;
		      	
		      	if(item.tags != undefined){
			      	for(let tag of item.tags){
			      		if(tag.toLowerCase().indexOf(val.toLowerCase()) > -1) found = true;
			      	}
	      		}

		        return found ||(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
	      	});
	    }

	    if(val==''){
	    	this.filteredEvents = this.events;
	    }
	}

	onClear(event: any){
    	this.filteredEvents = this.events;
	}

	openEvent(id: number){
		setTimeout(()=>{
			this.navCtrl.push(EventPage, {id: id});
		}, 300);
	}
}
