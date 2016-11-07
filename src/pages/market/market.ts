import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { EventPage } from '../../pages/event/event';

declare var google;

@Component({
  selector: 'page-market',
  templateUrl: 'market.html'
})
export class MarketPage {

	private map: any;
    private markers: any[] = [];

    private events = [{id:0, name:"Climathon", street:"Impact Hub Zürich - Colab", place:"131 Sihlquai", city:"8005 Zürich", icon:"https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Html-256.png", lat:47.3859, long:8.5327, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 83, points: 13, tags:['development', 'hacking', 'programming', 'environment', 'ideas', 'creativ', 'hackathon', 'startup'], friends: 10, likes: 14},
    				  {id:1, name:"Free The Frogs!", street:"Highway", place:"Limmatquai 144", city:"8001 Zürich", icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Creative-Tail-Animal-frog.svg/2000px-Creative-Tail-Animal-frog.svg.png", lat:47.3769, long:8.5437, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 5, points: 13, tags:['animals', 'children', 'free', 'organized'], friends: 0, likes: 2},
					  {id:2, name:"Down with Nestlé!", street:"Bahnhof", place:"Bahnhofstrasse", city:"8001 Zürich", icon:"http://www.rural-water-supply.net/_ressources/images/default/260/7-34-2-1377776946.png", lat:47.3789, long:8.5327, fund: 100, sponsors:"ETH Zürich and the City of Zürich", participants: 19, points: 29, tags:['waterpollution', 'corporation', 'protest', 'ressourcewaste'], friends: 0, likes: 0},
					  {id:3, name:"Clean the River", street:"Magic River", place:"42 Waterland", city:"8001 Zürich", icon:"https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/calendar-256.png", lat:47.3569, long:8.5427, fund: 100, sponsors:"ETH Zürich and the City of Zürich", participants: 56, points: 29, tags:['waterpollution', 'team', 'animals', 'apero', 'eth'], friends: 1, likes: 34}];

	private otherEvents = [{id:0, name:"Fish with the Fisher", street:"Bermuda Triangle", place:"Unknown", city:"Unkown", icon:"https://cdn3.iconfinder.com/data/icons/scarycons/140/fish-bone-256.png", lat:47.3859, long:8.5327, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 3203, points: 13, tags:['Fish', 'animals', 'programming', 'environment', 'ideas', 'creativ', 'hackathon', 'startup'], friends: 0, likes: 129},
					  {id:1, name:"Down with Nestlé!", street:"Bahnhof", place:"Bahnhofstrasse", city:"8001 Zürich", icon:"http://www.rural-water-supply.net/_ressources/images/default/260/7-34-2-1377776946.png", lat:47.3789, long:8.5327, fund: 100, sponsors:"ETH Zürich and the City of Zürich", participants: 23, points: 29, tags:['waterpollution', 'corporation', 'protest', 'ressourcewaste'], friends: 0, likes: 0},
    				  {id:2, name:"Aid in an Area hit by a catastrophe", street:"SomeStreet", place:"Rome", city:"Italy", icon:"https://cdn0.iconfinder.com/data/icons/citycons/150/Citycons_lighthouse-256.png", lat:47.3769, long:8.5437, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 2003, points: 13, tags:['animals', 'children', 'free', 'organized'], friends: 0, likes: 391},
					  {id:3, name:"Clean the River", street:"Magic River", place:"42 Waterland", city:"8001 Zürich", icon:"https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/calendar-256.png", lat:47.3569, long:8.5427, fund: 100, sponsors:"ETH Zürich and the City of Zürich", participants: 12, points: 29, tags:['waterpollution', 'team', 'animals', 'apero', 'eth'], friends: 0, likes: 0}];

	private filteredEvents;

	constructor(public navCtrl: NavController, private platform: Platform) {
		this.map = null;
		this.filteredEvents = this.events;
	}

	ionViewDidLoad(){
		this.initializeMap();
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
			            position: new google.maps.LatLng(this.events[i].lat, this.events[i].long)
			        };

	            	let marker = new google.maps.Marker(markerOptions);

			        this.markers.push([marker, i]);
		        }

	        }, 200);
	    });
	}

	onSearchInput(event: any){
		let val = event.target.value;

		if (val && val.trim() != '') {
			this.filteredEvents = this.events.filter((item) => {
		      	let found = false;
		      	
		      	for(let tag of item.tags){
		      		if(tag.toLowerCase().indexOf(val.toLowerCase()) > -1) found = true;
		      	}

		        return found ||(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
	      	});
	    }

	    if(val==''){
	    	this.filteredEvents = this.events;
	    }
	}

	openEvent(id: number){
		setTimeout(()=>{
			this.navCtrl.push(EventPage, {id: id});
		}, 300);
	}
}
