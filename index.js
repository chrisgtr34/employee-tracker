

const logo = require("asciiart-logo");
init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Database" }).render();

  console.log(logoText);
}
