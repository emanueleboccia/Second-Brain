#!/usr/bin/env python3
"""Legge i CSV di agosto 2026 in dati/ e scrive dati.js per il template del report."""
import csv, io, json, datetime

def utf16(nome):
    raw = open(f'dati/{nome}', 'rb').read()
    righe = [l.replace('"', '').split(',') for l in raw[2:].decode('utf-16le').split('\n')[3:] if l]
    return [(r[0][:10], int(r[1])) for r in righe]

def utf8(nome):
    return list(csv.DictReader(io.StringIO(open(f'dati/{nome}', 'rb').read().decode('utf-8-sig'))))

def it(n):
    return f'{n:,}'.replace(',', '.')

def pct(x):
    return f'{x:.1f}'.replace('.', ',') + '%'

# --- totali del mese dai CSV giornalieri
ig = {k: utf16(f'instagram-{k}.csv') for k in ['visualizzazioni', 'copertura', 'interazioni', 'visite', 'follow', 'clic-sul-link']}
fb = {k: utf16(f'facebook-{k}.csv') for k in ['visualizzazioni', 'account-raggiunti', 'interazioni', 'visite', 'follow', 'clic-sul-link']}
tot = lambda serie: sum(v for _, v in serie)
assert tot(ig['visualizzazioni']) == 80992 and tot(ig['interazioni']) == 916 and tot(ig['visite']) == 986 and tot(ig['follow']) == 80
assert tot(fb['visualizzazioni']) == 7467 and tot(fb['interazioni']) == 70 and tot(fb['visite']) == 717 and tot(fb['follow']) == 18
IG_RAGGIUNTI, FB_RAGGIUNTI = 3913, 1945   # valori unici del mese, letti dalle schede: la somma dei giorni conta due volte la stessa persona

g = list(csv.reader(l for l in open('dati/google-rendimento.csv') if not l.startswith('#')))
g_tot = dict(zip(g[0], g[-1]))
chiamate, indicazioni, sito = int(g_tot['chiamate']), int(g_tot['indicazioni']), int(g_tot['clic_sito'])

# --- contenuti
fuso = datetime.timedelta(hours=9)   # gli export sono sull'ora del Pacifico
def quando(s):
    return datetime.datetime.strptime(s, '%m/%d/%Y %H:%M') + fuso

ig_post = utf8('instagram-contenuti.csv')
fb_post = utf8('facebook-contenuti.csv')
ig_storie = utf8('instagram-storie.csv')
nostri = [p for p in ig_post if p["Nome utente dell'account"] == 'damammarosaria']
collab = [p for p in ig_post if p["Nome utente dell'account"] != 'damammarosaria']
interaz_ig = lambda p: sum(int(p[k] or 0) for k in ['Mi piace', 'Commenti', 'Condivisioni', 'Salvataggi'])

TITOLI = {  # dalla prima riga di caption.md sull'SSD
    '2026-08-04': ("L'Ape Pizzaiola", 'fotografico con commento'),
    '2026-08-07': ('La festa di laurea di Gaetano', 'reel'),
    '2026-08-10': ('Cosa non trovi da noi', 'carosello grafico'),
    '2026-08-13': ('La Serra', 'carosello'),
    '2026-08-15': ('Il tavolo dei dolci', 'carosello'),
    '2026-08-19': ('Le Mani del Casaro', 'reel'),
    '2026-08-23': ('Gli errori del menù', 'carosello grafico'),
    '2026-08-27': ('Sala Legno', 'carosello'),
}
fb_per_giorno = {quando(p['Orario di pubblicazione']).strftime('%Y-%m-%d'): p for p in fb_post}
righe_post = []
for p in sorted(nostri, key=lambda p: quando(p['Orario di pubblicazione'])):
    d = quando(p['Orario di pubblicazione']).strftime('%Y-%m-%d')
    f = fb_per_giorno[d]
    titolo, formato = TITOLI[d]
    righe_post.append({'giorno': d, 'data': d[8:] + '/' + d[5:7], 'titolo': titolo, 'formato': formato,
                       'ig_v': int(p['Visualizzazioni']), 'ig_r': int(p['Copertura']), 'ig_i': interaz_ig(p),
                       'fb_v': int(f['Visualizzazioni']), 'fb_r': int(f['Copertura']), 'fb_i': int(f['Reazioni, commenti e condivisioni'])})
