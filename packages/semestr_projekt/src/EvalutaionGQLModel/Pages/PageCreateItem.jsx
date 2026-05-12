import { ReadAsyncAction } from "../Queries"
import { Row } from "../../../../_template/src/Base/Components/Row";
import { CreateBody } from "../Mutations/Create";
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared";
import { PageItemBase } from "./PageBase";



const PageBody = ({...props}) => (
    <Row>
        <LeftColumn />
        <MiddleColumn>
            <CreateBody {...props} />
        </MiddleColumn>
    </Row>
)

export const PageCreateItem = ({ 
    SubPage=PageBody,
    ...props
}) => {
    return (
        <PageItemBase 
            SubPage={SubPage}
            {...props}
        />
    )
}

/*
const Add = {state,item}=>{...state,item}
const Remove= {state,item}=>state.filter{i=>i?.id!==item?.id}

const stateAutomata = {
   const {item,operation} = payload
   if (operation === "add") return Add(state,item)
    if (operation === "remove") return Remove(state,item)
}
*/
