const depcruise = require("dependency-cruiser").cruise;


let dependencies = depcruise(["src/plugin"]).output;

const modules = dependencies.modules.filter(md => {
  md.dependencies = md.dependencies.map(d => d.resolved)
    .filter(d => d.match(/\.tsx?/));
  return md.source.match(/\.tsx?/);
});

console.log(modules);
