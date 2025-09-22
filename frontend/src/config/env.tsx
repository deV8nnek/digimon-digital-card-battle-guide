export const settings = {
  ENVIRONMENT: process.env.NODE_ENV,
  BACKEND_URL: (process.env.BACKEND_HOST) ?
    process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT : 
    "localhost:8000"
};
