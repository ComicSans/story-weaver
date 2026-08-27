---
title: Akt I - Die Reise des Wagenzugs
---

# Tag 1: Der Aufbruch {#aufbruch}

Der Wagenzug bricht auf. Das Knarren der Holzräder und das Rufen der Kutscher begleiten deinen Start in ein raues, wildes Land. Zerklüftete Felsformationen ragen wie steinerne Zähne am Horizont empor. Der Pfad ist kaum mehr als eine ausgefahrene Furche im kargen Boden, umgeben von dichtem, undurchdringlichem Gestrüpp und dem ewigen Pfeifen des Windes.

{ knows("PARTNER") }
  Am Rand des Schlammwegs lehnt Crighton an einem morschen Zaunpfahl, den Flickenmantel fest um die Schultern gezogen. Als du vorbeimarschierst, zieht er die Mundwinkel hoch und tippt sich an die Stirn. "Keine Eile, Partner", murmelt er leise im Gehen. "Lass uns abwarten, bis der Wald die Kutscher nervös macht."
{ knows("CRIGHTON") }
  Am Rand des Weges entdeckst du Crighton. Er stützt sich gelassen auf sein Rapier und nickt dir mit einem schiefen Grinsen zu. Er scheint der Karawane mit einigem Abstand zu folgen.

