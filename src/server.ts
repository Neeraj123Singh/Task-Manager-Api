import app from './app';

const PORT = process.env.PORT || 3001;

interface Route {
  path: string;
  methods: string[];
}

// Log all registered routes
const routes: Route[] = [];
app._router.stack.forEach((middleware: any) => {
  if (middleware.route) {
    routes.push({
      path: middleware.route.path,
      methods: Object.keys(middleware.route.methods)
    });
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler: any) => {
      if (handler.route) {
        routes.push({
          path: handler.route.path,
          methods: Object.keys(handler.route.methods)
        });
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  console.log('Registered routes:', JSON.stringify(routes, null, 2));
}); 