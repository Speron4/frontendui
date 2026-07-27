/**
 * @file Link.jsx
 * @description Navigační linky pro EvaluationGQLModel a registrace linků
 * pro entity jiných týmů v rámci federovaného UOIS stacku.
 *
 * Soubor plní dvě role:
 * 1. Definuje URI konstanty a vlastní Link komponentu pro EvaluationGQLModel.
 * 2. Registruje Link komponenty pro cizí entity (Student, Exam, Semester,
 *    Subject, Event) přes generický `registerLink` dispečer z _template.
 *
 * @remarks
 * Proč registrujeme cizí entity zde a ne v jejich vlastních modulech?
 * Protože náš modul potřebuje na ně odkazovat (MediumContent, Table) —
 * bez registrace by generický dispečer použil fallback `/generic/` prefix.
 *
 * @module EvaluationGQLModel/Components/Link
 */

import { URIRoot } from "../../uriroot";
import { registerLink } from "../../../../_template/src/Base/Components/Link";
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink";

/** Základní URI prefix pro všechny stránky EvaluationGQLModel. */
const modelURI = `${URIRoot}/EvaluationGQLModel`

/** URI pro seznam hodnocení (PageVector). */
export const ListURI = `${modelURI}/list/`;

/** URI pro vytvoření nového hodnocení. */
export const CreateURI = `${modelURI}/create/`;

/** URI pro zobrazení detailu hodnocení (readonly). */
export const ReadURI = `${modelURI}/view/`;

/** URI pro editaci hodnocení. */
export const UpdateURI = `${modelURI}/edit/`;

/** URI pro smazání hodnocení. */
export const DeleteURI = `${modelURI}/delete/`;

/** Výchozí URI pro linky — ukazuje na detail (readonly). */
export const LinkURI = ReadURI;

/** URI pro seznam hodnocení — alias pro ListURI. */
export const VectorItemsURI = ListURI;

const idParam = ":id"

/** Routa pro detail hodnocení s parametrem `:id`. */
export const ReadItemURI = `${LinkURI}${idParam}`;

/** Routa pro editaci hodnocení s parametrem `:id`. */
export const UpdateItemURI = `${UpdateURI}${idParam}`;

/** Routa pro smazání hodnocení s parametrem `:id`. */
export const DeleteItemURI = `${DeleteURI}${idParam}`;

/** URI prefix pro stránku seznam hodnocených u zkoušky. */
export const ExamEvaluationsURI = `${modelURI}/byExam/`;

const examIdParam = ":examId"

/** Routa pro seznam hodnocených u zkoušky s parametrem `:examId`. */
export const ExamEvaluationsItemURI = `${ExamEvaluationsURI}${examIdParam}`;

/**
 * Sestaví konkrétní URL pro stránku seznam hodnocených u dané zkoušky.
 *
 * @param {string} examId - UUID zkoušky.
 * @returns {string} Absolutní URL ve formátu `/evaluation/EvaluationGQLModel/byExam/<examId>`.
 *
 * @example
 * const url = buildExamEvaluationsURL("b28fba86-19fa-41b3-ae0e-8c24d058e5be")
 * // → "/evaluation/EvaluationGQLModel/byExam/b28fba86-..."
 */
export const buildExamEvaluationsURL = (examId) =>
    ExamEvaluationsItemURI.replace(":examId", examId);

/**
 * Navigační link na detail hodnocení (EvaluationGQLModel).
 *
 * Sestaví URL jako `{LinkURI}{item.id}` a zobrazí children nebo
 * jméno/název/id entity jako fallback text.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - Entita EvaluationGQLModel (musí obsahovat `id`).
 * @param {string} [props.LinkURI=ReadURI] - Přepis výchozího URI prefixu.
 * @param {string} [props.action="view"] - Akce (view / edit / delete).
 * @param {React.ReactNode} [props.children] - Obsah linku; fallback: item.fullname → item.name → item.id.
 * @returns {JSX.Element} ProxyLink s vytvořenou URL.
 *
 * @example
 * <Link item={evaluationItem}>Detail hodnocení</Link>
 */
