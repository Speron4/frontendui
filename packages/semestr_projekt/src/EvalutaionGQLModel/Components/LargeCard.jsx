/**
 * @file LargeCard.jsx
 * @description Hlavní layout komponenta pro detail stránku hodnocení.
 *
 * LargeCard skládá celou detailní stránku ze dvou sloupců:
 * - **Levý sloupec (LeftColumn):** karta "Detail" s MediumContent + sekce Nástroje (InteractiveMutations)
 * - **Pravý sloupec (MiddleColumn):** children předané ze stránky (SubPage — GeneratedContentBase, TREE atd.)
 *
 * @module EvaluationGQLModel/Components/LargeCard
 */

// Zakomentované importy ze scaffold šablony — zachovány pro případ budoucího použití
// import Row from "react-bootstrap/Row"
import { MediumCard } from "./MediumCard"
import { CardCapsule as CardCapsule_} from "./CardCapsule"
import { Row } from "../../../../_template/src/Base/Components/Row"
// import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { MediumContent as MediumContent_ } from "./MediumContent"
import { InteractiveMutations } from '../Mutations/InteractiveMutations'
import { LeftColumn, MiddleColumn } from "../../../../_template/src/Base/Components/Col"

/**
 * Layout karta pro detail stránku hodnocení.
 *
 * Obaluje celou detailní stránku do dvou sloupců. Levý sloupec vždy
 * obsahuje MediumContent (detail hodnocení) + InteractiveMutations (tlačítka).
 * Pravý sloupec (MiddleColumn) obsahuje `children` — typicky GeneratedContentBase
 * z PageReadItem (TREE + skalární atributy). V naší implementaci je MiddleColumn
 * záměrně prázdný (children = null) — obsah je celý v levém sloupci.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - Entita EvaluationGQLModel s rozbalenými relacemi.
 * @param {React.ReactNode} [props.children] - Obsah pravého sloupce (SubPage ze stránky).
 * @param {React.ComponentType} [props.CardCapsule=CardCapsule_] - Přepis obalové karty.
 * @param {React.ComponentType} [props.MediumContent=MediumContent_] - Přepis detail komponenty.
 * @returns {JSX.Element} Dvousloupcový layout s detailem a nástroji.
 *
 * @example
 * // Použití v PageItemBase z _template:
 * <LargeCard item={item}>
 *   {null}
 * </LargeCard>
 */
export const LargeCard = ({ item, children, CardCapsule=CardCapsule_, MediumContent=MediumContent_ }) => {
    // console.log("LargeCard.item", item) — zakomentovaný debug log
    return (
        // Vnější karta — zobrazí nadpis s odkazem na hodnocení (CardCapsule)
        <CardCapsule item={item}>
            {/* Row = Bootstrap flexbox řádek pro dvousloupcový layout */}
            <Row>
                {/* Levý sloupec — vždy viditelný */}
                <LeftColumn>
                    {/* Vnořená karta s nadpisem "Detail" — obsahuje MediumContent */}
                    <CardCapsule item={item} title="Detail">
                        {/* MediumContent zobrazí všechny atributy hodnocení */}
                        <MediumContent item={item} />
                    </CardCapsule>
                    {/* InteractiveMutations — sekce "Nástroje" s tlačítky Upravit, Smazat atd. */}
                    <InteractiveMutations item={item} />
                </LeftColumn>
                {/* Pravý sloupec — children z nadřazené stránky (GeneratedContentBase / null) */}
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </CardCapsule>
    )
}