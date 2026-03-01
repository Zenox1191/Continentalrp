import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { db } from "./db";
import { rules } from "@shared/schema";

// Seed data function to populate initial staff and rules
async function seedDatabase() {
  // Delete all existing rules and re-seed them
  await db.delete(rules);

  const existingRules = await storage.getRules();
  if (existingRules.length === 0) {
    // 1. RP Alapvető Szabályok
    await storage.createRule({
      title: "1. RP Alapvető Szabályok",
      content: `Tilos az MG! (MetaGaming - OOC információ használata IC célokra)
Tilos a PG! (Járműben abban az esetben valósul meg PG, ha mindkét jármű álló helyzetben van és a vezetőnek nincsen lehetősége az élete kockáztatása nélkül elmenekülni.)
Tilos a DM! (DeathMatch - Indokolatlan támadás/gyilkosság)
Tilos az RK! (Revenge Kill - Bosszúból való ölés)
Tilos DB! (Csak az nem számít DB-nek, ha a saját életed megmentése céljából cselekszel, és nincsen más lehetőséged.)
Tilos az SK! (Side Kill - Oldalsó ölés)
Tilos a Force RP! (Nem erőltetheted rá a saját RP-det másokra. Kivéve ha ezt script teszi lehetővé. Tilos például egy cselekvésre képes emberre rákényszeríteni, hogy egy helyben maradjon!)
Tilos bármilyen nemű NonRP! (Non-Roleplay - Nem szerepjátékos viselkedés)
Kisebb NRK engedélyezett a szerveren! (Sportautóval is mehetsz kisebb dombokon, de kizárólag akkor, ha az autóra terepgumi van szerelve.)`,
      order: 1
    });

    // 2. Kommunikáció és Netikett
    await storage.createRule({
      title: "2. Kommunikáció és Netikett",
      content: `Discordon és ingame (a játékban) egyaránt érvényesek a Netikett szabályai:
- Ne írj csupa nagybetűvel
- Ne káromkodj / írj trágárul
- Ne használj túl sok írásjelet
- Ne sérts meg mást
Az OOC beszéd tiltott a szerveren!
A szerveren való játék alatt Discordon vagy más platformon kommunikálni tilos!
Kötelező a mikrofon használata!`,
      order: 2
    });

    // 3. Tiltott Viselkedések
    await storage.createRule({
      title: "3. Tiltott Viselkedések",
      content: `A szerveren zéró tolerancia van érvényben a következő RP szálak, történések tekintetében:
- Erőszakos, trágár, obszcén viselkedés (pl. azt RP-zed, hogy előveszed a nemi szervedet és azt másnak mutogatod)
Tilos bármilyen rendvédelmi ruhát felvenni, majd ezzel hivatalos személynek kiadni magadat!
Tilos a hullagyalázás minden formája!
Tilos bármilyen híresség nevének használata!
Tilos felkapni a válladra más játékost és úgy beülni a kétszemélyes autóba (motorokra ugyanúgy vonatkozik ez a szabályzat). Ha fel kaptál valakit a válladra, TILOS úgy lövöldözni, amíg válladon van!`,
      order: 3
    });

    // 4. Felismerés és Azonosítás
    await storage.createRule({
      title: "4. Felismerés és Azonosítás",
      content: `Ruházat alapján személyt/személyeket nem lehet felismerni (az arcáról felismerheted!), cselekményeket viszont hozzá lehet kötni személyekhez, frakciókhoz!
Tilos hang alapján felismerni valakit!
Tilos bárminemű felvételt készíteni admin/moderátor (vagy nálad magasabb rangú) emberről annak beleegyezése nélkül! A streamek, YouTube videók a kivételek közé sorolandók.`,
      order: 4
    });

    // 5. Jármű és Közlekedés
    await storage.createRule({
      title: "5. Jármű és Közlekedés",
      content: `Tilos tovább közlekedni, ha a defektes kerekek száma megegyezik az ép kerekek számával, vagy több azoknál. Kivéve, ha az életed forog kockán, de akkor is maximum 300 métert.
Tilos az autóval való átverés.
Tilos 150.000$ feletti készpénz elvétele, illetve az e feletti átverés. Ez nem vonatkozik fegyverekre, drogokra, fegyvertartozékokra! (Vagyis amennyiben illegális eszközzel kapcsolatos az üzletelés, úgy a másik fél megkárosítható 150.000$ többel is.)
Tilos a rendvédelmi valamint mentős járműveket ellopni, amennyiben az RP szál megköveteli, akkor el lehet tulajdonítani ezeket a gépjárműveket. (Például: csak ezzel tudsz elmenekülni a rendvédelmi dolgozók elől.)`,
      order: 5
    });

    // 6. Újraélesztés és Harc
    await storage.createRule({
      title: "6. Újraélesztés és Harc",
      content: `Amennyiben a közvetlen környékeden RP folyik, nem éledhetsz újra, kivéve, ha a mentős megállapította, hogy fejlövést kaptál, vagy egyéb halálos sérülésed van.
Lootolni, vagyis halottól értéket elvenni csak akkor lehet, ha te is részt vettél az adott RP-szálban. Ha utólag érsz a helyszínre, már nem lövöldözni (mert addigra lecsengett ez az rp-szál), vagy csak szimplán szétnézel a területen, az már nem számít részvételnek, így a korábbi halottaktól nem lootolhatsz. Ha járókelőként mész az utcán és látsz egy halottat, elsősorban inkább mentőt hívj, máskülönben nonRP történik (amennyiben lootolsz).`,
      order: 6
    });

    // 7. Frakció Szabályzat
    await storage.createRule({
      title: "7. Frakció Szabályzat",
      content: `Tilos a frakciók közötti "ugrálás"!
Egy frakcióból való kilépés során kötelező az info CK. (Az adott frakcióban történt eseményeket, akkor talált helyeket, megismert embereket el kell felejtened)
Kilépés után egy 4 napos FrakcióJump rang kerül rád. Ez idő alatt nem léphetsz be másik frakcióba!
A CK-zott személynek mindent el kell felednie az adott frakcióról, ellenkező esetben szankciót von maga után. (CK esetén MINIMUM 1 db admin jelenléte kötelező!)
Amennyiben a korrupció során súlyos bűncselekményt követ el és ezzel lebukik, arra a személyre kérhető a teljes karakter CK. (Fegyver/Pénzszállítás útvonal kiadása)`,
      order: 7
    });

    // 8. Védelem és Biztonság
    await storage.createRule({
      title: "8. Védelem és Biztonság",
      content: `A védelem megköveteli a felderítést, illetve annak lehetőség szerinti minimális veszteséget, illetve időtartamot! (A védett személy helyének felderítéséhez az admin/moderátor segítségét kérheted.)
Ha a védelem alatt álló személy helye egy tömegközlekedési eszközön vagy nyilvános helyen van, az engedélyezett az ellene való támadás, illetve az őrség nem avatkozhat közbe a védelem alatt álló személy mellett.
A védelem csak jogos és megfelelő körülmények között engedélyezett.
A védelem alatt álló személyt nem érheti váratlan vagy indokolatlan támadás.
A szerveren bármiféle texture pack használata engedélyezett! (Kivétel ami a fák, lombjai, bokrokat eltünteti)`,
      order: 8
    });

    // 9. Rendvédelmi és Mentős Szabályzat
    await storage.createRule({
      title: "9. Rendvédelmi és Mentős Szabályzat",
      content: `Munka közben tilos más játékosok megtámadása vagy más játékosokkal való agresszív viselkedés!
A munka elvégzésének időtartama alatt köteles vagy a munkádat végezni, nem tölthetsz időt felesleges cselekvésekkel vagy OOC kommunikációval!
Az igazoltatás minden esetben korrekt módon kell, hogy történjen, tisztelettudóan és az RP szabályokat betartva.
A rendőrök nem használhatnak visszaélő vagy önkényes erőszakot a játékosokkal szemben.
A rendőrök kötelesek segíteni a rászorulókon és a szabályokat betartatni.
A mentősök kötelesek a sérülteket megfelelően ellátni és szakszerűen kezelni.
Tilos a mentősöknek hamis vagy megtévesztő információt adni.
A mentősök nem szabad használni a munkájukat személyes haszonszerzésre.
Az életmentő cselekmények esetén megengedett a legmagasabb fokú RP és együttműködés.
Szigorúan tilos PP jegyet elvenni másik játékostól!`,
      order: 9
    });

    // 10. Tiltások és Általános Szabályok
    await storage.createRule({
      title: "10. Tiltások és Általános Szabályok",
      content: `Tilos az adminnak / moderátornak való hazudás!
Tilos a bugkihasználás bármilyen formája!
Tilos visszaélni a helyzettel, például halottként újraéledni a tiltott helyeken.
Tilos ingatlanokon belül és forgalmas helyeken illegális cikkeket árulni, illetve eltulajdonítani.
A szerver Amerikai jogszabályok alapjaira épül.
A HQ raid és HQ camp engedélyezett, ha annak nyomós indoka van, és egy hosszú RP-történet előzi meg, amely során kiderítettétek, kikre is támadtok, miért, valóban ott-e a székhelyük, tényleg ők jelentettek-e veszélyt rátok stb.
A szabályzat nem ismerete nem mentesít a szankció alól!
A Változtatás jogát fenntartjuk!`,
      order: 10
    });
  }

  const existingStaff = await storage.getStaff();
  if (existingStaff.length === 0) {
    const staffMembers = [
      { name: "Olivér", role: "Owner", order: 1 },
      { name: "Dávid", role: "Owner", order: 2 },
      { name: "Erik", role: "Server Manager", order: 3 },
      { name: "LA", role: "Developer", order: 4 },
      { name: "Dominik", role: "Developer", order: 5 },
      { name: "Zenox", role: "Developer", order: 6 },
      { name: "Bálint", role: "Developer", order: 7 },
    ];
    
    for (const member of staffMembers) {
      await storage.createStaff(member);
    }
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed the database at startup
  seedDatabase().catch(console.error);

  app.get(api.rules.list.path, async (req, res) => {
    const rules = await storage.getRules();
    res.json(rules);
  });

  app.get(api.staff.list.path, async (req, res) => {
    const staff = await storage.getStaff();
    res.json(staff);
  });

  return httpServer;
}
