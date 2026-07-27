import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2"
import { LargeFragment } from "./Fragments"
import { reduceToFirstEntity } from "../../../../dynamic/src/Store"

/**
 * GraphQL dotaz pro vyhledávání hodnocení (EvaluationGQLModel) podle vzoru v popisu.
 *
 * Ověřeno introspekcí backendového typu EvaluationInputFilter (Strawberry):
 * pole `description` je typu StrFilter, filtr `_ilike` je tedy platný.
 * Pozn.: Filtrování podle jména studenta (student.user.fullname) NENÍ možné,
 * protože StudentInputFilter obsahuje pouze `user_id` (UUID), ne vnořený `user` objekt.
 *
 * @param {number} [skip] - Počet přeskočených záznamů (offset pro stránkování).
 * @param {number} [limit] - Maximální počet vrácených záznamů.
 * @param {string} [pattern] - Vyhledávací vzor aplikovaný na pole description (SQL ILIKE).
 *
 * @returns Pole hodnocení (alias `result`) obohacených o pole z LargeFragment (...Large).
 */
const SearchQueryStr = `
query SearchQuery($skip: Int, $limit: Int, $pattern: String) {
  result: evaluationPage(skip: $skip, limit: $limit, where: {description: {_ilike: $pattern}}) {
    ...Large
  }
}
`

export const SearchAsyncActionQuery = createQueryStrLazy(`${SearchQueryStr}`, LargeFragment)
export const SearchAsyncAction = createAsyncGraphQLAction2(SearchAsyncActionQuery)