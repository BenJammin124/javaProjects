class Car {
  constructor(engine, transmission) {
    this.engine = engine;
    this.transmission = transmission;
  }
}

class Engine {
  constructor(type) {
    this.type = type;
  }
}

class Transmission {
  constructor(type) {
    this.type = type;
  }
}

const petrolEngine = new Engine(type: 'petrol');
const autoTrans = new Engine(type: 'auto');