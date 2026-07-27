/**
 * @file Children.jsx
 * @description Pomocná komponenta pro předávání entity EvaluationGQLModel do potomků.
 *
 * @module EvaluationGQLModel/Components/Children
 */

import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * Obalová komponenta pro předávání `item` do všech potomků.
 *
 * Využívá `ChildWrapper` ze shared knihovny, který automaticky clonuje
 * všechny children elementy a předá jim prop `item`. Užitečné, pokud
 * chceme jeden společný `item` injektovat do více komponent bez ručního
 * předávání prop na každé místo.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - Entita EvaluationGQLModel předávaná do potomků.
 * @param {React.ReactNode} props.children - Potomci, kteří dostanou `item` jako prop.
 * @param {...any} props - Další props předané dál na každého potomka.
 * @returns {JSX.Element} ChildWrapper s injektovaným `item`.
 *
 * @example
 * <Children item={evaluationItem}>
 *   <SomeComponent />
 *   <AnotherComponent />
 * </Children>
 * // Oba komponenty dostanou prop: item={evaluationItem}
 */
export const Children = ({item, children, ...props}) => 
    // ChildWrapper prochází children a ke každému přidá item={item} + ...props
    <ChildWrapper item={item} children={children} {...props} />