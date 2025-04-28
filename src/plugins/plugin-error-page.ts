import { Plugin } from '../core/PluginLoader';

export const errorPagePlugin: Plugin = {
  name: 'error-page',
  register(app) {
    app.onHook('onError', (ctx: any) => {
      ctx.response.writeHead(ctx.error?.status||500, {'Content-Type':'text/html'});
      ctx.response.end(`<html><body><h1>Erro ${ctx.error.status}</h1><p>${ctx.error.payload.message}</p></body></html>`);
    });
  }
};