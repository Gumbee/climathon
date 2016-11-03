import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

/*
  Generated class for the EventCreator page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-creator',
  templateUrl: 'event-creator.html'
})
export class EventCreatorPage {
	
	// contains the DOM of our page	
	@ViewChild('content') private content: ElementRef;

	// eventFormPrototype is used to reset the form data to its initial state
	private eventFormPrototype: any = {};
	private eventForm: any = {
		name:'',
		description:'',
		address: '',
		date:'2016-10-04',
		beginTime:'01:33',
		resources:[],
		active:true
	};
	private resource: any = {};

	constructor(public navCtrl: NavController) {
		let date: Date = new Date();

		this.eventForm.date = date.getFullYear()+"-"+('0' + date.getMonth()).slice(-2)+"-"+('0' + date.getDay()).slice(-2);
		this.eventForm.beginTime = ('0' + date.getHours()).slice(-2)+":"+('0' + date.getMinutes()).slice(-2);
		// save the initial form data to the prototype so we can reset the form later
		this.eventFormPrototype = this.eventForm;
	}

	addResource() {
		if(this.resource.resourceName !== undefined && this.resource.resourceName.trim() != ''){
			this.eventForm.resources.push(this.resource);
			this.resource = {};
			setTimeout(()=>{
				console.log(this.content.nativeElement.scrollTop);
				console.log(this.content.nativeElement.scrollHeight);
				this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
			},0);	
		}
		console.log(this.eventForm.date);
	}

	removeResource(id: number){
		setTimeout(()=>{
			this.eventForm.resources.splice(id, 1);
		}, 100);
	}

	onSubmit(){
		if(this.resource.resourceName !== undefined && this.resource.resourceName.trim() != ''){
			this.addResource();
		}else{
			this.eventForm = this.eventFormPrototype;
		    setTimeout(() => this.eventForm.active = true, 0);
		}
	}

}
