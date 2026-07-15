import { useParams } from "react-router"
import { useState } from "react"
import { useInfiniteScroll } from "../../../../dynamic/src/Hooks/useInfiniteScroll"
import { ReadPageAsyncAction } from "../Queries"
import { PageBase } from "./PageBase"
import { Link } from "../../../../_template/src/Base/Components/Link"
import { AsyncStateIndicator } from "../../../../_template/src/Base/Helpers/AsyncStateIndicator"

/**
 * @file PageExamEvaluations.jsx
 * @description Stránka "Seznam hodnocených u zkoušky".
 * Klik na studenta zobrazí jeho pokusy přímo pod seznamem.
 */

/**
 * Jednoduchá tabulka pokusů jednoho studenta.
 */
const AttemptsTable = ({ evaluations = [] }) => {
    if (evaluations.length === 0) {
        return <p className="text-muted">Žádné pokusy.</p>
    }
    return (
        <table className="table table-sm table-striped table-bordered mt-2">
            <thead className="table-light">
                <tr>
                    <th>Pokus</th>
                    <th>Body</th>
                    <th>Výsledek</th>
                    <th>Známka</th>
                    <th>Detail</th>
                </tr>
            </thead>
            <tbody>
                {evaluations
                    .slice()
                    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
                    .map((ev) => {
                        const grade = ev?.classificationlevel?.grade
                        return (
                            <tr key={ev.id}>
                                <td>{ev?.order ?? "–"}.</td>
                                <td>
                                    <span className="badge bg-primary">{ev?.points ?? 0} b.</span>
                                </td>
                                <td>
                                    {grade === "F" ? (
                                        <span className="text-danger fw-bold">Neprospěl</span>
                                    ) : (
                                        <span className="text-success fw-bold">Prospěl</span>
                                    )}
                                </td>
                                <td>
                                    {grade ? (
                                        <span className="badge bg-warning text-dark">{grade}</span>
                                    ) : "–"}
                                </td>
                                <td>
                                    <Link item={ev}>Detail</Link>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}

/**
 * Jeden řádek studenta – kliknutím rozbalí jeho pokusy.
 */
const StudentRow = ({ studentName, studentId, evaluations }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <li
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${open ? "active" : ""}`}
                role="button"
                onClick={() => setOpen((o) => !o)}
                style={{ cursor: "pointer" }}
            >
                <span>{studentName || studentId}</span>
                <span className="badge bg-secondary">{evaluations.length} pokus(ů)</span>
            </li>
            {open && (
                <li className="list-group-item p-0 ps-4">
                    <AttemptsTable evaluations={evaluations} />
                </li>
            )}
        </>
    )
}

export const PageExamEvaluations = () => {
    const { examId } = useParams()

    const { items, loading, error, hasMore, sentinelRef, loadMore } = useInfiniteScroll({
        asyncAction: ReadPageAsyncAction,
        actionParams: {
            skip: 0,
            limit: 25,
            where: { exam_id: { _eq: examId } },
        },
    })

    // Seskupení hodnocení podle studentId
    const studentsMap = {}
    ;(items || []).forEach((ev) => {
        const studentId = ev?.student?.id || "unknown"
        if (!studentsMap[studentId]) {
            studentsMap[studentId] = {
                name: ev?.student?.user?.fullname || null,
                evaluations: [],
            }
        }
        studentsMap[studentId].evaluations.push(ev)
    })

    return (
        <PageBase>
            <h3>Zkouška</h3>
            <p className="font-monospace small text-muted">ID: {examId}</p>

            <AsyncStateIndicator error={error} loading={loading} text="Nahrávám hodnocené..." />

            <h4>Seznam hodnocených</h4>
            <ul className="list-group">
                {Object.entries(studentsMap).map(([studentId, { name, evaluations }]) => (
                    <StudentRow
                        key={studentId}
                        studentId={studentId}
                        studentName={name}
                        evaluations={evaluations}
                    />
                ))}
            </ul>

            {hasMore && <div ref={sentinelRef} style={{ height: 80, backgroundColor: "lightgray" }} />}
            {hasMore && (
                <button className="btn btn-success form-control mt-2" onClick={() => loadMore()}>
                    Více
                </button>
            )}
        </PageBase>
    )
}