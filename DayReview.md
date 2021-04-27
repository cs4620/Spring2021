# Day Review

This file contains links and text after every class that you can look back to and review. Note that Zoom recordings are available in Canvas by going to the calendar option and clicking on the course day you want to watch.

## Day 1 - 2021-01-12 - See the world, Fundamental Graphics Problem, Introduction to mathematical representations

- Students understand the importance of observation in computer graphics
- Students can discuss the fundamental problem in graphics in the context of computational power and Avogadro's number
- Student can describe why everything in computer graphics is a simplification
- Student are familiar with commerical and open-source 3D modeling software
- Students understand the relationship between the x, y, and z axes to the colors red, green, and blue
- Students can describe a 3D object in terms of vertices, lines, and faces
- Students can describe the problems with have faces with more than three vertices in the context on rendering with triangles.
- Students are familiar with the three common transforms in 3D modeling
- Student recognize the problems of negative scales.
- Activity: Basic controls in model space.

## Day 2 - 2021-01-24 - Representation of model space

- Students can describe the major ways of modeling in model space
- Student understand the importance of symmetry in modeling
- Students can discuss the pulling and stretching approach to modeling
- Students can discuss the additive approach to modeling
- Student can discuss using boolean operators in modeling
- Activity: Model a Tie Fighter

## Day 3 - 2021-01-19 - Vertices

- Students can describe how a location in space is represented as a column vector (x,y,z,w).
- Students understand the difference between left and right handed coordinate systems.
- Students understand the difference between a vectex (location in space) and a vector (direction)
- Students can correctly add and subtract vectors
- Students can find the length of a 2D and 3D vector
- Students understand what a nomalized vector is (length 1).
- Students can normalize a vector.
- Activity: Model starting with a vertex.

## Day 4 - 2021-01-21

- Students understand the different ways of defining a line.
- Students can solve for ```ax+by+c=0``` given two points
- Students can explain what the tangent of a line is
- Students can derive the normalized tangent of a line
- Students can explain what the perpendicular of a line is.
- Students can derive the perpendicular from ```ax+by+c=0```
- Students can find an orthogonal vector in 2D by switching and negating axes
- Students understand what a dot product is
- Students can calculate a dot product.
- Students understand that the dot product gives the cosine of the angle between vectors
- Students understand what a cross product is
- Students can calculate the cross product of two vectors
- Students can calculate an orthogonal vector from to vectors using a cross product
- Students are familiar with subdivision surfaces
- Students are familiar with curves and surfaces in the context of modeling
- Students are familiar with metaballs in the context of modeling.
- Activity: Demonstrate subdivision surfaces, curves and surfaces, and metaballs

## Day 5 - 2021-01-26

- Students understand it takes more time to rasterize triangles than it does no run a fragment shader
- Students understand the light bounces and what affects that has (the ceiling is not black)
- Students understand how ambient light is used to illuminate an object
- Students understand that light received is proportional to the normal of the surface and the direction to the light
- Students understand the sine function, and when to use it
- Students understand the cosine function, and when to use it
- Students understand than the atan function is faulty
- Students understand the correct use of the atan2 function.
- Students can explain what a point light is.
- Students can explain what a directional (sun) light is.
- Students can explain what a spot light is.
- Students can explain what an area light is.
- Students can describe the difference between hard and soft shadows

## Day 6 - 2021-01-28

- Students understand how light reflects off a purely diffuse surface
- Students understand how light reflects off a purely reflective surface
- Student can calculate the angle of reflection given a light source and a normal
- Student undestand the conecpt behind Phong Shading.
- Students can explain sub-surface scattering

## Day 7 - 2021-02-02

- Students are famiiliar with the UV coordinate system
- Students understand how UV coordinates map a 2D image onto a 3D mesh.
- Students understand how changing UV coordinates affects an object's appearance
- Students are familiar with basic projection operators (cube, cylinder, sphere)
- Students are familiar with dynanmic remeshing (sculpting tools)
- Students understand the power-of-two convention in image map sizes
- Activity: Compare UV mapping to wrapping presents
- Activity: Review various map projections, https://bl.ocks.org/syntagmatic/ba569633d51ebec6ec6e

