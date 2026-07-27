/**
 * @file RouterSegment.jsx
 * @description Definice směrování (routování) pro modul hodnocení (EvaluationGQLModel).
 * Zahrnuje hlavní aplikační cesty (vytvoření, detail, seznam, atd.) i pomocná 
 * přesměrování ze sdílených nebo generických URI.
 *
 * @module EvaluationGQLModel/Pages/RouterSegment
 */

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
const RedirectToRead   = () => { 
    // Načtení identifikátoru záznamu z aktuální URL adresy
    const { id } = useParams(); 
    // Nahrazení aktuální URL v historii prohlížeče a přesměrování na view routu
    return <Navigate to={`/evaluation/EvaluationGQLModel/view/${id}`} replace /> 
}
const RedirectToUpdate = () => { 
    // Načtení identifikátoru záznamu z aktuální URL adresy
    const { id } = useParams(); 
    // Nahrazení aktuální URL v historii prohlížeče a přesměrování na editační routu
    return <Navigate to={`/evaluation/EvaluationGQLModel/edit/${id}`} replace /> 
}
const RedirectToDelete = () => { 
    // Načtení identifikátoru záznamu z aktuální URL adresy
    const { id } = useParams(); 
    // Nahrazení aktuální URL v historii prohlížeče a přesměrování na mazací routu
    return <Navigate to={`/evaluation/EvaluationGQLModel/delete/${id}`} replace /> 
}

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
        // Cesta směřující na formulář pro vytvoření nového záznamu
        path: CreateURI,
        element: (<PageCreateItem />),
    },
    {
        // Cesta pro zobrazení seznamu všech položek (kolekce/vektor)
        path: VectorItemsURI,
        element: (<PageVector />),
    },
    {
        // Cesta pro detail konkrétního záznamu (vyžaduje parametr id)
        path: ReadItemURI,
        element: (<PageReadItem />),
    },
    {
        // Cesta pro formulář úpravy existujícího záznamu (vyžaduje parametr id)
        path: UpdateItemURI,
        element: (<PageUpdateItem />),
    },
    {
        // Cesta pro stránku mazání specifického záznamu (vyžaduje parametr id)
        path: DeleteItemURI,
        element: (<PageDeleteItem />),
    },
    // Seznam hodnocených u konkrétní zkoušky
    {
        // Specifická routa pro zobrazení seznamu studentů a jejich pokusů u jedné zkoušky
        path: ExamEvaluationsItemURI,
        element: (<PageExamEvaluations />),
    },
    {
        // Fallback zachytávající jakékoliv jiné slovo namísto "list" a mapující ho na vektor
        path: VectorItemsURI.replace("list", ":any"),
        element: (<PageVector />),
    },
    {
        // Fallback zachytávající jakékoliv jiné slovo namísto "view" a mapující ho na detail
        path: ReadItemURI.replace("view", ":any"),
        element: (<PageReadItem />),
    },

    // ── Přesměrování z /generic/EvaluationGQLModel/* → /evaluation/... ────
    // PageNavbar z _template používá interně /generic/ prefix.
    // Tyto routy zachytí /generic/ URL a přesměrují na správnou /evaluation/ URL.
    {
        // Záchyt generické routy pro list a přesměrování na naši Vector routu
        path: "/generic/EvaluationGQLModel/list",
        element: (<Navigate to={VectorItemsURI} replace />),
    },
    {
        // Totéž, ale ošetřuje případ s koncovým lomítkem
        path: "/generic/EvaluationGQLModel/list/",
        element: (<Navigate to={VectorItemsURI} replace />),
    },
    {
        // Záchyt generické routy pro detail entity (předá ID do naší pomocné komponenty)
        path: "/generic/EvaluationGQLModel/view/:id",
        element: (<RedirectToRead />),
    },
    {
        // Záchyt generické routy pro editaci (předá ID do naší pomocné komponenty)
        path: "/generic/EvaluationGQLModel/edit/:id",
        element: (<RedirectToUpdate />),
    },
    {
        // Záchyt generické routy pro mazání (předá ID do naší pomocné komponenty)
        path: "/generic/EvaluationGQLModel/delete/:id",
        element: (<RedirectToDelete />),
    },
    {
        // Záchyt generického vytvoření, prosté přesměrování bez potřeby ID
        path: "/generic/EvaluationGQLModel/create",
        element: (<Navigate to={CreateURI} replace />),
    },
    {
        // Obecný catch-all fallback pro další neznámé /generic/ routy -> pošle uživatele na seznam
        path: "/generic/EvaluationGQLModel/:any",
        element: (<Navigate to={VectorItemsURI} replace />),
    },
]