/**
 * @file PageDeleteItem.jsx
 * @description Stránka sloužící pro odstranění vybraného záznamu (mazací workflow).
 *
 * @module EvaluationGQLModel/Pages/PageDeleteItem
 */

import { PageItemBase } from "./PageBase";
import { DeleteBody } from "../Mutations/Delete";

/**
 * Hlavní komponenta mazací stránky.
 * Zapouzdřuje logiku a layout pro smazání konkrétní entity.
 *
 * @component
 * @param {Object} props
 * @param {React.ComponentType} [props.SubPage=DeleteBody] - Komponenta těla provádějící samotné mazání.
 * @returns {JSX.Element} Vygenerovaná stránka smazání.
 */
export const PageDeleteItem = ({ 
    SubPage=DeleteBody,
    ...props
}) => {
    return (
        // Obalí formulářové/mazací tělo do hlavního kontextu stránky
        <PageItemBase
            SubPage={SubPage}
            {...props}
        />
         
    )
}
