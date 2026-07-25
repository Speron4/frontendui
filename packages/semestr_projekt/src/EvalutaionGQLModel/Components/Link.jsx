import { URIRoot } from "../../uriroot";
import { registerLink } from "../../../../_template/src/Base/Components/Link";
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink";

const modelURI = `${URIRoot}/EvaluationGQLModel`
export const ListURI = `${modelURI}/list/`;
export const CreateURI = `${modelURI}/create/`;
export const ReadURI = `${modelURI}/view/`;
export const UpdateURI = `${modelURI}/edit/`;
export const DeleteURI = `${modelURI}/delete/`;

export const LinkURI = ReadURI;
export const VectorItemsURI = ListURI;

const idParam = ":id"
export const ReadItemURI = `${LinkURI}${idParam}`;
export const UpdateItemURI = `${UpdateURI}${idParam}`;
export const DeleteItemURI = `${DeleteURI}${idParam}`;

// === NOVÉ: stránka "seznam hodnocených u zkoušky" (vlastní :examId, ne :id) ===
export const ExamEvaluationsURI = `${modelURI}/byExam/`;
const examIdParam = ":examId";
export const ExamEvaluationsItemURI = `${ExamEvaluationsURI}${examIdParam}`;

/** Sestaví konkrétní URL pro daný examId (nahradí :examId reálným ID). */
export const buildExamEvaluationsURL = (examId) =>
    ExamEvaluationsItemURI.replace(":examId", examId);

/**
 * A React component that renders a `ProxyLink` to an "template" entity's view page.
 *
 * The target URL is dynamically constructed using the `template` object's `id`, and the link displays
 * the `template` object's `name` as its clickable content.
 *
 * @function TemplateLink
 * @param {Object} props - The properties for the `TemplateLink` component.
 * @param {Object} props.template - The object representing the "template" entity.
 * @param {string|number} props.template.id - The unique identifier for the "template" entity. Used to construct the target URL.
 * @param {string} props.template.name - The display name for the "template" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "template" entity's view page.
 *
 * @example
 * // Example usage with a sample template entity:
 * const templateEntity = { id: 123, name: "Example Template Entity" };
 * 
 * <TemplateLink template={templateEntity} />
 * // Renders: <ProxyLink to="/template/template/view/123">Example Template Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/template/template/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const Link = ({ item, LinkURI: LinkURI_ = LinkURI, action="view", children, ...props}) => {
    const targetURI = LinkURI_.replace('view', action);
    return <ProxyLink to={targetURI + item?.id} {...props}>{children || item?.fullname || item?.name || item?.id || "Nevim"}</ProxyLink>
    // return <BaseUI.Link item={item} />
    // return <a>{children || item?.fullname || item?.name || item?.id || "Nevim"}</a>
}

registerLink('EvaluationGQLModel', Link)

// Registrace linků na cizí entity (jiné týmy) se správnými URI prefixy.
// Bez této registrace by generický dispečer použil fallback /generic/... prefix.
// URI prefixy odpovídají klíčům v config.json Docker kontejneru.

const StudentLink = ({ item, action = "view", children, ...props }) => (
    <ProxyLink to={`/student/StudentGQLModel/${action}/${item?.id}`} {...props}>
        {children || item?.user?.fullname || item?.fullname || item?.name || item?.id || "Student"}
    </ProxyLink>
)
registerLink('StudentGQLModel', StudentLink)

const SemesterLink = ({ item, action = "view", children, ...props }) => (
    <ProxyLink to={`/semester/SemesterGQLModel/${action}/${item?.id}`} {...props}>
        {children || item?.name || item?.id || "Semestr"}
    </ProxyLink>
)
registerLink('SemesterGQLModel', SemesterLink)

const EventLink = ({ item, action = "view", children, ...props }) => (
    <ProxyLink to={`/event/EventGQLModel/${action}/${item?.id}`} {...props}>
        {children || item?.name || item?.id || "Událost"}
    </ProxyLink>
)
registerLink('EventGQLModel', EventLink)

const SubjectLink = ({ item, action = "view", children, ...props }) => (
    <ProxyLink to={`/subject/SubjectGQLModel/${action}/${item?.id}`} {...props}>
        {children || item?.name || item?.id || "Předmět"}
    </ProxyLink>
)
registerLink('SubjectGQLModel', SubjectLink)

const ExamLink = ({ item, action = "view", children, ...props }) => (
    <ProxyLink to={`/exam/ExamGQLModel/${action}/${item?.id}`} {...props}>
        {children || item?.name || item?.id || "Zkouška"}
    </ProxyLink>
)
registerLink('ExamGQLModel', ExamLink)