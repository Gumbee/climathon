import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

	private db: any;
	private events: any;
	private auth: any;

	constructor(public http: Http) {
		// add reference to firbase database
		this.db = firebase.database().ref('/');
		this.events = firebase.database().ref('/events');
		// add reference to firebase authentication
		this.auth = firebase.auth();
	}

	createEvent(data: any){
		return new Promise((resolve, reject)=>{
			let reference = this.events.push();
			reference.set(data, ()=>{
				resolve();
			});
		})
	}

}
