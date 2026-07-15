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
 * Definice segmentů rout pro Evaluation stránky.
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 */
export const EvaluationGQLModelSegments = [
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
    // NOVÁ ROUTA: seznam hodnocených u konkrétní zkoušky (vlastní :examId, ne :id)
    {
        path: ExamEvaluationsItemURI,
        element: (<PageExamEvaluations />),
    },
    // {
    //     path: "sad",
    //     element: (<PageReadItemRolesOn />)
    // },
    {
        path: VectorItemsURI.replace("list", ":any"),
        element: (<PageVector />),
    },
    {
        path: ReadItemURI.replace("view", ":any"),
        element: (<PageReadItem />),
    }
]