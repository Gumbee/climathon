import { Component } from '@angular/core';
import { NavController, Platform, NavParams, AlertController } from 'ionic-angular';

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

    private fundPercentage = 0;

    private events = [{id:0, name:"Climathon", street:"Impact Hub Zürich - Colab", place:"131 Sihlquai", city:"8005 Zürich", icon:"https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Html-256.png", lat:47.3859, long:8.5327, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 83, points: 13, tags:['development', 'hacking', 'programming', 'environment', 'ideas', 'creativ', 'hackathon', 'startup'], friends: 10, likes: 14, resources:[{name:"Food", done:1, doneBy:"Impact Hub"},{name:"Drinks", done:1, doneBy:"Impact Hub"},{name:"WiFi", done:1, doneBy:"Impact Hub"},{name:"Prizes", done:1, doneBy:"Climate-KIC"}], description: "Here's an invitation to shape the future of your city! Are you a developer, techie, entrepreneur, student or any other creative spirit? Then come together for 24 hours and create new solutions for local climate change problems with other like-minded people. Experts and mentors will support your team in your solution-finding process, and we have a small hardware makerZspace available for you to tinker. After intense hours of collaboration your idea gets the chance to be realized thanks to Climate-KIC and the support of the City of Zurich. And, the cherry on top, after the Climathon your team can apply to pitch for access to the Climate-KIC accelerator program where you can win up to EUR 85'000. "},
    				  {id:1, name:"Free The Frogs!", street:"Highway", place:"Limmatquai 144", city:"8001 Zürich", icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Creative-Tail-Animal-frog.svg/2000px-Creative-Tail-Animal-frog.svg.png", lat:47.3769, long:8.5437, fund: 100, sponsors:"Climate-KIC, ImpactHUB and Up", participants: 5, points: 13, tags:['animals', 'children', 'free', 'organized'], friends: 0, likes: 2, description:"Lorem ipsum dolor sit amet, ne his augue gubergren, cu graece cetero maiestatis sed. His tempor admodum disputando te. Probo labitur erroribus est te. Ipsum appareat pericula sed ad, deleniti adipiscing ne qui. Soleat repudiare dissentias no has, nec id accusata argumentum. Ei mei veritus inciderint, in vix case alienum."},
					  {id:2, name:"Down with Nestlé!", street:"Bahnhof", place:"Bahnhofstrasse", city:"8001 Zürich", icon:"http://www.rural-water-supply.net/_ressources/images/default/260/7-34-2-1377776946.png", lat:47.3789, long:8.5327, fund: 100, sponsors:"ETH Zürich and the City of Zürich", participants: 19, points: 29, tags:['waterpollution', 'corporation', 'protest', 'ressourcewaste'], friends: 0, likes: 0, resources:[{name:"Get Permit", done:0, doneBy:""},{name:"Print Signs", done:1, doneBy:"CopyQuick"}]},
					  {id:3, name:"Clean the River", street:"Magic River", place:"42 Waterland", city:"8001 Zürich", icon:"https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/calendar-256.png", lat:47.3569, long:8.5427, fund: 100, sponsors:"ETH Zürich and the City of Zürich", participants: 56, points: 29, tags:['waterpollution', 'team', 'animals', 'apero', 'eth'], friends: 1, likes: 34}];

	constructor(public navCtrl: NavController, private platform: Platform, private navParams: NavParams, private alertCtrl: AlertController) {
		this.map = null;
		this.id = navParams.data.id;
		this.getFundPercentageAndSponsors();
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

    checkResource(id: number){
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
		    	this.events[this.id].resources[id].done = 1;
		    	this.events[this.id].resources[id].doneBy = "Joe Doe";
		    	this.getFundPercentageAndSponsors();
	          }
	        }
	      ]
		});
		alert.present();
    }

    getFundPercentageAndSponsors(){
    	let counter = 0;
		if(this.events[this.id].resources){
			let fundedBy = "";
			for(let i=0;i<this.events[this.id].resources.length;i++){
				if(this.events[this.id].resources[i].done){
					counter++;
					//Only mention the sponsor if he is not mentioned yet
					if(fundedBy.toLowerCase().indexOf(this.events[this.id].resources[i].doneBy.toLowerCase()) < 0){
						if(i==this.events[this.id].resources.length-2){
							fundedBy += this.events[this.id].resources[i].doneBy + " and ";
						}else if(i==this.events[this.id].resources.length-1){
							fundedBy += this.events[this.id].resources[i].doneBy;
						}else{
							fundedBy += this.events[this.id].resources[i].doneBy + ", ";
						}
					}
				}
			}
			this.fundPercentage = counter/this.events[this.id].resources.length*100;
			if(this.fundPercentage!=100){
				this.events[this.id].sponsors = "Partially funded by " + fundedBy;
			}else{
				this.events[this.id].sponsors = "by " + fundedBy;
			}
		}else{
			this.events[this.id].sponsors = "by nobody because no funds are necessary";
			this.fundPercentage = 100;
		}
    }

}
