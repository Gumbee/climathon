import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { DataService } from '../providers/data-service'
import { EventCreatorPage } from '../pages/event-creator/event-creator'
import { EventPage } from '../pages/event/event';
import { HomePage } from '../pages/home/home';
import { MarketPage } from '../pages/market/market';
import { MyEventsPage } from '../pages/my-events/my-events'
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    AboutPage,
    ContactPage,
    EventCreatorPage,
    EventPage,
    HomePage,
    MarketPage,
    MyApp,
    MyEventsPage,
    ProfilePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AboutPage,
    ContactPage,
    EventCreatorPage,
    EventPage,
    HomePage,
    MarketPage,
    MyApp,
    MyEventsPage,
    ProfilePage,
    TabsPage
  ],
  providers: [
    DataService
  ]
})
export class AppModule {}
