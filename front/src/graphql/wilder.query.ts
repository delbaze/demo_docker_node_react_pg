import { gql } from "@apollo/client";

export const LIST_WILDERS = gql`
  query ListWilders {
    listWilders {
      success
      wilders {
        id
        first_name
        last_name
        age
        notes {
          id
          note
          language {
            label
          }
        }
      }
      message
    }
  }
`;
