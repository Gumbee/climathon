import { Component, ApplicationRef } from '@angular/core';
import { NavController, Platform, NavParams, AlertController } from 'ionic-angular';

import { DataService } from '../../providers/data-service';


declare var google;

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

	// contains the map's DOM-element
	private map: any;

	// the id of the event that the user would like to look at
    private id: string;
    private fundPercentage = 0;
    private event: any = {};

	constructor(public navCtrl: NavController, private platform: Platform, private navParams: NavParams, private alertCtrl: AlertController, private dataService: DataService) {
		this.id = navParams.data.id;

		this.dataService.getEvent(this.id).then((event)=>{
			this.event = event;

			this.initializeMap();
			this.getFundPercentageAndSponsors();
		}).catch(()=>{

		});

	}

	ionViewDidLoad(){
		
	}

    getFundPercentageAndSponsors(){
    	let counter = 0;
		let fundedBy = "";
		let eventRes = this.event.resources;

		if(eventRes.length > 0){
			for(let i=0;i<eventRes.length;i++){
				if(eventRes[i].done){
					counter++;
					//Only mention the sponsor if he is not mentioned yet
					if(fundedBy.toLowerCase().indexOf(eventRes[i].doneBy.toLowerCase()) < 0){
						if(i==eventRes.length-2){
							fundedBy += eventRes[i].doneBy + " and ";
						}else if(i==eventRes.length-1){
							fundedBy += eventRes[i].doneBy;
						}else{
							fundedBy += eventRes[i].doneBy + ", ";
						}
					}
				}
			}
			this.fundPercentage = counter/eventRes.length*100;
			if(this.fundPercentage!=100){
				this.event.sponsors = "Partially funded by " + fundedBy;
			}else{
				this.event.sponsors = "by " + fundedBy;
			}
		}else{
			this.event.sponsors = "by nobody because no funds are necessary";
			this.fundPercentage = 100;
		}
    }

	initializeMap() {
        this.platform.ready().then(() => {
            setTimeout(()=> {
            	let mapOptions = {
                    zoom: 14,
                    center: new google.maps.LatLng(this.event.lat, this.event.lng),
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
		            position: new google.maps.LatLng(this.event.lat, this.event.lng)
		        };

                let marker = new google.maps.Marker(markerOptions);
	        }, 200);
        });
    }

    checkResource(id: number){
    	if(this.event.resources[id].done == 0){
	    	let alert = this.alertCtrl.create({
				title: 'Confirm',
				subTitle: 'Are you sure you want to (and are able to) provide this resource?',
				buttons: [
		        {
		          text: 'No',
		          handler: () => {
		          }
		        },
		        {
		          text: 'Yes',
		          handler: () => {
			    	this.event.resources[id].done = 1;
			    	this.event.resources[id].doneBy = "Joe Doe";
			    	this.getFundPercentageAndSponsors();
		          }
		        }
		      ]
			});
			alert.present();
		}
    }

}
