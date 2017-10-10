# Awesome Inc Check-In Mobile Application
# Created by: Brendan Thompson

This is a mobile application developed for Awesome Inc during my internship in the fall of 2017 to be used by guests to check-in upon entrance to the facility. It was created using the Ionic 3 hybrid mobile add framework described below.

### App Functionality:

	1) Asks the user what brought them in (Entrepreneurship, Learning to Code, or The Workspace)
		- if entrepreneurship, asks which program they are interested in
	2) Asks the user to select the team members who are expecting them
		- option to select "Nobody"
	3) Asks the user for basic info (Name, Email, Reason)
	4) Sends a notification via Slack to the corresponding Awesome Inc team member
		- "Nobody" sends message to #space
	5) Instructs the user to have a seat on one of the couches

### Ideas:

	A) take the user to some information about the company or the program they are interested in as some light reading material while they wait
	B) implement some sort of idle timer that returns to the home screen after nothing happening for a certain period of time
		- brings up a timed notification that asks the user if they are still there and returns home if no response
	C) Link with productivity statistic software they use

### Need to Implement:

	*** "I Have an Idea" takes them to the google form to fill out
	- Should implement TEAMMEMBERS array as a json object instead of manually in both confirm.ts & teamMembers.ts
		- created assets/data/teamMembersArray but failed to import into an array
	- Should implement Programs as a separate json file also
	- Integrate with ZOHO
	- Only displays important people based off selected program
		- Waiting till separate json
	*** Take Pictures also
		- would be fun
		- Ionic should be able to handle this pretty smoothly

### What is Ionic?

	Frameworks:
		- Ionic 3
			- open-source SDK for building beautiful, native, and progressive hybrid mobile apps
			- On top of all the rest of this stuff, Ionic adds the UI elements that wrap to look nice on each different platform
		- Cordova by Apache
			- open-source command line tool that wraps HTML/CSS/JavaScript allowing the user to write one set of code to target nearly every phone or tablet on the market
			- (Adobe made Cordova proprietary and called it PhoneGap but Cordova is still alive and well)
		- Angular 2
			- open-source framework for building web & mobile applications
			- takes care of navigation, data binding, dependency injection, and much more
			- I am knowingly using it for:
				- importing Components like NavController and NavParams
				- *ngFor to make for loops
				- templates using {{ }} markup: <ion-card-header> {{ program.name }} </ion-card-header>
		- Node.js = lightweight and efficient JavaScript Runtime
			- npm = largest ecosystem of open source libraries in the world
			- must have to get Ionic
	Languages:
		- TypeScript
			- open-source, developed and maintained by Microsoft
			- strict, syntactical superset of JavaScript and adds optional static typing
		- JavaScript (ES7, ES6, ES5)
			- High-level, dynamic, weakly typed, object-based, multi-paradigm, interpreted programming language
				- multi-paradigm = event-driven, functional, imperative (oop & prototype based)
			- Used to make webpages interactive and provide online programs
			- Supported by all modern web browsers by means of their own JavaScript Engines
				- Based on the ECMAScript specification
				- some don't implement fully while many support additional features
			- JSON = lightweight data-interchange format that JavaScript objects are converted into and sent between the server and the browser
				- easy for humans to read and write & for computers to parse & generate
				- rules:
					- data in name/value pairs
					- data separated by commans
					- {} curly brackets hold objects
					- [] square brackets hold arrays
		- HTML = HyperText Markup Language
			- received from a web server or local storage and rendered into multimedia web pages
			- denoted structural semantics
		- CSS = Cascading Style Sheets
			- used for describing the presentation of a document written in a markup language
			- designed to enable the separation of presentation and content
				- improve content accessibility
				- provide more flexibility and control in the specification of presentation characteristics
				- enable multiple HTML pages to share formatting
				- reduce complexity & repetition in the structural content
		- Sass = Syntactically Awesome Style Sheets
			- "most mature, stable, and powerful professional grade CSS extension language in the world"
			- scripting language that is interpreted or compiled into CSS
			- the newer syntax uses block formatting like that of CSS and is a nested metalanguage (valid CSS is valid SCSS)
			- official implementation open-source and coded in ruby, although other implementations exist (PHP, C w/ libSass, Java w/ JSass & Vaadin)
			- Provides: variables, nesting, mixins, and inheritance
	Methodologies:
		- Hybrid Mobile App Development
			****** Ionic and NativeScript doesn't use the WebView but instead
			- leverages the power of common web technologies (HTML, CSS, JavaScript) to build cross-platform, yet progressively native mobile applications using the platform WebView
			- App Types:
				A) Native App = written in platform specific language and communicated directly with the OS/Device
					(android = Java; iOS = ObjectiveC or Swift; windows = C#)
				B) Web App = written in web languages and communicated to the OS/Device through a Web Browser application
				C) Hybrid App = written in web languages and wrapped in technology that embeds the web view using native styles and can access the native hardware
			- WebView:
				- Apple decided not to have mobile apps run in Safari's mobile browser but instead used UIWebView
					- Now they use WKWebView as the modern WebKit API in iOS8 & OS X Yosemite
				- Android originally relied on the WebKit rendering engine
					- after Android 4.4, each consecutive update of Android's OS brought along a new version of Chromium which uses the Blink rendering engine
					- Since 5.0, WebView is a 'system-level.apk' available in the Google Play store and can update itself in the background
				- Crosswalk is a project by intel that enables the user to deploy a web application with its own dedicated runtime
					- not dependent on third party or platform-dependent WebView
					- can be used on Android, iOS, Linux, and Tizen
			- Benifits:
				- one code goes cross-platform
				- allows web-developers to easily develop mobile apps w/o learning new, native code
				- minimized learning curve and quicker development by leveraging web technology as opposed to native application tooling and compiled languages
			- Drawbacks:
				- slow
				- "The biggest mistake we've made as a company is betting on HTML5 over native" - Mark Zuckerberg
				Rebuttal:
					- only a noticeable difference if many moving parts, lots of animation, and heavy GPU processing
		- Progressive Web Applications
			- use responsive layouts and UI components that look similar to those found in native mobile applications
		- Reactive Programming
			- an asynchronous programming paradigm concerned with data streams and dynamically responding to change