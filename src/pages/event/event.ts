import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';

/*
  Generated class for the Event page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var google;

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

	private map: any;

    private id = 0;

    private events = [{id:0, name:"Climathon", street:"Impact Hub Zürich - Colab", place:"131 Sihlquai", city:"8005 Zürich", icon:"https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Html-256.png", lat:47.3859, long:8.5327, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 83, points: 13, tags:['development', 'hacking', 'programming', 'environment', 'ideas', 'creativ', 'hackathon', 'startup'], friends: 10, likes: 14},
    				  {id:1, name:"Free The Frogs!", street:"Highway", place:"Limmatquai 144", city:"8001 Zürich", icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Creative-Tail-Animal-frog.svg/2000px-Creative-Tail-Animal-frog.svg.png", lat:47.3769, long:8.5437, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 5, points: 13, tags:['animals', 'children', 'free', 'organized'], friends: 0, likes: 2},
					  {id:2, name:"Down with Nestlé!", street:"Bahnhof", place:"Bahnhofstrasse", city:"8001 Zürich", icon:"http://www.rural-water-supply.net/_ressources/images/default/260/7-34-2-1377776946.png", lat:47.3789, long:8.5327, fund: 100, sponsors:"ETH Zürich and the City of Zürich", participants: 19, points: 29, tags:['waterpollution', 'corporation', 'protest', 'ressourcewaste'], friends: 0, likes: 0},
					  {id:3, name:"Clean the River", street:"Magic River", place:"42 Waterland", city:"8001 Zürich", icon:"https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/calendar-256.png", lat:47.3569, long:8.5427, fund: 100, sponsors:"ETH Zürich and the City of Zürich", participants: 56, points: 29, tags:['waterpollution', 'team', 'animals', 'apero', 'eth'], friends: 1, likes: 34}];

 
	constructor(public navCtrl: NavController, private platform: Platform, private navParams: NavParams) {
		this.map = null;
		this.id = navParams.data.id;
	}

	ionViewDidLoad(){
		this.initializeMap();
	}

	initializeMap() {
        this.platform.ready().then(() => {
            setTimeout(()=> {
            	let mapOptions = {
                    zoom: 14,
                    center: new google.maps.LatLng(this.events[this.id].lat, this.events[this.id].long),
                    disableDefaultUI: true,
	                styles: [{featureType: "poi",stylers:[{visibility:"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
                };

            	let mapElement = document.getElementById('map');

	            this.map = new google.maps.Map(mapElement, mapOptions);

                let iconOptions = {
		            url: 'assets/markerSlim.png',
		            scaledSize: new google.maps.Size(33, 48),
		        };

		        let markerOptions = {
		            map: this.map,
		            animation: google.maps.Animation.DROP,
		            draggable: false,
		            icon: iconOptions,
		            scaledSize: new google.maps.Size(32, 32),
		            position: new google.maps.LatLng(this.events[this.id].lat, this.events[this.id].long)
		        };

                let marker = new google.maps.Marker(markerOptions);
	        }, 200);
        });
    }

}
