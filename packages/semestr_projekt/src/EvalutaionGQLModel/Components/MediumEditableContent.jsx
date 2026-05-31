import { Input } from "../../../../_template/src/Base/FormControls/Input"

/**
 * A component that displays medium-level content for an template entity.
 *
 * This component renders a label "TemplateMediumContent" followed by a serialized representation of the `template` object
 * and any additional child content. It is designed to handle and display information about an template entity object.
 *
 * @component
 * @param {Object} props - The properties for the TemplateMediumContent component.
 * @param {Object} props.template - The object representing the template entity.
 * @param {string|number} props.template.id - The unique identifier for the template entity.
 * @param {string} props.template.name - The name or label of the template entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `template` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const templateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TemplateMediumContent template={templateEntity}>
 *   <p>Additional information about the entity.</p>
 * </TemplateMediumContent>
 */
export const MediumEditableContent = ({ item, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input 
                id="description" 
                label="Popis" 
                className="form-control" 
                value={item?.description || ""} 
                onChange={onChange} 
                onBlur={onBlur} 
            />
            
            <Input 
                id="points" 
                type="number" 
                label="Počet bodů" 
                className="form-control" 
                value={item?.points ?? 0} 
                onChange={(e) => {
                    const val = e.target.value;
                    // Pokud je pole smazané (prázdný string), pošleme 0, jinak pošleme číslo
                    onChange({ target: { id: 'points', value: val === '' ? 0 : Number(val) } });
                }} 
                onBlur={onBlur} 
            />
            
            <Input 
                id="order" 
                type="number" 
                label="Pořadí" 
                className="form-control" 
                value={item?.order ?? 0} 
                onChange={(e) => {
                    const val = e.target.value;
                    // Stejná ochrana i pro pořadí
                    onChange({ target: { id: 'order', value: val === '' ? 0 : Number(val) } });
                }} 
                onBlur={onBlur} 
            />

            {/* POZNÁMKA: Starý switch "Prospěl/a" (id="passed") byl kompletně odstraněn. 
              Výsledek se teď vyhodnocuje plně automaticky na základě známky v levém panelu!
            */}

            {/* Zobrazení ID zkoušky pro kontrolu RBAC (přístupu) */}
            <div className="alert alert-warning mt-3">
                <small>Přiřazeno ke zkoušce (examId): <b>{item?.examId || "CHYBÍ - nepůjde uložit!"}</b></small>
            </div>

            {children}
        </>
    )
}