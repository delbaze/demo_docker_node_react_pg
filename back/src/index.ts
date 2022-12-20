import { authChecker, getPayloadFromToken } from "./lib/utilities";
import * as dotenv from "dotenv";

dotenv.config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { WilderResolver } from "./resolver/wilder.resolver";
import { buildSchema } from "type-graphql";
import datasource from "./lib/datasource";
import WilderController from "./controller/Wilder";
// import * as joiful from 'joiful';

const start = async (): Promise<void> => {
  const schema = await buildSchema({
    resolvers: [WilderResolver],
    validate: {
      forbidUnknownValues: false,
    },
    authChecker,
  });
  const server = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      const { authorization } = req.headers;
      let user = null;
      if (authorization) {
        const token = authorization.split(" ")[1];
        let { email } = getPayloadFromToken(token);
        if (email) {
          user = await new WilderController().findWilderByEmail(email);
        }
      }
      return {user};
    },
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  server.listen().then(async ({ url }) => {
    await datasource.initialize();
    console.log(`Serveur lancé sur ${url}`);
  });
};
start();
