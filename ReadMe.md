# Práce na projektu

## 3.4.2025

- script `createscalar.js`
- script `createvector.js`
- template `EmptyVectorsAttribute.jsx`

## 12.5.2026
- Částečně zprovozněny mutace
- Oprava datového mapování: Odstraněny generické prefixy (evaluation_)
- Do hlavního dotazu ve Fragments.jsx bylo přidáno povinné pole examId
- Ošetření datových typů: Opraveny formulářové komponenty tak, aby neposílaly neplatné datové typy (např. nahrazení textového placeholderu "---" u číselných polí points a order za platnou nulu).
  
## 13.5.2026
-zprovoznění delete buttonu

## 20.5.2026
- Nyní se automaticky změny ukládají
- Opraven error když byl řádek prázdný, nyní se defaultně nastaví "0"

## 31.5.2026
- Úprava zobrazení
- částečné zprovoznění atributů(ještě je potřeba něco upravit)
  
## 1.6.2026
- předělání zobrzování číselného id jako normálního člověka či zkoušku
- předělání Tree na přehlednější verzi

## 15.7.2026
- oprava publikace, verze a jejího jména
- examid sjednocení

## 20.7.2026
- funkčnost publikace zajištěna
-  upravování vzhledu hodnocení

## 21.7.2026
- Úprava vektoru stránky pro zobrazení většího množství hodnocených
- vytvoření tlačítka pro návrat na původní stránku

## 25.7.2026
- vytvoření Linků na jiné modely
- finální vzhledové úpravy

## 26.7.2026
- změna v části adresy z generic na evaluation

## 27.7.2026
- finální publikace
- dodělání dokumentace


# Jak spustit konrétní app

```cmd
npm run dev -w @speron/app_evaluation
```

# ADRESA

```cmd
http://localhost:5173/evaluation
```
