/**
 * @file Fragments.js
 * @description Datové definice GraphQL fragmentů pro model hodnocení (EvaluationGQLModel).
 * Slouží pro specifikaci polí, která se mají stahovat z backendu pro jednotlivé velikosti komponent (Link, Medium, Large) a řízení přístupu (RBAC).[cite: 18]
 *
 * @module EvaluationGQLModel/Queries/Fragments
 */

import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared" //[cite: 18]

/**
 * Základní GraphQL fragment reprezentující data potřebná pro odkazy a zjednodušené náhledy.
 * Načítá metadata (id, lastchange, tvůrce) a základní údaje o hodnocení (body, známka, zkouška, student, semester, event).[cite: 18]
 *
 * @constant {string} LinkFragmentStr
 */
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
  

/**
 * Střední (Medium) GraphQL fragment. 
 * Slouží pro detailnější zobrazení entity. Rozšiřuje Link fragment o data z řízení přístupu (RBAC).[cite: 18]
 *
 * @constant {string} MediumFragmentStr
 */
const MediumFragmentStr = `
fragment Medium on EvaluationGQLModel  {
  ...Link
  rbacobject { 
  ...RBRoles 
  }
}
`

/**
 * Rozšířený (Large) GraphQL fragment.
 * Typicky se používá pro zobrazení plného detailu na celou stránku. Aktuálně pouze zapouzdřuje Medium fragment.[cite: 18]
 *
 * @constant {string} LargeFragmentStr
 */
const LargeFragmentStr = `
fragment Large on EvaluationGQLModel  {
  ...Medium
  }
`

/**
 * Fragment definující datovou strukturu pro roli uživatele (RoleGQLModel).
 * Stahuje časová razítka, napojení na objekty a informace o přiřazeném uživateli/skupině.[cite: 18]
 *
 * @constant {string} RoleFragmentStr
 */
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
 
/**
 * Fragment pro RBAC (Role-Based Access Control) objekt.
 * Stahuje definice rolí aktuálního uživatele vztažených k danému objektu (currentUserRoles).[cite: 18]
 *
 * @constant {string} RBACFragmentStr
 */
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


// ============================================================================
// EXPORTY FRAGMENTŮ S LÍNÝM VYHODNOCENÍM ZÁVISLOSTÍ (LAZY)
// ============================================================================

/**
 * Export lazy-vyhodnoceného fragmentu pro role.
 * Zpracovává definici z RoleFragmentStr.[cite: 18]
 */
export const RoleFragment = createQueryStrLazy(`${RoleFragmentStr}`)

/**
 * Export lazy-vyhodnoceného fragmentu pro RBAC (vloží se do něj RBRoles).
 * Zpracovává definici z RBACFragmentStr.[cite: 18]
 */
export const RBACFragment = createQueryStrLazy(`${RBACFragmentStr}`)

/**
 * Export Link fragmentu. 
 * Nezávisí na jiných fragmentech, obsahuje základní definici hodnocení.[cite: 18]
 */
export const LinkFragment = createQueryStrLazy(`${LinkFragmentStr}`)

/**
 * Export Medium fragmentu.
 * Zahrnuje závislosti na LinkFragmentu a RBACFragmentu, aby bylo možné zanořovat data uvnitř stromu dotazu.[cite: 18]
 */
export const MediumFragment = createQueryStrLazy(`${MediumFragmentStr}`, LinkFragment, RBACFragment)

/**
 * Export Large fragmentu.
 * Zahrnuje jako závislost kompletní MediumFragment (a tím pádem kaskádovitě i Link a RBAC).[cite: 18]
 */
export const LargeFragment = createQueryStrLazy(`${LargeFragmentStr}`, MediumFragment)