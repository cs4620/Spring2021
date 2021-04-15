import sphere from "./sphere.obj.js"
export default function main(document){
  let start = performance.now();
        //import sphere from "./suzanne.obj.js"



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

        let lines = sphere.split("\n");
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

        let ambient = vector3(50, 50, 50)
        let directionalLight = normalize(vector3(0, 0, 1))
        const shaderGenerator = (color) =>
            function (worldSpace, normal, uvs) {
                let angle;
                 angle = dot(normal, directionalLight);
                // if (angle < 0) {
                 //   angle = dot(scale(normal, -1), directionalLight)
                // }
                let diffuse = scale(color, angle);
                return clamp(add(ambient, diffuse));
            }

        const simpleShader = shaderGenerator(vector3(255, 0, 0));
        const simpleShader2 = shaderGenerator(vector3(255, 255, 0));



        let triangles = []

        for (let j = 0; j < obj.f.length; j++) {
            let f = obj.f[j];
            let triangle = { shader: simpleShader, points: [] };

            for (let i = 0; i < f.length; i++) {
                let s = f[i].split("/");
                let v_index = +s[0];
                let vt_index = +s[1];
                let vn_index = +s[2];
                triangle.points.push(obj.v[v_index - 1])
            }
            triangles.push(triangle);
        }



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
                if(x == 296 && y == 204)
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
                ctx.fillRect(x, height-y-1, 1, 1)
            }
        }

        let end = performance.now();
        console.log(end - start);
}