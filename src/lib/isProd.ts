const isProd = Bun.env['NODE_ENV'] === 'production';

export default isProd;