## Day 8 - 2021-02-04
- Students will understand the difference between rendering on the GPU and raytracing
- Students will have a basic understanding of the difference between biased and unbiased rendering
- Students will understand the role of a virtual camera in rendering
- Students will understand the role of baking in a graphics pipeline
- Students can explain why baking speeds up render times
- Students can list some of the image textures that could be baked
- Students have a basic understanding of ambient occlusion
- Students have a basic understanding of how normal maps are encoded.

## Day 9 - 2021-02-9
- Students will be able to describe at a high level the history of hand-animation
- Students will know the role of key frames in traditional animation
- Students will know the role of "tweening" in traditional animaiton
- Students will understand the role of a dope sheet in traditonal animation
- Students will be able to use key frames in 3D animaiton
- Students will be able setup tweening in 3D animation
- Students will be able to read a "graphs" view for key frame animation.
- Students can describe how animaiton can be pakcaged into "actions" for reuse

## Day 10 - 2021-02-11
- Students will be able to describe the motion of an object using keyframe
- Students will be able to animate an object using f-curves
- Students will understand how an object can follow a curve for animation
- Students will understand how use constraints in animation
- Students will be able to animate a camera.
#
https://www.youtube.com/embed/YZQn5ivP6to

## Day 11 - Class cancelled due to weather.

## Day 12 2021-02-18
- Students will be able explain the role of rigging in animation
- Students can explain the difference between rigid body and soft body animation
- Students can identify instances of rigid body and soft body animation in film
- Students understand the role of an individual bone in a rig
- Students can create an armature with multiple bones
- Students understand the role of constraints on bones
- Students can explain at a high level what inverse kinematics are
- Students can explain the basic layout of a traditional human skeleton in animation.
- Activity: Look for rigid and soft body animation in a Pixar clip.

## Day 13 2021-02-23
- Students can explain what motion blur is
- Students can give an example of an effects technique that does not have motion blur (stop animation).
- Students can explain the pros and cons of "Go Motion"
- Students understand the advantage of computer animation in terms of motion blur.
- Students can explain ways in which motion blur is produced
- Students understand soft-body animation
- Students understand how weights affect the animation of a soft body
- Students can explain how to adjust weight using weight painting.

## Day 14 2021-02-25
- Students can explain some of the unique features of the human eye (rods, cones, lens, etc.)
- Students understand the difference between forward and backward ray tracing.
- Students can explain why forward ray tracing is better than purely backward ray tracing
- Students can talk about the difference between biased and unbiased rendering (including path tracing)
- Students can list the benefits of using a ray tracer.
- Students can list the problems with ray tracing (specifically speed).
- Students can explain at a high level how data structures can speed up ray tracing.
- Students understand that commercial renderers can us both the GPU and ray tracing.
- Students understand the input that a ray tracer needs.
- Students can explain the high-level steps of a ray tracer.

# Day 15 - 2021-03-02
- Students will understand the basic history of graphics file formats
- Students can explain the pros and cons of the obj format
- Students can explain the pros and cons of the fbx format
- Students can parse a obj file
- Students are familiar with winding order.

# Day 16 - 2021-03-04
- Example Website: https://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-ray-tracing/implementing-the-raytracing-algorithm
- Students can explain the difference between an orthographic projection and a perspective projection
- Students can identify the prespective type (orthographic or perspective) when looking at an image
- Students understand what a field of view is and the two ways to represent a FOV (half or full angle)
- Students can calculate how large an object would appear at a given distance due to perspective
- Students understand the law of similar triangles
- Students can calculate the location of pixels on a 2D camera
- Students can find the height of the image plane given camera parameters.

# Day 17 - 2021-03-09
- Students understand the importance of precision in ray tracing
- Students will be able to create a test framework for their ray tracer
- Students will understand the different uses of a Vector3 object (vector, position, color).
- Students will understand the basic operations on a Vector3 (length, scale, addition, subtraction)
- Students will understand how the term ray differs from the mathematical definition of a ray (ray tracing rays are finite-line segments with direction)
- Students will understand what it means to normalize a ray.

# Day 18 - 2021-03-11
- Students can normalize a ray
- Students understand how to calculate a dot product
- Students understand how to calculate a cross product
- Students understand that a dot product calculates a projection
- Students understand that a dot product calculates a cosine angle
- Students understand that the dot product of orthogonal vectors is always 0
- Students understand that a cross product calculates an orthogonal vector
- Students understand the Ax+By+Cz+D=0 form of a plane definitionn
- Students can calculate A,B, and C from a normal vector
- Students can calculate the value of D given A, B, and C
- Students can use three points to calculate A, B, C, and D
- Students can determine the distance between a ray and a plane.

