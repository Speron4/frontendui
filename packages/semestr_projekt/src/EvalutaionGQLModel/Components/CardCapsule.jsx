import { PersonFill } from "react-bootstrap-icons"
import { Link } from "./Link"
import { CardCapsule as CardCapsule_ } from "../../../../_template/src/Base/Components"

/**
 * @file CardCapsule.jsx
 * @description Obalová karta pro EvaluationGQLModel s ikonou a linkem v nadpisu.
 *
 * Rozšiřuje generickou CardCapsule z _template o výchozí nadpis
 * složený z ikony PersonFill a klikacího linku na detail hodnocení.
 *
 * @module EvaluationGQLModel/Components/CardCapsule
 */

/**
 * Obalová karta hodnocení s dynamickým nadpisem.
 *
 * Pokud není předán vlastní `title`, automaticky sestaví nadpis
 * jako kombinaci ikony PersonFill a Link komponenty odkazující
 * na detail hodnocení (podle item.id).
 * Používá se jako základ pro MediumCard a LargeCard.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - Entita EvaluationGQLModel (musí obsahovat `id`).
 * @param {React.ReactNode} [props.children=null] - Obsah uvnitř těla karty.
 * @param {React.ReactNode} [props.title=null] - Vlastní nadpis; pokud není zadán,
 *   použije se ikona PersonFill + Link na detail hodnocení.
 * @returns {JSX.Element} Bootstrap karta s nadpisem a obsahem.
 *
 * @example
 * // S vlastním nadpisem:
 * <CardCapsule item={item} title="Detail">
 *   <p>Obsah karty</p>
 * </CardCapsule>
 *
 * @example
 * // Bez nadpisu — automaticky ikona + link:
 * <CardCapsule item={item}>
 *   <p>Obsah karty</p>
 * </CardCapsule>
 */
export const CardCapsule = ({ item, children, title=null}) => {
    
    // Pokud title nebyl předán (null), sestavíme výchozí nadpis:
    // ikona osoby (PersonFill) + mezera + klikací link na detail hodnocení
    if (!title) {
        title = <><PersonFill /> <Link item={item} /></>
    }
    return (
        // CardCapsule_ je generická karta z _template — stará se o Bootstrap styling
        <CardCapsule_ title={title}>
            {/* Obsah karty — children z nadřazené komponenty */}
            {children}
        </CardCapsule_>
    )
}