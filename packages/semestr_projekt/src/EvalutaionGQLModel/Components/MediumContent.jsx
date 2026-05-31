import { Col } from "../../../../_template/src/Base/Components/Col"
import { Row } from "../../../../_template/src/Base/Components/Row"
import { Link } from "./Link"
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
// export const MediumContent = ({ item, children}) => {
//     return (
//         <MediumContent_ item={item}>
//             {children}
//         </MediumContent_>
//     )
// }

// export const MediumContent_ = ({ item, children }) => {
//     return (
//         <>
//             {Object.entries(item).map(([attribute_name, attribute_value]) => {
//                 // if (attribute_name !== "id") return null
//                 if (Array.isArray(attribute_value)) return null
//                 if (typeof attribute_value === "object" && attribute_value !== null) return null
//                 let attribute_value_result = attribute_value
//                 // let attribute_value_result = attribute_value
//                 if (Array.isArray(attribute_value))
//                     // attribute_value_result = <CardCapsule><Table data={attribute_value} /></CardCapsule>
//                     return null
//                 else if (typeof attribute_value === "object" && attribute_value !== null)
//                     // attribute_value_result = <MediumCard item={attribute_value} />
//                     return null
//                 else if (attribute_name === "__typename") {
//                     /*attribute_value_result = <Link item={attribute_value} />*/
//                     // console.log("else1", attribute_name, attribute_value)
//                 }
//                 if (attribute_name === "id")
//                     attribute_value_result = <Link item={item}>{item?.id || "Data error"}</Link>
//                 if (attribute_name === "name")
//                     attribute_value_result = <Link item={item} />
//                 // else return null
//                 if (attribute_value)
//                     return (
//                         <Row key={attribute_name}>
//                             <Col className="col-4"><b>{attribute_name}</b></Col>
//                             <Col className="col-8">{attribute_value_result}</Col>
//                         </Row>
//                     )
//                 else return null
//             })}
//             {Object.entries(item).map(([attribute_name, attribute_value]) => {
//                 if (attribute_value !== null) return null
//                 let attribute_value_result = JSON.stringify(attribute_value)
//                 if (Array.isArray(attribute_value))
//                     // attribute_value_result = <CardCapsule><Table data={attribute_value} /></CardCapsule>
//                     return null
//                 else if (typeof attribute_value === "object" && attribute_value !== null)
//                     // attribute_value_result = <MediumCard item={attribute_value} />
//                     return null
//                 else if (attribute_name === "__typename") {
//                     /*attribute_value_result = <Link item={attribute_value} />*/
//                     console.log("else2", attribute_name, attribute_value)
//                 }
//                 if (attribute_value)
//                     return null
//                 else
//                     return (
//                         <Row key={attribute_name}>
//                             <Col className="col-4"><b>{attribute_name}</b></Col>
//                             <Col className="col-8">{attribute_value_result}</Col>
//                         </Row>
//                     )
//             })}
//             {children}
//         </>
//     )
// }

import { MediumContent as MediumContent_ } from "../../../../_template/src/Base/Components/MediumContent"
import { Attribute } from "../../../../_template/src/Base/Components"

export const MediumContent = ({ item, children }) => {
    // Vytáhneme role z RBAC objektu, na obrázku je vidět currentUserRoles
    const roles = item?.rbacobject?.currentUserRoles || [];

    // Získání textové podoby známky z načtené relace classificationlevel
    const gradeText = item?.classificationlevel?.grade || item?.classificationlevel?.name;

    return (
        <div className="custom-detail-panel">
            {/* Vložený styl, který donutí komponentu <Attribute> držet na jednom řádku */}
            <style>{`
                .custom-detail-panel .row, 
                .custom-detail-panel [class*="Attribute"] {
                    display: flex !important;
                    flex-direction: row !important;
                    justify-content: space-between !important;
                    align-items: flex-start !important;
                    margin-bottom: 0.75rem;
                }
                .custom-detail-panel label,
                .custom-detail-panel strong {
                    min-width: 130px;
                    font-weight: bold;
                    color: #495057;
                    margin-bottom: 0 !important;
                }
                .custom-detail-panel .id-field {
                    word-break: break-all !important;
                    white-space: normal !important;
                    text-align: left;
                    display: inline-block;
                    max-width: 100%;
                }
                .custom-detail-panel .grade-badge {
                    font-size: 1.1rem;
                    font-weight: bold;
                    padding: 0.25rem 0.75rem;
                    border-radius: 6px;
                }
            `}</style>

            <h5>Hodnocení studenta</h5>
            <small className="text-muted d-block mb-3 id-field">ID: {item?.id}</small>

            <Attribute label="Popis">{item?.description || "Bez popisu"}</Attribute>
            <Attribute label="Pořadí">{item?.order ?? 1}</Attribute>
            
            <Attribute label="Body">
                <span className="badge bg-primary px-2 py-1">{item?.points ?? 0} b.</span>
            </Attribute>
            
            <Attribute label="Výsledek">
    {/* Pokud je známka F, je to Neprospěl. Pokud je tam cokoliv jiného (A až E), je to Prospěl. */}
    {item?.classificationlevel?.name === "F" || item?.classificationlevel?.grade === "F" ? (
        <span style={{ color: "red", fontWeight: "bold" }}>Neprospěl</span>
    ) : (
        <span style={{ color: "green", fontWeight: "bold" }}>Prospěl</span>
    )}
</Attribute>

            {/* Zobrazení reálné známky (Grade) namísto ošklivého UUID */}
            <Attribute label="Grade">
                {gradeText ? (
                    <span className="badge bg-warning text-dark grade-badge">
                        {gradeText}
                    </span>
                ) : (
                    <span className="text-muted small">ID: {item?.classificationlevelId || "Nepřiřazeno"}</span>
                )}
            </Attribute>

            {/* Vztah na zkoušku (Exam) – ID zalamujeme na řádku */}
            <Attribute label="Zkouška (Exam)">
                <span className="font-monospace small id-field">{item?.examId || "Nepřiřazeno"}</span>
            </Attribute>
            
            <Attribute label="Moje role:">
                <div style={{ textAlign: 'left' }}>
                    {roles.length > 0 ? (
                        roles.map((role) => (
                            <span key={role.id} className="badge bg-info text-dark me-1 mb-1 d-inline-block p-1">
                                {role.roletype?.name}
                            </span>
                        ))
                    ) : (
                        <span className="text-muted small">currentUserRoles je prázdné</span>
                    )}
                </div>
            </Attribute>
            
            <hr />
            {children}
        </div>
    )   
}