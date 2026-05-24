export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3001', 10),
  cors: {
    origins: (
      process.env.CORS_ORIGINS ??
      'http://localhost:5175,http://127.0.0.1:5175'
    )
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean),
  },
});
