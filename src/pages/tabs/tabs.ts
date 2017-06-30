import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ContactsPage } from '../contacts/contacts';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  usuario= this.params.get("usuario");
  tab1Root = HomePage;
  tab2Root = ContactsPage;
  tab3Root = ProfilePage;

  constructor(public params: NavParams) {
  }
}
