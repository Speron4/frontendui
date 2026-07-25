import { CardCapsule, VectorItemsURI } from "../Components"
import { CreateButton, CreateLink } from "./Create"
import { UpdateButton, UpdateLink } from "./Update"
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink"
import { DeleteButton } from "./Delete"

/**
 * Link zpět na hlavní stránku se seznamem zkoušek (VectorItemsURI = list).
 */
export const PageLink = ({ children, preserveHash = true, preserveSearch = true, ...props }) => {
    return (
        <ProxyLink
            to={VectorItemsURI}
            preserveHash={preserveHash}
            preserveSearch={preserveSearch}
            {...props}
        >
            {children}
        </ProxyLink>
    );
};

/**
 * @file InteractiveMutations.jsx
 * @description Nástroje pro správu hodnocení (CRUD operace).
 * Tlačítko "Stránka" vrátí uživatele na hlavní seznam zkoušek.
 */
export const InteractiveMutations = ({ item }) => {
    return (
        <CardCapsule item={item} title="Nástroje">
            <PageLink className="btn btn-outline-success">Stránka</PageLink>
            <UpdateLink className="btn btn-outline-success" item={item}>Upravit</UpdateLink>
            <UpdateButton className="btn btn-outline-success" item={item}>Upravit Dialog</UpdateButton>
            
            <CreateButton 
                className="btn btn-outline-success" 
                item={{ 
                    examId: item?.examId,
                    studentId: item?.studentId 
                }} 
                rbacitem={item}
            >
                Vytvořit nový
            </CreateButton>
            
            <DeleteButton className="btn btn-outline-danger" item={item}>Odstranit</DeleteButton>

            {/* Zpět na seznam zkoušek místo reload */}
            <PageLink className="btn btn-outline-primary">
                ← Zpět na seznam
            </PageLink>
        </CardCapsule>
    )
}