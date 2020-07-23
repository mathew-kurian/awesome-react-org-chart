process.env.BABEL_ENV = "server";

require("@babel/register")({ extensions: [".js", ".jsx", ".ts", ".tsx"] });
require("./index.ts");
