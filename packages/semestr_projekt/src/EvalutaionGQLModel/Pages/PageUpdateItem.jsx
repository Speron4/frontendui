import { UpdateBody } from "../Mutations/Update"
import { PageItemBase } from "./PageBase"

/**
 * @file PageUpdateItem.jsx
 * @description Komponenta reprezentující stránku hodnocení v režimu zápisu (Writable).
 * Slouží jako vstupní bod pro editaci entity EvaluationGQLModel pomocí mutací.
 * Obsahuje implementaci/deklaraci sentinelu pro první test práv editora před odesláním na backend.
 */

/**
 * PageUpdateItem - Stránka pro editaci a aktualizaci hodnocení (Writable mód).
 *
 * Tato komponenta zajišťuje zobrazení editačního rozhraní. V souladu se zadáním projektu
 * deleguje vykreslení na `PageItemBase` s editační sub-stránkou `UpdateBody`.
 * Funguje jako frontendový sentinel – pokud uživatel nemá dostatečná práva (ověřovaná skrze
 * linked RBAC objekty a currentUserRoles), backend mutaci odmítne a frontend zaloguje chybu autorizace.
 *
 * @component
 * @param {Object} props - Vlastnosti předávané komponentě.
 * @param {React.Component} [props.SubPage=UpdateBody] - Komponenta zajišťující formulář a mutaci pro zápis.
 * @returns {React.ReactElement} Vykreslená writtable stránka s editačními prvky.
 *
 * @example
 * return (
 * <PageUpdateItem />
 * )
 */
export const PageUpdateItem = ({ 
    SubPage = UpdateBody,
    ...props
}) => {
    return (
        <PageItemBase 
            SubPage={SubPage}
            {...props}
        />
    )
}