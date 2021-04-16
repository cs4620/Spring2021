import {add} from "./math.js"

export default function parseOBJ(string, shader, position){
  let lines = string.split("\n");
  let obj = {
    v: [],
    vt: [],
    vn: [],
    f: []
  }
  lines = lines.filter(i => i.trim().length > 0)
  lines.forEach(i =>
    i[0] == "f" ? obj.f.push(i.split(" ").slice(1)) :
      obj[i.split(" ")[0]].push(vector3StringArray(i.split(" ").slice(1)))
  )

  

  let triangles = []

  for (let j = 0; j < obj.f.length; j++) {
    let f = obj.f[j];
    let triangle = { shader, points: [] };

    for (let i = 0; i < f.length; i++) {
      let s = f[i].split("/");
      let v_index = +s[0];
      let vt_index = +s[1];
      let vn_index = +s[2];
      triangle.points.push(obj.v[v_index - 1])
    }
    triangles.push(triangle);
  }
  for(let i = 0; i < triangles.length; i++){
    let triangle = triangles[i];
    let points = triangle.points;
    for(let j = 0; j < points.length; j++){
      points[j] = add(points[j], position);
    }
  }
  return triangles;
}