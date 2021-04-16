const vector3StringArray = (arr) => vector3(+arr[0], +arr[1], +arr[2])
const vectorsFromArray = (arr) => arr.map(i => { return { v: i.split("/")[0], vt: i.split("/")[1], vn: i.split("/")[2], } })
const vector3 = (x, y, z) => { return { x, y, z }; }
const cloneVector3 = (start) => vector3(start.x, start.y, start.z)
const dot = (v1, v2) => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
const cross = (v1, v2) => vector3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x)
const lengthSquared = v => v.x ** 2 + v.y ** 2 + v.z ** 2
const length = v => Math.sqrt(lengthSquared(v))
const scale = (v, s) => vector3(v.x * s, v.y * s, v.z * s)
const normalize = v => scale(v, 1 / length(v))
const add = (v1, v2) => vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z)
const subtract = (v1, v2) => add(v1, scale(v2, -1))
const perp = (v1, v2) => normalize(cross(v1, v2))
const toPlane = arr => {
  let tangents = [subtract(arr[1], arr[0]), subtract(arr[2], arr[1]), subtract(arr[0], arr[2])]
  let abc = normalize(perp(tangents[0], tangents[1]))
  let d = -dot(abc, arr[0])
  return { abc, d };
}
const clampOne = f => Math.min(255, Math.max(0, f))
const clamp = v => vector3(clampOne(v.x), clampOne(v.y), clampOne(v.z))
const directMultiply = (one, two) => vector3(one.x * two.x, one.y*two.y, one.z*two.z)

export {
  vector3StringArray,
  vectorsFromArray,
  vector3,
  cloneVector3,
  dot,
  cross,
  lengthSquared,
  length,
  scale,
  normalize,
  add,
  subtract,
  perp,
  toPlane,
  clampOne,
  clamp,
  directMultiply
}