* [Den Weg weitergehen und die Umgebung im Auge behalten](#goblinueberfall)
* [Die Zügel fester greifen und dich auf eine lange Reise einstellen](#goblinueberfall)

# Der Goblinüberfall {#goblinueberfall}

Am Nachmittag schlägt das Schicksal zu. Schrille Schreie hallen durch das Unterholz. Eine Gruppe gieriger Goblins stürzt aus dem Dickicht auf den Treck zu. Ihr Ziel ist eindeutig: Sie wollen einen der beladenen Wagen kapern und abhängen.

{ knows("PARTNER") }
  Aus dem Hinterhalt taucht Crighton an deiner Seite auf. Er zieht sein Rapier mit einem metallischen Zischen. "Zeit, unser Eigentum zu beschützen!", ruft er dir zu.
{ knows("CRIGHTON") }
  Auf einem Felsvorsprung oberhalb des Weges entdeckst du Crighton. Er sitzt dort völlig ungerührt, nimmt einen Schluck aus seinem Flachmann und schaut dem Chaos amüsiert zu.

* [Waffen ziehen und die Goblins abwehren](#kampf-goblins)

# Der Kampf am Wegrand {#kampf-goblins}

Sie kommen zu dritt auf dich zu, krummbeinig und viel zu schnell für ihre Größe.

!combat goblins
  win  -> goblin-sieg
  flee [Zurückweichen und den Wagen fahren lassen](#goblin-flucht) Du gibst den Weg frei, und die Kutscher geben ihn mit dir frei.

# Ein Wagen rollt den Hang hinab {#goblin-sieg}

Die Goblins sind besiegt oder in die Flucht geschlagen. Doch während des Getümmels hat sich ein kleinerer Trupp einen der Gepäckwagen geschnappt und schiebt ihn hastig einen Hang hinab.

{ knows("PARTNER") }
  Crighton flucht. "Das ist genau der Wagen mit der interessanten Fracht! Den dürfen wir nicht verlieren!"

* [Dem flüchtenden Wagen hinterherjagen](#wagen-verfolgen)
* [Genug Abenteuer für heute - den Wagen aufgeben](#wagen-aufgeben)

# Zurückgewichen {#goblin-flucht}

Du musstest vor den Goblins zurückweichen. Die Kreaturen haben die Gunst der Stunde genutzt und sich einen Wagen geschnappt.

* [Versuchen, den Wagen einzuholen](#wagen-verfolgen)
* [Den Wagen entkommen lassen](#wagen-aufgeben)

# Der Wagen zieht {#wagen-aufgeben}

Du entscheidest dich dagegen, deine Kräfte aufzehren zu lassen, und lässt den Wagen ziehen. Die Goblins verschwinden mit der Fracht in den Schluchten. Sechs Wägen sind sechs mal fünf Goldmünzen in Graufurt, und Olric wird die Rechnung selbst aufmachen.

~ waegen = waegen - 1

* [Das Lager für die Nacht vorbereiten](#tag-1-nacht)

# Die Verfolgung beginnt {#wagen-verfolgen}

Der entführte Wagen rumpelt über Schotter und Geröll den Hang hinab. Du nimmst die Verfolgung auf. Du musst den Abstand verkürzen, bevor der Wagen das dichte Unterholz erreicht.

~ wagen_distanz = 3

* [In den Vollsprint übergehen](#verfolgung-sprint)
* [Eine Abkürzung über die Felsen riskieren](#verfolgung-abkuerzung)

# Vollsprint {#verfolgung-sprint}

Du wirfst alles in die Waagschale und sprintest auf dem ausgefahrenen Weg hinterher.

{ roll(2,6) + athletik >= 16 }
  Mit weiten, kräftigen Schritten gewinnst du an Boden.
  ~ wagen_distanz = wagen_distanz - 1
{ else }
  Der lose Untergrund bringt dich ins Straucheln. Du verlierst wertvolle Meter.
  ~ wagen_distanz = wagen_distanz + 1

-> verfolgung-status

# Über die Felsen {#verfolgung-abkuerzung}

Du verlässt den Pfad und springst über gefährliche Felsblöcke, um den Weg des Wagens zu schneiden.

{ roll(2,6) + athletik >= 18 }
  Ein gewagter Sprung setzt dich direkt neben die flüchtenden Goblins.
  ~ wagen_distanz = wagen_distanz - 2
{ else }
  Du knickst auf einem matschigen Vorsprung um und knallst gegen einen Felsen. Das kostet Zeit und Kraft.
  ~ wagen_distanz = wagen_distanz + 1
  ~ stamina = stamina - 2

-> verfolgung-status

# Der Abstand {#verfolgung-status}

{ wagen_distanz <= 0 }
  -> wagen-gerettet
{ wagen_distanz >= 5 }
  -> wagen-verloren

{ wagen_distanz <= 1 }
  Du bist nah genug heran, um die Nägel in den Radreifen zu zählen. Einer der Goblins auf der Ladefläche dreht sich um und sieht dich kommen.
{ wagen_distanz >= 4 }
  Der Wagen ist nur noch ein Rumpeln vor dir, und der Streifen Unterholz am Talgrund liegt näher an ihm als du.
{ else }
  Der Wagen rumpelt weiter, die Goblins schreien einander Unverständliches zu, und der Streifen Unterholz am Talgrund kommt näher.

+ [Nochmal alles geben und sprinten](#verfolgung-sprint)
+ [Einen gezielten Wurfstein nach den Goblins schleudern](#verfolgung-wurf)

# Der Wurfstein {#verfolgung-wurf}

Du greifst im Lauf nach einem schweren Stein und schleuderst ihn nach dem Anführer der Goblins.

{ test("skill") }
  Volltreffer. Der Goblin stürzt vom Bock, der Wagen wird langsamer.
  ~ wagen_distanz = wagen_distanz - 1
{ else }
  Der Stein verfehlt sein Ziel. Der Wagen gewinnt weiter an Abstand.
  ~ wagen_distanz = wagen_distanz + 1

-> verfolgung-status

# An der Deichsel {#wagen-gerettet}

Mit einem beherzten Satz erreichst du die Deichsel des Wagens, bremst ihn ab und vertreibst die verbliebenen Diebe. Der Wagenzug ist wieder komplett.

* [Die Nacht bricht herein](#tag-1-nacht)

# Um die Kurve {#wagen-verloren}

Trotz aller Anstrengung stolperst du im rauen Terrain. Der Wagen verschwindet um eine Kurve, und du wirst ihn nie wiedersehen. Die Reise muss weitergehen, und du kehrst erschöpft und niedergeschlagen zur restlichen Gruppe zurück.

~ waegen = waegen - 1

* [Die Nacht bricht herein](#tag-1-nacht)

# Tag 1: Die Wagenburg {#tag-1-nacht}

Die Dunkelheit bricht herein. Der Wagenzug formiert sich zu einer schützenden Wagenburg. Die Wachen müssen für die drei Schichten der Nacht eingeteilt werden. Du kannst dich selbst melden oder die Verantwortung den Kutschern überlassen, um Schlaf nachzuholen.

* [Erste Schicht: selbst Wache halten](#wache-1-aktiv)
* [Erste Schicht: schlafen legen](#wache-1-schlaf)

# Erste Wache {#wache-1-aktiv}

Du spähst aufmerksam in die Finsternis. Die Büsche knistern im Wind... Ist da etwas?

{ knows("PARTNER") }
  Ein Schatten löst sich lautlos aus der Dunkelheit. Crighton setzt sich neben dich ans Erdlager. "Gute Schicht zum Pläne schmieden", raunt er. "Sobald wir den Gebirgspass erreichen, greifen wir uns die Kiste."
{ knows("CRIGHTON") }
  Ein leises Rascheln lässt dich den Griff um dein Schwert verstärken. Crighton tritt mit gehobenen Händen ins schwache Licht deiner Fackel. "Immer noch aufrechter Beschützer?", stichelt er leise. "Du weißt nicht einmal, was du da bewachst. Olric lässt nicht nur Vorräte transportieren. Im zweiten Wagen liegt eine beschlagene Holzkiste - schwer wie Blei und mit Siegeln versehen, die man nicht ohne Grund anbringt."

* [Aufmerksam bleiben und die Büsche beobachten](#wache-1-probe)
* {knows("CRIGHTON") and not knows("PARTNER")} [Auf sein Angebot eingehen und dich doch mit ihm verbünden](#crighton-nacht-verbuenden)
* {knows("CRIGHTON") and not knows("PARTNER")} [Crighton erneut abweisen und ihn fortschicken](#crighton-nacht-abweisen)

# Eine späte Einigung {#crighton-nacht-verbuenden}

Crighton lächelt zufrieden. "Eine weise Entscheidung. Es geht doch nichts über eine gemeinsame Geschäftsgelegenheit. Halte einfach die Augen offen - wenn der Moment da ist, teilen wir die Beute."

~ remember("PARTNER")
~ ruf = ruf - 1

* [Zur Wachroutine übergehen](#wache-1-probe)

# Zum zweiten Mal nein {#crighton-nacht-abweisen}

"Ich habe eine Abmachung mit Olric, Flickenmann", sagst du kühl. Crighton zuckt nur mit den Schultern, lächelt spöttisch und verschwindet wieder so lautlos im Unterholz, wie er aufgetaucht ist. "Sag nicht, ich hätte dich nicht gewarnt..."

~ ruf = ruf + 1

* [Zur Wachroutine übergehen](#wache-1-probe)

# Was im Gebüsch war {#wache-1-probe}

{ test("skill") }
  Du erkennst rechtzeitig, dass es nur ein kleines Tier war, und verhinderst Panik im Lager.
{ else }
  Ein Schatten lässt dich aufschrecken. Du schlägst Alarm, doch es war nur deine Einbildung. Das Lager ist in Aufruhr.
  ~ wachen_fails = wachen_fails + 1

* [Zweite Schicht: selbst Wache halten](#wache-2-aktiv)
* [Zweite Schicht: schlafen legen](#wache-2-schlaf)

# Erste Schicht verschlafen {#wache-1-schlaf}

Du legst dich am Lagerfeuer schlafen. Die müden Kutscher halten die erste Wache. Den Schatten im Gebüsch hat keiner gesehen.

~ wachen_fails = wachen_fails + 1
~ stamina = min(stamina + 2, stamina_max)

* [Zweite Schicht: weiterschlafen](#wache-2-schlaf)
* [Zweite Schicht: aufstehen und Wache übernehmen](#wache-2-aktiv)

# Zweite Wache {#wache-2-aktiv}

Die Mitternachtsstunde ist ruhig. Es geschieht nichts Aufregendes, doch die Kälte setzt dir zu.

* [Dritte Schicht: selbst Wache halten](#wache-3-aktiv)
* [Dritte Schicht: schlafen legen](#wache-3-schlaf)

# Zweite Schicht verschlafen {#wache-2-schlaf}

Du schläfst tief und fest. Die Sterne ziehen ruhig am Himmel vorbei, die Tiere der Nacht machen unheimliche Geräusche. Ohne Wachsamkeit bleibt das Lager ungeschützt.

~ wachen_fails = wachen_fails + 1
~ stamina = min(stamina + 2, stamina_max)

* [Dritte Schicht: weiterschlafen](#wache-3-schlaf)
* [Dritte Schicht: aufstehen und die letzte Wache übernehmen](#wache-3-aktiv)

# Dritte Wache {#wache-3-aktiv}

Das Morgengrauen kündigt sich an. Deine Augen sind bleischwer. War da eine Bewegung im Nebel?

{ test("skill") }
  Nein, du hast dich getäuscht. Es war eine lange Nacht, du bist hundemüde, behältst aber einen kühlen Kopf und führst den Wagenzug sicher in den Morgen.
{ else }
  Ein knackender Ast lässt dich nervös zur Waffe greifen. Du weckst die Karawane umsonst.
  ~ wachen_fails = wachen_fails + 1

* [Die Nacht auswerten](#nacht-1-auswertung)

# Dritte Schicht verschlafen {#wache-3-schlaf}

Die Wachen sind kurz vor Sonnenaufgang nicht aufmerksam genug und schlagen wegen eines streunenden Dachses Alarm.

~ wachen_fails = wachen_fails + 1
~ stamina = min(stamina + 2, stamina_max)

* [Die Nacht auswerten](#nacht-1-auswertung)

# Die erste Nacht {#nacht-1-auswertung}

{ wachen_fails >= 2 }
  Aufgrund der vielen Fehlalarme und Unruhen im Lager war an erholsamen Schlaf für die Karawane nicht zu denken.
{ else }
  Die Nacht verläuft insgesamt geordnet. Die Karawane startet ausgeruht in den neuen Tag.

~ wachen_fails = 0

* [Den morgendlichen Aufbruch vorbereiten](#oedes-land)

# Tag 2: Das öde Land {#oedes-land}

Der Wagenzug lässt das hügelige Vorland hinter sich. Vor euch erstreckt sich eine tote, von Rissen durchzogene Salzwüste, gehüllt in ein trübes, aschgraues Licht. Kein Grashalm wächst hier, kein Vogel zieht seine Bahnen. Der Staub legt sich wie ein trockener Film auf Mund und Augen, während das ständige Mahlen der Wagenräder im weichen Sand die Zugtiere rasch ermüdet.

Die Beklemmung verunsichert die Kutscher. Ein totes Pferd liegt am Wegesrand - seine Überreste sehen merkwürdig entstellt aus, als sei das Fleisch vertrocknet, bevor das Tier überhaupt zu Boden fiel.

* [Das tote Tier genauer untersuchen](#oede-untersuchung)
* [Zügig weiterreisen und die Karawane antreiben](#oede-weiterreise)
* [Eine kurze Rast einlegen](#oede-rast)

# Der Kadaver {#oede-untersuchung}

Du steigst vom Wagen und betrachtest den Kadaver. Die Spuren zeigen, dass hier keine Wölfe am Werk waren. Etwas hat dem Tier jede Feuchtigkeit entzogen.

{ test("skill") }
  Zwischen den Überresten entdeckst du eine unversehrte Tasche eines früheren Trecks, und sie enthält Vorräte.
  ~ stamina = min(stamina + 2, stamina_max)
{ else }
  Beim Durchsuchen schlägst du dir an den splittrigen Knochen die Hand auf. Die Verwesungsgase rauben dir den Atem.
  ~ stamina = stamina - 1

* [Zur Karawane zurückkehren](#oede-weiterreise)

# Der Bachlauf {#oede-rast}

Du lässt die Karawane halten, als ihr am Wegesrand einen dürftigen Bachlauf entdeckt.

* [Das Wasser den Tieren zu trinken geben](#rast-wasser-geben)
* [Lieber kein Risiko eingehen und weiterziehen](#oede-weiterreise)

# Brackiges Wasser {#rast-wasser-geben}

Das Wasser schwächt die Zugtiere eher, als dass es hilft. Der Tross verliert wertvolle Zeit und hinkt dem Zeitplan hinterher. Die Unruhe unter den Kutschern wächst.

* [Weiterziehen durch die karge Ödnis](#das-biest)

# Schatten gegen die Sonne {#oede-weiterreise}

Ihr marschiert ohne große Pause durch die drückende Stille. Die Männer flüstern nervös. In den schartigen Felsen, die den Pass säumen, scheinen sich die Schatten entgegen der Sonne zu bewegen. Ein tiefes, kehliges Knurren hallt von den Felswänden wider - verzerrt und unheilvoll.

* [Waffen bereithalten und die Wachsamkeit schärfen](#das-biest)
* [Den Schauer ignorieren und die Karawane vorwärts treiben](#das-biest)

# Das Biest {#das-biest}

Plötzlich bricht eine schreckliche Bestie aus den Schatten hervor. Mit peitschenartigen Tentakeln auf dem Rücken und einer täuschenden Aura greift sie den Wagenzug an. Ihr werdet vollkommen überrascht - ein Kampf ist unvermeidbar.

* [Den Kampf gegen das unheimliche Wesen aufnehmen](#kampf-biest)

# Der Kampf am Pass {#kampf-biest}

Sie steht nie ganz dort, wo sie zu stehen scheint, und das merkst du erst am ersten Fehlschlag.

!combat schattenbestie
  win  -> biest-besiegt
  flee [Dich zur Wagenburg zurückkämpfen](#biest-flucht) Du gibst den Pass auf und nimmst die Kutscher mit.

# Die Bestie fällt {#biest-besiegt}

Mit einem letzten Hieb streckst du die unheimliche Bestie nieder. Die unmittelbare Bedrohung auf dem Pass ist fürs Erste abgewendet.

* [Das Lager für die zweite Nacht aufschlagen](#tag-2-nacht)

# Mit knapper Not {#biest-flucht}

Mit knapper Not gelingt es dir, der Bestie zu entkommen und dich zurück zur Wagenburg zu kämpfen.

* [Das Lager für die zweite Nacht aufschlagen](#tag-2-nacht)
* [Hier könnt ihr nicht bleiben, es ist nicht sicher - sofort weiterziehen](#weiterziehen)

# Marsch durch die Nacht {#weiterziehen}

Niemand widerspricht dir. Die Kutscher spannen die Tiere wieder an, und der Zug rollt weiter, während hinter euch im Geröll etwas mitgeht, das keine Schritte macht. Geschlafen wird in dieser Nacht nicht.

~ wachen_fails = 3

* [Trotz Erschöpfung weitermarschieren](#nacht-2-auswertung)

# Tag 2: Die Wagenburg {#tag-2-nacht}

Wieder wird die Wagenburg errichtet, diesmal enger, mit den Deichseln nach außen.

* [Dem müden Körper eine kurze Pause gönnen](#kaelte-1)
* [Direkt die Wache antreten](#kaelte-1)

# Die erste Hälfte der Nacht {#kaelte-1}

Die Kälte und die Erschöpfung kriechen in deine Knochen.

{ test("athletik") }
  -> kaelte-2
{ else }
  ~ wachen_fails = wachen_fails + 1

Du merkst, wie dir die Augen zufallen, und du hast noch Stunden vor dir.

* [Dich ans Feuer setzen und die Kälte bekämpfen](#kaelte-1-zehrt)
* [Über den Lagerplatz gehen, um wach zu bleiben](#kaelte-1-zehrt)

# Am Feuer {#kaelte-1-zehrt}

{ roll(2,6) <= 5 }
  Ein plötzlicher Schwächeanfall überkommt dich.
  ~ fatigue = fatigue + 1
{ else }
  Du kämpfst gegen die Müdigkeit an.

* [Die zweite Hälfte der Wache antreten](#kaelte-2)

# Die zweite Hälfte der Nacht {#kaelte-2}

Die Dunkelheit drückt schwer auf dein Gemüt.

{ test("athletik") }
  -> kaelte-3
{ else }
  ~ wachen_fails = wachen_fails + 1

Dein Kopf sackt vornüber, und du reißt ihn wieder hoch.

* [Die Glieder durchschütteln und gegen das Einnicken kämpfen](#kaelte-2-zehrt)
* [Einen Schluck aus der Feldflasche nehmen](#kaelte-2-zehrt)

# Gegen das Einnicken {#kaelte-2-zehrt}

{ roll(2,6) <= 5 }
  Deine Glieder werden bleischwer.
  ~ fatigue = fatigue + 1
{ else }
  Du hältst dich wacker auf den Beinen.

* [Die letzte Schicht vor Sonnenaufgang durchstehen](#kaelte-3)

# Die letzten Stunden {#kaelte-3}

Die letzten Stunden vor dem Morgengrauen sind die kältesten.

{ test("athletik") }
  -> nacht-2-auswertung
{ else }
  ~ wachen_fails = wachen_fails + 1

Der Frost sitzt dir mittlerweile im Rücken, und der Osten ist noch immer schwarz.

* [Die Zähne zusammenbeißen und das Morgengrauen abwarten](#kaelte-3-zehrt)
* [Dich an einen Wagen lehnen und durchhalten](#kaelte-3-zehrt)

# Bis zum Morgengrauen {#kaelte-3-zehrt}

{ roll(2,6) <= 5 }
  Die Kälte lässt deinen Körper erzittern.
  ~ fatigue = fatigue + 1
{ else }
  Du überstehst die Wache knapp.

* [Die Nacht beenden und auswerten](#nacht-2-auswertung)

# Die zweite Nacht {#nacht-2-auswertung}

{ wachen_fails >= 1 }
  Die Nacht war körperlich zehrend. Du konntest dich nicht richtig erholen.
{ else }
  Du hast der Erschöpfung getrotzt und die Nacht gut überstanden.

~ wachen_fails = 0

* [Den Weg für den dritten Tag erkunden](#tag-3-entscheidung)

# Tag 3: Die Weggabelung {#tag-3-entscheidung}

Am dritten Tag steht der Wagenzug vor einer Weggabelung.

{ fatigue >= 2 }
  Du siehst die beiden Wege durch einen Schleier aus zwei durchwachten Nächten. Deine Beine gehören dir nur noch teilweise, und jede der beiden Richtungen sieht nach demselben Elend aus.
{ else }
  Du bist müde, aber klar im Kopf, und siehst den beiden Wegen an, welcher von ihnen wovon zu viel hat.

Von den sieben Wägen rollen noch {waegen}, im Beutel klimpern {gold} Goldmünzen. Was in Graufurt daraus wird, rechnet Olric aus, nicht du.

{ ruf >= 1 }
  Die Anführer der Karawane blicken dich fragend an, und sie tun es, als sei die Antwort verbindlich. Du hast dich als jemand gezeigt, der die Fracht abliefert.
{ ruf <= -1 }
  Die Anführer der Karawane blicken dich fragend an, aber einer von ihnen sieht dabei erst zu dir und dann zum zweiten Wagen. Jemand hat gestern nacht Stimmen gehört.
{ else }
  Die Anführer der Karawane blicken dich fragend an. Sie kennen dich seit drei Tagen und haben sich noch keine Meinung gebildet.

Welchen Weg soll die Gruppe einschlagen?

* [Den steilen Pfad durch die Berge wählen](#route-berge)
* [Den Weg durch die morastigen Täler wählen](#route-taeler)

# Der Pfad durch die Berge {#route-berge}

Ihr entscheidet euch für den steilen und gefährlichen Pfad durch die unwegsamen Berge. Die Kutscher legen Steine unter die Räder, bevor der erste Wagen die Steigung nimmt, und keiner von ihnen sieht noch einmal zurück.

Hier endet Akt I.

-> END

# Der Weg durch die Täler {#route-taeler}

Ihr entscheidet euch für den schlammigen und tückischen Weg durch die morastigen Täler. Der Boden gibt schon unter dem ersten Rad nach, und der Nebel steht so tief, dass die Spitze des Zuges nach zwanzig Schritten verschwunden ist.

Hier endet Akt I.

-> END

# Am Wegrand {#tod}

Es geht schneller, als du gedacht hast. Der Boden ist auf einmal sehr nah, und der Lärm wird leiser, als hätte jemand die Karawane weitergeschoben und dich vergessen.

Die Kutscher heben dich nicht auf. Ihr Überleben wird nicht vergütet, deines auch nicht.

-> END
