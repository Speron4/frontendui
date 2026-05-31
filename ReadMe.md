# Změny

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

# Jak spustit konrétní app

```cmd
npm run dev -w @speron/app_evaluation
```

# ADRESA

```cmd
http://localhost:5173/evaluation
```
