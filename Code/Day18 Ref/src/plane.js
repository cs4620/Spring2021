import Vector3 from "./vector-3.js";

class Plane{
  constructor(A, B, C, D){
    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D;
  }
  static fromABCD(A, B, C, D){
    return new Plane(A, B, C, D);
  }
  static fromABC(A, B, C, vector){
    let D = -Vector3.dot(vector, new Vector3(A, B, C));
    return new Plane(A, B, C, D);
  }
  static fromThreeVectors(one, two, three){
    let deltaOne = Vector3.minus(two, one).normalize();
    let deltaTwo = Vector3.minus(three, one).normalize();
    let cross = Vector3.cross(deltaOne, deltaTwo);
    let A = cross.x;
    let B = cross.y;
    let C = cross.z;
    return this.fromABC(A, B, C, one);

  }
}

export default Plane;