/**
 * @file ConfirmEdit.jsx
 * @description Komponenta pro editaci hodnocení s explicitním potvrzením změn.
 *
 * Na rozdíl od LiveEdit (který ukládá ihned po změně pole), ConfirmEdit
 * čeká na kliknutí na tlačítko "Uložit změny". Uživatel může změny
 * také zrušit tlačítkem "Zrušit změny".
 *
 * @module EvaluationGQLModel/Components/ConfirmEdit
 */

import { UpdateAsyncAction } from "../Queries";
import { MediumEditableContent } from "./MediumEditableContent";
import { useEditAction } from "../../../../dynamic/src/Hooks/useEditAction";
import { useCallback } from "react";
import { useGQLEntityContext } from "../../../../_template/src/Base/Helpers/GQLEntityProvider";

/**
 * Editační formulář hodnocení s potvrzením (Confirm mode).
 *
 * Interně používá `useEditAction` v módu "confirm" — změny se ukládají
 * až po kliknutí na "Uložit změny", ne ihned. Tlačítka jsou deaktivována
 * dokud uživatel něco nezměnil (`dirty`) nebo probíhá ukládání (`loading`).
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - Entita EvaluationGQLModel k editaci.
 * @param {React.ReactNode} [props.children] - Volitelný obsah vložený nad tlačítka.
 * @returns {JSX.Element} Editační formulář s tlačítky Zrušit/Uložit.
 *
 * @example
 * <ConfirmEdit item={evaluationItem} />
 */
export const ConfirmEdit = ({ item, children }) => {
    // Přístup do GQL kontextu — potřebujeme contextOnChange pro refresh po uložení
    const { run, error, loading, entity, data, onChange: contextOnChange, onBlur: contextOnBlur } = useGQLEntityContext()
    
    // localOnMutationEvent — wrapper který před spuštěním mutace nejdřív
    // aktualizuje kontext (notifyHandler) a pak spustí samotnou mutaci (mutationHandler)
    const localOnMutationEvent = useCallback((mutationHandler, notifyHandler) => async (e) => {
        // Sestavení nového itemu se změněným polem (id a value z eventu)
        const newItem = { ...item, [e.target.id]: e.target.value }
        const newEvent = { target: { value: newItem } }
        
        // Nejdřív notifikuj kontext (ostatní komponenty se dozví o změně)
        await notifyHandler(newEvent)
        // Pak spusť skutečnou mutaci (GraphQL update)
        return await mutationHandler(e)
    })

    // useEditAction v "confirm" módu — vrátí funkce pro řízení editace
    const {
        draft,      // aktuální stav editovaného objektu (kopie itemu s neuloženými změnami)
        dirty,      // boolean — true pokud uživatel něco změnil oproti originálu
        onChange,   // handler pro onChange event na Input polích
        onBlur,     // handler pro onBlur event (ztráta fokusu)
        onCancel,   // vrátí draft zpět na původní hodnoty
        onConfirm,  // spustí GraphQL mutaci a uloží změny
    } = useEditAction(UpdateAsyncAction, item, {mode: "confirm"})

    // handleConfirm — rozšíření onConfirm o update kontextu po úspěšném uložení
    const handleConfirm = useCallback(async () => {
        // Spustí GraphQL mutaci UpdateAsyncAction
        const result = await onConfirm();
        console.log("ConfirmEdit handleConfirm result", result, "draft", draft)
        if (result) {
            // Pokud uložení proběhlo — notifikuj GQL kontext s novými daty
            // Tím se refreshují všechny komponenty napojené na tento provider
            const event = { target: { value: result } };
            await contextOnChange(event);
        }
        return result;
    }, [onConfirm, contextOnChange]);

    return (
        // MediumEditableContent renderuje editovatelná pole (Popis, Body, Pořadí)
        <MediumEditableContent item={item} onChange={onChange} onBlur={onBlur}>
            {children}
            <hr />
            {/* Tlačítko Zrušit — aktivní jen pokud jsou neuložené změny a neprobíhá ukládání */}
            <button 
                className="btn btn-warning form-control" 
                onClick={onCancel}
                disabled={!dirty || loading}
            >
                Zrušit změny
            </button>
            {/* Tlačítko Uložit — volá handleConfirm, deaktivuje se při ukládání */}
            <button 
                className="btn btn-primary form-control" 
                onClick={handleConfirm}
                disabled={!dirty || loading}
            >
                Uložit změny
            </button>
        </MediumEditableContent>
    )
}