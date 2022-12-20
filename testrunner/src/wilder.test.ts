import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://host.docker.internal:4000",
    fetch,
  }),
  cache: new InMemoryCache(),
});

const CREATE_WILDER = gql`
  mutation CreateWilder($createWilderInput: CreateWilderInput!) {
    createWilder(createWilderInput: $createWilderInput) {
      age
      email
      first_name
      last_name
    }
  }
`;

const LOGIN = gql`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      success
      token
    }
  }
`;

const LIST_WILDERS = gql`
  query ListWilders {
    listWilders {
      success
      wilders {
        email
        last_name
        first_name
        age
      }
      message
    }
  }
`;

describe("Wilder resolver", () => {
  let email = `test${new Date().getTime()}@gmail.com`;
  let password = "test";
  let token: string;

  it("créer wilder", async () => {
    const res = await client.mutate({
      mutation: CREATE_WILDER,
      variables: {
        createWilderInput: {
          age: 30,
          email,
          first_name: "Kevin",
          password,
          last_name: "Durand",
        },
      },
    });

    expect(res.data?.createWilder).toEqual({
      age: 30,
      first_name: "Kevin",
      last_name: "Durand",
      email,
      __typename: "Wilder",
    });
  });
  it("avoir un token si le wilder est correct", async () => {
    const res = await client.query({
      query: LOGIN,
      variables: {
        password,
        email,
      },
      fetchPolicy: "no-cache",
    });


    expect(res.data?.login.success).toBeTruthy();
    expect(res.data?.login.token).toMatch(/^(?:[\w-]*\.){2}[\w-]*$/); //(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)
    token = res.data?.login.token;
  });
  it("obtenir des informations si le wilder est connecté", async () => {
    const res = await client.query({
      query: LIST_WILDERS,
      fetchPolicy: "no-cache",
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
  
    expect(res.data?.listWilders.success).toBeTruthy();
    expect(res.data?.listWilders.wilders.length).toBeGreaterThan(0);
  });
});
