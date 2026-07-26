import { Navigate, useParams } from "react-router"
import { PageVector } from "./PageVector"
import { PageUpdateItem } from "./PageUpdateItem"
import { PageCreateItem } from "./PageCreateItem"
import { PageReadItem } from "./PageReadItem"
import { PageDeleteItem } from "./PageDeleteItem"
import { PageExamEvaluations } from "./PageExamEvaluations"

import { DeleteItemURI, UpdateItemURI } from "../Components"
import { CreateURI, ReadItemURI, VectorItemsURI } from "../Components"
import { ExamEvaluationsItemURI } from "../Components"

/**
 * Helper komponenty pro přesměrování s :id parametrem.
 * Čtou id z URL a přesměrují na správnou /evaluation/ cestu.
 */
const RedirectToRead   = () => { const { id } = useParams(); return <Navigate to={`/evaluation/EvaluationGQLModel/view/${id}`} replace /> }
const RedirectToUpdate = () => { const { id } = useParams(); return <Navigate to={`/evaluation/EvaluationGQLModel/edit/${id}`} replace /> }
const RedirectToDelete = () => { const { id } = useParams(); return <Navigate to={`/evaluation/EvaluationGQLModel/delete/${id}`} replace /> }

/**
 * Definice segmentů rout pro Evaluation stránky.
 * Obsahuje přesměrování z /generic/EvaluationGQLModel/* na /evaluation/EvaluationGQLModel/*
 * -- PageNavbar z _template interně používá /generic/ prefix, tato přesměrování
 * zajistí, že uživatel skončí vždy na správné /evaluation/ URL.
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 */
export const EvaluationGQLModelSegments = [
    // ── Vlastní routy ──────────────────────────────────────────────────────
    {
        path: CreateURI,
        element: (<PageCreateItem />),
    },
    {
        path: VectorItemsURI,
        element: (<PageVector />),
    },
    {
        path: ReadItemURI,
        element: (<PageReadItem />),
    },
    {
        path: UpdateItemURI,
        element: (<PageUpdateItem />),
    },
    {
        path: DeleteItemURI,
        element: (<PageDeleteItem />),
    },
    // Seznam hodnocených u konkrétní zkoušky
    {
        path: ExamEvaluationsItemURI,
        element: (<PageExamEvaluations />),
    },
    {
        path: VectorItemsURI.replace("list", ":any"),
        element: (<PageVector />),
    },
    {
        path: ReadItemURI.replace("view", ":any"),
        element: (<PageReadItem />),
    },

    // ── Přesměrování z /generic/EvaluationGQLModel/* → /evaluation/... ────
    // PageNavbar z _template používá interně /generic/ prefix.
    // Tyto routy zachytí /generic/ URL a přesměrují na správnou /evaluation/ URL.
    {
        path: "/generic/EvaluationGQLModel/list",
        element: (<Navigate to={VectorItemsURI} replace />),
    },
    {
        path: "/generic/EvaluationGQLModel/list/",
        element: (<Navigate to={VectorItemsURI} replace />),
    },
    {
        path: "/generic/EvaluationGQLModel/view/:id",
        element: (<RedirectToRead />),
    },
    {
        path: "/generic/EvaluationGQLModel/edit/:id",
        element: (<RedirectToUpdate />),
    },
    {
        path: "/generic/EvaluationGQLModel/delete/:id",
        element: (<RedirectToDelete />),
    },
    {
        path: "/generic/EvaluationGQLModel/create",
        element: (<Navigate to={CreateURI} replace />),
    },
    {
        path: "/generic/EvaluationGQLModel/:any",
        element: (<Navigate to={VectorItemsURI} replace />),
    },
]