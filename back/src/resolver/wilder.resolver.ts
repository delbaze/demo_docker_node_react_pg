import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import WilderController from "../controller/Wilder";
import Wilder, { CreateWilderInput, WilderListData, WilderLogin } from "../entity/Wilder";

@Resolver(Wilder)
export class WilderResolver {
  // @Authorized()
  @Query(() => WilderListData)
  async listWilders(): Promise<WilderListData> {
    let wilders = await new WilderController().listWilders();
    return { wilders, success: true, message: "un message de test" };
  }
  @Query(() => Wilder)
  async findWilder(@Arg("id") id: string): Promise<Wilder | null | void> {
    return await new WilderController().findWilder(id);
  }
  @Query(() => WilderLogin)
  async login(@Arg("email") email: string, @Arg("password") password: string): Promise<WilderLogin | null | void> {
    return await new WilderController().login(email, password);
  }

  @Mutation(() => Wilder)
  async createWilder(
    @Arg("createWilderInput") createWilderInput: CreateWilderInput
  ): Promise<Wilder> {
    console.log("CREATE WILDER INPUT", createWilderInput)
    const { first_name, last_name, age, email, password } = createWilderInput;
    let wilder = await new WilderController().createWilder({
      first_name,
      last_name,
      age,
      email,
      password
    });
    return wilder;
  }
  //   @Mutation(() => Wilder)
  //   async createWilder(
  //     @Arg("first_name") first_name: string,
  //     @Arg("last_name") last_name: string,
  //     @Arg("age") age: number
  //   ): Promise<Wilder> {
  //     let wilder = await new WilderController().createWilder({
  //       first_name,
  //       last_name,
  //       age,
  //     });
  //     return wilder;
  //   }
}
