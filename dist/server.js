"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
const PORT = process.env.PORT || 3001;
const routes = [];
app_1.default._router.stack.forEach((middleware) => {
    if (middleware.route) {
        routes.push({
            path: middleware.route.path,
            methods: Object.keys(middleware.route.methods)
        });
    }
    else if (middleware.name === 'router') {
        middleware.handle.stack.forEach((handler) => {
            if (handler.route) {
                routes.push({
                    path: handler.route.path,
                    methods: Object.keys(handler.route.methods)
                });
            }
        });
    }
});
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
    console.log('Registered routes:', JSON.stringify(routes, null, 2));
});
//# sourceMappingURL=server.js.map