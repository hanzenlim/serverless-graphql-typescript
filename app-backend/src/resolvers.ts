import {random, IRandomList} from "./random/resolver";
import {IResolvers} from "graphql-tools/dist/Interfaces";

export const resolvers: IResolvers = {
  Query: {
    getRandomList: (root: any, args: {length: number}): IRandomList => random.list(args),
  },
};
