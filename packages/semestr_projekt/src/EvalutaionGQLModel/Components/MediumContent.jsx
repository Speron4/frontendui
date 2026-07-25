import { Col } from "../../../../_template/src/Base/Components/Col"
import { Row } from "../../../../_template/src/Base/Components/Row"
import { Link } from "../../../../_template/src/Base/Components/Link"
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink"
import { URIRoot } from "../../uriroot"
import { MediumContent as MediumContent_ } from "../../../../_template/src/Base/Components/MediumContent"
import { Attribute } from "../../../../_template/src/Base/Components"

    /** Sestaví URL na stránku "seznam hodnocených u zkoušky" */
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
    const roles = item?.rbacobject?.currentUserRoles || []
    const gradeText = item?.classificationlevel?.grade || item?.classificationlevel?.name
    const studentName = item?.student?.user?.fullname
    const examSubjectText = item?.semester?.subject?.name
    const semesterLabel = item?.semester?.order
        ? `Semestr č. ${item.semester.order}`
        : null
    const eventDate = item?.event?.startdate
        ? new Date(item.event.startdate).toLocaleDateString("cs-CZ")
        : null

    return (
        <div>
            <h5>Hodnocení studenta</h5>
            <small className="text-muted d-block mb-3">ID: {item?.id}</small>

            {/* Student - klikací link na cizí appku se Studentem */}
            <Attribute label="Student">
                {item?.student ? (
                    <Link item={item.student}>{studentName || "Zobrazit studenta"}</Link>
                ) : (
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

            <Attribute label="Popis">{item?.description || "Bez popisu"}</Attribute>
            <Attribute label="Pořadí">{item?.order ?? 1}</Attribute>
            <Attribute label="Body">
                <span className="badge bg-primary">{item?.points ?? 0} b.</span>
            </Attribute>
            <Attribute label="Výsledek">
                {gradeText === "F" ? (
                    <span className="text-danger fw-bold">Neprospěl</span>
                ) : (
                    <span className="text-success fw-bold">Prospěl</span>
                )}
            </Attribute>
            <Attribute label="Známka (Grade)">
                {gradeText ? (
                    <span className="badge bg-warning text-dark">{gradeText}</span>
                ) : (
                    <span className="font-monospace small text-muted">
                        {item?.classificationlevelId || "Nepřiřazeno"}
                    </span>
                )}
            </Attribute>
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
            {children}
        </div>
    )
}