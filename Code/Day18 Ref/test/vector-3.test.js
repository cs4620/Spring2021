import chai from "chai";
import Vector3 from "../src/vector-3.js"

const expect = chai.expect;

let x = 0;
let y = 1;
let z = 2

let r = 0
let g = 1
let b = 2



describe("Vector3 Class", function () {
    describe("Constructor", function () {
        it("Stores x,y and z", function () {
            let vector3 = new Vector3(3, 4, 5)
            expect(vector3.x).to.equal(3);
            expect(vector3.y).to.equal(4);
            expect(vector3.z).to.equal(5);
        })
        it("Stores r, g, and b", function () {
            let vector3 = new Vector3(3, 4, 5)
            expect(vector3.r).to.equal(3);
            expect(vector3.g).to.equal(4);
            expect(vector3.b).to.equal(5);
        })
    })
    describe("Clone", function () {
        it("It clones correctly [member method]", function () {
            let vector3 = new Vector3(3, 4, 5)
            let vector = vector3.clone();
            expect(vector3.x).to.equal(3);
            expect(vector3.y).to.equal(4);
            expect(vector3.z).to.equal(5);

            expect(vector.x).to.equal(3);
            expect(vector.y).to.equal(4);
            expect(vector.z).to.equal(5);

            vector.v[x] = 6;
            vector.v[y] = 7;
            vector.v[z] = -10;

            expect(vector3.x).to.equal(3);
            expect(vector3.y).to.equal(4);
            expect(vector3.z).to.equal(5);

            expect(vector.x).to.equal(6);
            expect(vector.y).to.equal(7);
            expect(vector.z).to.equal(-10);
        })
        it("Stores r, g, and b", function () {
            let vector3 = new Vector3(3, 4, 5)
            expect(vector3.r).to.equal(3);
            expect(vector3.g).to.equal(4);
            expect(vector3.b).to.equal(5);
        })
    })
    describe("Length getter", function () {
        it("Gets the correct length", function () {
            let vector3 = new Vector3(3, 4, 0)
            expect(vector3.length).to.equal(5)
        })
    })
    describe("Normalize function", function () {
        it("Correctly normalizes [mutator]", function () {
            let vector3 = new Vector3(0, 0, 1);
            vector3.normalize();
            expect(vector3.x).to.equal(0);
            expect(vector3.y).to.equal(0);
            expect(vector3.z).to.equal(1);

            vector3 = new Vector3(1, 1, 0);
            vector3.normalize();
            expect(vector3.x).to.equal(1 / Math.sqrt(2))
            expect(vector3.y).to.equal(1 / Math.sqrt(2))
            expect(vector3.z).to.equal(0)
            expect(Math.abs(vector3.length - 1)).to.be.lessThan(.001)
        })
        it("Correctly normalizes [static]", function () {

            let vector3 = Vector3.normalize(new Vector3(1, 1, 0))
            //vector3.normalize();
            expect(vector3.x).to.equal(1 / Math.sqrt(2))
            expect(vector3.y).to.equal(1 / Math.sqrt(2))
            expect(vector3.z).to.equal(0)
            expect(Math.abs(vector3.length - 1)).to.be.lessThan(.001)
        })
    })
    describe("Scaling", function () {
        it("Scales correctly [mutator]", function () {
            let vector3 = new Vector3(3, 4, 5);
            vector3.scale(.5);
            expect(vector3.x).to.equal(1.5)
            expect(vector3.y).to.equal(2)
            expect(vector3.z).to.equal(2.5)
        })
        it("Scales correctly [static]", function () {

            let vector3 = new Vector3(3, 4, 5);
            Vector3.scale(vector3, .5).scale(2);
            expect(vector3.x).to.equal(3)
            expect(vector3.y).to.equal(4)
            expect(vector3.z).to.equal(5)
        })
    })
    describe("minus", function () {
        it("Correctly subtracts [mutator]", function () {
            let vector = Vector3.One;
            vector.minus(new Vector3(.5, .4, .3))
            expect(vector.x).to.equal(.5);
            expect(vector.y).to.equal(.6);
            expect(vector.z).to.equal(.7);
        })

        it("Correctly subtracts [static]", function () {
            let vector = Vector3.minus(Vector3.One, new Vector3(.5, .4, .3));
            expect(vector.x).to.equal(.5);
            expect(vector.y).to.equal(.6);
            expect(vector.z).to.equal(.7);

        })
    })
    describe("add", function () {
        it("Correctly adds [mutator]", function () {
            let vector = Vector3.One;
            vector.add(new Vector3(.5, .4, .3))
            expect(vector.x).to.equal(1.5);
            expect(vector.y).to.equal(1.4);
            expect(vector.z).to.equal(1.3);
        })

        it("Correctly adds [static]", function () {
            let vector = Vector3.add(Vector3.One, new Vector3(.5, .4, .3));
            expect(vector.x).to.equal(1.5);
            expect(vector.y).to.equal(1.4);
            expect(vector.z).to.equal(1.3);

        })
    })
    describe("dot", function () {
        it("Correctly calculates the dot product [member method]", function () {
            let vectorOne = new Vector3(3, 4, 5);
            let vectorTwo = new Vector3(1, 2, -10);
            let dotOne = vectorOne.dot(vectorTwo);
            let dotTwo = vectorTwo.dot(vectorOne);
            expect(dotOne).to.equal(-39);
            expect(dotTwo).to.equal(-39);

        })

        it("Correctly calculates the dot product [static]", function () {
            let vectorOne = new Vector3(3, 4, 5);
            let vectorTwo = new Vector3(1, 2, -10);
            let dotOne = Vector3.dot(vectorOne, vectorTwo);
            let dotTwo = Vector3.dot(vectorOne, vectorTwo);
            expect(dotOne).to.equal(-39);
            expect(dotTwo).to.equal(-39);


        })
    })
    describe("cross", function () {
        it("Correctly calculates the cross product [mutator]", function () {
            let vectorOne = Vector3.positiveX;
            let vectorTwo = Vector3.positiveY;
            let crossOne = vectorOne.cross(vectorTwo);
            expect(crossOne).to.eql(Vector3.positiveZ);
            

        })
        it("Correctly calculates the cross product [mutator] b", function () {
            let vectorOne = Vector3.positiveX;
            let vectorTwo = Vector3.positiveY;
            let crossTwo = vectorTwo.cross(vectorOne);
            expect(crossTwo).to.eql(Vector3.negativeZ);

        })
        it("Correctly calculates the cross product [mutator] c", function () {
            let vectorOne = new Vector3(3,4,5);
            let vectorTwo = new Vector3(6,7,-10);
            let crossOne = vectorOne.cross(vectorTwo);
            expect(crossOne).to.eql(new Vector3(-75, 60, -3));

        })

        it("Correctly calculates the cross product [static]", function () {
            let vectorOne = Vector3.positiveX;
            let vectorTwo = Vector3.positiveY;
            let crossOne = Vector3.cross(vectorOne, vectorTwo);
            expect(crossOne).to.eql(Vector3.positiveZ);


        })
    })

})