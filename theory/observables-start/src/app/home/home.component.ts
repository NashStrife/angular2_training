import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from "rxjs/Observer";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/Rx';   // needed to work with Observable operators like "interval"

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    numbersObsSubscription: Subscription;
    custombsSubscription: Subscription;

    constructor() { }

    ngOnInit() {
        // create an observable
        const myNumbers = Observable
        // which emit numbers each seconds
        .interval(1000)
        // map the data we get back to a new observable to make some transformations
        .map(
            (data: number) => {
                // return a new observable which will contains the number * 2 
                // (observables always return observables even if we works with numbers like in this case)
                return data*2;
            }
        );

        this.numbersObsSubscription = myNumbers.subscribe(
            (number: number) => {
                console.log(number);
            }
        );

        // build a bridge between observable and observer to know whenever it's fired
        // observer return a string
        const myObservable = Observable.create((observer: Observer<string>) => {
            setTimeout(() => {
                // "next" juste pass to the next data package
                observer.next('first package');
            }, 2000);
            setTimeout(() => {
                observer.next('second package');
            }, 4000);
            setTimeout(() => {
                // create a fail
                // observer.error('this does not work!');

                // complete observer
                observer.complete();
            }, 5000);
        });

        this.custombsSubscription = myObservable.subscribe(
            (data: string) => {
                console.log(data);
            }, (error: string) => {
                console.log(error);
            }, () => {
                console.log("Completed");
            }
        );
    }

    ngOnDestroy() {
        // unsubscribe to observables to destroy them
        this.numbersObsSubscription.unsubscribe();
        this.custombsSubscription.unsubscribe();
    }
}
