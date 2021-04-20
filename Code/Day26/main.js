"use strict"
//List of objects we can use in your ray tracer
import sphere from "./objects/sphere.obj.js"
import plane from "./objects/plane.obj.js"
import triangle from "./objects/triangle.obj.js"
import smallPlane from "./objects/small-plane.obj.js"

//Support code
import * as math from "./math.js"
import parseOBJ from "./parse-obj.js"

//Put all the math functions into the global namespace
Object.keys(math).forEach(k => globalThis[k] = math[k]);

export default function main(document) {
  //Used just for permance measurement
  let start = performance.now();

  //Lights in the scene
  let ambient = vector3(50, 50, 50)
  let directionalLight = normalize(vector3(0, 1, 0))

  //A simple shader generator
  const shaderGenerator = (color) =>
    function (worldSpace, normal, uvs, shadowed = false) {
      let amb = scale(directMultiply(ambient, color), 1/(255));
      if (shadowed) return amb;
      let angle;
      angle = dot(normal, directionalLight);
      if (angle < 0) angle = 0;
      let diffuse = scale(color, angle);
      return clamp(add(amb, diffuse));
    }

    //Pairs of object/shaders that will be rendered.
  let triangles = [
    ...parseOBJ(sphere, shaderGenerator(vector3(255, 255, 0)), vector3(2, 0, 0)),
    ...parseOBJ(plane, shaderGenerator(vector3(255, 255, 255)), vector3(0, -2, 0)),
    ...parseOBJ(smallPlane, shaderGenerator(vector3(255, 0, 255)), vector3(0, -1, 0)),
    ...parseOBJ(sphere, shaderGenerator(vector3(0, 255, 0)), vector3(-2, 2, -5)),
    ...parseOBJ(triangle, shaderGenerator(vector3(0, 255, 255)), vector3(0, 1, -5)),

  ];

  //The information about the camera
  let camera = {
    origin: vector3(0, 0, 10),
    lookAt: vector3(0, 0, 0),
    up: vector3(0, 1, 0),
    right: vector3(1, 0, 0),
    fov: Math.PI / 4//45 degrees
  }

  //Output frame size
  let width = 960;
  let height = 960;

  //Add a canvas to the html page
  let canvas = document.createElement("canvas")
  document.body.appendChild(canvas);
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");

  //Clear the canvas
  ctx.fillStyle = "magenta";
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  //Values we use repeatedly but don't change pixel-to-pixel
  let screenHalfWidth = Math.sin(camera.fov) * length(subtract(camera.lookAt, camera.origin));
  let cameraRight = vector3(1, 0, 0);
  let cameraUp = vector3(0, 1, 0);
  let rayOrigin = cloneVector3(camera.origin)
  let trianglePlanes = triangles.map(i => toPlane(i.points))
  let triangleNumerators = trianglePlanes.map(plane => -plane.d - dot(plane.abc, rayOrigin))

  //Cache the containing planes used to check if a point on a plane is inside the triangle
  let containingPlanes = [];
  for (let i = 0; i < triangles.length; i++) {
    let triangle = triangles[i]
    let trianglePoints = triangle.points;
    let plane = trianglePlanes[i];
    let planes = [];
    for (let i = 0; i < 3; i++) {
      let start = i;
      let end = (i + 1) % 3;

      let p = toPlane([trianglePoints[start], add(trianglePoints[start], plane.abc), trianglePoints[end]])
      planes.push(p)
    }
    containingPlanes.push(planes);
  }


  //The actual ray tracing code. Can be used for camera rays, shadow rays, reflection rays, etc.
  function castRay(rayOrigin, rayDirection, depth) {
    //Since ray tracing is recursive, this is our stopping condition
    if (depth == 0) return { nearestDistance: Number.MAX_SAFE_INTEGER, nearestColor: vector3(0, 0, 0) }


    let nearestDistance = Number.MAX_SAFE_INTEGER;
    let nearestColor;
    for (let i = 0; i < triangles.length; i++) {
      let triangle = triangles[i]
      let plane = trianglePlanes[i];

      //For camera rays, we can use cached values for the numerator
      let numerator = triangleNumerators[i];
      if(depth!=2){
        //For other rays, we have to calculate it for each ray cast
        numerator = - dot(plane.abc, rayOrigin)-plane.d;
      }

      let T = numerator / (dot(plane.abc, rayDirection))
      if (nearestDistance < T || T == Number.MAX_SAFE_INTEGER || T < 0) {
        //Optimization: Stop if the closest point is further away than the closest point found so far
        continue;
      }

      //Calculate the world space location of the collision
      let collision = add(rayOrigin, scale(rayDirection, T));
      
      //Compare the collision point to the containing planes to see if we are inside the triangle
      let planes = [];
      let offsets = [];
      for (let j = 0; j < 3; j++) {
        let start = j;
        let end = j + 1;
        if (end >= 3)
          end -= 3
        let p = containingPlanes[i][j]
        let offset = dot(collision, p.abc) + p.d;
        if (offset < 0) {
          //If we get here, the point is not inside the triangle.
          offsets = [-1];
          break;
        }
        offsets.push(offset)
      }
      let minimum = Math.min(...offsets)

      //minimum < 0, then we didn't hit the triangle
      if (minimum > 0) {
        //If we are here, we hit the triangle
        if (T > 0 && T < nearestDistance) {
          //If we are here, we are the closest collision found so far.
          nearestDistance = T
          //Cast a shadow ray, making sure we add a little offset so we don't have self-collisions
          let shadowDistance = castRay(add(collision, scale(directionalLight, .001)), directionalLight, depth - 1).nearestDistance;
          let shadowed = shadowDistance < Number.MAX_SAFE_INTEGER;

          //Now determine the color of the closest point using the shader
          nearestColor = triangle.shader(collision, plane.abc, vector3(0, 0, 0), shadowed)
        }
      }
    }
    //Depending on the purpose, this function can be called to get distance or color information
    return { nearestDistance, nearestColor };
  }

  //Loop over every pixel
  for (let x = 0; x < width; x++) {

    //Values that don't change with y and can be cached
    let percentX = x / width;
    let offsetX = percentX * 2 - 1
    let rightVector = scale(cameraRight, offsetX * screenHalfWidth);

    for (let y = 0; y < height; y++) {
      //Where is this pixel in world space
      let percentY = y / height;
      let offsetY = percentY * 2 - 1

      //Where is the pixel in world Space?
      let screenSpacePixel = add(rightVector, scale(cameraUp, offsetY * screenHalfWidth))

      //What is the direction of the ray?
      let rayDirection = normalize(subtract(screenSpacePixel, rayOrigin))

      //Get the nearest color
      let { T, nearestColor } = castRay(rayOrigin, rayDirection, 2);

      if (!nearestColor) {
        //We didn't hit anything
        //Show the background color
        ctx.fillStyle = "black"
      }
      else {
        //We hit something, update the stored colors
        ctx.fillStyle = `rgb(${nearestColor.x}, ${nearestColor.y}, ${nearestColor.z})`
      }
      //Fill the pixel with its color, but flip so y is down.
      ctx.fillRect(x, height - y - 1, 1, 1)
    }
  }

  //For performance assessment
  let end = performance.now();
  console.log(end - start);
}