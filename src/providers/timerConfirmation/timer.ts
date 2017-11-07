// ==============================================================================

// TypeScript for Timer Object
// Created: 10/17/17 by Brendan Thompson
// Updated: 11/07/17 by Brendan Thompson

// Description:
    // - Timer Object that counts down from 60

// ==============================================================================

// ==============================================================================
//     Import Navigation tools and ProgramPage & TeamMembersPage
// ==============================================================================

import { Injectable } from '@angular/core';


@Injectable()

export class TimerComponent {

    private durationOfTimer: 60;

    // Timer Members
    private seconds: number;
    private secondsRemaining: number;
    private runTimer: boolean;
    private hasStarted: boolean;
    private hasFinished: boolean;

    constructor() {
    }

//  ==============================================================================
//      Initializers
//  ==============================================================================

    ngOnInit() {
        this.initTimer();
    }

    // Initializes all of the timer's internal variables
    initTimer() {
        this.seconds = this.durationOfTimer;
        this.runTimer = false;
        this.hasStarted = false;
        this.hasFinished = false;
        this.secondsRemaining = this.durationOfTimer;
    }

//  ==============================================================================
//      Control Timer
//  ==============================================================================

    startTimer() {
        this.hasStarted = true;
        this.runTimer = true;
        this.timerTick();
        console.log('Timer Started');
    }

    restartTimer() {
    	this.secondsRemaining = this.durationOfTimer;
        this.hasStarted = true;
        this.hasFinished = false;
        this.runTimer = true;
        this.timerTick();
    }

    pauseTimer() {
        this.runTimer = false;
    }

    resumeTimer() {
        this.startTimer();
    }

//  ==============================================================================
//      Actual Timer Implementation
//  ==============================================================================

    // Runs the Timer constantly using a 1000 second timeout
    timerTick() {
        setTimeout(() => {
            if (!this.runTimer) { return; }
            this.secondsRemaining--;
            if (this.secondsRemaining > 0) {
                this.timerTick();
            }
            else {
                this.hasFinished = true;
                console.log('Timer Finished');
            }
        }, 1000);
    }

    // Returns whether or not the timer has finished
    isFinished() {
        return this.hasFinished;
    }
}