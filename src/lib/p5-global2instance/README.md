The files in this sub-directory were adapted from adapted from [DrSensor's p5-global2instance](https://github.com/DrSensor/p5-global2instance).

The main adaptations of the existing library are:

- patching CommonJS module to ES6
- patching in some p5.js function names e.g. 'circle'
- changing the output sketch format so that it returns a sketch function rather than an exports line.
  - this change wasn't strictly necessary since the wrapper function gets removed, when reading in the output string and feeding the sketch to a new p5 instance
