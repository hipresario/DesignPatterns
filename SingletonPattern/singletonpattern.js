/********
*** The Singleton pattern is thus known because it restricts instantiation of a class to a single object.
*** Classically, the Singleton pattern can be implemented by creating a class with a method that creates a new instance of the class if one doesn't exist.
*** In the event of an instance already existing, it simply returns a reference to that object.
*** Singletons differ from static classes (or objects) as we can delay their initialization, generally because they require some information that may not
*** be available during initialization time. They don't provide a way for code that is unaware of a previous reference to them to easily retrieve them.
*** This is because it is neither the object or "class" that's returned by a Singleton, it's a structure.
*** Think of how closured variables aren't actually closures - the function scope that provides the closure is the closure.
*** In JavaScript, Singletons serve as a shared resource namespace which isolate implementation code from the global namespace
*** so as to provide a single point of access for functions.
*** Use Singleton pattern causes tight coupling
********/
var mySingleton = (function () {

  // Instance stores a reference to the Singleton
  var instance;

  function init() {

    // Singleton

    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }

    var privateVariable = "Im also private";

    var privateRandomNumber = Math.random();

    return {

      // Public methods and variables
      publicMethod: function () {
        console.log( "The public can see me!" );
      },

      publicProperty: "I am also public",

      getRandomNumber: function() {
        return privateRandomNumber;
      }

    };

  };

  return {

    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {

      if ( !instance ) {
        instance = init();
      }

      return instance;
    }

  };

})();



var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();

console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); // true
