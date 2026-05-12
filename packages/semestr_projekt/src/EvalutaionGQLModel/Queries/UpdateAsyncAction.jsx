import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";
import { reduceToFirstEntity, updateItemsFromGraphQLResult } from "../../../../dynamic/src/Store";

const UpdateMutationStr = `
mutation evaluationUpdate(
  $id: UUID!, 
  $lastchange: DateTime!, 
  $semesterId: UUID, 
  $userId: UUID, 
  $order: Int, 
  $points: Int, 
  $passed: Boolean, 
  $description: String, 
  $grade: String, 
  $classificationlevelId: UUID, 
  $examId: UUID, 
  $eventId: UUID, 
  $examinerId: UUID
) {
  evaluationUpdate(evaluation: {
    id: $id, 
    lastchange: $lastchange, 
    semesterId: $semesterId, 
    userId: $userId, 
    order: $order, 
    points: $points, 
    passed: $passed, 
    description: $description, 
    grade: $grade, 
    classificationlevelId: $classificationlevelId, 
    examId: $examId, 
    eventId: $eventId, 
    examinerId: $examinerId
  }) {
    ... on EvaluationGQLModel { 
      ...Large 
    }
    ... on EvaluationGQLModelUpdateError {
      __typename
      msg
      failed
      code
    }
  }
}
`

const UpdateMutation = createQueryStrLazy(`${UpdateMutationStr}`, LargeFragment)

// Tady už je to zpět tak, jak to knihovna bezpečně zná:
export const UpdateAsyncAction = createAsyncGraphQLAction2(
    UpdateMutation, 
    updateItemsFromGraphQLResult, 
    reduceToFirstEntity
)