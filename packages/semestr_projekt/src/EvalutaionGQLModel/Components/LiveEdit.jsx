/**
 * @file LiveEdit.jsx
 * @description Komponenta pro live editaci hodnocení — změny se ukládají ihned po blur eventu.
 *
 * Na rozdíl od ConfirmEdit (kde uživatel musí kliknout na "Uložit"),
 * LiveEdit ukládá změny automaticky jakmile uživatel opustí editované pole (onBlur).
 * Používá `useEditAction` v módu "live".
 *
 * @module EvaluationGQLModel/Components/LiveEdit
 */

import { useCallback } from "react";
import { useMemo } from "react";

import { UpdateAsyncAction } from "../Queries";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { MediumEditableContent } from "./MediumEditableContent";
import { useEditAction } from "../../../../dynamic/src/Hooks/useEditAction";

/**
 * Starší/experimentální verze live editoru využívající GQL kontext a AsyncActionProvider.
 * Aktuálně se nepoužívá (hlavní je `LiveEdit` níže), zachována pro referenci.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Volitelný extra obsah.
 * @param {Function} [props.asyncAction=UpdateAsyncAction] - Async action pro update.
 * @returns {JSX.Element}
 */
export const LiveEdit_ = ({ children, asyncAction=UpdateAsyncAction}) => {
    // Přístup do GQL entity kontextu (poskytuje item, onChange, onBlur)
    const { onChange, onBlur, item } = useGQLEntityContext()
    return (
        // AsyncActionProvider zajistí načítání dat a spouštění mutací v kontextu
        <AsyncActionProvider 
            item={item} 
            queryAsyncAction={asyncAction}
            options={{deferred: true, network: true}} // deferred = čeká na blur, network = posílá na server
            onChange={onChange}
            onBlur={onBlur}
        >
            <LiveEditWrapper item={item}>
                {children}
            </LiveEditWrapper>
        </AsyncActionProvider>
    )
}

/**
 * Interní wrapper pro LiveEdit_ — stará se o event handling a binding handlerů.
 *
 * handleEvent vytvoří wrapper funkci, která před zavoláním handleru zkontroluje:
 * - zda event má id a value
 * - zda se hodnota skutečně změnila (přeskočí pokud je stejná)
 * Pak sestaví nový item a zavolá handler.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - Aktuální entita.
 * @param {React.ReactNode} [props.children] - Extra obsah.
 * @returns {JSX.Element}
 */
const LiveEditWrapper = ({ item, children }) => {
    const { run, error, loading, entity, data, onChange, onBlur } = useGQLEntityContext()
    
    // handleEvent — generická factory pro event handlery
    // Vrátí async funkci která: validuje event → sestaví nový item → zavolá handler
    const handleEvent = useCallback((handler) => async (e) => {
        const {id, value} = e?.target || {}
        // Přeskočíme event pokud nemá id nebo value (špatný formát eventu)
        if (id === undefined || value === undefined) return 
        // Přeskočíme pokud se hodnota nezměnila — zbytečný update
        if (item?.[id] === value) {
            return;
        }
        // Sestavíme nový item se změněným polem
        const newItem = { ...item, [e.target.id]: e.target.value }
        const newEvent = { target: { value: newItem } }
        const result = await handler(newEvent)
        return result
    }, [item])

    // useMemo — bindujeme handlery jen při změně onChange/onBlur nebo handleEvent
    // Tím se předejde zbytečnému re-renderování
    const bindedOnChange = useMemo(() => handleEvent(onChange), [onChange, handleEvent])
    const bindedOnBlur = useMemo(() => handleEvent(onBlur), [onBlur, handleEvent])

    return (
        <MediumEditableContent item={item} onChange={bindedOnChange} onBlur={bindedOnBlur}>
            {children}
        </MediumEditableContent>
    )
}

/**
 * Hlavní live editační komponenta pro hodnocení.
 *
 * Používá `useEditAction` v "live" módu — změny se posílají na server
 * automaticky po opuštění pole (onBlur), bez nutnosti klikat na tlačítko.
 * Při ukládání zobrazí `LoadingSpinner`.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - Entita EvaluationGQLModel k editaci.
 * @param {React.ReactNode} [props.children] - Volitelný extra obsah pod poli.
 * @param {Function} [props.asyncMutationAction=UpdateAsyncAction] - Přepis GraphQL mutace.
 * @returns {JSX.Element} Live editační formulář s MediumEditableContent.
 *
 * @example
 * <LiveEdit item={evaluationItem} />
 */
export const LiveEdit = ({ item, children, asyncMutationAction=UpdateAsyncAction }) => {
    // useEditAction v "live" módu — vrátí onChange/onBlur které rovnou spustí mutaci
    const {
        draft,      // aktuální stav editovaného itemu
        dirty,      // true pokud jsou neuložené změny
        loading: saving, // přejmenováno na saving — true pokud právě probíhá GraphQL update
        onChange,   // handler pro Input onChange — aktualizuje draft
        onBlur,     // handler pro Input onBlur — spustí GraphQL mutaci
        onCancel,   // (v live módu méně využívaný) — reset na původní hodnoty
        onConfirm,  // (v live módu méně využívaný) — explicitní potvrzení
    } = useEditAction(asyncMutationAction, item, {
        mode: "live", // live = uložit při onBlur, bez potvrzovacího tlačítka
    })

    return (
        // MediumEditableContent zobrazí editovatelná pole (Popis, Body, Pořadí)
        <MediumEditableContent item={item} onChange={onChange} onBlur={onBlur}>
            {/* Spinner se zobrazí když probíhá GraphQL mutace (ukládání) */}
            {saving && <LoadingSpinner/>}
            {children}
        </MediumEditableContent>
    )
}