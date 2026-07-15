import { GeneratedContentBase } from "../../../../_template/src/Base/Pages/Page"
import { Table } from "../Components/Table";
import { PageItemBase } from "./PageBase"

/**
 * @file PageReadItem.jsx
 * @description Komponenta reprezentující stránku hodnocení v režimu pouze pro čtení (Readonly).
 * Zobrazuje detail vybrané entity EvaluationGQLModel (přes GeneratedContentBase / MediumContent)
 * a navíc seznam jejích dílčích hodnocení (`parts`), pokud existují.
 */

/**
 * Seznam dílčích hodnocení (item.parts) - využívá stejnou Table komponentu
 * jako hlavní seznam, protože parts je taky pole EvaluationGQLModel.
 */
const PartsEvaluations = ({ evaluations = [] }) => {
    if (evaluations.length === 0) return null
    return (
        <div className="mt-4">
            <h2>Dílčí hodnocení</h2>
            <Table data={evaluations} />
        </div>
    )
}

/**
 * Plný obsah readonly stránky: standardní generovaný obsah (MediumContent přes
 * GeneratedContentBase) + pod ním tabulka dílčích hodnocení (item.parts), pokud existují.
 *
 * POZOR: nevím jistě, jaké přesně props čeká GeneratedContentBase (předpokládám
 * `item`, stejně jako Demo komponenta od profesora) - pokud to nesedí 1:1, stačí
 * upravit prop název podle toho, jak je GeneratedContentBase definovaná.
 */
const FullContent = ({ item, ...props }) => {
    return (
        <div>
            <GeneratedContentBase item={item} {...props} />
            <PartsEvaluations evaluations={item?.parts || []} />
        </div>
    )
}

/**
 * PageReadItem - Stránka pro zobrazení detailu hodnocení (Readonly mód).
 *
 * @component
 * @param {Object} props
 * @param {React.Component} [props.SubPage=FullContent] - Komponenta použitá pro vykreslení obsahu stránky.
 * @returns {React.ReactElement} Vykreslená readonly stránka s detailem entity.
 */
export const PageReadItem = ({
    SubPage = FullContent,
    ...props
}) => {
    return (
        <PageItemBase SubPage={SubPage} {...props} />
    )
}