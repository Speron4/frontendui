import { useState } from "react"
import { Link } from "./Link"
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink"
import { URIRoot } from "../../uriroot"

/**
 * @file Table.jsx
 * @description Tříúrovňový hierarchický seznam hodnocení (EvaluationGQLModel).
 * Seskupeno podle examId (Zkouška → Student → Pokusy).
 *
 * @param {Object} props
 * @param {Array<Object>} props.data - Seznam hodnocení s rozbalenými relacemi.
 */

/** Sestaví URL na stránku "seznam hodnocených u zkoušky". */
const examURL = (examId) => `${URIRoot}/EvaluationGQLModel/byExam/${examId}`

/**
 * Tabulka pokusů jednoho studenta – stejné sloupce jako původní plochá tabulka.
 */
const AttemptsTable = ({ evaluations }) => (
    <table className="table table-sm table-striped table-bordered mb-0">
        <thead className="table-light">
            <tr>
                <th>Semestr</th>
                <th>Předmět</th>
                <th>Pořadí</th>
                <th>Body</th>
                <th>Výsledek</th>
                <th>Známka</th>
                <th>Kdy proběhlo</th>
                <th>Vytvořil</th>
                <th>Detail</th>
            </tr>
        </thead>
        <tbody>
            {evaluations
                .slice()
                .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
                .map((item) => {
                    const gradeText = item?.classificationlevel?.grade
                    const subjectName = item?.semester?.subject?.name
                    const semesterLabel = item?.semester?.order
                        ? `Semestr č. ${item.semester.order}`
                        : "–"
                    const eventDate = item?.event?.startdate
                        ? new Date(item.event.startdate).toLocaleDateString("cs-CZ")
                        : "–"
                    return (
                        <tr key={item.id}>
                            <td>{semesterLabel}</td>
                            <td>{subjectName || "–"}</td>
                            <td>{item?.order ?? "–"}</td>
                            <td>
                                <span className="badge bg-primary">{item?.points ?? 0} b.</span>
                            </td>
                            <td>
                                {gradeText === "F" ? (
                                    <span className="text-danger fw-bold">Neprospěl</span>
                                ) : (
                                    <span className="text-success fw-bold">Prospěl</span>
                                )}
                            </td>
                            <td>
                                {gradeText ? (
                                    <span className="badge bg-warning text-dark">{gradeText}</span>
                                ) : "–"}
                            </td>
                            <td>{eventDate}</td>
                            <td className="font-monospace small text-muted">
                                {item?.createdby?.fullname || (item?.createdbyId?.slice(0, 8) + "…")}
                            </td>
                            <td>
                                <Link item={item}>Detail</Link>
                            </td>
                        </tr>
                    )
                })}
        </tbody>
    </table>
)

/**
 * Řádek studenta – kliknutím rozbalí jeho pokusy.
 */
const StudentRow = ({ studentName, evaluations }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <tr
                role="button"
                className="table-secondary"
                onClick={() => setOpen((o) => !o)}
                style={{ cursor: "pointer" }}
            >
                <td colSpan={2} style={{ paddingLeft: "2.5rem" }}>
                    {open ? "▼" : "▶"} {studentName || "Neznámý student"}
                    <span className="text-muted small ms-2">({evaluations.length} pokus(ů))</span>
                </td>
            </tr>
            {open && (
                <tr>
                    <td colSpan={2} className="p-0" style={{ paddingLeft: "4rem" }}>
                        <AttemptsTable evaluations={evaluations} />
                    </td>
                </tr>
            )}
        </>
    )
}

/**
 * Řádek zkoušky – klik přejde přímo na stránku seznam hodnocených.
 */
const ExamRow = ({ examId, examName, students }) => {
    const studentCount = Object.keys(students).length

    return (
        <tr className="table-primary fw-bold">
            <td>
                <ProxyLink to={examURL(examId)}>
                    {examName || examId}
                </ProxyLink>
            </td>
            <td className="text-muted fw-normal small">{studentCount} student(ů)</td>
        </tr>
    )
}

export const Table = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-muted">Žádná hodnocení k zobrazení.</p>
    }

    // Seskupení: examId → studentId → seznam pokusů
    const exams = {}
    data.forEach((item) => {
        const examId = item?.examId || "unknown"
        const studentId = item?.student?.id || "unknown"
        const examName = item?.exam?.name || null

        if (!exams[examId]) {
            exams[examId] = { examName, students: {} }
        }
        if (examName && !exams[examId].examName) {
            exams[examId].examName = examName
        }
        if (!exams[examId].students[studentId]) {
            exams[examId].students[studentId] = {
                name: item?.student?.user?.fullname || null,
                evaluations: [],
            }
        }
        exams[examId].students[studentId].evaluations.push(item)
    })

    return (
        <table className="table table-hover align-middle">
            <thead>
                <tr>
                    <th>Zkouška (examId)</th>
                    <th>Počet studentů</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(exams).map(([examId, { examName, students }]) => (
                    <ExamRow
                        key={examId}
                        examId={examId}
                        examName={examName}
                        students={students}
                    />
                ))}
            </tbody>
        </table>
    )
}