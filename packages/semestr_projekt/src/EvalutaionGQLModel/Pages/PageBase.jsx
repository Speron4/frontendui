import { ReadAsyncAction } from "../Queries"
import { PageItemBase as PageItemBase_} from "../../../../_template/src/Base/Pages/Page"
import { LargeCard } from "../Components"

/**
 * Base wrapper pro stránky pracující s jedním entity itemem podle `:id` z routy.
 *
 * Komponenta:
 * - načte `id` z URL přes `useParams()`
 * - sestaví minimální `item` objekt `{ id }`
 * - poskytne jej přes `AsyncActionProvider`, který zajistí načtení entity pomocí `queryAsyncAction`
 * - vloží do stránky navbar přes `PlaceChild Component={PageNavbar}`
 * - vyrenderuje `children` uvnitř provideru (tj. až v kontextu načtené entity)
 *
 * Typické použití je jako obálka routy typu `/.../:id`, kde vnořené komponenty
 * (detail, editace, akce) používají kontext z `AsyncActionProvider`.
 *
 * @component
 * @param {object} props
 * @param {import("react").ReactNode} props.children
 *   Obsah stránky, který se má vyrenderovat uvnitř `AsyncActionProvider`.
 * @param {Function} [props.queryAsyncAction=ReadAsyncAction]
 *   Async action (např. thunk) použitá pro načtení entity z GraphQL endpointu.
 *   Dostane `item` s `id` (a případně další parametry podle implementace provideru).
 * @param {React.ComponentType} [props.PageNavbar] - Komponenta vykreslující navigaci stránky.
 * @param {React.ComponentType} [props.ItemLayout=LargeCard] - Komponenta určující vzhled obálky dat (karty).
 * @param {React.ComponentType} [props.SubPage=null] - Komponenta specifického obsahu, která dostane data.
 *
 * @returns {import("react").JSX.Element}
 *   Provider s navigací (`PageNavbar`) a obsahem stránky (`children`).
 */
export const PageItemBase = ({ 
    queryAsyncAction=ReadAsyncAction,
    PageNavbar=()=>null,
    ItemLayout=LargeCard,
    SubPage=null,
    ...props
}) => {
    return (
        // Vykreslení bázové layout komponenty z template repozitáře
        <PageItemBase_ 
            queryAsyncAction={queryAsyncAction} 
            PageNavbar={PageNavbar}
            ItemLayout={ItemLayout}
            SubPage={SubPage}
            {...props} 
        />  
    )
}

/**
 * Základní, jednoduchá obálka pro statické stránky (bez načítání entity podle ID).
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Vnitřní obsah stránky.
 * @param {React.ComponentType} [props.PageNavbar] - Komponenta navigační lišty (defaultně prázdná).
 * @returns {JSX.Element} Vykreslí navigační lištu a pod ní samotný obsah.
 */
export const PageBase = ({ children, PageNavbar=()=>null }) => {
    return (
        <>
            {/* Vykreslení navigační lišty stránky */}
            <PageNavbar />
            {/* Zobrazení samotného obsahu předaného do komponenty */}
            {children}
        </>
    )
}