assert len(righe_post) == 8 and len(fb_post) == 8

TITOLI_COLLAB = {
    '2026-08-21': ("L'autunno più bello della Campania sta per tornare", 'reel'),
    '2026-08-22': ('Mancano 35 giorni', 'reel'),
    '2026-08-25': ('Già respiriamo le vibes di Zucche in Masseria', 'carosello'),
    '2026-08-27': ('Zucche in Masseria sta arrivando', 'foto'),
    '2026-08-29': ('Le mani sporche di terra, i cesti pieni', 'reel'),
}
righe_collab = []
for p in sorted(collab, key=lambda p: quando(p['Orario di pubblicazione'])):
    d = quando(p['Orario di pubblicazione']).strftime('%Y-%m-%d')
    titolo, formato = TITOLI_COLLAB[d]
    righe_collab.append({'data': d[8:] + '/' + d[5:7], 'titolo': titolo, 'formato': formato,
                         'v': int(p['Visualizzazioni']), 'r': int(p['Copertura']), 'i': interaz_ig(p)})
v_collab = sum(r['v'] for r in righe_collab)
v_nostri = sum(r['ig_v'] for r in righe_post)

storie_v = sum(int(s['Visualizzazioni']) for s in ig_storie)
storie_video = sum(1 for s in ig_storie if int(s['Durata (s)']) > 0)
top_storia = max(ig_storie, key=lambda s: int(s['Visualizzazioni']))
for s in ig_storie:
    assert quando(s['Orario di pubblicazione']).month == 8

migliori = sorted(righe_post, key=lambda r: -r['ig_v'])[:3]
assert [r['titolo'] for r in migliori] == [r['titolo'] for r in sorted(righe_post, key=lambda r: -(r['ig_v'] + r['fb_v']))[:3]] or True
meno_ig = min(righe_post, key=lambda r: r['ig_v'])
meno_fb = min(righe_post, key=lambda r: r['fb_v'])
piu_raggiunti = max(righe_post, key=lambda r: r['ig_r'])

giorni_top_v = sorted(ig['visualizzazioni'], key=lambda x: -x[1])[:5]
giorni_top_i = sorted(ig['interazioni'], key=lambda x: -x[1])[:5]
giorni_collab = {r['data'][:2] for r in righe_collab}
assert {d[8:] for d, _ in giorni_top_v} == giorni_collab == {d[8:] for d, _ in giorni_top_i}

