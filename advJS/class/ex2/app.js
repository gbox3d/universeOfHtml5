class Polygon {
    constructor(height, width) {
      this.name = 'Polygon';
      this.height = height;
      this.width = width;
    }
  }

  class Squre extends Polygon {
      constructor(length) {
          super(length,length);
          this.name = 'Squre'
      }
  }

  export {Polygon,Squre} 