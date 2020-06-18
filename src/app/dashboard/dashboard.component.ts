import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    myControl = new FormControl();
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;



    constructor() { }

    ngOnInit(): void {
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }


    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

}
