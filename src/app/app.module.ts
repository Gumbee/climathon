import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { EventPage } from '../pages/event/event';
import { MarketPage } from '../pages/market/market';
import { EventCreatorPage } from '../pages/event-creator/event-creator'
import { MyEventsPage } from '../pages/my-events/my-events'
import { DataService } from '../providers/data-service'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProfilePage,
    EventPage,
    MarketPage,
    EventCreatorPage,
    MyEventsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProfilePage,
    EventPage,
    MarketPage,
    EventCreatorPage,
    MyEventsPage
  ],
  providers: [
    DataService
  ]
})
export class AppModule {}
