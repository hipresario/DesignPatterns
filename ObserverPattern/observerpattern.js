/******
*** The Observer is a design pattern where an object (known as a subject) maintains a list of objects depending on it (observers),
*** automatically notifying them of any changes to state.
*** When a subject needs to notify observers about something interesting happening, it broadcasts a notification to the observers
*** (which can include specific data related to the topic of the notification).
*** When we no longer wish for a particular observer to be notified of changes by the subject they are registered with,
*** the subject can remove them from the list of observers.
 *  Observer Pattern
 *  Implement the Observer pattern with the following components:
 *  Subject: maintains a list of observers, facilitates adding or removing observers
 *  Observer: provides a update interface for objects that need to be notified of a Subject's changes of state
 *  ConcreteSubject: broadcasts notifications to observers on changes of state, stores the state of ConcreteObservers
 *  ConcreteObserver: stores a reference to the ConcreteSubject, implements an update interface for the Observer to ensure state is consistent with the Subject's
 **/

//Observer List
function ObserverList(){
  this.observerList = [];
}

ObserverList.prototype.add = function( obj ){
  return this.observerList.push( obj );
};

ObserverList.prototype.count = function(){
  return this.observerList.length;
};

ObserverList.prototype.get = function( index ){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[ index ];
  }
};

ObserverList.prototype.indexOf = function( obj, startIndex ){
  var i = startIndex;

  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      return i;
    }
    i++;
  }

  return -1;
};

ObserverList.prototype.removeAt = function( index ){
  this.observerList.splice( index, 1 );
};

//Subject
function Subject(){
  //store observers for the subject
  this.observers = new ObserverList();
}

Subject.prototype.addObserver = function( observer ){
  this.observers.add( observer );
};

Subject.prototype.removeObserver = function( observer ){
  this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};

Subject.prototype.notify = function( context ){
  var observerCount = this.observers.count();
  for(var i=0; i < observerCount; i++){
    this.observers.get(i).update( context );
  }
};

// The Observer
function Observer(){
  this.update = function(){
    // ...
  };
}

// Extend an object with an extension
function extend( extension, obj ){
  for ( var key in extension ){

    obj[key] = extension[key];
  }
}

// References to our DOM elements
var controlCheckbox = document.getElementById( "mainCheckbox" ),
  addBtn = document.getElementById( "addNewObserver" ),
  container = document.getElementById( "observersContainer" );


// Concrete Subject

// Extend the controlling checkbox with the Subject class
extend( new Subject(), controlCheckbox );

// Clicking the checkbox will trigger notifications to its observers
controlCheckbox.onclick = function(){
  controlCheckbox.notify( controlCheckbox.checked );
};

addBtn.onclick = addNewObserver;


//extra tracing id for input Jianmin added for testing.
var id = 0;

// Concrete Observer
function addNewObserver(){

  // Create a new checkbox to be added
  var check  = document.createElement( "input" );
  check.type = "checkbox";

  //testing
  check.id =  id++; //(function(){ return id++;})();

  // Extend the checkbox with the Observer class
  extend( new Observer(), check );

  // Override with custom update behaviour
  check.update = function( value ){
    this.checked = value;
  };

  //testing
  check.onclick = function(){

   console.log(this.id);

  };

  // Add the new observer to our list of observers
  // for our main subject
  controlCheckbox.addObserver( check );

  // Append the item to the container
  container.appendChild( check );
}



