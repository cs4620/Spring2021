import chai from "chai";
import Vector3 from "../src/vector-3.js"

const expect = chai.expect;



describe("Vector3 Class", function(){
    describe("Constructor", function(){
        it("Stores x,y and z", function(){
            let vector3 = new Vector3(3,4,5)
            expect(vector3.x).to.equal(3);
            expect(vector3.y).to.equal(4);
            expect(vector3.z).to.equal(5);
        })
    })
    describe("Length getter", function(){
        it("Gets the correct length", function(){
            let vector3 = new Vector3(3,4,0)
            expect(vector3.length).to.equal(5)
        })
    })
    describe("Normalize function", function(){
        it("Correctly normalizes", function(){
            let vector3 = new Vector3(0,0,1);
            vector3.normalize();
            expect(vector3.x).to.equal(0);
            expect(vector3.y).to.equal(0);
            expect(vector3.z).to.equal(1);

            vector3 = new Vector3(1,1,0);
            vector3.normalize();
            expect(vector3.x).to.equal(1/Math.sqrt(2))
            expect(vector3.y).to.equal(1/Math.sqrt(2))
            expect(vector3.z).to.equal(0)
            expect(Math.abs(vector3.length-1)).to.be.lessThan(.001)

            vector3 = Vector3.normalize(new Vector3(1,1,0))
            //vector3.normalize();
            expect(vector3.x).to.equal(1/Math.sqrt(2))
            expect(vector3.y).to.equal(1/Math.sqrt(2))
            expect(vector3.z).to.equal(0)
            expect(Math.abs(vector3.length-1)).to.be.lessThan(.001)
        })
    })
    describe("Scaling", function(){
        it("Scales correctly", function(){
            let vector3 = new Vector3(3,4,5);
            vector3.scale(.5);
            expect(vector3.x).to.equal(1.5)
            expect(vector3.y).to.equal(2)
            expect(vector3.z).to.equal(2.5)

            vector3 = new Vector3(3,4,5);
            vector3.scale(.5).scale(2);
            expect(vector3.x).to.equal(3)
            expect(vector3.y).to.equal(4)
            expect(vector3.z).to.equal(5)
        })
    })
    describe("minus", function(){
        it("Correctly subtracts", function(){
            let vector = Vector3.One;
            vector.minus(new Vector3(.5, .4, .3))
            expect(vector.x).to.equal(.5);
            expect(vector.y).to.equal(.6);
            expect(vector.z).to.equal(.7);
        })
    })
    describe("static minus", function(){
        it("Correctly subtracts", function(){
            let vector = Vector3.minus(Vector3.One, new Vector3(.5, .4, .3));
            console.log(vector.x);
            expect(vector.x).to.equal(.5);
            expect(vector.y).to.equal(.6);
            expect(vector.z).to.equal(.7);

        })
    })
})