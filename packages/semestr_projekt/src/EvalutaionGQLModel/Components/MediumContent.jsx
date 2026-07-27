import { Col } from "../../../../_template/src/Base/Components/Col"
import { Row } from "../../../../_template/src/Base/Components/Row"
import { Link } from "../../../../_template/src/Base/Components/Link"
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink"
import { URIRoot } from "../../uriroot"
import { MediumContent as MediumContent_ } from "../../../../_template/src/Base/Components/MediumContent"
import { Attribute } from "../../../../_template/src/Base/Components"

/**
 * Sestaví URL na stránku "seznam hodnocených u zkoušky".
 *
 * @param {string|number} examId - ID zkoušky (EvaluationGQLModel.exam.id).
 * @returns {string} Absolutní/relativní URL cesta na stránku s hodnocenými u dané zkoušky.
 */
const examEvaluationsURL = (examId) =>
    `${URIRoot}/EvaluationGQLModel/byExam/${examId}`

/**
 * @file MediumContent.jsx
 * @description Komponenta pro detailní zobrazení hodnocení studenta v levém panelu.
 * Uspořádání: ID -> Student -> Zkouška -> Semestr -> Atributy hodnocení.
 *
 * @param {Object} props
 * @param {Object} props.item - Objekt EvaluationGQLModel s navázanými relacemi.
 * @param {React.ReactNode} [props.children] - Volitelný další obsah pod atributy.
 */
export const MediumContent = ({ item, children }) => {
    // Role aktuálně přihlášeného uživatele vůči tomuto RBAC objektu (např. učitel, student)
    const roles = item?.rbacobject?.currentUserRoles || []

    // Textová reprezentace známky - preferuje explicitní "grade", fallback na "name" klasifikačního stupně
    const gradeText = item?.classificationlevel?.grade || item?.classificationlevel?.name

    // Celé jméno studenta z navázaného uživatelského účtu
    const studentName = item?.student?.user?.fullname

    // Název předmětu, ke kterému se zkouška/hodnocení vztahuje
    const examSubjectText = item?.semester?.subject?.name

    // Popisek semestru ve formátu "Semestr č. X", pokud je pořadí semestru známé
    const semesterLabel = item?.semester?.order
        ? `Semestr č. ${item.semester.order}`
        : null

    // Datum konání zkoušky/termínu, formátované do českého formátu (den.měsíc.rok)
    const eventDate = item?.event?.startdate
        ? new Date(item.event.startdate).toLocaleDateString("cs-CZ")
        : null

    return (
        <div>
            <h5>Hodnocení studenta</h5>
            {/* Identifikátor záznamu hodnocení, jen informativně pro debugging/podporu */}
            <small className="text-muted d-block mb-3">ID: {item?.id}</small>

            {/* Student - klikací link na cizí appku se Studentem */}
            <Attribute label="Student">
                {item?.student ? (
                    // Pokud je student navázán, zobrazí se jako proklik na jeho detail (cross-entity Link)
                    <Link item={item.student}>{studentName || "Zobrazit studenta"}</Link>
                ) : (
                    // Fallback, pokud student z nějakého důvodu chybí/nenačetl se
                    <span className="text-muted">Neznámé jméno studenta</span>
                )}
            </Attribute>


            {/* Předmět - link na SubjectGQLModel */}
            <Attribute label="Předmět">
                {item?.semester?.subject ? (
                    <Link item={item.semester.subject}>
                        {examSubjectText || "Zobrazit předmět"}
                    </Link>
                ) : (
                    // Předmět nemusí být vždy dostupný (např. chybějící vazba semestr -> předmět)
                    <span className="text-muted small">Nepřiřazeno</span>
                )}
            </Attribute>

            {/* Semestr */}
            <Attribute label="Semestr">
                {item?.semester ? (
                    <Link item={item.semester}>
                        {semesterLabel || "Zobrazit semestr"}
                    </Link>
                ) : (
                    // Semestr nenalezen - vypíše se aspoň jeho ID pro snazší diagnostiku
                    <span className="font-monospace small text-muted">
                        Semestr nenalezen (ID: {item?.semesterId || "?"})
                    </span>
                )}
            </Attribute>

            {/* Event - kdy to proběhlo */}
            <Attribute label="Datum vykonání">
                {item?.event ? (
                    <Link item={item.event}>{eventDate || "Zobrazit termín"}</Link>
                ) : (
                    <span className="text-muted small">Termín nenalezen</span>
                )}
            </Attribute>

            <hr />

            {/* Volný textový popis hodnocení (např. poznámka zkoušejícího) */}
            <Attribute label="Popis">{item?.description || "Bez popisu"}</Attribute>

            {/* Pořadí pokusu studenta u dané zkoušky, výchozí hodnota 1 (první pokus) */}
            <Attribute label="Pořadí">{item?.order ?? 1}</Attribute>

            {/* Počet bodů dosažených studentem, zobrazeno jako zvýrazněný badge */}
            <Attribute label="Body">
                <span className="badge bg-primary">{item?.points ?? 0} b.</span>
            </Attribute>

            {/* Výsledný verdikt - "F" (fail) znamená neprospěl, cokoliv jiného se bere jako prospěl */}
            <Attribute label="Výsledek">
                {gradeText === "F" ? (
                    <span className="text-danger fw-bold">Neprospěl</span>
                ) : (
                    <span className="text-success fw-bold">Prospěl</span>
                )}
            </Attribute>

            {/* Konkrétní klasifikační stupeň (známka), fallback na ID klasifikačního stupně */}
            <Attribute label="Známka (Grade)">
                {gradeText ? (
                    <span className="badge bg-warning text-dark">{gradeText}</span>
                ) : (
                    <span className="font-monospace small text-muted">
                        {item?.classificationlevelId || "Nepřiřazeno"}
                    </span>
                )}
            </Attribute>

            {/* Role aktuálního uživatele vůči tomuto záznamu - může jich být víc (badge pro každou roli) */}
            <Attribute label="Moje role">
                {roles.length > 0 ? (
                    roles.map((role) => (
                        <span key={role.id} className="badge bg-info text-dark me-1">
                            {role.roletype?.name}
                        </span>
                    ))
                ) : (
                    <span className="text-muted small">
                        Role nejsou načteny
                    </span>
                )}
            </Attribute>

            <hr />
            {/* Prostor pro dodatečný obsah vkládaný rodičovskou komponentou (např. akční tlačítka) */}
            {children}
        </div>
    )
}