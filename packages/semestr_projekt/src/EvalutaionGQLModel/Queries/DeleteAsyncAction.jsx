import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";

const DeleteMutationStr = `
mutation evaluationDelete(
  $id: UUID!, 
  $lastchange: DateTime!
) {
  evaluationDelete(evaluation: {
    id: $id, 
    lastchange: $lastchange
  }) {
    # Tady už nepoužíváme "... on", protože backend vrací přímo tento objekt
    __typename
    msg
    failed
    code
    location
    input
    # Vyžádáme si ID smazané entity, aby Redux věděl, co má odstranit z obrazovky
    Entity {
      id
    }
  }
}
`

const DeleteMutation = createQueryStrLazy(`${DeleteMutationStr}`)

export const DeleteAsyncAction = createAsyncGraphQLAction2(DeleteMutation)