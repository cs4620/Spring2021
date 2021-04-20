"use strict"
//List of objects we can use in your ray tracer
import sphere from "./sphere.obj.js"
import plane from "./plane.obj.js"
import triangle from "./triangle.obj.js"
import smallPlane from "./small-plane.obj.js"

//Support code
import * as math from "./math.js"
import parseOBJ from "./parse-obj.js"

Object.keys(math).forEach(k => globalThis[k] = math[k]);

export default function main(document) {
  let start = performance.now();

  let ambient = vector3(50, 50, 50)
  let directionalLight = normalize(vector3(0, 1, 0))

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

  let triangles = [
    ...parseOBJ(sphere, shaderGenerator(vector3(255, 255, 0)), vector3(2, 0, 0)),
    ...parseOBJ(plane, shaderGenerator(vector3(255, 255, 255)), vector3(0, -2, 0)),
    ...parseOBJ(smallPlane, shaderGenerator(vector3(255, 0, 255)), vector3(0, -1, 0)),
    ...parseOBJ(sphere, shaderGenerator(vector3(0, 255, 0)), vector3(-2, 2, -5)),
    ...parseOBJ(triangle, shaderGenerator(vector3(0, 255, 255)), vector3(0, 1, -5)),

  ];

  let camera = {
    origin: vector3(0, 0, 10),
    lookAt: vector3(0, 0, 0),
    up: vector3(0, 1, 0),
    right: vector3(1, 0, 0),
    fov: Math.PI / 4//45 degrees
  }

  let width = 480;
  let height = 480;

  let canvas = document.createElement("canvas")
  document.body.appendChild(canvas);
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.width = width;
  canvas.height = height;

  let ctx = canvas.getContext("2d");

  ctx.fillStyle = "magenta";
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  let screenHalfWidth = Math.sin(camera.fov) * length(subtract(camera.lookAt, camera.origin));
  let cameraRight = vector3(1, 0, 0);
  let cameraUp = vector3(0, 1, 0);
  let rayOrigin = cloneVector3(camera.origin)
  let trianglePlanes = triangles.map(i => toPlane(i.points))
  let triangleNumerators = trianglePlanes.map(plane => -plane.d - dot(plane.abc, rayOrigin))

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

  function castRay(rayOrigin, rayDirection, depth) {
    if (depth == 0) return { nearestDistance: Number.MAX_SAFE_INTEGER, nearestColor: vector3(0, 0, 0) }
    let nearestDistance = Number.MAX_SAFE_INTEGER;
    let nearestColor;
    for (let i = 0; i < triangles.length; i++) {
      let triangle = triangles[i]
      let plane = trianglePlanes[i];
      let numerator = triangleNumerators[i];
      if(depth!=2){
        numerator = - dot(plane.abc, rayOrigin)-plane.d;
      }
      let T = numerator / (dot(plane.abc, rayDirection))
      if (nearestDistance < T || T == Number.MAX_SAFE_INTEGER || T < 0) {
        continue;
      }

      let collision = add(rayOrigin, scale(rayDirection, T));
      // if (Math.abs(collision.x) < .1 && Math.abs(collision.y - -2) < .1 && Math.abs(collision.z) < .1)
      //   console.log("Hi")
      // if (Math.random() > .99 && collision.y == -2)
      //   console.log(collision.x + " " + collision.y + " " + collision.z)


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
          offsets = [-1];
          break;
        }
        offsets.push(offset)
      }
      let minimum = Math.min(...offsets)

      if (minimum > 0) {
        if (T > 0 && T < nearestDistance) {
          if (depth == 2 && i == 2)
            console.log("break")
          nearestDistance = T
          let shadowDistance = castRay(add(collision, scale(directionalLight, .001)), directionalLight, depth - 1).nearestDistance;
          let shadowed = shadowDistance < Number.MAX_SAFE_INTEGER;

          nearestColor = triangle.shader(collision, plane.abc, vector3(0, 0, 0), shadowed)
        }
      }
    }
    return { nearestDistance, nearestColor };
  }

  for (let x = 0; x < width; x++) {

    if (x % 50 == 0) console.log(x)
    let percentX = x / width;
    let offsetX = percentX * 2 - 1
    let rightVector = scale(cameraRight, offsetX * screenHalfWidth);

    for (let y = 0; y < height; y++) {
      //Where is this pixel in world space
      if (x == 240 && y == 172)
        console.log("break")
      let percentY = y / height;
      let offsetY = percentY * 2 - 1

      let screenSpacePixel = add(rightVector, scale(cameraUp, offsetY * screenHalfWidth))

      let rayDirection = normalize(subtract(screenSpacePixel, rayOrigin))

      let { T, nearestColor } = castRay(rayOrigin, rayDirection, 2);

      if (!nearestColor) {
        ctx.fillStyle = "black"
      }
      else {
        //Send out a shadow ray
        ctx.fillStyle = `rgb(${nearestColor.x}, ${nearestColor.y}, ${nearestColor.z})`
      }
      if (x == 240 && y == 172)
        ctx.fillStyle = "magenta"
      ctx.fillRect(x, height - y - 1, 1, 1)
    }
  }

  let end = performance.now();
  console.log(end - start);
}