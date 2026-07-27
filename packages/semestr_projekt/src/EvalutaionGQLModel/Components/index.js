/**
 * @file index.js
 * @description Barrel export soubor pro složku Components.
 *
 * Re-exportuje všechny veřejné komponenty z EvaluationGQLModel/Components.
 * Díky tomu lze importovat cokoliv z Components jedním importem:
 * `import { Table, Link, MediumContent } from "../Components"`
 * místo samostatného importu z každého souboru.
 *
 * @module EvaluationGQLModel/Components
 */

// Základní UI komponenty
export * from './CardCapsule'         // obalová karta s nadpisem
export * from './Children'            // předávání itemu do potomků
export * from './LargeCard'           // hlavní layout detailní stránky
export * from './Link'                // URI konstanty + registerLink dispečer
export * from './MediumContent'       // readonly detail hodnocení
export * from './MediumCard'          // kompaktní karta (TREE panel)

// Editační komponenty (writable stránka)
export * from './MediumEditableContent'  // formulářová pole pro editaci
export * from './LiveEdit'               // live editace (ukládá při onBlur)

// Editace s potvrzením
export * from './ConfirmEdit'            // editace s tlačítky Uložit/Zrušit