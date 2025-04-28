import { Plugin } from '../core/PluginLoader';
import { buildSchema, graphql } from 'graphql';

export const graphqlPlugin: Plugin = {
  name: 'graphql',
  register(app, opts: { schemaSDL: string; rootValue?: any; path?: string }) {
    const schema = buildSchema(opts.schemaSDL);
    const root   = opts.rootValue || {};
    const endpoint = opts.path || '/graphql';
    app.addRoute('POST', endpoint, async (ctx: any) => {
      const { query, variables } = JSON.parse(await ctx.request.text());
      const result = await graphql({ schema, source: query, rootValue: root, variableValues: variables });
      ctx.response.writeHead(200, { 'Content-Type':'application/json' });
      ctx.response.end(JSON.stringify(result));
    });
  }
};
