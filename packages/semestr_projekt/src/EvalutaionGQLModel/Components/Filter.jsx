/**
 * @file Filter.jsx
 * @description Filtrační formulář pro seznam hodnocení (PageVector).
 *
 * Definuje pole, podle kterých lze filtrovat seznam EvaluationGQLModel záznamů.
 * Používá hotové filter komponenty z _template (UUIDFilter, StringFilter, DateTimeFilter).
 *
 * @module EvaluationGQLModel/Components/Filter
 */

import { DateTimeFilter, Filter as BaseFilter, StringFilter, UUIDFilter } from "../../../../_template/src/Base/FormControls/Filter"

/**
 * Filtrační panel pro seznam hodnocení.
 *
 * Zobrazí se po kliknutí na "Zobrazit filtr" v PageVector. Každé pole filtru
 * odpovídá jednomu atributu EvaluationGQLModel a generuje příslušný
 * `where` parametr pro GraphQL dotaz (ReadPageAsyncAction).
 *
 * @component
 * @param {Object} props
 * @param {string} [props.id] - Identifikátor formuláře (pro BaseFilter).
 * @param {Function} props.onChange - Callback volaný při změně filtru;
 *   dostane aktualizovaný where objekt pro GraphQL query.
 * @param {React.ReactNode} [props.children] - Volitelné extra filtry.
 * @returns {JSX.Element} Formulář s filtračními poli.
 *
 * @example
 * <Filter id="main-filter" onChange={(where) => setWhere(where)} />
 */
export const Filter = ({ id, onChange: handleChange, children }) => {
    return (
        // BaseFilter je generický obal z _template — stará se o sestavení where objektu
        <BaseFilter id={id} onChange={handleChange}>

            {/* Filtr podle UUID — hledá přesnou shodu s id záznamu */}
            <UUIDFilter id="id" />

            {/* Filtr podle názvu — StringFilter generuje _ilike (case-insensitive LIKE) */}
            <StringFilter id="name" />

            {/* Filtr podle data vytvoření — vrací lokální čas (emitUtcIso=false) */}
            <DateTimeFilter id="created" emitUtcIso={false} />

            {/* <FloatFilter id="count" /> — zakomentováno, pro případ budoucího použití */}

            {/* Slot pro volitelné extra filtry předané zvenku */}
            {children}
        </BaseFilter>
    )
}