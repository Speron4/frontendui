import { GeneratedContentBase } from "../../../../_template/src/Base/Pages/Page"
import { PageItemBase } from "./PageBase"

/**
 * @file PageReadItem.jsx
 * @description Komponenta reprezentující stránku hodnocení v režimu pouze pro čtení (Readonly).
 * Zobrazuje detail vybrané entity EvaluationGQLModel a její vazby na ostatní entity.
 * Splňuje požadavky na funkcionální komponentu a strukturu projektu.
 */

/**
 * PageReadItem - Stránka pro zobrazení detailu hodnocení (Readonly mód).
 *
 * Tato komponenta slouží jako kontejner pro zobrazení detailních informací o entitě
 * EvaluationGQLModel bez možnosti provádění mutací, což odpovídá zadání readonly zobrazení.
 * Nadřazená komponenta PageItemBase zajišťuje napojení na příslušný ReadAsyncAction dotaz.
 *
 * @component
 * @param {Object} props - Vlastnosti předávané komponentě.
 * @param {React.Component} [props.SubPage=GeneratedContentBase] - Komponenta použitá pro vykreslení obsahu stránky.
 * @returns {React.ReactElement} Vykreslená readonly stránka s detailem entity.
 *
 * @example
 * return (
 * <PageReadItem />
 * )
 */
export const PageReadItem = ({ 
    SubPage = GeneratedContentBase,
    ...props
}) => {
    return (
        <PageItemBase SubPage={SubPage} {...props} />
    )
}