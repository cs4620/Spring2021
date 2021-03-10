import chai from "chai";
import Vector3 from "../src/vector-3.js"
import Ray from "../src/ray.js"

const expect = chai.expect;



describe("Ray Class", function(){
    describe("Constructor", function(){
        it("Stores start and end", function(){
            let ray = new Ray(Vector3.Zero, Vector3.One)
            expect(ray.start).to.equal(Vector3.Zero);
            expect(ray.end).to.equal(Vector3.One);
        })
    })
})