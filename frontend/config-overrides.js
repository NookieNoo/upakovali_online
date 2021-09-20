const { alias } = require("react-app-rewire-alias");

const aliasMap = {
    "@app": "./src",
    "@app-pages": "./src/components/pages",
    "@app-universal": "./components/universal",
    "@app-helpers": "./helpers",
};

module.exports = alias(aliasMap);
