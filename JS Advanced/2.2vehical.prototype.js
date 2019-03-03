//prototype

// Vehical
function Vehical(speed) {
    this.speed = speed;
    this.toString = undefined;
    this.valueOf = null;
}
//metods Vehical
Vehical.prototype.stop = function () { 
  this.speed = 0;
  console.log(this.speed);
}
Vehical.prototype.move = function () {
  this.speed ++;
  console.log(this.speed);
}

//Bike
function Bike() {
    Vehical.apply(this, arguments);  
    this.wheelsCount = 2;
}
Bike.prototype = Object.create(Vehical.prototype);
Bike.prototype.move = function() {
  this.speed++; 
  console.log('Vrum-Vrum - ' + this.speed);
}

//Car
function Car(speed, wheelsCount, doorsCount) {
    Car.countCarCreate++;
    Vehical.apply(this, arguments);  
    this.wheelsCount = wheelsCount;
    this.doorsCount = doorsCount;
    this.doorsOpen = 0;
    this.doorsClose = doorsCount;
}
Car.countCarCreate = 0;
Car.showCreate = function() {
    return this.countCarCreate;
}
Car.prototype = Object.create(Vehical.prototype);
Car.prototype.openDoor = function() {
  if(this.doorsOpen === this.doorsCount) console.log('All doors open');
  else {
    this.doorsOpen++;
    this.doorsClose--;
    console.log('Doors open: ' + this.doorsOpen);
  }
}
Car.prototype.closeDoor = function() {
  if(this.doorsClose === this.doorsCount) console.log('All doors closed');
  else {
    this.doorsOpen--;
    this.doorsClose++;
    console.log('Doors closed: ' + this.doorsClose);
  }
}

//MonsterTruck
function MonsterTruck(speed, wheelsSize, wheelsCount, doorsCount) {
    Car.apply(this, arguments);     
    this.wheelsSize  = wheelsSize;
}
MonsterTruck.prototype = Object.create(Car.prototype);
MonsterTruck.prototype.openDoor = function() {
  setTimeout(() => { 
      Car.prototype.openDoor.apply(this, arguments); 
    }, 1000);
}

//Create Vehical
let suzuki = new Bike(70);

let lada = new Car(150, 4, 4);
let bmw = new Car(150, 4, 4);
let lexus = new Car(150, 4, 4);
let mersedes = new Car(150, 4, 4);

let truck = new MonsterTruck(300 , 60, 4 , 2);

console.log(Car.showCreate());
truck.doorsCount = 2;
truck.openDoor();
truck.openDoor();
truck.closeDoor();
console.log('Speed bike: ' + suzuki.speed);
suzuki.move();
console.log('Speed car: ' + lada.speed);
console.log('Speed monsterTruck: ' + truck.speed);
console.log('WheelsCount monsterTruck: ' + truck.wheelsCount);
console.log('DoorsCount monsterTruck: ' + truck.doorsCount);

// function

// Vehical
function Vehical(speed) {
    this.speed = speed;
    this.toString = undefined;
    this.valueOf = null;
    this.stop = function () {
        this.speed = 0;
        console.log(this.speed);
    }
    this.move = function () {
        this.speed ++;
        console.log(this.speed);
    }
}

//Bike
function Bike() {
    Vehical.apply(this, arguments);  
    this.wheelsCount = 2;
    this.move = function() {
        this.speed++; 
        console.log('Vrum-Vrum - ' + this.speed);
    }
}

//Car
function Car(speed, wheelsCount, doorsCount) {
    Car.countCarCreate++;
    Vehical.apply(this, arguments);  
    this.wheelsCount = wheelsCount;
    this.doorsCount = doorsCount;
    this.doorsOpen = 0;
    this.doorsClose = doorsCount;

    Car.showCreate = function() {
        return this.countCarCreate;
    }
    this.openDoor = function() {
        if(this.doorsOpen === this.doorsCount) console.log('All doors open');
        else {
          this.doorsOpen++;
          this.doorsClose--;
          console.log('Doors open: ' + this.doorsOpen);
        }
    }
    this.closeDoor = function() {
        if(this.doorsClose === this.doorsCount) console.log('All doors closed');
        else {
          this.doorsOpen--;
          this.doorsClose++;
          console.log('Doors closed: ' + this.doorsClose);
        }
    }
}
Car.countCarCreate = 0;

//MonsterTruck
function MonsterTruck(speed, wheelsCount, doorsCount, wheelsSize) {
    Car.apply(this, arguments);     
    this.wheelsSize  = wheelsSize;
    
    
    const OpenDoor = this.openDoor;
    this.openDoor = function() {
        setTimeout(() => { 
            OpenDoor.apply(this, arguments); 
          }, 1000);
    }
}