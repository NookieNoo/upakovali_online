const { alias } = require("react-app-rewire-alias");

const aliasMap = {
    "@app": "./src",
    "@app-pages": "./src/components/pages",
    "@app-universal": "./src/components/universal",
    "@app-helpers": "./src/helpers",
    "@app-providers": "./src/providers",
    "@app-http": "./src/http",
};

module.exports = alias(aliasMap);
