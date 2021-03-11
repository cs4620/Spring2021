import chai from "chai";
import Vector3 from "../src/vector-3.js"
import Ray from "../src/ray.js"
import Plane from "../src/plane.js"

const expect = chai.expect;



describe("Plane Class", function () {
    describe("Constructor", function () {
      it("Correctly stores the values", function(){
        let plane = new Plane(1,2,3,4);
        expect(plane.A).to.equal(1)
        expect(plane.B).to.equal(2)
        expect(plane.C).to.equal(3)
        expect(plane.D).to.equal(4)
      })
    })
    describe("fromABCD", function () {
      it("Correctly stores the values", function(){
        let plane =  Plane.fromABCD(1,2,3,4);
        expect(plane.A).to.equal(1)
        expect(plane.B).to.equal(2)
        expect(plane.C).to.equal(3)
        expect(plane.D).to.equal(4)
      })
    })
    describe("fromABC", function () {
      it("Correctly calculates D", function(){
        let plane =  Plane.fromABC(0,1,0, Vector3.Zero);
        expect(plane.A).to.equal(0)
        expect(plane.B).to.equal(1)
        expect(plane.C).to.equal(0)
        expect(plane.D).to.equal(0)
      })
      it("Correctly calculates D b", function(){
        let plane =  Plane.fromABC(0,1,0, Vector3.positiveY);
        expect(plane.A).to.equal(0)
        expect(plane.B).to.equal(1)
        expect(plane.C).to.equal(0)
        expect(plane.D).to.equal(-1)
      })
    })
    describe("fromThreeVectors", function () {
      it("Correctly calculates A B C D", function(){
        let plane =  Plane.fromThreeVectors(Vector3.Zero, Vector3.positiveX, Vector3.positiveY);
        expect(plane.A).to.equal(0)
        expect(plane.B).to.equal(0)
        expect(plane.C).to.equal(1)
        expect(plane.D).to.equal(0)
      })      
    })

    
})