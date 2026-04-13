import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

const LinkFragmentStr = `
fragment Link on EvaluationGQLModel  {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  
  order
  points
  passed
  description
  classificationlevelId


 
}
  

`

const MediumFragmentStr = `
fragment Medium on EvaluationGQLModel  {
  ...Link
  rbacobject { 
  ...RBRoles 
  }
}
`

const LargeFragmentStr = `
fragment Large on EvaluationGQLModel  {
  ...Medium
  }
`

const RoleFragmentStr = `
fragment Role on RoleGQLModel {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    createdby { id __typename }
    changedby { id __typename }
    rbacobject { id __typename }
    valid
    deputy
    startdate
    enddate
    roletypeId
    userId
    groupId
    roletype { __typename id }
    user { __typename id fullname }
    group { __typename id name }
  }
`


const RBACFragmentStr = `
fragment RBRoles on RBACObjectGQLModel {
  __typename
  id
  roles { __typename }
  # userCanWithState
  # userCanWithoutState
}`

export const RoleFragment = createQueryStrLazy(`${RoleFragmentStr}`)
export const RBACFragment = createQueryStrLazy(`${RBACFragmentStr}`)

export const LinkFragment = createQueryStrLazy(`${LinkFragmentStr}`)
export const MediumFragment = createQueryStrLazy(`${MediumFragmentStr}`, LinkFragment, RBACFragment)
export const LargeFragment = createQueryStrLazy(`${LargeFragmentStr}`, MediumFragment)
  