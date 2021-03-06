import chai from "chai";
import Vector3 from "../src/vector-3.js"
import Ray from "../src/ray.js"
import Plane from "../src/plane.js"

const expect = chai.expect;



describe("Ray Class", function () {
    describe("Constructor", function () {
        it("Stores start and end", function () {
            let ray = new Ray(Vector3.Zero, Vector3.One)
            expect(ray.start).to.eql(Vector3.Zero);
            expect(ray.end).to.eql(Vector3.One);
        })
    })


    describe("normalize", function () {
        it("Nomalizes correctly", function () {
            let normalized = new Ray(Vector3.Zero, Vector3.One).normalize();
            expect(normalized.end.x).to.equal(1 / Math.sqrt(3));
            expect(normalized.end.y).to.equal(1 / Math.sqrt(3));
            expect(normalized.end.z).to.equal(1 / Math.sqrt(3));
        })
    })
    describe("direction", function () {
        it("Returns the correct direction [member]", function () {
            let direction = new Ray(Vector3.Zero, Vector3.One).direction;
            expect(direction.x).to.equal(1);
            expect(direction.y).to.equal(1);
            expect(direction.z).to.equal(1);
        })
        it("Returns the correct direction [static]", function () {
            let direction = Ray.direction(new Ray(Vector3.Zero, Vector3.One));
            expect(direction.x).to.equal(1);
            expect(direction.y).to.equal(1);
            expect(direction.z).to.equal(1);
        })
    })
    describe("length", function () {
        it("Returns the correct length [member]", function () {
            let ray = new Ray(Vector3.Zero, Vector3.positiveX);
            expect(ray.length).to.equal(1)
        })
        it("Returns the correct length [static]", function () {
            let len = Ray.length(new Ray(Vector3.Zero, Vector3.positiveX));
            expect(len).to.equal(1)
        })
    })
    describe("distanceToPlane", function () {
        it("Calculates the correct distance", function () {
            let ray = new Ray(Vector3.positiveY, Vector3.Zero);
            let distance = ray.distanceToPlane(Plane.fromABCD(0, 1, 0, 0))
            expect(distance).to.equal(1)
        })

    })
})