[Spring Break]

# Day 19 - 2021-03-23
- Students can explain how triangle/ray collision tests have a 2D component even in 3D
- At a high level, students can describe the inside test and the bayrcentric methods of 2D triangle/point collision tests
- Students can derive the Ax+By+C=0 equation for all line segments of a triangle
- Students can find the normalized tangent for all line segments of a triangle
- Students can find the ortohgonal/normal vector for a line segment in 2D
- Students can use the orthogonal vector to find A and B in Ax+By+C=0
- Students can use a point on the line to solve for C in Ax+By+C = 0
- Students can determine if a point is in a triangle using these tree line definitions
- Students understand how the result of Ax+By+C indicates if a point is on the line, in front of the line, or behind the line

# Day 20 - 2021-03-25
- Students can calculate by hand whether a point is inside an arbitrary triangle
- Students write a function that determines whether a point is inside a triagle.

# Day 21 - 2021-03-30
- Students understand how to define a plane mathematically
- Students can find the orthogonal vector to a plane
- Students can find planes that run through points on a plane that is orthogonal to that plane
- Students can use the inside/outside test with these planes to see if a point on a plane is inside a triangle.

# Day 22 - 2021-04-06
- Students will understand the minimum requirements for a trivial ray tracer (image, camera, geometry)
- Students will be able to represent a camera in 3-space
- Students will be able to represent a triangle in 3-space.
- Students will be able to code a simple ray tracer
- Students will be able to map pixels into world space.
- Students will be able to get find the ABCD representation of a plane
- Students will be able to find the collision point between a ray and plane
- Students will be able to calculate if a point is inside a triangle on a plane

# Day 23 - 2021-04-08
- Students will understand how to integrate multiple triangles into a ray tracer
- Students will understand how to integrate simple lights into a ray tracer (i.e. directional lights)
- Students will know how to calculatethe diffuse term in a shader
- Students will understand the potential pitfalls with calculating the diffuse term (color inversion, overflow)
- Students will know which parts of the ray tracing algorithm need to be looped for each triangle and those which do not
- Students will know how to calculate the nearest triangle (lowest positive number)

# Day 24 - 2021-04-13
- Students will understand gimble lock (choose between two up axes)
- Students will know how to find the right vector from a camera origin, lookAt and up vector.
- Students will be able to reconstruct a camera with orthogonal axes 
- Students will know how to adjust for an image's aspect ratio while ray tracing.

# Day 25 - 2021-04-15
- Students will understand how to combine an obj parser with a ray tracer
- Students will understand different approaches to debugging a ray tracer
- Students will recognize repeated computations that can be cached while ray tracing
- Students will understand how to encapsulate their ray cast call to make shadow and reflection rays.

# Day 25 - 2021-04-20
- Students will understand what aliasing is
- Students can explain how to remove aliasing by rendering at a larger resolution
- Students can explain how to remove aliasing by taking multiple samples per pixel
- Students will have a basic understanding of eye anatomy, including the poisson distribution of cones
- Students will understand the massively parallel nature of GPUs
- Students will be familiar with vertex shaders
- Students will be familiar with fragment shaders

# Day 26 - 2021-04-22
- Students will understand the GPU pipeline
- Students will understand Z Buffering
- Students will understand screen tearing and how to resolve it (double buffering)
- Students will understand Z thrashing and how to resolve it (z hinting)
- Students will have a basic understandnig of GPU syntax
- Students will understand the role of decorators in GPU syntax
- Students will understand swizzling in a GPU shader.

# Day 27 - 2021-04-27
- Students will understand which variables are passed to a vertext shader before any frames.
- Students will understand which variables are passed to a vertext shader frame-by-frame.
- Students will understand which variables are passed to a frament shader frame-by frame.
- Students will understand how to pass data between the vertex shader and the fragment shader.
- Students can explain how normals are treated differently than vertices in a vertex shader (no translation, no world to camera matrix)
- Students will understand how to calculate diffuse lighting in a fragment shader.
