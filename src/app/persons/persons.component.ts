import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonsService } from './persons.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html'
})

export class PersonsComponent implements OnInit, OnDestroy {
  personList: string[];
  private personListSubs: Subscription;
  //private personService: PersonsService;

  constructor(private prsService: PersonsService) {
    //this.personList = prsService.persons;
    //The correct way to do this is using a Lifecycle Hook
    //this.personService = prsService;
  }

  ngOnInit() {
    this.personList = this.prsService.persons;
    this.personListSubs = this.prsService.personsChanged.subscribe(persons => {
      this.personList = persons;
    });
  }

  onRemovePerson(personName: string){
    this.prsService.removePerson(personName);
  }

  ngOnDestroy(){
    this.personListSubs.unsubscribe();
  }

}
