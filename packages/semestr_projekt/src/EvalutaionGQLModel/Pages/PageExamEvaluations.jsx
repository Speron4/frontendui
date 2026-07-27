/**
 * @file PageExamEvaluations.jsx
 * @description Stránka "Seznam hodnocených u zkoušky".
 * Nahoře link na ExamGQLModel a zpět na seznam.
 * Klik na studenta zobrazí jeho pokusy přímo pod seznamem.
 * 
 * @module EvaluationGQLModel/Pages/PageExamEvaluations
 */

import { useParams } from "react-router"
import { useState } from "react"
import { useInfiniteScroll } from "../../../../dynamic/src/Hooks/useInfiniteScroll"
import { ReadPageAsyncAction } from "../Queries"
import { PageBase } from "./PageBase"
import { Link } from "../../../../_template/src/Base/Components/Link"
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink"
import { AsyncStateIndicator } from "../../../../_template/src/Base/Helpers/AsyncStateIndicator"
import { URIRoot } from "../../uriroot"

/** URL zpět na hlavní seznam zkoušek */
const listURL = `${URIRoot}/EvaluationGQLModel/list/`

/**
 * Jednoduchá tabulka pokusů jednoho studenta.
 * Zobrazuje detailní data o bodovém hodnocení a známce.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} [props.evaluations=[]] - Seznam hodnocení/pokusů studenta.
 * @returns {JSX.Element} Tabulka s rozepsanými pokusy.
 */
const AttemptsTable = ({ evaluations = [] }) => {
    if (evaluations.length === 0) {
        // Pokud nejsou dostupná hodnocení, zobrazí se informační text
        return <p className="text-muted">Žádné pokusy.</p>
    }
    return (
        // Základní Bootstrap tabulka pro výpis pokusů
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
                    .slice() // Vytvoření mělké kopie před řazením
                    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0)) // Seřazení podle pořadí pokusu
                    .map((ev) => {
                        const grade = ev?.classificationlevel?.grade
                        return (
                            <tr key={ev.id}>
                                {/* Pořadí pokusu */}
                                <td>{ev?.order ?? "–"}.</td>
                                {/* Bodové hodnocení (badge) */}
                                <td>
                                    <span className="badge bg-primary">{ev?.points ?? 0} b.</span>
                                </td>
                                {/* Vizuální rozlišení výsledku - F(Neprospěl) vs ostatní(Prospěl) */}
                                <td>
                                    {grade === "F" ? (
                                        <span className="text-danger fw-bold">Neprospěl</span>
                                    ) : (
                                        <span className="text-success fw-bold">Prospěl</span>
                                    )}
                                </td>
                                {/* Udělená známka */}
                                <td>
                                    {grade ? (
                                        <span className="badge bg-warning text-dark">{grade}</span>
                                    ) : "–"}
                                </td>
                                {/* Odkaz na detailní náhled konkrétního pokusu */}
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
 *
 * @component
 * @param {Object} props
 * @param {string} props.studentName - Jméno studenta.
 * @param {string} props.studentId - Unikátní identifikátor studenta.
 * @param {Array<Object>} props.evaluations - Pokusy přiřazené tomuto studentovi.
 * @returns {JSX.Element} Interaktivní položka seznamu (rozbalovací prvek).
 */
const StudentRow = ({ studentName, studentId, evaluations }) => {
    // Stav indikující, zda je řádek rozbalen a zobrazuje tabulku pokusů
    const [open, setOpen] = useState(false)
    return (
        <>
            {/* Samotný klikací řádek - přepíná CSS třídu 'active' podle stavu */}
            <li
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${open ? "active" : ""}`}
                role="button"
                onClick={() => setOpen((o) => !o)}
                style={{ cursor: "pointer" }}
            >
                {/* Zobrazení jména, jako fallback slouží ID */}
                <span>{studentName || studentId}</span>
                {/* Odznak s celkovým počtem pokusů */}
                <span className="badge bg-secondary">{evaluations.length} pokus(ů)</span>
            </li>
            {/* Vykreslení pod-tabulky pouze pokud je řádek otevřený */}
            {open && (
                <li className="list-group-item p-0 ps-4">
                    <AttemptsTable evaluations={evaluations} />
                </li>
            )}
        </>
    )
}

/**
 * Hlavní komponenta stránky, zobrazující všechny hodnocené studenty k dané zkoušce.
 *
 * @component
 * @returns {JSX.Element} Celá obálka stránky obsahující seznam studentů.
 */
export const PageExamEvaluations = () => {
    // Načtení ID zkoušky z URL
    const { examId } = useParams()

    // Sestavíme item pro ExamGQLModel link (generický dispečer potřebuje __typename + id)
    const examItem = { __typename: "ExamGQLModel", id: examId }

    // Použití nekonečného scrollování s definovanými parametry dotazu (kde exam_id odpovídá url parametru)
    const { items, loading, error, hasMore, sentinelRef, loadMore } = useInfiniteScroll({
        asyncAction: ReadPageAsyncAction,
        actionParams: {
            skip: 0,
            limit: 25,
            where: { exam_id: { _eq: examId } },
        },
    })

    // Seskupení hodnocení podle studentId do dočasné mapy
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
            {/* Zpět na hlavní seznam */}
            <ProxyLink to={listURL} className="btn btn-outline-secondary btn-sm mb-3">
                ← Zpět na seznam zkoušek
            </ProxyLink>

            {/* Odkaz na ExamGQLModel stránku jiného týmu */}
            <h3>
                Zkouška: <Link item={examItem}>{examId}</Link>
            </h3>

            {/* Indikátor načítání a chyb - vázaný na hook z useInfiniteScroll */}
            <AsyncStateIndicator error={error} loading={loading} text="Nahrávám hodnocené..." />

            <h4>Seznam hodnocených</h4>
            {/* Vykreslení listu studentů s přiřazenými hodnoceními */}
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

            {/* Sentinel prvek (záchytný bod pro IntersectionObserver - infinite scroll) */}
            {hasMore && <div ref={sentinelRef} style={{ height: 80, backgroundColor: "lightgray" }} />}
            {/* Tlačítko pro manuální načtení dalších položek */}
            {hasMore && (
                <button className="btn btn-success form-control mt-2" onClick={() => loadMore()}>
                    Více
                </button>
            )}
        </PageBase>
    )
}