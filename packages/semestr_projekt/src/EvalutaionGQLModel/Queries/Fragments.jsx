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
  examId

  # --- SKALÁRNÍ ATRIBUTY (Objekty 1:1) ---
  # Tyto objekty se po načtení rozbalí v pravém panelu v sekci Skalární atributy

  classificationlevel {
    __typename
    id
    grade: name
  }

  student {
    __typename
    id
    user {
      id
      email
      fullname
    }
  }
    
  semesterId

  semester {
    __typename
    id
    order
    subject {
      __typename
      id
      name
    }
  }
   

  exam {
    __typename
    id
    name
  }



  event {
    __typename
    id
    startdate
    enddate
  }

  # --- VEKTOROVÉ ATRIBUTY  ---
  # Toto pole naplní sekci Vektorové atributy a vytvoří plusko ve stromu TREE!
  parts {
    __typename
    id
    lastchange      
    points          
    description     
    classificationlevel {
      __typename
      id
      grade: name
      }
  }
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
  currentUserRoles {
    __typename
    id
    lastchange
    valid
    startdate
    enddate
    roletype {
      __typename
      id
      name
    }
    group {
      __typename
      id
      name
      grouptype {
        __typename
        id
        name
      }
    }
  }
}`



export const RoleFragment = createQueryStrLazy(`${RoleFragmentStr}`)
export const RBACFragment = createQueryStrLazy(`${RBACFragmentStr}`)

export const LinkFragment = createQueryStrLazy(`${LinkFragmentStr}`)
export const MediumFragment = createQueryStrLazy(`${MediumFragmentStr}`, LinkFragment, RBACFragment)
export const LargeFragment = createQueryStrLazy(`${LargeFragmentStr}`, MediumFragment)