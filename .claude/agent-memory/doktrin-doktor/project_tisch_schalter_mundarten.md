---
name: project-tisch-schalter-mundarten
description: Der Tisch-Schalter (Konventions-Katalog) muss drei Mundarten derselben Konvention erreichen — Netz, Orakel (conventions_full.json), harter Vorfilter (api/convention_policy.py)
metadata:
  type: project
---

Eine Konvention hat im Repo bis zu drei Implementierungen mit je eigenen IDs.
Der Tisch-Schalter erreicht nur die, die im Katalog stehen.

| Mundart | Wo | IDs |
|---|---|---|
| Netz | `jassai/netz/regeln.py` + `rule_registry.py` | `FOLLOWER_SIGNAL_*`, `G13_NELL_VOR_PUUR_ERSTAUSSPIEL` |
| Orakel | `jassai/oracle/conventions_full.json` (via `ConventionChecker`) | `hoch_tief_partner_2_truempfe_spielt_hoch`, `nell_mit_puur_ausspielen` |
| Vorfilter | `api/convention_policy.py` | `rule1b`, `rule2`, `rule4` |

**Why:** Der Vorfilter läuft im Arena-Bot direkt nach der Engine
(`jass-server/server/neural.py:_entscheide_mit_stack`) und kannte bis zum
12.08.2026 keinen Profil-Parameter — er stellte abgeschaltete Konventionen
hinter dem Rücken des Schalters wieder her. Die Kur (Branch
`doktrin/schalter-und-gold`) führt alle Mundarten in
`jassai/netz/konventions_katalog.py` zusammen: `CHECKER_ID_ZU_KONVENTION`,
`FILTER_REGEL_ZU_KONVENTION`, beide mit TÜV in `_pruefe_katalog()`. Alle
fragen dieselbe Wahrheit: `ist_abgeschaltet(profil, katalog_id)`.

**How to apply:** Wer eine Konvention schaltbar macht oder eine neue Fassung
baut, trägt sie in die passende Tabelle ein — sonst ist sie unschaltbar. Und:
`ist_abgeschaltet` fragt nur die **erste** Regel-ID (Leitregel) eines
Eintrags; die Liste selbst muss trotzdem vollständig sein, sonst bleibt ein
Teil der Familie an. Dieser Fehler ist dreimal passiert: 03.08.
(`austrumpf_signal` 4 von 9), 04.08. (`FOLLOWER_SIGNAL_TIEF_HOEHER` fehlte),
12.08. (`nell_vor_puur` hängt an 1 von 4 Registry-Regeln — offen, Remos
Entscheid: gehören `WEITER_`, `GESCHOBEN_`, `DEFENSIV_NELL_VOR_PUUR` dazu?).

Verwandt: [[falle-doppelte-testnamen]]
