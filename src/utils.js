const blackFilter =
  "brightness(0%) saturate(100%) invert(0%) sepia(0%) saturate(7489%) hue-rotate(0deg) brightness(0%) contrast(1350%)";

const api_host = "https://minisportstars-backend.herokuapp.com/api";

const formDataToJSON = (formData) => {
  let object = {};

  formData.forEach((value, key) => {
    // Reflect.has in favor of: object.hasOwnProperty(key)
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });

  return object;
};

const parseJSON = (str) => JSON.parse(str);

export { blackFilter, api_host, formDataToJSON, parseJSON };
