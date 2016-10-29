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
    private markers: any[][] = [];

    private id = 0;

    private events = [{id:0, name:"Climathon", street:"Impact Hub Zürich - Colab", place:"131 Sihlquai", city:"8005 Zürich", icon:"https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Html-256.png", lat:47.3769, long:8.5417, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 83, points: 13}
					, {id:1, name:"Clean the River", street:"Magic River", place:"42 Waterland", city:"1234 Zürich", icon:"https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/calendar-256.png", lat:47.3569, long:8.5427, fund: 100, sponsors:"ETH Zürich and the City of Zürich", participants: 56, points: 29}];


 
	constructor(public navCtrl: NavController, private platform: Platform, private navParams: NavParams) {
		this.map = null;
		this.initializeMap();
		this.id = navParams.data.id;
	}

	initializeMap() {
        this.platform.ready().then(() => {
            setTimeout(()=> {
            	let mapOptions = {
                    zoom: 14,
                    center: new google.maps.LatLng(this.events[this.id].lat, this.events[this.id].long), // Berne, Switzerland
                    disableDefaultUI: true,
                    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
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
