import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";

const InsertMutationStr = `
mutation evaluationInsert(
  $examId: UUID!, 
  $id: UUID, 
  $order: Int, 
  $points: Int, 
  $passed: Boolean, 
  $description: String, 
  $classificationlevelId: UUID, 
  $eventId: UUID, 
  $parentId: UUID, 
  $studentId: UUID, 
  $examinerId: UUID
) {
  evaluationInsert(evaluation: {
    examId: $examId, 
    id: $id, 
    order: $order, 
    points: $points, 
    passed: $passed, 
    description: $description, 
    classificationlevelId: $classificationlevelId, 
    eventId: $eventId, 
    parentId: $parentId, 
    studentId: $studentId, 
    examinerId: $examinerId
  }) {
    ... on EvaluationGQLModel { 
      ...Large 
    }
    ... on EvaluationGQLModelInsertError {
      __typename
      msg
      failed
      code
    }
  }
}
`

const InsertMutation = createQueryStrLazy(`${InsertMutationStr}`, LargeFragment)

// Vytvoření akce pro vložení záznamu do databáze a Redux storu
export const InsertAsyncAction = createAsyncGraphQLAction2(InsertMutation)