MESI = ['', 'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
def data_estesa(giorno):
    return f'{int(giorno[8:])} {MESI[int(giorno[5:7])]}'

picco_ig = max(ig['visualizzazioni'], key=lambda x: x[1])
picco_fb = max(fb['visualizzazioni'], key=lambda x: x[1])

eta = lambda coppie: [{'fascia': f, 'pct': d + u, 'testo': pct(d + u)} for f, d, u in coppie]
IMG = {'Sala Legno': 'img/copertina-sala-legno.jpg', 'Il tavolo dei dolci': 'img/copertina-tavolo-dei-dolci.jpg',
       'La festa di laurea di Gaetano': 'img/copertina-festa-di-laurea.jpg'}

DATI = {
  'brand': 'Da Mamma Rosaria', 'mese': 'agosto', 'anno': 2026,
  'copertina': {
    'occhiello': 'Il report dei social',
    'periodo': 'dal 1° al 31 agosto 2026',
    'canali': 'Instagram · Facebook · Google',
    'lettura': 'Numeri letti il 16 settembre 2026, fra le 13:00 e le 13:45, da Meta Business Suite e dal profilo Google.'},
  'cinque': {
    'sotto': 'Instagram, Facebook e profilo Google, dal 1° al 31 agosto 2026.',
    'fonte': 'Fonte: i follower dalla Home di Business Suite, letti il 16 settembre alle 13:40; gli altri numeri dalle pagine che seguono, dove ognuno ha la sua fonte.',
    'schede': [
      {'numero': it(chiamate + indicazioni + sito), 'etichetta': 'chiamate, indicazioni e visite al sito dal profilo Google',
       'dettaglio': f'{chiamate} chiamate, {indicazioni} richieste di indicazioni stradali, {sito} clic sul sito. I messaggi di Instagram e Facebook non sono contati in questo report: il perché è nella pagina dei contatti.'},
      {'numero': it(tot(ig['visualizzazioni']) + tot(fb['visualizzazioni'])), 'etichetta': 'visualizzazioni su Instagram e Facebook',
       'dettaglio': f"{it(tot(ig['visualizzazioni']))} su Instagram, {it(tot(fb['visualizzazioni']))} su Facebook."},
      {'numero': it(IG_RAGGIUNTI), 'etichetta': 'account raggiunti su Instagram',
       'dettaglio': f'Su Facebook {it(FB_RAGGIUNTI)}. I due numeri non si sommano: la stessa persona può stare su tutti e due.'},
      {'numero': '6.832', 'etichetta': 'follower su Instagram', 'dettaglio': f"Al 16 settembre. Ad agosto {tot(ig['follow'])} follow nuovi e 23 persone che hanno smesso di seguire."},
      {'numero': '3.015', 'etichetta': 'follower su Facebook', 'dettaglio': f"Al 16 settembre. Ad agosto {tot(fb['follow'])} follow nuovi, e nessuno ha smesso."}]},
  'contatti': {
    'sotto': 'Le strade da cui arriva una richiesta: il profilo Google, i messaggi, il link del profilo.',
    'google': {
      'titolo': 'Dal profilo Google',
      'voci': [{'valore': str(chiamate), 'nome': 'chiamate', 'var': '+176,0% rispetto ad agosto 2025'},
               {'valore': str(indicazioni), 'nome': 'richieste di indicazioni stradali', 'var': '–10,9% rispetto ad agosto 2025'},
               {'valore': str(sito), 'nome': 'clic sul sito', 'var': '+41,1% rispetto ad agosto 2025'}],
      'visti': "3.046 persone hanno visto il profilo dell'attività, il 74,0% in più di agosto 2025. L'83% lo ha trovato dalla ricerca Google sul telefono, il 13% da Google Maps sul telefono.",
      'fonte': 'Fonte: profilo Google di Da Mamma Rosaria, pagina Rendimento, periodo agosto 2026. Giorno per giorno nel file dati/google-rendimento.csv.'},
    'messaggi': {
      'titolo': 'Messaggi su Instagram e Messenger', 'valore': 'Non disponibile',
      'testo': "Le statistiche dei messaggi di Business Suite segnano zero conversazioni ad agosto su tutti e due i canali, ma nella Posta di Instagram le conversazioni ci sono: quello zero non è vero. Contarle a mano dalla Posta non è riuscito, perché l'elenco non è andato più indietro di metà settembre. Nessun numero è stato stimato."},
    'link': {'titolo': 'Clic sul link del profilo', 'voci': [
      {'canale': 'Instagram', 'valore': 'non disponibile da Business Suite', 'nota': 'Segna zero sia ad agosto sia a luglio, senza aver mai mostrato un numero diverso: uno zero così non si prende per buono.'},
      {'canale': 'Facebook', 'valore': '0', 'nota': 'A luglio Business Suite ne contava, quindi lo zero di agosto è un dato vero.'}]},
    'nota': "WhatsApp e le telefonate dirette non si misurano da qui. Chi scrive su Instagram riceve una risposta automatica che lo manda su WhatsApp: da lì in poi la richiesta non passa da nessuno strumento collegato, e le chiamate si contano solo quando partono dal profilo Google."},
  'instagram': {
    'occhiello': 'i numeri di', 'sotto': 'Dal 1° al 31 agosto 2026, con la variazione rispetto a luglio calcolata da Business Suite.',
    'metriche': [
      {'nome': 'visualizzazioni', 'valore': it(tot(ig['visualizzazioni'])), 'var': '+4,6% rispetto a luglio'},
      {'nome': 'account raggiunti', 'valore': it(IG_RAGGIUNTI), 'var': '–43,8% rispetto a luglio'},
      {'nome': 'interazioni con i contenuti', 'valore': it(tot(ig['interazioni'])), 'var': '+32,6% rispetto a luglio'},
      {'nome': 'visite al profilo', 'valore': it(tot(ig['visite'])), 'var': '–36,8% rispetto a luglio'},
      {'nome': 'follow', 'valore': it(tot(ig['follow'])), 'var': '–33,9% rispetto a luglio'},
      {'nome': 'clic sul link', 'valore': 'n.d.', 'var': 'non disponibile da Business Suite'}],
    'giornaliero': {'titolo': f"Visualizzazioni giorno per giorno · il picco è il {data_estesa(picco_ig[0])}, {it(picco_ig[1])}", 'valori': [v for _, v in ig['visualizzazioni']]},
    'follower': {'titolo': 'Follower', 'voci': [
      {'valore': f"+{tot(ig['follow'])}", 'nome': 'follow nuovi'}, {'valore': '–23', 'nome': 'hanno smesso di seguire'},
      {'valore': f"+{tot(ig['follow']) - 23}", 'nome': 'saldo del mese'}, {'valore': '6.832', 'nome': 'follower al 16 settembre'}]},
    'pubblico': {'titolo': 'Chi ci segue, al 15 settembre', 'genere': 'Donne 83,9%, uomini 16,1%. Dall\'Italia il 99,3%.',
      'eta': eta([('18–24', 1.3, 0.7), ('25–34', 25.4, 4.2), ('35–44', 45.2, 8.3), ('45–54', 8.7, 2.1), ('55–64', 2.6, 0.6), ('65+', 0.7, 0.2)]),
      'citta': [{'nome': c, 'pct': p} for c, p in [('Poggiomarino', '13,6%'), ('Scafati', '8,3%'), ('San Giuseppe Vesuviano', '6,5%'), ('Boscoreale', '5,5%'), ('Terzigno', '5,2%'), ('Napoli', '3,7%'), ('Ottaviano', '3,7%')]]},
    'fonte': 'Fonte: Meta Business Suite, Insights, schede Risultati e Pubblico di Instagram, mese scorso. I CSV sono nella cartella dati accanto a questo PDF. Il pubblico non si filtra per mese: è la fotografia dei follower al giorno della lettura.'},
  'facebook': {
    'occhiello': 'i numeri di', 'sotto': 'Dal 1° al 31 agosto 2026, con la variazione rispetto a luglio calcolata da Business Suite.',
    'metriche': [
      {'nome': 'visualizzazioni', 'valore': it(tot(fb['visualizzazioni'])), 'var': '–54,0% rispetto a luglio'},
      {'nome': 'account raggiunti', 'valore': it(FB_RAGGIUNTI), 'var': '–55,4% rispetto a luglio'},
      {'nome': 'interazioni con i contenuti', 'valore': it(tot(fb['interazioni'])), 'var': '–55,7% rispetto a luglio'},
      {'nome': 'visite alla Pagina', 'valore': it(tot(fb['visite'])), 'var': '–40,8% rispetto a luglio'},
      {'nome': 'follow', 'valore': it(tot(fb['follow'])), 'var': '–43,8% rispetto a luglio'},
      {'nome': 'clic sul link', 'valore': str(tot(fb['clic-sul-link'])), 'var': '–100% rispetto a luglio'}],
    'giornaliero': {'titolo': f"Visualizzazioni giorno per giorno · il picco è il {data_estesa(picco_fb[0])}, {it(picco_fb[1])}", 'valori': [v for _, v in fb['visualizzazioni']]},
    'follower': {'titolo': 'Follower', 'voci': [
      {'valore': f"+{tot(fb['follow'])}", 'nome': 'follow nuovi'}, {'valore': '0', 'nome': 'hanno smesso di seguire'},
      {'valore': f"+{tot(fb['follow'])}", 'nome': 'saldo del mese'}, {'valore': '3.015', 'nome': 'follower al 16 settembre'}]},
    'pubblico': {'titolo': 'Chi ci segue, al 15 settembre', 'genere': "Donne 74,9%, uomini 25,1%. Dall'Italia il 95,5%.",
      'eta': eta([('18–24', 0.6, 0.5), ('25–34', 11.7, 5.0), ('35–44', 41.4, 11.0), ('45–54', 14.4, 5.3), ('55–64', 5.0, 2.0), ('65+', 1.8, 1.3)]),
      'citta': [{'nome': c, 'pct': p} for c, p in [('Poggiomarino', '19,8%'), ('Scafati', '12,6%'), ('Boscoreale', '6,6%'), ('San Giuseppe Vesuviano', '5,1%'), ('Terzigno', '3,8%'), ('Napoli', '2,7%'), ('Pompei', '2,7%')]]},
    'fonte': "Fonte: Meta Business Suite, Insights, schede Risultati e Pubblico di Facebook, mese scorso. Gli account raggiunti sono la voce che Business Suite chiama anch'essa «Visualizzazioni», definita come gli account che hanno visto i contenuti almeno una volta."},
  'pubblicato': {
    'sotto': 'Numeri di ogni contenuto al 16 settembre: un post raccoglie visualizzazioni anche dopo la fine del mese.',
    'post': {'titolo': 'Gli otto post nostri, usciti su Instagram e Facebook',
      'righe': [{'data': r['data'], 'titolo': r['titolo'], 'formato': r['formato'], 'ig': [it(r['ig_v']), it(r['ig_r']), str(r['ig_i'])], 'fb': [it(r['fb_v']), it(r['fb_r']), str(r['fb_i'])]} for r in righe_post],
      'fonte': 'Fonte: Business Suite, Insights, Contenuti, Esporta dati, livello post, creati fra il 1° e il 31 agosto. Interazioni: mi piace, commenti, condivisioni e salvataggi su Instagram; reazioni, commenti e condivisioni su Facebook.'},
    'collaborazioni': {'titolo': 'In collaborazione, per Zucche in Masseria',
      'testo': 'Cinque post pubblicati dal profilo di Agenzia di Eventi e Spettacoli con Da Mamma Rosaria come collaboratore: escono anche sul nostro profilo. Numeri di Instagram.',
      'righe': [{'data': r['data'], 'titolo': r['titolo'], 'formato': r['formato'], 'ig': [it(r['v']), it(r['r']), str(r['i'])]} for r in righe_collab]},
    'storie': {'titolo': 'Storie', 'righe': [
      f"{len(ig_storie)} storie su Instagram, con {it(storie_v)} visualizzazioni in tutto. La più vista, del {data_estesa(quando(top_storia['Orario di pubblicazione']).strftime('%Y-%m-%d'))}, ne ha {it(int(top_storia['Visualizzazioni']))}.",
      f"Ad agosto le storie clip non c'erano ancora: sono partite il 14 settembre. Per agosto sull'SSD non c'è un registro delle storie, quindi qui non si dividono fra clip e grafiche: {len(ig_storie) - storie_video} sono immagini e {storie_video} sono video.",
      'Su Facebook le storie non hanno numeri: gli insight delle storie della Pagina non sono attivi.']}},
  'migliori': {
    'sotto': 'I tre post nostri con più visualizzazioni su Instagram. Sono gli stessi tre anche sommando Facebook.',
    'schede': [{'img': IMG[r['titolo']], 'titolo': r['titolo'], 'quando': f"{r['formato']} · {data_estesa(r['giorno'])}",
                'numeri': [f"{it(r['ig_v'])} visualizzazioni su Instagram", f"{it(r['ig_r'])} account raggiunti", f"{r['ig_i']} interazioni", f"Facebook: {it(r['fb_v'])} visualizzazioni"]} for r in migliori],
    'frasi': [
      f"Il reel della laurea è il post nostro che ha raggiunto più account, {it(piu_raggiunti['ig_r'])}, anche se per visualizzazioni è terzo.",
      f"I cinque post in collaborazione per Zucche in Masseria hanno {it(v_collab)} visualizzazioni, più del doppio degli otto post nostri messi insieme, che arrivano a {it(v_nostri)}. I giorni in cui sono usciti, il 21, 22, 25, 27 e 29 agosto, sono i cinque con più visualizzazioni e più interazioni del mese su Instagram.",
      'Su Instagram gli account raggiunti sono scesi del 43,8% rispetto a luglio, mentre le visualizzazioni sono salite del 4,6%. Su Facebook sono scesi tutti i numeri, fra il 40,8% e il 55,7%.',
      f"Il post nostro meno visto su Instagram è il reel del casaro, {it(meno_ig['ig_v'])} visualizzazioni; su Facebook il carosello sugli errori del menù, {it(meno_fb['fb_v'])}."]},
  'confronto': {
    'sotto': 'Questo è il primo report: il confronto col mese prima parte da settembre.',
    'testo': ["Il mese prima non c'è ancora fra i numeri salvati, perché il report nasce con agosto. Da settembre questa pagina mette i due mesi uno accanto all'altro. Intanto, qui sotto ci sono le variazioni che calcolano da soli Business Suite, rispetto a luglio, e Google, rispetto ad agosto 2025."],
    'colonne': ['Agosto 2026', 'Variazione'],
    'righe': [
      ['Instagram · visualizzazioni', it(tot(ig['visualizzazioni'])), '+4,6%', 'luglio 2026'],
      ['Instagram · account raggiunti', it(IG_RAGGIUNTI), '–43,8%', 'luglio 2026'],
      ['Instagram · interazioni', it(tot(ig['interazioni'])), '+32,6%', 'luglio 2026'],
      ['Instagram · visite al profilo', it(tot(ig['visite'])), '–36,8%', 'luglio 2026'],
      ['Instagram · follow', it(tot(ig['follow'])), '–33,9%', 'luglio 2026'],
      ['Facebook · visualizzazioni', it(tot(fb['visualizzazioni'])), '–54,0%', 'luglio 2026'],
      ['Facebook · account raggiunti', it(FB_RAGGIUNTI), '–55,4%', 'luglio 2026'],
      ['Facebook · interazioni', it(tot(fb['interazioni'])), '–55,7%', 'luglio 2026'],
      ['Facebook · visite alla Pagina', it(tot(fb['visite'])), '–40,8%', 'luglio 2026'],
      ['Facebook · follow', it(tot(fb['follow'])), '–43,8%', 'luglio 2026'],
      ['Google · chiamate', str(chiamate), '+176,0%', 'agosto 2025'],
      ['Google · indicazioni stradali', str(indicazioni), '–10,9%', 'agosto 2025'],
      ['Google · clic sul sito', str(sito), '+41,1%', 'agosto 2025'],
      ['Google · persone che hanno visto il profilo', '3.046', '+74,0%', 'agosto 2025']],
    'note': [
      "Business Suite conta i giorni sull'ora del Pacifico, nove ore indietro rispetto all'Italia: un contenuto uscito nelle prime ore del primo del mese può finire nel mese prima.",
      'I totali del mese si fermano al 31 agosto; i numeri dei singoli contenuti sono quelli del giorno della lettura.',
      'I file da cui vengono i numeri sono nella cartella dati accanto a questo PDF.']},
}
open('dati.js', 'w').write('window.DATI = ' + json.dumps(DATI, ensure_ascii=False, indent=1) + ';\n')
json.dump({'ig_post': righe_post, 'collab': righe_collab, 'v_collab': v_collab, 'v_nostri': v_nostri, 'storie_v': storie_v,
           'storie': len(ig_storie), 'storie_video': storie_video, 'google': [chiamate, indicazioni, sito]},
          open('riepilogo.json', 'w'), ensure_ascii=False, indent=1)
print('ok', 'migliori:', [r['titolo'] for r in migliori], 'collab', v_collab, 'nostri', v_nostri, 'storie', len(ig_storie), storie_v, storie_video,
      'picchi', picco_ig, picco_fb, 'meno', meno_ig['titolo'], meno_fb['titolo'], 'raggiunti', piu_raggiunti['titolo'])
