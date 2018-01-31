// ==============================================================================

// TypeScript for Timer Object
// Created: 10/17/17 by Brendan Thompson
// Updated: 01/30/17 by Brendan Thompson

// Description:
    // Timer Object that counts down from 60
    // Secondary Timer overwrites the first & counts down from 10

// ==============================================================================

// ==============================================================================
//     Import Navigation tools and ProgramPage & TeamMembersPage
// ==============================================================================

import { Injectable } from '@angular/core';

@Injectable()

export class TimerComponent {

    // Timer Constants
    private durationOfTimer: number = 60;
    private durationOfSecondaryTimer: number = 10;

    // Timer Members
    private secondsRemaining: number;
    private hasStarted: boolean;
    private hasFinished: boolean;
    private hasStopped: boolean;

    constructor() {
        // console.log('Constructed Timer');
    }

//  ==============================================================================
//      Initializers
//  ==============================================================================

    ngOnInit() {
        this.initTimer();
    }

    // Initializes all of the timer's internal variables
    initTimer() {
        this.hasStarted = false;
        this.hasFinished = false;
        this.hasStopped = false;
        this.secondsRemaining = this.durationOfTimer;
    }

//  ==============================================================================
//      Control Timer
//  ==============================================================================

    restartTimer() {
    	this.secondsRemaining = this.durationOfTimer;
        this.hasStarted = true;
        this.hasFinished = false;
        this.timerTick();
    }

    restartSecondaryTimer() {
        this.secondsRemaining = this.durationOfSecondaryTimer;
        this.hasStarted = true;
        this.hasFinished = false;
        this.timerTick();
    }

    stopTimer() {
        this.hasStopped = true;
    }

//  ==============================================================================
//      Actual Timer Implementation
//  ==============================================================================

    // Runs the Timer constantly using a 1000 second timeout
    timerTick() {
        setTimeout(() => {
            if (this.hasStopped) {
                this.hasStopped = false;
                return;
            }
            this.secondsRemaining--;
            console.log('Time Remaining: ' + this.secondsRemaining);
            if (this.secondsRemaining > 0) {
                this.timerTick();
            }
            else {
                this.hasFinished = true;
            }
        }, 1000);
    }

    // Returns whether or not the timer has finished
    isFinished() {
        return this.hasFinished;
    }
}