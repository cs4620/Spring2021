"use strict"
import sphere from "./sphere.obj.js"
import plane from "./plane.obj.js"
import * as math from "./math.js"
import parseOBJ from "./parse-obj.js"

Object.keys(math).forEach(k=>globalThis[k] = math[k]);

export default function main(document) {
  let start = performance.now();

  let ambient = vector3(50, 50, 50)
  let directionalLight = normalize(vector3(0, 1, 1))
  
  const shaderGenerator = (color) =>
    function (worldSpace, normal, uvs, shadowed=false) {
      if(shadowed) return ambient;
      let angle;
      angle = dot(normal, directionalLight);
      if(angle < 0) angle = 0;
      let diffuse = scale(color, angle);
      return clamp(add(ambient, diffuse));
    }

  let triangles = [
    ...parseOBJ(sphere, shaderGenerator(vector3(0, 255,0)), vector3(-2,0,0)), 
    ...parseOBJ(sphere, shaderGenerator(vector3(255, 255,0)), vector3(2,0,0)),
    ...parseOBJ(plane, shaderGenerator(vector3(255, 255,255)), vector3(0,-1,0)),

  ];

  let camera = {
    origin: vector3(0, 0, 4),
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

  ctx.fillStyle = "cyan";
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
      let end = i + 1;
      if (end >= 3)
        end -= 3
      let p = toPlane([trianglePoints[start], add(trianglePoints[start], plane.abc), trianglePoints[end]])
      planes.push(p)
    }
    containingPlanes.push(planes);
  }

  for (let x = 0; x < width; x++) {

    if (x % 50 == 0) console.log(x)
    let percentX = x / width;
    let offsetX = percentX * 2 - 1
    let rightVector = scale(cameraRight, offsetX * screenHalfWidth);

    for (let y = 0; y < height; y++) {
      //Where is this pixel in world space
      if (x == 296 && y == 204)
        console.log("break")
      let percentY = y / height;
      let offsetY = percentY * 2 - 1

      let screenSpacePixel = add(rightVector, scale(cameraUp, offsetY * screenHalfWidth))

      let rayDirection = normalize(subtract(screenSpacePixel, rayOrigin))

      let nearestDistance = Number.MAX_SAFE_INTEGER;
      let nearestColor;
      for (let i = 0; i < triangles.length; i++) {
        let triangle = triangles[i]
        let trianglePoints = triangle.points;

        let plane = trianglePlanes[i];

        let T = triangleNumerators[i] / (dot(plane.abc, rayDirection))
        if (nearestDistance < T) {
          continue;
        }

        let collision = add(rayOrigin, scale(rayDirection, T));

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
            nearestDistance = T
            nearestColor = triangle.shader(collision, plane.abc, vector3(0, 0, 0))
          }
        }
      }

      if (!nearestColor) {
        ctx.fillStyle = "black"
      }
      else {
        ctx.fillStyle = `rgb(${nearestColor.x}, ${nearestColor.y}, ${nearestColor.z})`
      }
      ctx.fillRect(x, height - y - 1, 1, 1)
    }
  }

  let end = performance.now();
  console.log(end - start);
}