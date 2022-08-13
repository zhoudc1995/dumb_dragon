import clipboard from "./clipboard";
const directives = {
  clipboard,
  // other directives
};

const setDirectives = (app) => {
  Object.keys(directives).forEach((name) => {
    directives[name](app);
  });
};

export default (app) => {
  setDirectives(app);
};
