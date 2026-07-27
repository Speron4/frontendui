/**
 * @file MediumEditableContent.jsx
 * @description Editovatelná verze detailu hodnocení — formulářová pole pro writable stránku.
 *
 * Zatímco MediumContent zobrazuje data readonly (jen čtení), MediumEditableContent
 * zobrazuje stejná data jako editovatelné Input komponenty. Používá se v LiveEdit
 * a ConfirmEdit komponentách.
 *
 * @module EvaluationGQLModel/Components/MediumEditableContent
 */

import { Input } from "../../../../_template/src/Base/FormControls/Input"

/**
 * Formulář pro editaci hodnocení (Popis, Počet bodů, Pořadí).
 *
 * Renderuje tři Input pole napojená na `onChange` a `onBlur` handlery
 * z nadřazené LiveEdit/ConfirmEdit komponenty. Speciální logika u číselných
 * polí zajišťuje, že prázdný string se pošle jako 0 (ne jako NaN).
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - Entita EvaluationGQLModel s aktuálními hodnotami.
 * @param {Function} [props.onChange=(e)=>null] - Handler pro onChange — volá se při každém stisku klávesy.
 * @param {Function} [props.onBlur=(e)=>null] - Handler pro onBlur — volá se při opuštění pole.
 *   V LiveEdit módu spouští GraphQL mutaci, v ConfirmEdit jen aktualizuje draft.
 * @param {React.ReactNode} [props.children] - Volitelný obsah vložený pod poli (typicky tlačítka).
 * @returns {JSX.Element} Fragment s editačními poli a children.
 *
 * @example
 * <MediumEditableContent item={item} onChange={onChange} onBlur={onBlur}>
 *   <button onClick={onConfirm}>Uložit</button>
 * </MediumEditableContent>
 */
export const MediumEditableContent = ({ item, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>
            {/* Textové pole pro popis hodnocení */}
            <Input 
                id="description"       // id musí odpovídat názvu atributu v EvaluationGQLModel
                label="Popis" 
                className="form-control" 
                value={item?.description || ""} // fallback na prázdný string pokud null
                onChange={onChange}    // každý stisk klávesy aktualizuje draft
                onBlur={onBlur}        // opuštění pole → trigger update (v live módu)
            />
            
            {/* Číselné pole pro počet bodů */}
            <Input 
                id="points" 
                type="number" 
                label="Počet bodů" 
                className="form-control" 
                value={item?.points ?? 0} // ?? 0 = pokud null nebo undefined, použij 0
                onChange={(e) => {
                    const val = e.target.value;
                    // Ochrana: pokud uživatel smaže celé pole (prázdný string),
                    // nepošleme NaN ale 0. Jinak konvertujeme na číslo.
                    onChange({ target: { id: 'points', value: val === '' ? 0 : Number(val) } });
                }} 
                onBlur={onBlur} 
            />
            
            {/* Číselné pole pro pořadí (číslo pokusu) */}
            <Input 
                id="order" 
                type="number" 
                label="Pořadí" 
                className="form-control" 
                value={item?.order ?? 0} 
                onChange={(e) => {
                    const val = e.target.value;
                    // Stejná ochrana jako u points — prázdný string → 0
                    onChange({ target: { id: 'order', value: val === '' ? 0 : Number(val) } });
                }} 
                onBlur={onBlur} 
            />

            {/* POZNÁMKA: Starý switch "Prospěl/a" (id="passed") byl odstraněn.
              Výsledek se nyní vyhodnocuje automaticky na základě známky (classificationlevel)
              v levém panelu — uživatel ho nemůže nastavit ručně. */}

            {/* Informační box zobrazující examId — kontrola pro RBAC (přístupová práva).
              Backend kontroluje examId při autorizaci mutace, takže musí být vyplněno. */}
            <div className="alert alert-warning mt-3">
                <small>Přiřazeno ke zkoušce (examId): <b>{item?.examId || "CHYBÍ - nepůjde uložit!"}</b></small>
            </div>

            {/* Slot pro children — typicky tlačítka Uložit/Zrušit z ConfirmEdit */}
            {children}
        </>
    )
}