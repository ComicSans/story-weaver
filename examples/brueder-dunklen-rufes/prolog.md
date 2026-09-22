---
title: Prolog - Der Abend vor dem Aufbruch
---

# Zum rostigen Nagel {#start}

Willkommen in der "Zivilisation" - oder dem, was in diesem feuchten, bewaldeten Hinterland noch davon übrig ist. Du befindest dich inmitten einer namenlosen Ansammlung schiefer Häuser, die sich krampfhaft an einen schlammigen Weg klammern.

Strahlende Rüstung ist nicht dein Stil. Wer den Helden spielt, stirbt jung und arm. Du denkst pragmatisch und verdienst dir deinen Lebensunterhalt für gewöhnlich auf der falschen Seite des Gesetzes, und zwar in der...

* [Schurkerei - klassisch, traditionsbewusst, hinterhältig](#erstellung-schurke)
* [Halunkerei - mit Hang zum Theatralischen und zu schmutzigen Tricks](#erstellung-halunke)
* [Gaunerei - Spezialgebiet: unauffälliger taktischer Rückzug](#erstellung-gauner)
* [Scharlatanerie - Verkauf von heißer Luft und falschen Hoffnungen](#erstellung-scharlatan)
* [Grabräuberei - Quereinstieg mit Affinität zu allem, was glänzt](#erstellung-grabraeuber)

# Schurkerei {#erstellung-schurke}

~ remember("SCHURKE")

"Ein solider Karrierepfad. Niemand mag Schurken, aber jeder braucht sie irgendwann", denkst du dir immer, um deine Entscheidungen nicht hinterfragen zu müssen.

-> auftraggeber

# Halunkerei {#erstellung-halunke}

~ remember("HALUNKE")

Warum ehrlich kämpfen, wenn man auch Sand in die Augen werfen kann? Das ist Effizienz.

-> auftraggeber

# Gaunerei {#erstellung-gauner}

~ remember("GAUNER")

Worte sind deine Waffen, und wenn die versagen, hast du immer noch sehr schnelle Beine. Beides hast du in der Vergangenheit oft genug unter Beweis gestellt.

-> auftraggeber

# Scharlatanerie {#erstellung-scharlatan}

~ remember("SCHARLATAN")

Du verkaufst den Leuten genau das, was sie hören wollen, und nimmst ihnen dafür das, was du haben willst.

-> auftraggeber

# Grabräuberei {#erstellung-grabraeuber}

~ remember("GRABRAEUBER")

Deine üblichen Klienten klagen selten über fehlendes Inventar. Diesmal aber ist dein Auftrag ein anderer.

-> auftraggeber

# Olric {#auftraggeber}

Das "Zum rostigen Nagel" ist weniger eine Schänke als vielmehr ein überdachter Bretterverschlag, in dem saures Bier ausgeschenkt wird. Der Qualm des Torffeuers beißt in die Augen, und es riecht nach nassem Hund.

Vor dir am klebrigen Holztisch sitzt Olric. Er ist der lokale Mittelsmann der Kaufmannsgilde, schwitzt stark und sieht aus, als hätte er seit Wochen nicht geschlafen. Er tippt nervös auf einen schweren Lederbeutel, der zwischen euch liegt.

* [Schweigen](#auftraggeber-abmachung) Du schweigst und wartest ab, wer als Erster nervös wird. Er ist es schon.
* [Nach dem Beutel greifen](#auftraggeber-abmachung) Deine Hand liegt auf dem Leder, bevor du darüber nachgedacht hast. Alte Gewohnheit.

# Die Abmachung {#auftraggeber-abmachung}

"Wir sind uns also einig", zischt Olric und beugt sich über den Tisch, was seinen unangenehmen Atem in deine Richtung weht. "Sieben Wägen. Voll beladen. Du und deine Leute eskortiert sie nach Graufurt. Das Land da draußen ist... unruhig."

Er schiebt dir den Beutel hinüber. Es klimpert schwer.

"Zehn Goldmünzen vorab. Fünf weitere für jeden Wagen, der Graufurt auf seinen eigenen Achsen erreicht. Wenn euch Banditen auflauern und ihr ihnen die Stiefel auszieht - eure Sache. Behaltet die Beute."

* [Nicken](#auftraggeber-kutscher)

# Die zehn Kutscher {#auftraggeber-kutscher}

Er hält inne und kratzt sich an der Nase. "Ach ja: die zehn Kutscher und Maultiertreiber... Ihr Überleben wird nicht vergütet. Mir egal, ob die in Graufurt ankommen, solange die Ladung unversehrt bleibt. Haben wir uns verstanden?"

~ gold = gold + 10

Du steckst das Gold unauffällig ein. Zehn Münzen sind zehn Münzen. Morgen bei Tagesanbruch geht es los. Der restliche Abend gehört dir.

* [Ein Bier bestellen und das Treiben im Schankraum beobachten](#schankraum)
* [Den mürrischen Wirt nach Gerüchten über die Route ausquetschen](#wirt)
* [Die Hütte des Dorfvorstehers aufsuchen - vielleicht gibt es Extras zu verdienen](#dorfvorsteher)
* [Nach draußen in den Schlamm treten und die Wägen inspizieren](#waegen-inspektion)

# Der Wirt {#wirt}

Der Wirt, ein stämmiger Kerl mit nur einem guten Auge, knallt dir einen Humpen hin, dessen Inhalt verdächtig nach trübem Wasser aussieht.

"Graufurt, was? Viel Glück. Der Wald ist in letzter Zeit hungrig", brummt er. "Gestern kamen Händler durch. Meinten, sie hätten seltsame Geräusche gehört. Aber wer weiß das schon? Hier schreit immer irgendwas." Er lacht ein trockenes, rasselndes Lachen.

Wirklich hilfreich war das nicht. Sein gutes Auge ruht jedoch mit einer unmissverständlichen Erwartungshaltung auf dem Bereich deines Gürtels, an dem dein Geldbeutel hängt. Einem Wirt in dieser Gegend fällt die Wahrheit offenbar nur gegen Vorkasse ein.

* {gold >= 1} [Ihm eine Goldmünze auf den feuchten Tresen schieben](#wirt-bestechung)
* [Ihn ignorieren, den Humpen nehmen und dich dem Schankraum zuwenden](#schankraum)

# Was eine Münze lichtet {#wirt-bestechung}

~ gold = gold - 1

Mit einer Geschwindigkeit, die man dem stämmigen Kerl nicht zugetraut hätte, verschwindet das Gold in seiner prankenartigen Hand.

"Erstaunlich, wie so ein bisschen glänzendes Metall den Nebel im Kopf lichtet", murmelt er und beugt sich über den Tresen, während er völlig unmotiviert mit einem schmutzigen Lappen über das Holz wischt. "Die Händler haben nicht nur was gehört. Sie haben Spuren gesehen. Keine Wölfe, keine Bären. Irgendjemand oder irgendetwas versteckt sich da draußen und wartet auf fette Beute."

Er senkt die Stimme noch ein wenig weiter. "Und pass auf deinen Rücken auf. Jemand anderes hat heute schon auffällig viele Fragen zu exakt euren sieben Wägen gestellt. Ein Kerl in einem absolut lächerlichen Flickenmantel. Scheint sich sehr für die Ladung zu interessieren."

Das war den Einsatz schon eher wert. Mit diesen Auskünften im Hinterkopf wendest du dich mit dem Humpen in der Hand dem Schankraum zu.

-> schankraum

# Sieben Planwagen im Regen {#waegen-inspektion}

Du verlässt die stinkende Schänke. Draußen regnet es leicht. Die sieben Planwagen stehen im Schlamm, abgedeckt mit schweren, nassen Planen. Ein paar der Kutscher spielen im Schutz eines Wagens Würfel. Sie sehen nicht so aus, als könnten sie ein Kurzschwert von einem Brotmesser unterscheiden. Olric hatte recht: Kanonenfutter.

Als du dich der Schänke wieder zuwendest, um nicht völlig durchnässt zu werden, bemerkst du durch das schmutzige Fenster, dass sich jemand an deinen Tisch gesetzt hat. Du gehst zurück hinein.

-> schankraum

# Crighton {#schankraum}

Der Schankraum ist mittlerweile gut gefüllt mit dubiosen Gestalten, die alle so aussehen, als hätten sie eine Rechnung mit dem Gesetz offen. Einiges los in diesem letzten Bollwerk der Zivilisation diesseits des Waldes. Du fragst dich, woher die Menschen kommen - auf dem Weg hierher hast du bestenfalls zehn Hütten gesehen.

An deinem Tisch sitzt jetzt ein Mann. Er ist gut in den Dreißigern, das Haar lichtet sich bereits, Dreitagebart, ungepflegt. Er trägt eine abenteuerlich zusammengestückelte Lederrüstung. An seiner Seite baumeln lässig ein Rapier und ein Messer - und er sieht aus, als wüsste er, wie man beides gleichzeitig benutzt. Über das Ganze hat er einen Flickenmantel geworfen, der in einem früheren Jahrzehnt vermutlich mal sehr edel war.

"Die Spatzen pfeifen es von den undichten Dächern", sagt er mit einem strahlenden, beinahe unverschämt sympathischen Lächeln. "Du bist der Geleitschutz für den morgigen Wagenzug. Crighton ist mein Name."

{ knows("SCHURKE") }
  Er mustert dich einen Augenblick. "Und von der alten Schurkenschule dazu. Man erkennt das an der Art, wie du den Rücken zur Wand setzt."
{ knows("HALUNKE") }
  Er mustert dich einen Augenblick. "Und mit Hang zur Halunkerei, wenn ich das richtig sehe. Du wirfst deinen Umhang, als hätte er Publikum."
{ knows("GAUNER") }
  Er mustert dich einen Augenblick. "Und im Gaunerfach zu Hause. Du hast beim Hereinkommen zuerst nach der Hintertür gesehen, nicht nach dem Bier."
{ knows("SCHARLATAN") }
  Er mustert dich einen Augenblick. "Und in der Scharlatanerie bewandert. Keine Sorge, ich kaufe dir nichts ab, und du mir hoffentlich auch nicht."
{ knows("GRABRAEUBER") }
  Er mustert dich einen Augenblick. "Und mit der Grabräuberei vertraut. Deine Fingernägel erzählen von Erde, die niemand freiwillig anfasst."

Er lehnt sich vor. "Ein ehrlicher Job, zweifellos. Aber unter uns Leuten vom Fach... warum sich für die paar Münzen von Olric abstrampeln?" Seine Stimme wird zu einem Flüstern. "Ich weiß aus sehr verlässlicher Quelle, dass auf einem der Wägen ein Artefakt geschmuggelt wird. Unschätzbar wertvoll. Wenn wir beide uns zusammentun, könnten wir auf der Reise eine kleine... Umverteilung des Reichtums vornehmen. Was meinst du?"

* ["Das Artefakt stehlen? Ich höre."](#crighton-allianz)
* ["Hör zu, Crighton. Ich habe einen Job. Und ich mag keine Überraschungen."](#crighton-ablehnung)
* ["Woher willst du das wissen, Flickenmann? Beweis es."](#crighton-bohren)
* [Typen wie ihn riechst du drei Meilen gegen den Wind - stumm umdrehen und ausweichen](#crighton-ausweichen)

# Ein dunkler Nischentisch {#crighton-ausweichen}

Du spürst auf etliche Schritte Entfernung, dass dieser Kerl nach unbezahlter Arbeit und viel Ärger riecht. Ohne auf sein Angebot einzugehen, schnappst du dir deinen Humpen, wendest dich stumm ab und ziehst dich an einen dunklen Nischentisch in der hintersten Ecke der Schänke zurück.

Crighton blickt dir einen Moment lang überrascht hinterher, schmunzelt dann amüsiert, zuckt mit den Schultern und wendet sich dem nächsten Würfelspiel am Nebentisch zu.

Du verbringst den Rest des Abends unauffällig im Schatten, meidest weiteren Blickkontakt und legst dich schließlich schlafen. Du hast das Gefühl, ein gutes Angebot verpasst zu haben - aber der Wald ist groß, und man sieht sich auf den engen Wegen meist öfter, als einem lieb ist.

-> reise-start

# Informationen sind sein Geschäft {#crighton-bohren}

~ remember("CRIGHTON")

Crighton lacht leise und tippt sich an die Schläfe. "Informationen sind mein Geschäft. Lass es mich so sagen: Die Kaufmannsgilde würde nicht zehn verzweifelte Kutscher als Ablenkung anheuern, wenn sie nur Rüben transportieren. Das Ding ist echt. Und wir beide könnten danach wie Könige leben."

Er schaut dich erwartungsvoll an. Die Gier in seinen Augen ist echt.

* ["Na schön. Sobald wir im Wald sind, machen wir gemeinsame Sache."](#crighton-allianz)
* ["Vergiss es. Ich liefere die Wägen ab, wie besprochen."](#crighton-ablehnung)

# Der Deal steht {#crighton-allianz}

~ remember("CRIGHTON")
~ remember("PARTNER")
~ ruf = ruf - 1

Crightons Lächeln wird noch breiter, falls das physisch überhaupt möglich ist. Er zwinkert dir zu.

"Ich wusste, dass in dir ein kluger Kopf steckt! Wir halten uns morgen bedeckt. Wenn der Wald dicht genug und die Wachen nervös genug sind, schlagen wir zu. Bis morgen im Schlamm, Partner!"

Er erhebt sich, schnippt dem Wirt eine Kupfermünze zu und verschwindet in den Schatten der Schänke.

Der Deal steht. Es wird Zeit, dich aufs Ohr zu hauen. Die Pritsche im Hinterzimmer wartet.

-> reise-start

# Prinzipien {#crighton-ablehnung}

~ remember("CRIGHTON")
~ ruf = ruf + 1

Crighton hebt beschwichtigend beide Hände, ohne dass sein Lächeln auch nur einen Millimeter verrutscht.

"Schon gut, schon gut! Jeder hat seine Prinzipien. Auch wenn deine furchtbar langweilig sind." Er erhebt sich langsam und rückt seinen Flickenmantel zurecht. "Falls der Wald deine Meinung ändert: Du weißt ja, wie ich aussehe. Man sieht sich auf der Straße."

Er schlendert pfeifend davon. Du schüttelst den Kopf. Es wird Zeit, etwas Schlaf zu finden. Die feuchte Pritsche, die du gemietet hast, ruft.

-> reise-start

# Die größte Hütte im Dorf {#dorfvorsteher}

Mehr Gold ist immer gut. Du kämpfst dich durch den Schlamm zur größten Hütte des Dorfes - was nicht viel heißt, sie hat lediglich ein Fenster mehr als die anderen.

Du klopfst. Die Tür öffnet sich einen Spalt, und ein Bediensteter mit einer Warze auf der Nase und der Freundlichkeit einer rostigen Bärenfalle sieht dich an.

"Der Vorsteher isst. Setz dich auf die Bank und warte." Die Tür knallt zu, bevor du antworten kannst.

* [Brav auf die nasskalte Holzbank setzen und warten](#dorfvorsteher-warten)
* {gold >= 1} [Dem Kerl eine Goldmünze durch den Türspalt anbieten](#dorfvorsteher-bestechen)
* [Erneut gegen die Tür hämmern](#dorfvorsteher-klopfen)
* [Das Ganze vergessen und lieber wieder zur Schänke gehen](#schankraum)

# Auf der Bank {#dorfvorsteher-warten}

{ visits(dorfvorsteher-warten) == 1 }
  Eine Stunde verstreicht. Ein feiner, eiskalter Nieselregen setzt ein und verwandelt deine Hose langsam in einen nassen Sack. Aus der Hütte weht hin und wieder der Duft von gebratenem Fleisch herüber.
{ visits(dorfvorsteher-warten) == 2 }
  Zwei Stunden. Es wird merklich kühler, und dein Hintern ist auf der harten Eichenbank komplett taub geworden. Aus dem Haus hörst du das Klappern von Geschirr, gefolgt von einem befriedigten Rülpsen.
{ visits(dorfvorsteher-warten) == 3 }
  Drei Stunden. Der Regen wird stetiger. Mittlerweile dringt ein tiefes, gleichmäßiges Schnarchen durch die Fensterspalten der Hütte. Der Vorsteher hält offensichtlich seinen Verdauungsschlaf.
{ else }
  Stunden sind vergangen. Die Nacht ist vollends eingebrochen. Du sitzt klatschnass und zitternd im Dunkeln vor einer Hütte, in der man dich genussvoll ignoriert. Dein Stolz liegt irgendwo im Schlamm.

Was tust du?

+ [Weiter geduldig warten - es muss sich doch irgendwann lohnen](#dorfvorsteher-warten)
* [Es reicht. Noch einmal laut gegen die Tür hämmern](#dorfvorsteher-klopfen)
* [Versuchen, das einfache Schloss der Hintertür zu knacken und hineinzuschleichen](#dorfvorsteher-schleichen)
* [Die Sinnlosigkeit deines Unterfangens einsehen und zur Schänke zurückkehren](#schankraum)

# Die Mistgabel {#dorfvorsteher-klopfen}

Du hämmerst mit der Faust gegen die dicke Holztür. Nach einem Moment scharrt es drinnen, und der warzige Bedienstete reißt die Tür auf. Diesmal hält er eine verrostete Mistgabel in der Hand und funkelt dich an.

"Sag mal, hackt's bei dir?", zischelt er. "Der Vorsteher geruht zu ruhen. Wenn du in drei Sekunden nicht von seinem Grund und Boden verschwunden bist, sorge ich persönlich dafür, dass du Manieren erfährst!"

Gegen eine wütend geführte Mistgabel ist mit klammen Fingern schwer zu argumentieren.

* [Den Rückzug antreten und zur Schänke stampfen](#schankraum)

# Bestechung wird hier nicht geduldet {#dorfvorsteher-bestechen}

~ gold = gold - 1

Du ziehst eine Goldmünze heraus und schnippst sie gegen das Holz der Tür. Der Bedienstete öffnet zögerlich noch einmal. Seine Augen verengen sich, als er das schimmernde Metall sieht.

Er nimmt die Münze blitzschnell an sich, steckt sie ein, sieht dich ernst an und sagt: "Der Vorsteher lässt ausrichten: Bestechung wird hier nicht geduldet." Die Tür knallt wieder zu.

Nun bist du um eine Goldmünze ärmer und immer noch keinen Schritt weiter.

* [Auf die Bank setzen und zähneknirschend warten](#dorfvorsteher-warten)
* [Frustriert zur Schänke zurückkehren](#schankraum)

# Zwei Hunde im Flur {#dorfvorsteher-schleichen}

Du schleichst im Schutz des Nieselregens um das Haus zur Hintertür. Ein kurzes Hantieren mit deinem Werkzeug, und das billige Schloss klackt leise auf.

Du schlüpfst hinein - nur um festzustellen, dass im dunklen Flur zwei riesige, bedrohlich knurrende Jagdhunde auf Strohballen liegen. Als einer von ihnen den Kopf hebt und die Zähne entblößt, beschließt du weise, dass dein Leben mehr wert ist als ein eventueller Extrabonus. Du schleichst schnellstmöglich wieder hinaus, bevor du als Abendessen endest.

* [Zur Schänke zurückkehren, bevor dich doch noch jemand bemerkt](#schankraum)

# Der Nebel am Morgen {#reise-start}

Der nächste Morgen ist genau so grausam, wie du ihn dir vorgestellt hast. Der Nebel ist so dick, dass man ihn in Scheiben schneiden und als Baumaterial verkaufen könnte.

Die zehn Kutscher und Maultiertreiber brüllen heiser durcheinander, während sie die Zugtiere vor die sieben schweren Wägen spannen. Die Holzräder knarren bedrohlich, als sich der Zug endlich, viel zu spät, in Bewegung setzt.

Du reihst dich ein. Irgendwo da draußen liegt der Wald. Dicht. Dunkel. Und wenn die Gerüchte stimmen, ziemlich tödlich.

Das Abenteuer hat begonnen.

-> akt-1.aufbruch
