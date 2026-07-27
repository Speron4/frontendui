/**
 * @file MediumCard.jsx
 * @description Kompaktní karta s náhledem hodnocení — používá se jako odkaz v TREE panelu.
 *
 * MediumCard kombinuje CardCapsule (obal s nadpisem) a MediumContent (detail atributů).
 * Nadpis karty obsahuje ikonu osoby a klikací link na detail hodnocení.
 *
 * @module EvaluationGQLModel/Components/MediumCard
 */

import { PersonFill } from "react-bootstrap-icons"
import { CardCapsule } from "./CardCapsule"
import { MediumContent } from "./MediumContent"
import { Link } from "./Link"

/**
 * Kompaktní karta hodnocení s ikonou a linkem.
 *
 * Používá se v TREE panelu v pravém sloupci detailní stránky (GeneratedContentBase)
 * pro zobrazení navázaných entit (classificationlevel, student, semester...).
 * Nadpis tvoří ikona PersonFill + Link na detail hodnocení.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - Entita EvaluationGQLModel (musí obsahovat `id`).
 * @param {React.ReactNode} [props.children] - Volitelný extra obsah pod MediumContent.
 * @returns {JSX.Element} Karta s ikonou, linkem a detailem hodnocení.
 *
 * @example
 * // Typické použití v TREE panelu:
 * <MediumCard item={evaluationItem} />
 */
export const MediumCard = ({ item, children }) => {
    return (
        // CardCapsule s vlastním nadpisem — ikona + link na detail hodnocení
        <CardCapsule title={
            <>
                {/* Ikona osoby z react-bootstrap-icons */}
                <PersonFill />
                {/* Mezera + klikací link na detail hodnocení (id z itemu) */}
                {" "}
                <Link item={item} />
            </>
        }>
            {/* Volitelné children nad MediumContent */}
            {children}
            {/* MediumContent zobrazí všechny atributy hodnocení */}
            <MediumContent item={item}>
            </MediumContent>
        </CardCapsule>
    )
}