export const Link = ({ item, LinkURI: LinkURI_ = LinkURI, action="view", children, ...props}) => {
    const targetURI = LinkURI_.replace('view', action);
    return <ProxyLink to={targetURI + item?.id} {...props}>{children || item?.fullname || item?.name || item?.id || "Nevim"}</ProxyLink>
}

// Registrace vlastní entity
registerLink('EvaluationGQLModel', Link)

// ── Registrace linků pro cizí entity (jiné týmy) ─────────────────────────────
// URI prefixy odpovídají klíčům v config.json Docker kontejneru (hrbolek/frontend).
// Bez těchto registrací by generický dispečer použil fallback /generic/ prefix.

/**
 * Navigační link na detail studenta (StudentGQLModel).
 * Cizí tým — URI prefix `/student/`.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - StudentGQLModel entita (musí obsahovat `__typename` a `id`).
 * @param {string} [props.action="view"] - Akce routeru.
 * @param {React.ReactNode} [props.children] - Text linku; fallback: fullname → id.
 * @returns {JSX.Element}
 */
const StudentLink = ({ item, action = "view", children, ...props }) => (
    <ProxyLink to={`/student/StudentGQLModel/${action}/${item?.id}`} {...props}>
        {children || item?.user?.fullname || item?.fullname || item?.name || item?.id || "Student"}
    </ProxyLink>
)
registerLink('StudentGQLModel', StudentLink)

/**
 * Navigační link na detail semestru (SemesterGQLModel).
 * Cizí tým — URI prefix `/semester/`.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - SemesterGQLModel entita.
 * @param {string} [props.action="view"]
 * @param {React.ReactNode} [props.children]
 * @returns {JSX.Element}
 */
const SemesterLink = ({ item, action = "view", children, ...props }) => (
    <ProxyLink to={`/semester/SemesterGQLModel/${action}/${item?.id}`} {...props}>
        {children || item?.name || item?.id || "Semestr"}
    </ProxyLink>
)
registerLink('SemesterGQLModel', SemesterLink)

/**
 * Navigační link na detail události (EventGQLModel).
 * Cizí tým — URI prefix `/event/`.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - EventGQLModel entita.
 * @param {string} [props.action="view"]
 * @param {React.ReactNode} [props.children]
 * @returns {JSX.Element}
 */
const EventLink = ({ item, action = "view", children, ...props }) => (
    <ProxyLink to={`/event/EventGQLModel/${action}/${item?.id}`} {...props}>
        {children || item?.name || item?.id || "Událost"}
    </ProxyLink>
)
registerLink('EventGQLModel', EventLink)

/**
 * Navigační link na detail předmětu (SubjectGQLModel).
 * Cizí tým — URI prefix `/subject/`.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - SubjectGQLModel entita.
 * @param {string} [props.action="view"]
 * @param {React.ReactNode} [props.children]
 * @returns {JSX.Element}
 */
const SubjectLink = ({ item, action = "view", children, ...props }) => (
    <ProxyLink to={`/subject/SubjectGQLModel/${action}/${item?.id}`} {...props}>
        {children || item?.name || item?.id || "Předmět"}
    </ProxyLink>
)
registerLink('SubjectGQLModel', SubjectLink)

/**
 * Navigační link na detail zkoušky (ExamGQLModel).
 * Cizí tým — URI prefix `/exam/`.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item - ExamGQLModel entita.
 * @param {string} [props.action="view"]
 * @param {React.ReactNode} [props.children]
 * @returns {JSX.Element}
 */
const ExamLink = ({ item, action = "view", children, ...props }) => (
    <ProxyLink to={`/exam/ExamGQLModel/${action}/${item?.id}`} {...props}>
        {children || item?.name || item?.id || "Zkouška"}
    </ProxyLink>
)
registerLink('ExamGQLModel', ExamLink)