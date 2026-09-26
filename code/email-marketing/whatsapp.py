# La lista WhatsApp per Selene: le scuole della lista che hanno un cellulare, dalla più vicina, ognuna con
# un link corto che apre WhatsApp col messaggio già scritto. Nata il 25/09/2026 per Zucche in Masseria.
#
# Uso: python3 code/email-marketing/whatsapp.py messaggi.json uscita.txt
#
# messaggi.json sta fuori dal vault, perché dentro ci possono essere i cellulari delle maestre:
#   {"intro": ["righe in cima alla lista, per Selene"],
#    "scuole": "il testo per le scuole",
#    "escludi_email": ["le email delle scuole che hanno già prenotato o detto di no, dal gestionale"],
#    "calde": [{"chi": "Nome, maestra di ...", "cellulare": "3331234567", "testo": "..."}]}
#
# I link si accorciano con TinyURL, e non è una scelta di comodo. Il 25/09/2026 Emanuele ha chiesto «un altro
# modo», e sono stati provati tutti: is.gd quel giorno non creava niente, da.gd rifiuta i link di WhatsApp,
# il link di prova di cleanuri dopo mezz'ora non esisteva più, e spoo.me a metà lista è finito sotto il
# filtro SafeWeb della rete TIM, che al suo posto mostra una pagina di blocco. Se Selene è su TIM, un link
# così non le si apre. TinyURL passa dappertutto. Quelli già fatti restano in messaggi-link.json, accanto a
# messaggi.json, e al giro dopo non si rifanno. Alla fine ogni link corto si apre e si controlla che porti
# esattamente al link lungo.
import csv, json, os, re, sys, time, urllib.error, urllib.parse, urllib.request

LISTA = os.path.join(os.path.dirname(__file__), '..', '..', 'areas', 'la-masseria-di-mezzautunno', 'email-marketing', 'scuole.csv')
UA = {'User-Agent': 'Mozilla/5.0'}


def lungo(cellulare, testo):
    return 'https://wa.me/39' + cellulare + '?text=' + urllib.parse.quote(testo)


def corto(url):
    for _ in range(10):
        req = urllib.request.Request('https://tinyurl.com/api-create.php?url=' + urllib.parse.quote(url, safe=''), headers=UA)
        try:
            s = urllib.request.urlopen(req, timeout=30).read().decode().strip()
            if s.startswith('https://tinyurl.com/'):
                return s
            raise SystemExit('TinyURL ha risposto: ' + s[:200])
        except urllib.error.HTTPError as e:
            if e.code != 429:
                raise SystemExit(f'TinyURL ha risposto {e.code}: {e.read()[:200]!r}')
            time.sleep(30)
        except OSError:  # rete assente, timeout: su Python 3.9 il timeout non è un TimeoutError
            # La rete del Mac a volte sparisce per qualche secondo: il 25/09/2026 ha fermato la lista a metà.
            time.sleep(30)
    raise SystemExit('TinyURL continua a non rispondere: i link fatti restano, si riprova più tardi')


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


def porta_a(short):
    opener = urllib.request.build_opener(NoRedirect)
    for _ in range(5):
        try:
            return opener.open(urllib.request.Request(short, method='HEAD', headers=UA), timeout=30).headers.get('Location')
        except urllib.error.HTTPError as e:
            return e.headers.get('Location')
        except OSError:  # rete assente, timeout: su Python 3.9 il timeout non è un TimeoutError
            time.sleep(10)


def scuole_col_cellulare(escludi):
    # Una riga per scuola, dalla più vicina. Se la stessa scuola ha due cellulari, il secondo è la riserva: la
    # stessa scuola vuol dire stesso nome, comune e grado. L'infanzia e la primaria di un plesso che si chiama
    # uguale, come Lanzara a Castel San Giorgio, sono due scuole, con due gruppi di maestre.
    scuole, visti = {}, set()
    for r in csv.DictReader(open(LISTA, encoding='utf-8')):
        cell = re.sub(r'\D', '', r['telefono'] or '')
        if (not cell.startswith('3') or cell in visti or r['email'].lower() in escludi
                or r['email_utilizzabile'].startswith('no: ha chiesto')):
            continue
        visti.add(cell)
        chiave = (r['nome'], r['comune'], r['tipo'])
        if chiave in scuole:
            scuole[chiave]['cellulari'].append(cell)
            continue
        scuole[chiave] = {'nome': r['nome'], 'grado': r['tipo'].split()[0], 'istituto': r['istituto'], 'comune': r['comune'],
                          'km': float(r['distanza_km'] or 99), 'cellulari': [cell]}
    return sorted(scuole.values(), key=lambda s: s['km'])


if __name__ == '__main__':
    m = json.load(open(sys.argv[1], encoding='utf-8'))
    archivio = os.path.splitext(sys.argv[1])[0] + '-link.json'
    fatti = json.load(open(archivio, encoding='utf-8')) if os.path.exists(archivio) else {}

    def link(cellulare, testo):
        lu = lungo(cellulare, testo)
        usati.append(lu)
        if lu not in fatti:
            fatti[lu] = corto(lu)
            json.dump(fatti, open(archivio, 'w', encoding='utf-8'), indent=1)
            print(len(fatti), fatti[lu], flush=True)
            time.sleep(1)
        return fatti[lu]

    usati = []
    righe = list(m.get('intro', [])) + ['']
    if m.get('calde'):
        righe.append('PRIMA LE MAESTRE CHE CI CONOSCONO')
        for c in m['calde']:
            righe.append(f"{c['chi']}: {link(c['cellulare'], c['testo'])}")
        righe.append('')
    righe.append('LE SCUOLE COL CELLULARE, DALLA PIÙ VICINA')
    escludi = {e.lower() for e in m.get('escludi_email', [])}
    for s in scuole_col_cellulare(escludi):
        ist = f", {s['istituto']}" if s['istituto'] else ''
        primo, *altri = [link(c, m['scuole']) for c in s['cellulari']]
        riserva = ''.join(f" · se non risponde, l'altro numero: {a}" for a in altri)
        righe.append(f"{s['nome']} ({s['grado']}){ist} · {s['comune']}: {primo}{riserva}")

    sbagliati = []
    for lu in dict.fromkeys(usati):
        if porta_a(fatti[lu]) != lu:
            sbagliati.append(fatti[lu])
        time.sleep(0.5)
    if sbagliati:
        raise SystemExit('Questi link corti non portano dove devono: ' + ', '.join(sbagliati))
    open(sys.argv[2], 'w', encoding='utf-8').write('\n'.join(righe) + '\n')
    print(f'{len(set(usati))} link, tutti controllati. Lista in {sys.argv[2]}')
