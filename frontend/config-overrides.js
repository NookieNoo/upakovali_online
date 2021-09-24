const { alias } = require("react-app-rewire-alias");

const aliasMap = {
    "@app": "./src",
    "@app-pages": "./src/components/pages",
    "@app-universal": "./src/components/universal",
    "@app-helpers": "./src/helpers",
};

module.exports = alias(aliasMap);
