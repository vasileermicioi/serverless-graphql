import express from 'express';
import { postgraphile } from 'postgraphile';
const app = express();

/**
 *  To be used like http://localhost:3000/api/forum_example/graphiql
 */
app.use('/api/:schema', (req, res, next) => {
  postgraphile(
    'postgres://postgres:postgrespassword@localhost:5432/forumdb',
    req.params.schema,
    {
      graphiqlRoute: '/graphiql',
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      enableQueryBatching: true,
      dynamicJson: true,
      disableQueryLog: true,
      appendPlugins: [
        require('@graphile-contrib/pg-simplify-inflector'),
        require('@graphile-contrib/pg-many-to-many'),
        require('@graphile-contrib/pg-order-by-related'),
        require('@graphile-contrib/pg-order-by-multi-column-index'),
        require('postgraphile-plugin-connection-filter'),
        require('postgraphile-index-to-unique-constraint-plugin')
          .addFakeUniqueConstraintFromIndex,
        require('postgraphile-plugin-nested-mutations'),
      ],
    }
  )(req, res, next);
});

app.listen(process.env.PORT || 3000);
