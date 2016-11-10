import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { ProfilePage } from '../../pages/profile/profile';
import { DataService } from '../../providers/data-service';

declare var google;

@Component({
  selector: 'page-event-creator',
  templateUrl: 'event-creator.html'
})
export class EventCreatorPage {
	
	// contains the DOM of our page	
	@ViewChild('content') private content: ElementRef;
	@ViewChild('input') private input: any;

	private eventAnimation: any = {
		display: false,
		circleIn: false,
		fadeIn: false,
		textShow: false,
		textFade: false,
		textMsg: 'Event created.',
		loaderShow: false
	};
	private eventForm: any = {
		name:'',
		description:'',
		address: '',
		date:'2016-10-04',
		beginTime:'01:33',
		// For now we randomly generate the likes and the participants
		participants: Math.floor(Math.random() * 50),
		likes: Math.floor(Math.random() * 2)>0?Math.floor(Math.random() * 10):0,
		friends: Math.floor(Math.random() * 3)>1?Math.floor(Math.random() * 8):0,
		points: 0,
		icon: '',
		resources:[]
	};
	private resource: any = {name:'',done:0,doneBy:''};

	constructor(public navCtrl: NavController, private _dataService: DataService) {
		let date: Date = new Date();

		this.eventForm.date = date.getFullYear()+"-"+('0' + (date.getMonth()+1)).slice(-2)+"-"+('0' + date.getDate()).slice(-2);
		this.eventForm.beginTime = ('0' + date.getHours()).slice(-2)+":"+('0' + date.getMinutes()).slice(-2);
	}

	addResource() {
		if(this.resource.name !== undefined && this.resource.name.trim() != ''){
			this.eventForm.resources.push(this.resource);
			this.resource = {name:'',done:0,doneBy:''};
			setTimeout(()=>{
				this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
				this.input.setFocus();
			},0);	
		}
	}

	removeResource(id: number){
		setTimeout(()=>{
			this.eventForm.resources.splice(id, 1);
		}, 100);
	}

	submitForm(){
		if(this.isValidForm()){
			this.animateSubmit();
			this.getLatLng().then((results)=>{
				this.eventForm.lat = results[0].geometry.location.lat();
				this.eventForm.lng = results[0].geometry.location.lng();
				this._dataService.createEvent(this.eventForm).then(()=>{
					setTimeout(()=>{
						this.animateText();
						setTimeout(()=>{
							this.navCtrl.setRoot(ProfilePage, {}, {animate: true, direction: 'forward'});
						},2000);
					}, 2000);
				}).catch(()=>{
					this.submitFailed();
				});
			}).catch(()=>{
				this.submitFailed();
			});
		}
	}

	submitFailed(){
		this.eventAnimation.textMsg = "Creation failed."
		setTimeout(()=>{
			this.animateText();
			setTimeout(()=>{
				this.navCtrl.pop();
			},2000);
		},2000);
	}

	getLatLng(){
		return new Promise((resolve, reject)=>{
			var geocoder = new google.maps.Geocoder();
			var address = this.eventForm.address;
			geocoder.geocode( { 'address': address}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK){
			  	resolve(results);
			  }else{
			  	reject();
			  }
			});
		});
	}

	isValidForm(){
		// TODO: complete form validation
		if(this.eventForm.name !== undefined && this.eventForm.name.trim() != ''){
			return true;
		}
		return false;
	}

	animateSubmit(){
		this.eventAnimation.display = true;
		setTimeout(()=>{
			this.eventAnimation.circleIn = true;
			setTimeout(()=>{
				this.eventAnimation.fadeIn = true;
				this.eventAnimation.loaderShow = true;
			}, 200);
		}, 16*4);
	}

	animateText(){
		this.eventAnimation.textShow = true;
		this.eventAnimation.loaderShow = false;
		setTimeout(()=>{
			this.eventAnimation.textFade = true;
		},100);
	}

}
