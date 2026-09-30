#!/usr/bin/env python3
"""Report social di agosto e settembre 2026 insieme: legge i file di dati/ e scrive dati.js per il template.

Scritto il 30/09/2026, quando Emanuele ha chiesto i due mesi insieme per Da Mamma Rosaria e, a parte, per la
Tenuta Don Gaetano. Si lancia dalla cartella di lavoro del brand:  python3 prepara_bimestre.py dmr|tdg
I controlli (assert) confrontano le somme dei file coi totali delle schede di Business Suite: se uno non torna,
lo script si ferma invece di stampare un numero sbagliato.
"""
import csv, io, json, sys, datetime

BRAND = sys.argv[1]
MESI = ['', 'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre',
        'ottobre', 'novembre', 'dicembre']


def it(n):
    return f'{n:,}'.replace(',', '.')


def pct(x, dec=1):
    return f'{x:,.{dec}f}'.replace(',', '#').replace('.', ',').replace('#', '.') + '%'


def var(a, b):
    """variazione da a verso b, col trattino breve per il meno (D-DIN non ha U+2212)"""
    if a == 0:
        return 'n.c.'
    v = (b - a) / a * 100
    return ('+' if v >= 0 else '–') + pct(abs(v))


def righe(nome):
    return [l for l in open(f'dati/{nome}', encoding='utf-8') if not l.startswith('#')]


def tabella(nome):
    return list(csv.DictReader(righe(nome), delimiter=';'))


def serie(nome):
    """le serie giornaliere: 61 valori dal 1° agosto, o 'MM-GG=v' dove Business Suite salta i giorni a zero"""
    out = {}
    for l in righe(nome):
        if l.startswith('metrica'):
            continue
        k, v = l.strip().split(';', 1)
        if '=' in v:
            d = {x.split('=')[0]: int(x.split('=')[1]) for x in v.split()}
            giorni = [(datetime.date(2026, 8, 1) + datetime.timedelta(i)).strftime('%m-%d') for i in range(61)]
            out[k] = [d.get(g, 0) for g in giorni]
        else:
            out[k] = [int(x) for x in v.split()]
        assert len(out[k]) == 61, (nome, k)
    return out


def letture():
    return {r['voce']: r['valore'] for r in tabella('letture-dalle-schede.csv')}


ago = lambda s: sum(s[:31])
sett = lambda s: sum(s[31:])
data_estesa = lambda i: f'{(datetime.date(2026, 8, 1) + datetime.timedelta(i)).day} {MESI[(datetime.date(2026, 8, 1) + datetime.timedelta(i)).month]}'
data_it = lambda g: f'{int(g[8:])} {MESI[int(g[5:7])]}'
etichette_asse = [{'i': 0, 'testo': '1 ago'}, {'i': 31, 'testo': '1 set'}, {'i': 61, 'testo': '30 set', 'fine': True}]


def pubblico(testo):
    """dalla riga di letture: genere, paese, età per sesso, città"""
    parti = [p.strip() for p in testo.split('·')]
    genere = f"{parti[0]}, {parti[1]}. Dall'Italia il {parti[2].split()[-1]}."
    i_d = next(i for i, p in enumerate(parti) if p.startswith('età donne'))
    donne = [float(parti[i_d].split()[-1].replace(',', '.'))] + [float(p.replace(',', '.')) for p in parti[i_d + 1:i_d + 6]]
    i_u = next(i for i, p in enumerate(parti) if p.startswith('età uomini'))
    uomini = [float(parti[i_u].split()[-1].replace(',', '.'))] + [float(p.replace(',', '.')) for p in parti[i_u + 1:i_u + 6]]
    i_c = next(i for i, p in enumerate(parti) if p.startswith('città'))
    citta_raw = [parti[i_c][len('città '):]] + parti[i_c + 1:i_c + 7]
    citta = [{'nome': c.rsplit(' ', 1)[0], 'pct': c.rsplit(' ', 1)[1] + '%'} for c in citta_raw]
    fasce = ['18–24', '25–34', '35–44', '45–54', '55–64', '65+']
    eta = [{'fascia': f, 'pct': d + u, 'testo': pct(d + u)} for f, d, u in zip(fasce, donne, uomini)]
    return genere, eta, citta


def canale(nome_canale, s, L, pref, reach_nome, visite_nome, var_link, pubb_testo, fonte, occhiello_sotto):
    v, r = s['visualizzazioni'], None
    reach2 = int(L[f'{pref}_account_raggiunti_ago_set'])
    reach_a, reach_s = int(L[f'{pref}_account_raggiunti_ago']), int(L[f'{pref}_account_raggiunti_set'])
    smesso_a, smesso_s = int(L[f'{pref}_smesso_ago']), int(L[f'{pref}_smesso_set'])
    follow = s['follow']
    picco = max(range(61), key=lambda i: v[i])
    genere, eta, citta = pubblico(pubb_testo)
    return {
        'occhiello': 'i numeri di', 'sotto': occhiello_sotto,
        'metriche': [
            {'nome': 'visualizzazioni', 'valore': it(sum(v)), 'var': f'agosto {it(ago(v))} · settembre {it(sett(v))}'},
            {'nome': f'{reach_nome}, unici nei due mesi', 'valore': it(reach2), 'var': f'agosto {it(reach_a)} · settembre {it(reach_s)}'},
            {'nome': 'interazioni con i contenuti', 'valore': it(sum(s['interazioni'])), 'var': f"agosto {it(ago(s['interazioni']))} · settembre {it(sett(s['interazioni']))}"},
            {'nome': visite_nome, 'valore': it(sum(s['visite'])), 'var': f"agosto {it(ago(s['visite']))} · settembre {it(sett(s['visite']))}"},
            {'nome': 'follow', 'valore': it(sum(follow)), 'var': f'agosto {it(ago(follow))} · settembre {it(sett(follow))}'},
            {'nome': 'clic sul link', 'valore': it(sum(s['clic_link'])), 'var': var_link}],
        'giornaliero': {'titolo': f'Visualizzazioni giorno per giorno · il picco è il {data_estesa(picco)}, {it(v[picco])}',
                        'valori': v, 'divisori': [31], 'etichette': etichette_asse},
        'follower': {'titolo': 'Follower', 'voci': [
            {'valore': f'+{it(sum(follow))}', 'nome': 'follow nuovi in due mesi'},
            {'valore': f'–{smesso_a + smesso_s}' if smesso_a + smesso_s else '0', 'nome': 'hanno smesso di seguire'},
            {'valore': f'+{it(sum(follow) - smesso_a - smesso_s)}', 'nome': 'saldo dei due mesi'},
            {'valore': it(int(L[f"follower_{pref}"])), 'nome': 'follower al 30 settembre'}]},
        'pubblico': {'titolo': 'Chi ci segue, al 30 settembre', 'genere': genere, 'eta': eta, 'citta': citta},
        'fonte': fonte}


# ---------------------------------------------------------------- Da Mamma Rosaria
def dmr():
    L = letture()
    ig, fb = serie('instagram-giornaliero.csv'), serie('facebook-giornaliero.csv')
    assert sum(ig['visualizzazioni']) == 489148 and sum(ig['interazioni']) == 7268 and sum(ig['visite']) == 8721 and sum(ig['follow']) == 1229
    assert sum(fb['visualizzazioni']) == 104468 and sum(fb['interazioni']) == 573 and sum(fb['visite']) == 6476 and sum(fb['follow']) == 206
    # agosto riletto oggi torna col report del 16 settembre
    assert ago(ig['visualizzazioni']) == 80992 and ago(ig['interazioni']) == 916 and ago(ig['visite']) == 986 and ago(ig['follow']) == 80
    assert ago(fb['visualizzazioni']) == 7467 and ago(fb['interazioni']) == 70 and ago(fb['visite']) == 717 and ago(fb['follow']) == 18

    g = {r['mese']: r for r in tabella('google-rendimento.csv')}
    ga, gs = g['2026-08'], g['2026-09']
    ch = [int(ga['chiamate']), int(gs['chiamate'])]
    ind = [int(ga['indicazioni']), int(gs['indicazioni'])]
    sito = [int(ga['clic_sito']), int(gs['clic_sito'])]
    visto = [int(ga['profilo_visto']), int(gs['profilo_visto'])]
    assert ch[1] + ind[1] + sito[1] == int(gs['interazioni']) == 1142

    # --- i post
    TITOLI = {
        '2026-08-04': ("L'Ape Pizzaiola", 'fotografico con commento'), '2026-08-07': ('La festa di laurea di Gaetano', 'reel'),
        '2026-08-10': ('Cosa non trovi da noi', 'carosello grafico'), '2026-08-13': ('La Serra', 'carosello'),
        '2026-08-15': ('Il tavolo dei dolci', 'carosello'), '2026-08-19': ('Le Mani del Casaro', 'reel'),
        '2026-08-23': ('Gli errori del menù', 'carosello grafico'), '2026-08-27': ('Sala Legno', 'carosello'),
        '2026-09-07': ('Gli angoli a vista', 'reel'), '2026-09-10': ('Quando si prenota la comunione', 'carosello grafico'),
        '2026-09-14': ('Il Primo Brindisi', 'carosello'), '2026-09-17': ('Il dizionario della festa', 'carosello grafico'),
        '2026-09-20': ('Il Banco del Territorio', 'reel'), '2026-09-23': ("L'Uliveto", 'carosello'),
        '2026-09-26': ('Gli allestimenti', 'carosello grafico'), '2026-09-29': ('Il Cannolo', 'carosello')}
    igp = tabella('instagram-post.csv')
    assert sum(int(p['visualizzazioni']) for p in igp) == 404005 and len(igp) == 37
    nostri_ig = {p['ora_italiana'][:10]: p for p in igp if p['account'] == 'damammarosaria'}
    collab = [p for p in igp if p['account'] != 'damammarosaria']
    fbp = {p['data']: p for p in tabella('facebook-post.csv')}
    assert len(fbp) == 16 and set(fbp) == set(TITOLI)
    inter_ig = lambda p: sum(int(p[k]) for k in ['mi_piace', 'commenti', 'condivisioni', 'salvataggi'])
    inter_fb = lambda p: sum(int(p[k]) for k in ['reazioni', 'commenti', 'condivisioni'])
    post = []
    for d in sorted(TITOLI):
        titolo, formato = TITOLI[d]
        p, f = nostri_ig.get(d), fbp[d]
        post.append({'giorno': d, 'titolo': titolo, 'formato': formato,
                     'ig_v': int(p['visualizzazioni']) if p else None, 'ig_r': int(p['copertura']) if p else None,
                     'ig_i': inter_ig(p) if p else None,
                     'fb_v': int(f['visualizzazioni']), 'fb_r': int(f['copertura']), 'fb_i': inter_fb(f)})
    assert len([x for x in post if x['ig_v'] is None]) == 2          # 26 e 29 settembre, usciti solo su Facebook
    righe_post = []
    for mese, pref in [('agosto · otto post', '2026-08'), ('settembre · otto post, sei su Instagram', '2026-09')]:
        righe_post.append({'mese': mese})
        for x in [x for x in post if x['giorno'].startswith(pref)]:
            r = {'data': x['giorno'][8:] + '/' + x['giorno'][5:7], 'titolo': x['titolo'], 'formato': x['formato'],
                 'fb': [it(x['fb_v']), it(x['fb_r']), str(x['fb_i'])]}
            if x['ig_v'] is None:
                r['ig'] = None
                r['ig_nota'] = 'non uscito su Instagram'
            else:
                r['ig'] = [it(x['ig_v']), it(x['ig_r']), str(x['ig_i'])]
            righe_post.append(r)

    CHI = {'funnyshow_spettacoli': 'Agenzia Eventi e Spettacoli', 'lamasseriadimezzautunno': 'Masseria di Mezz’autunno',
           'francescaannunziata17': 'francescaannunziata17', 'fiftyup_balloons': 'fiftyup_balloons'}
    FORMATO = {'Reel di Instagram': 'reel', 'Carosello di Instagram': 'carosello', 'Immagine di Instagram': 'foto'}

    def titolo_collab(t):
        """la prima frase della didascalia, al massimo 38 caratteri; le parole gridate tornano minuscole"""
        import re
        t = t.strip()
        m = re.match(r'(.+?[.!?…])(\s|$)', t)
        frase = (m.group(1) if m else t).rstrip('.')
        parole = [w.capitalize() if i == 0 and w.isupper() else (w.lower() if w.isupper() and i > 0 else w)
                  for i, w in enumerate(frase.split())]
        frase = ' '.join(parole)
        for nome in ['Zucche in Masseria', 'Fienopoli', 'Pippo Spigatopo', 'Campania']:
            frase = re.sub(re.escape(nome), nome, frase, flags=re.I)
        frase = frase[0].upper() + frase[1:]
        if len(frase) > 38:
            frase = frase[:38].rsplit(' ', 1)[0].rstrip(',;:') + '…'
        return frase

    righe_collab, v_collab = [], {'08': 0, '09': 0}
    for mese, pref in [('agosto', '2026-08'), ('settembre', '2026-09')]:
        cc = [p for p in collab if p['ora_italiana'].startswith(pref)]
        righe_collab.append({'mese': f'{mese} · {len(cc)} post'})
        for p in cc:
            v_collab[pref[5:]] += int(p['visualizzazioni'])
            righe_collab.append({'data': p['ora_italiana'][8:10] + '/' + p['ora_italiana'][5:7], 'chi': CHI[p['account']],
                                 'titolo': titolo_collab(p['inizio_didascalia']), 'formato': FORMATO[p['tipo']],
                                 'ig': [it(int(p['visualizzazioni'])), it(int(p['copertura'])), str(inter_ig(p))]})
    n_collab = {'08': len([p for p in collab if p['ora_italiana'].startswith('2026-08')]),
                '09': len([p for p in collab if p['ora_italiana'].startswith('2026-09')])}
    assert n_collab == {'08': 5, '09': 18}
    top_collab = max(collab, key=lambda p: int(p['visualizzazioni']))

    # --- le storie: Instagram dall'export, clip e grafiche dai registri dell'SSD
    st = tabella('instagram-storie.csv')
    assert len(st) == 124 and sum(int(s['visualizzazioni']) for s in st) == 123700
    st_a = [s for s in st if s['ora_italiana'].startswith('2026-08')]
    st_s = [s for s in st if s['ora_italiana'].startswith('2026-09')]
    # orari delle storie dei registri (storie-clip.md, storie-servizio.md, storie-recensione.md), uscite entro il 29/09
    CLIP = ['09-14 20:34'] + ['09-15 22:00'] * 4 + ['09-15 22:09', '09-15 22:15', '09-15 22:36'] + \
           ['09-16 22:00', '09-16 22:01', '09-16 22:01', '09-16 22:02'] + ['09-17 13:00'] + \
           ['09-17 21:00', '09-17 21:02', '09-17 21:03', '09-17 21:04', '09-17 21:05', '09-17 21:06', '09-17 21:07'] + \
           ['09-18 21:00', '09-18 21:01', '09-18 21:01', '09-18 21:02', '09-19 13:01', '09-19 21:00', '09-19 21:01', '09-19 21:01',
            '09-19 21:02', '09-20 13:01', '09-20 21:01', '09-20 21:01', '09-20 21:02', '09-20 21:02', '09-21 10:45', '09-21 12:01',
            '09-23 13:01', '09-26 13:00', '09-29 13:00']
    SERVIZIO = ['09-15 13:00', '09-16 13:00', '09-18 13:00', '09-19 13:00', '09-21 13:00', '09-22 13:00', '09-24 13:00', '09-25 13:00', '09-27 13:00']
    RECENSIONE = ['09-17 20:00', '09-20 20:00', '09-23 20:00', '09-26 20:00', '09-28 20:00', '09-29 20:00']
    orari = [s['ora_italiana'][5:] for s in st_s]
    for gruppo in (CLIP, SERVIZIO, RECENSIONE):
        for o in set(gruppo):
            assert orari.count(o) >= gruppo.count(o), o
    n_clip, n_graf = len(CLIP), len(SERVIZIO) + len(RECENSIONE)
    assert n_clip == 39 and n_graf == 15
    altre = len(st_s) - n_clip - n_graf
    altre_zucche = len([s for s in st_s if s['ora_italiana'][5:10] in ('09-26', '09-27')]) - 3   # meno la clip e la recensione del 26 e il servizio del 27
    top_storia = max(st, key=lambda s: int(s['visualizzazioni']))
    v_st_a, v_st_s = sum(int(s['visualizzazioni']) for s in st_a), sum(int(s['visualizzazioni']) for s in st_s)

    # --- i migliori: i primi tre post nostri per visualizzazioni su Instagram
    con_ig = [x for x in post if x['ig_v'] is not None]
    migliori = sorted(con_ig, key=lambda x: -x['ig_v'])[:3]
    per_somma = sorted(post, key=lambda x: -((x['ig_v'] or 0) + x['fb_v']))[:3]
    IMG = {'Gli angoli a vista': 'img/copertina-angoli-a-vista.jpg', "L'Uliveto": 'img/copertina-l-uliveto.jpg',
           'Quando si prenota la comunione': 'img/copertina-quando-si-prenota.jpg'}
    ig_a = [x['ig_v'] for x in con_ig if x['giorno'].startswith('2026-08')]
    ig_s = [x['ig_v'] for x in con_ig if x['giorno'].startswith('2026-09')]
    fb_s_post = sum(x['fb_v'] for x in post if x['giorno'].startswith('2026-09'))
    fbv = fb['visualizzazioni']
    finestra = range(49, 58)   # dal 19 al 27 settembre, giorni di Business Suite
    fb_fin = sum(fbv[i] for i in finestra)
    link_fin = sum(fb['clic_link'][i] for i in finestra)
    assert data_estesa(49) == '19 settembre' and data_estesa(57) == '27 settembre'
    iglink_primo = next(i for i in range(61) if ig['clic_link'][i] > 0)
    v_nostri = sum(ig_a) + sum(ig_s)

    reach = {k: int(L[k]) for k in L if 'account_raggiunti' in k}
    fol_ig, fol_fb = int(L['follower_ig']), int(L['follower_fb'])

    D = {
        'tema': 'dmr', 'brand': 'Da Mamma Rosaria', 'mese': 'settembre', 'anno': 2026, 'piede': 'agosto e settembre 2026',
        'testate': {'cinque': 'i due mesi in cinque'},
        'copertina': {'occhiello': 'Il report dei social di agosto e', 'parola': 'settembre',
                      'periodo': 'dal 1° agosto al 30 settembre 2026', 'canali': 'Instagram · Facebook · Google',
                      'lettura': 'Numeri letti il 30 settembre 2026, fra le 11:40 e le 12:25, da Meta Business Suite e dal profilo Google. '
                                 'Il 30 settembre era ancora in corso: i suoi numeri sono parziali.'},
        'cinque': {
            'sotto': 'Instagram, Facebook e profilo Google, dal 1° agosto al 30 settembre 2026.',
            'fonte': 'Fonte: i follower dalla Home di Business Suite, letti il 30 settembre alle 11:50; gli altri numeri dalle pagine che seguono, dove ognuno ha la sua fonte.',
            'schede': [
                {'numero': it(sum(ch) + sum(ind) + sum(sito)), 'etichetta': 'chiamate, indicazioni e visite al sito dal profilo Google',
                 'dettaglio': f'{it(ch[0] + ind[0] + sito[0])} ad agosto e {it(ch[1] + ind[1] + sito[1])} a settembre, contando fino al 27, l’ultimo giorno che Google ha caricato: '
                              f'{ch[1]} chiamate, {it(ind[1])} richieste di indicazioni stradali e {sito[1]} clic sul sito. I messaggi non sono in questo numero, e il perché è nella pagina dei contatti.'},
                {'numero': it(sum(ig['visualizzazioni']) + sum(fbv)), 'etichetta': 'visualizzazioni su Instagram e Facebook',
                 'dettaglio': f"{it(ago(ig['visualizzazioni']) + ago(fbv))} ad agosto, {it(sett(ig['visualizzazioni']) + sett(fbv))} a settembre. Su Instagram {it(sum(ig['visualizzazioni']))}, su Facebook {it(sum(fbv))}."},
                {'numero': it(reach['ig_account_raggiunti_ago_set']), 'etichetta': 'account raggiunti su Instagram',
                 'dettaglio': f"{it(reach['ig_account_raggiunti_ago'])} ad agosto, {it(reach['ig_account_raggiunti_set'])} a settembre. Su Facebook {it(reach['fb_account_raggiunti_ago_set'])} nei due mesi: la stessa persona può stare su tutti e due, quindi non si sommano."},
                {'numero': it(fol_ig), 'etichetta': 'follower su Instagram',
                 'dettaglio': f"Al 30 settembre. Nei due mesi {it(sum(ig['follow']))} follow nuovi, {it(sett(ig['follow']))} dei quali a settembre, e {int(L['ig_smesso_ago']) + int(L['ig_smesso_set'])} persone che hanno smesso di seguire."},
                {'numero': it(fol_fb), 'etichetta': 'follower su Facebook',
                 'dettaglio': f"Al 30 settembre. Nei due mesi {sum(fb['follow'])} follow nuovi, {sett(fb['follow'])} dei quali a settembre, e {int(L['fb_smesso_ago']) + int(L['fb_smesso_set'])} persone che hanno smesso di seguire."}]},
        'contatti': {
            'sotto': 'Le strade da cui arriva una richiesta: il profilo Google, i messaggi, il link del profilo.',
            'google': {'titolo': 'Dal profilo Google, nei due mesi',
                       'voci': [{'valore': str(sum(ch)), 'nome': 'chiamate', 'var': f'agosto {ch[0]} · settembre {ch[1]}'},
                                {'valore': it(sum(ind)), 'nome': 'richieste di indicazioni stradali', 'var': f'agosto {ind[0]} · settembre {ind[1]}'},
                                {'valore': str(sum(sito)), 'nome': 'clic sul sito', 'var': f'agosto {sito[0]} · settembre {sito[1]}'}],
                       'visti': f'Il profilo dell’attività l’hanno visto {it(visto[0])} persone ad agosto e {it(visto[1])} a settembre. '
                                f'Settembre è contato fino al 27: Google non ha ancora caricato gli ultimi tre giorni, e le richieste di indicazioni salgono '
                                f'dal 19 in poi, con {it(154)} nel solo 27 settembre.',
                       'fonte': 'Fonte: profilo Google di Da Mamma Rosaria, pagina Rendimento, agosto letto il 16 settembre e settembre il 30. Giorno per giorno nel file dati/google-rendimento.csv.'},
            'messaggi': {'titolo': 'Messaggi su Instagram e Messenger', 'valore': 'Non disponibile',
                         'testo': 'Le statistiche dei messaggi di Business Suite non danno un numero credibile, e la Posta, con Chrome dietro le altre finestre, '
                                  'mostra solo le otto conversazioni più recenti. Nessun numero è stato stimato.'},
            'link': {'titolo': 'Clic sul link del profilo', 'voci': [
                {'canale': 'Instagram', 'valore': f"{it(sum(ig['clic_link']))} nei due mesi",
                 'nota': f"Tutti a settembre, dal {data_estesa(iglink_primo)} in poi. Ad agosto e a luglio Business Suite ne contava zero."},
                {'canale': 'Facebook', 'valore': f"{it(sum(fb['clic_link']))} nei due mesi",
                 'nota': f"{it(link_fin)} fra il 19 e il 27 settembre, i giorni prima e durante l’apertura di Zucche in Masseria. Ad agosto zero."}]},
            'nota': 'WhatsApp e le telefonate dirette non si misurano da qui. Chi scrive su Instagram o su Messenger riceve una risposta automatica che lo manda su WhatsApp: '
                    'da lì in poi la richiesta non passa da nessuno strumento collegato, e le chiamate si contano solo quando partono dal profilo Google.'},
        'instagram': canale('Instagram', ig, L, 'ig', 'account raggiunti', 'visite al profilo',
                            f"agosto 0 · settembre {it(sett(ig['clic_link']))}", L['ig_pubblico'],
                            'Fonte: Meta Business Suite, Insights, schede Risultati e Pubblico di Instagram, periodo 1 agosto - 30 settembre. I giorni sono quelli di Business Suite, '
                            'sull’ora del Pacifico. Il pubblico non si filtra per mese: è la fotografia dei follower al giorno della lettura.',
                            'Dal 1° agosto al 30 settembre 2026. Il numero grande è dei due mesi, sotto c’è quello di ogni mese.'),
        'facebook': canale('Facebook', fb, L, 'fb', 'account raggiunti', 'visite alla Pagina',
                           f"agosto 0 · settembre {it(sett(fb['clic_link']))}", L['fb_pubblico'],
                           'Fonte: Meta Business Suite, Insights, schede Risultati e Pubblico di Facebook, periodo 1 agosto - 30 settembre. Gli account raggiunti sono la voce che '
                           'Business Suite chiama anch’essa «Visualizzazioni», definita come gli account che hanno visto i contenuti almeno una volta.',
                           'Dal 1° agosto al 30 settembre 2026. Il numero grande è dei due mesi, sotto c’è quello di ogni mese.'),
        'pubblicato': {
            'sotto': 'Numeri di ogni post al 30 settembre: un post raccoglie visualizzazioni anche dopo il mese in cui è uscito.',
            'post': {'titolo': 'I post nostri, usciti su Instagram e Facebook', 'righe': righe_post,
                     'fonte': 'Fonte: Business Suite, Insights, Contenuti. Instagram dall’esportazione dei post, Facebook dalla tabella dei contenuti. '
                              'Interazioni: mi piace, commenti, condivisioni e salvataggi su Instagram; reazioni, commenti e condivisioni su Facebook. '
                              'Gli allestimenti del 26 settembre e il cannolo del 29 in Business Suite risultano usciti solo su Facebook.'},
            'storie_pagina': True,
            'storie': {'titolo': 'Storie su Instagram', 'righe': [
                f'Ad agosto {len(st_a)} storie, con {it(v_st_a)} visualizzazioni in tutto. A settembre {len(st_s)}, con {it(v_st_s)}.',
                f'Delle {len(st_s)} di settembre, {n_clip} sono storie clip, montate dal 14 settembre in poi, e {n_graf} sono storie grafiche: '
                f'{len(SERVIZIO)} dei servizi e {len(RECENSIONE)} delle recensioni. Le altre {altre} sono uscite direttamente dal telefono, '
                f'{altre_zucche} delle quali il 26 e il 27 settembre, i due giorni di apertura di Zucche in Masseria.',
                f"La storia più vista dei due mesi è del {data_it(top_storia['ora_italiana'][:10])} alle {top_storia['ora_italiana'][11:]}, "
                f"con {it(int(top_storia['visualizzazioni']))} visualizzazioni.",
                'Su Facebook le storie non hanno numeri: gli insight delle storie della Pagina non sono attivi.']}},
        'collab_pagina': {
            'occhiello': 'i post in', 'parola': 'collaborazione',
            'sotto': f"Pubblicati da altri profili con Da Mamma Rosaria come collaboratore: escono anche sul nostro. Ad agosto {n_collab['08']}, a settembre {n_collab['09']}, quasi tutti per Zucche in Masseria. Numeri di Instagram.",
            'righe': righe_collab,
            'fonte': 'Fonte: Business Suite, Insights, Contenuti, esportazione dei post di Instagram. Il titolo è l’inizio della didascalia.'},
        'migliori': {
            'sotto': 'I tre post nostri con più visualizzazioni su Instagram nei due mesi.',
            'schede': [{'img': IMG[x['titolo']], 'titolo': x['titolo'], 'quando': f"{x['formato']} · {data_it(x['giorno'])}",
                        'numeri': [f"{it(x['ig_v'])} visualizzazioni su Instagram", f"{it(x['ig_r'])} account raggiunti", f"{x['ig_i']} interazioni",
                                   f"Facebook: {it(x['fb_v'])} visualizzazioni"]} for x in migliori],
            'frasi': [
                f"Tutti e tre sono di settembre. I post nostri usciti su Instagram fanno in media {it(round(sum(ig_s) / len(ig_s)))} visualizzazioni a settembre e {it(round(sum(ig_a) / len(ig_a)))} ad agosto.",
                f"Sommando Facebook il terzo sarebbe {per_somma[2]['titolo']}, con {it(per_somma[2]['ig_v'] + per_somma[2]['fb_v'])} visualizzazioni fra i due canali.",
                f"I {n_collab['09']} post in collaborazione di settembre hanno {it(v_collab['09'])} visualizzazioni su Instagram. Il reel del {data_it(top_collab['ora_italiana'][:10])} di Agenzia di Eventi e Spettacoli "
                f"da solo ne ha {it(int(top_collab['visualizzazioni']))}, più di tutti i post nostri dei due mesi messi insieme, che arrivano a {it(v_nostri)}.",
                f"Su Facebook, fra il 19 e il 27 settembre, la Pagina fa {it(fb_fin)} visualizzazioni, il {pct(fb_fin / sett(fbv) * 100, 0)} del mese; "
                f"gli otto post nostri di settembre, su Facebook, ne sommano {it(fb_s_post)}."]},
        'confronto': {
            'sotto': 'Agosto e settembre uno accanto all’altro, coi numeri di tutti e due i mesi.',
            'testo': ['Agosto viene dal report del 16 settembre ed è stato riletto il 30: i numeri tornano uguali. La variazione è calcolata da settembre su agosto.'],
            'colonne': ['Agosto 2026', 'Settembre 2026', 'Variazione'], 'grassetto': 1,
            'righe': [
                ['Instagram · visualizzazioni', it(ago(ig['visualizzazioni'])), it(sett(ig['visualizzazioni'])), var(ago(ig['visualizzazioni']), sett(ig['visualizzazioni']))],
                ['Instagram · account raggiunti', it(reach['ig_account_raggiunti_ago']), it(reach['ig_account_raggiunti_set']), var(reach['ig_account_raggiunti_ago'], reach['ig_account_raggiunti_set'])],
                ['Instagram · interazioni', it(ago(ig['interazioni'])), it(sett(ig['interazioni'])), var(ago(ig['interazioni']), sett(ig['interazioni']))],
                ['Instagram · visite al profilo', it(ago(ig['visite'])), it(sett(ig['visite'])), var(ago(ig['visite']), sett(ig['visite']))],
                ['Instagram · follow', it(ago(ig['follow'])), it(sett(ig['follow'])), var(ago(ig['follow']), sett(ig['follow']))],
                ['Instagram · storie', str(len(st_a)), str(len(st_s)), var(len(st_a), len(st_s))],
                ['Facebook · visualizzazioni', it(ago(fbv)), it(sett(fbv)), var(ago(fbv), sett(fbv))],
                ['Facebook · account raggiunti', it(reach['fb_account_raggiunti_ago']), it(reach['fb_account_raggiunti_set']), var(reach['fb_account_raggiunti_ago'], reach['fb_account_raggiunti_set'])],
                ['Facebook · interazioni', it(ago(fb['interazioni'])), it(sett(fb['interazioni'])), var(ago(fb['interazioni']), sett(fb['interazioni']))],
                ['Facebook · visite alla Pagina', it(ago(fb['visite'])), it(sett(fb['visite'])), var(ago(fb['visite']), sett(fb['visite']))],
                ['Facebook · follow', str(ago(fb['follow'])), str(sett(fb['follow'])), var(ago(fb['follow']), sett(fb['follow']))],
                ['Google · chiamate', str(ch[0]), str(ch[1]), var(ch[0], ch[1])],
                ['Google · indicazioni stradali', str(ind[0]), str(ind[1]), var(ind[0], ind[1])],
                ['Google · clic sul sito', str(sito[0]), str(sito[1]), var(sito[0], sito[1])],
                ['Google · persone che hanno visto il profilo', it(visto[0]), it(visto[1]), var(visto[0], visto[1])],
                ['Post nostri su Instagram', str(len(ig_a)), str(len(ig_s)), var(len(ig_a), len(ig_s))],
                ['Post in collaborazione', str(n_collab['08']), str(n_collab['09']), var(n_collab['08'], n_collab['09'])]],
            'note': [
                'Business Suite conta i giorni sull’ora del Pacifico, nove ore indietro rispetto all’Italia: un contenuto uscito nelle prime ore del primo del mese può finire nel mese prima.',
                'Google di settembre si ferma al 27: gli ultimi tre giorni non erano ancora caricati il 30.',
                'I totali di ogni mese si fermano all’ultimo giorno del mese; i numeri dei singoli contenuti sono quelli del 30 settembre.',
                'I file da cui vengono i numeri sono nella cartella dati accanto a questo PDF.']},
    }
    riepilogo = {'post_ig': [len(ig_a), len(ig_s)], 'collab': n_collab, 'v_collab': v_collab, 'storie': [len(st_a), len(st_s)],
                 'clip': n_clip, 'grafiche': n_graf, 'altre': altre, 'altre_zucche': altre_zucche, 'migliori': [x['titolo'] for x in migliori],
                 'per_somma': [x['titolo'] for x in per_somma], 'fb_fin': fb_fin, 'link_fin': link_fin, 'google': [ch, ind, sito, visto],
                 'top_storia': top_storia['ora_italiana'], 'v_nostri': v_nostri, 'media': [round(sum(ig_a) / len(ig_a)), round(sum(ig_s) / len(ig_s))]}
    return D, riepilogo


# ---------------------------------------------------------------- Tenuta Don Gaetano
def tdg():
    L = letture()
    ig, fb = serie('instagram-giornaliero.csv'), serie('facebook-giornaliero.csv')
    assert sum(ig['visualizzazioni']) == 5171 and sum(ig['interazioni']) == 76 and sum(ig['visite']) == 167 and sum(ig['follow']) == 16
    assert sum(fb['visualizzazioni']) == 3707 and sum(fb['interazioni']) == 31 and sum(fb['visite']) == 289 and sum(fb['follow']) == 4
    assert ago(ig['visualizzazioni']) == 4039 and sett(ig['visualizzazioni']) == 1132 and ago(fb['visualizzazioni']) == 1661 and sett(fb['visualizzazioni']) == 2046
    g = {r['mese']: r for r in tabella('google-rendimento.csv')}
    ga, gs = g['2026-08'], g['2026-09']
    ch = [int(ga['chiamate']), int(gs['chiamate'])]
    ind = [int(ga['indicazioni']), int(gs['indicazioni'])]
    sito = [int(ga['clic_sito']), int(gs['clic_sito'])]
    visto = [int(ga['profilo_visto']), int(gs['profilo_visto'])]
    pp = tabella('post.csv')
    assert len(pp) == 16
    assert sum(int(p['ig_visualizzazioni']) for p in pp if p['data'] != '2026-08-01') == 2970
    post = [{'giorno': p['data'], 'titolo': p['titolo'], 'formato': p['formato'],
             'ig_v': int(p['ig_visualizzazioni']), 'ig_r': int(p['ig_copertura']), 'ig_i': int(p['ig_interazioni']),
             'fb_v': int(p['fb_visualizzazioni']), 'fb_r': int(p['fb_copertura']), 'fb_i': int(p['fb_interazioni'])} for p in pp]
    n_a = len([x for x in post if x['giorno'].startswith('2026-08')])
    n_s = len([x for x in post if x['giorno'].startswith('2026-09')])
    assert (n_a, n_s) == (9, 7)
    righe_post = []
    for mese, pref, n in [('agosto · nove post', '2026-08', n_a), ('settembre · sette post, dal 16', '2026-09', n_s)]:
        righe_post.append({'mese': mese})
        for x in [x for x in post if x['giorno'].startswith(pref)]:
            righe_post.append({'data': x['giorno'][8:] + '/' + x['giorno'][5:7], 'titolo': x['titolo'], 'formato': x['formato'],
                               'ig': [it(x['ig_v']), it(x['ig_r']), str(x['ig_i'])], 'fb': [it(x['fb_v']), it(x['fb_r']), str(x['fb_i'])]})
    migliori = sorted(post, key=lambda x: -x['ig_v'])[:3]
    IMG = {'Sala dopo sala': 'img/copertina-sala-dopo-sala.jpg', 'La laurea di Francesca': 'img/copertina-laurea-francesca.jpg',
           'Dal cortile ai saloni': 'img/copertina-dal-cortile-ai-saloni.jpg'}
    reel = [x for x in post if x['formato'] == 'reel']
    altri = [x for x in post if x['formato'] != 'reel']
    media = lambda xs, k: round(sum(x[k] for x in xs) / len(xs))
    fb_top = max(post, key=lambda x: x['fb_v'])
    ig_a = [x['ig_v'] for x in post if x['giorno'].startswith('2026-08')]
    ig_s = [x['ig_v'] for x in post if x['giorno'].startswith('2026-09')]
    reach = {k: int(L[k]) for k in L if 'account_raggiunti' in k}
    fol_ig, fol_fb = int(L['follower_ig']), int(L['follower_fb'])
    fbv = fb['visualizzazioni']

    D = {
        'tema': 'tdg', 'brand': 'Tenuta Don Gaetano', 'mese': 'settembre', 'anno': 2026, 'piede': 'agosto e settembre 2026',
        'logo': 'assets/logo-oro.png', 'testate': {'cinque': 'i due mesi in cinque'},
        'copertina': {'occhiello': 'Il report dei social', 'parola': 'agosto e settembre',
                      'periodo': 'dal 1° agosto al 30 settembre 2026', 'canali': 'Instagram · Facebook · Google',
                      'lettura': 'Numeri letti il 30 settembre 2026, fra le 12:05 e le 12:25, da Meta Business Suite e dal profilo Google. '
                                 'Il 30 settembre era ancora in corso: il post del buffet esce alle 19:30 e non è in questo report.'},
        'cinque': {
            'sotto': 'Instagram, Facebook e profilo Google, dal 1° agosto al 30 settembre 2026.',
            'fonte': 'Fonte: i follower dalla Home di Business Suite, letti il 30 settembre alle 12:11; gli altri numeri dalle pagine che seguono.',
            'schede': [
                {'numero': str(sum(ch) + sum(ind) + sum(sito)), 'etichetta': 'chiamate, indicazioni e visite al sito dal profilo Google',
                 'dettaglio': f'{ch[0] + ind[0] + sito[0]} ad agosto e {ch[1] + ind[1] + sito[1]} a settembre: quasi tutte richieste di indicazioni stradali, '
                              f'{sum(ind)} nei due mesi, con {sum(ch)} chiamata e {sum(sito)} clic sul sito.'},
                {'numero': it(sum(ig['visualizzazioni']) + sum(fbv)), 'etichetta': 'visualizzazioni su Instagram e Facebook',
                 'dettaglio': f"{it(ago(ig['visualizzazioni']) + ago(fbv))} ad agosto, {it(sett(ig['visualizzazioni']) + sett(fbv))} a settembre. Su Instagram {it(sum(ig['visualizzazioni']))}, su Facebook {it(sum(fbv))}."},
                {'numero': it(reach['ig_account_raggiunti_ago_set']), 'etichetta': 'account raggiunti su Instagram',
                 'dettaglio': f"{it(reach['ig_account_raggiunti_ago'])} ad agosto, {reach['ig_account_raggiunti_set']} a settembre. Su Facebook {it(reach['fb_account_raggiunti_ago_set'])} nei due mesi, che non si sommano: la stessa persona può stare su tutti e due."},
                {'numero': str(fol_ig), 'etichetta': 'follower su Instagram',
                 'dettaglio': f"Al 30 settembre. Nei due mesi {sum(ig['follow'])} follow nuovi e {int(L['ig_smesso_ago']) + int(L['ig_smesso_set'])} persone che hanno smesso di seguire."},
                {'numero': it(fol_fb), 'etichetta': 'follower su Facebook',
                 'dettaglio': f"Al 30 settembre. Nei due mesi {sum(fb['follow'])} follow nuovi, tutti a settembre, e {int(L['fb_smesso_ago']) + int(L['fb_smesso_set'])} persona che ha smesso di seguire."}]},
        'contatti': {
            'sotto': 'Le strade da cui arriva una richiesta: il profilo Google, i messaggi, il link del profilo.',
            'google': {'titolo': 'Dal profilo Google, nei due mesi',
                       'voci': [{'valore': str(sum(ch)), 'nome': 'chiamata', 'var': f'agosto {ch[0]} · settembre {ch[1]}'},
                                {'valore': str(sum(ind)), 'nome': 'richieste di indicazioni stradali', 'var': f'agosto {ind[0]} · settembre {ind[1]}'},
                                {'valore': str(sum(sito)), 'nome': 'clic sul sito', 'var': f'agosto {sito[0]} · settembre {sito[1]}'}],
                       'visti': f'Il profilo dell’attività l’hanno visto {visto[0]} persone ad agosto e {visto[1]} a settembre, per circa la metà dalla ricerca Google sul telefono. '
                                f'Settembre è contato fino a dove Google ha caricato i dati: gli ultimi giorni segnano ancora zero.',
                       'fonte': 'Fonte: profilo Google della Tenuta Don Gaetano, pagina Rendimento, letta il 30 settembre. Giorno per giorno nel file dati/google-rendimento.csv.'},
            'messaggi': {'titolo': 'Messaggi su Instagram e Messenger', 'valore': 'Non contati',
                         'testo': 'In questo report i messaggi non sono stati contati: la Posta di Business Suite, con Chrome dietro le altre finestre, non carica l’elenco. Nessun numero è stato stimato.'},
            'link': {'titolo': 'Clic sul link del profilo', 'voci': [
                {'canale': 'Instagram', 'valore': '0 nei due mesi', 'nota': 'Business Suite non ne conta nessuno, né ad agosto né a settembre.'},
                {'canale': 'Facebook', 'valore': '0 nei due mesi', 'nota': 'Lo stesso su Facebook.'}]},
            'nota': 'WhatsApp e le telefonate dirette non si misurano da qui: le chiamate si contano solo quando partono dal profilo Google.'},
        'instagram': canale('Instagram', ig, L, 'ig', 'account raggiunti', 'visite al profilo', 'agosto 0 · settembre 0', L['ig_pubblico'],
                            'Fonte: Meta Business Suite, Insights, schede Risultati e Pubblico di Instagram, periodo 1 agosto - 30 settembre. I giorni sono quelli di Business Suite, sull’ora del Pacifico. '
                            'Il pubblico è la fotografia dei follower al giorno della lettura.',
                            'Dal 1° agosto al 30 settembre 2026. Il numero grande è dei due mesi, sotto c’è quello di ogni mese.'),
        'facebook': canale('Facebook', fb, L, 'fb', 'account raggiunti', 'visite alla Pagina', 'agosto 0 · settembre 0', L['fb_pubblico'],
                           'Fonte: Meta Business Suite, Insights, schede Risultati e Pubblico di Facebook, periodo 1 agosto - 30 settembre. Gli account raggiunti sono la voce che Business Suite chiama anch’essa «Visualizzazioni».',
                           'Dal 1° agosto al 30 settembre 2026. Il numero grande è dei due mesi, sotto c’è quello di ogni mese.'),
        'pubblicato': {
            'sotto': 'Numeri di ogni post al 30 settembre: un post raccoglie visualizzazioni anche dopo il mese in cui è uscito.',
            'post': {'titolo': 'I post usciti su Instagram e Facebook', 'righe': righe_post,
                     'fonte': 'Fonte: Business Suite, Insights, Contenuti. Instagram dall’esportazione dei post, Facebook dalla tabella dei contenuti. '
                              'Interazioni: mi piace, commenti, condivisioni e salvataggi su Instagram; reazioni, commenti e condivisioni su Facebook. '
                              'Il post del 1° agosto è uscito a mezzanotte e due minuti.'},
            'storie': {'titolo': 'Storie', 'righe': [
                'Sette storie su Instagram, tutte ad agosto: il 5, due il 13 e quattro il 24, con 966 visualizzazioni in tutto. A settembre nessuna.',
                'Ogni post esce anche come storia di Facebook, che non ha numeri: gli insight delle storie della Pagina non sono attivi.']}},
        'migliori': {
            'sotto': 'I tre post con più visualizzazioni su Instagram nei due mesi.',
            'schede': [{'img': IMG[x['titolo']], 'titolo': x['titolo'], 'quando': f"{x['formato']} · {data_it(x['giorno'])}",
                        'numeri': [f"{it(x['ig_v'])} visualizzazioni su Instagram", f"{it(x['ig_r'])} account raggiunti", f"{x['ig_i']} interazioni",
                                   f"Facebook: {it(x['fb_v'])} visualizzazioni"]} for x in migliori],
            'frasi': [
                f"Tutti e tre sono reel. I quattro reel dei due mesi fanno in media {media(reel, 'ig_v')} visualizzazioni su Instagram, gli altri dodici post {media(altri, 'ig_v')}.",
                f"Su Facebook il post più visto è {fb_top['titolo']}, con {fb_top['fb_v']} visualizzazioni: più del triplo delle {fb_top['ig_v']} che ha su Instagram.",
                f"Da agosto a settembre i post sono passati da nove a sette, e su Instagram la media per post da {round(sum(ig_a) / len(ig_a))} a {round(sum(ig_s) / len(ig_s))} visualizzazioni.",
                f"Nei due mesi Instagram ha dato {sum(ig['follow'])} follow nuovi, Facebook {sum(fb['follow'])}."]},
        'confronto': {
            'sotto': 'Agosto e settembre uno accanto all’altro.',
            'testo': ['È il primo report della Tenuta: il confronto parte da qui. La variazione è calcolata da settembre su agosto.'],
            'colonne': ['Agosto 2026', 'Settembre 2026', 'Variazione'], 'grassetto': 1,
            'righe': [
                ['Instagram · visualizzazioni', it(ago(ig['visualizzazioni'])), it(sett(ig['visualizzazioni'])), var(ago(ig['visualizzazioni']), sett(ig['visualizzazioni']))],
                ['Instagram · account raggiunti', it(reach['ig_account_raggiunti_ago']), str(reach['ig_account_raggiunti_set']), var(reach['ig_account_raggiunti_ago'], reach['ig_account_raggiunti_set'])],
                ['Instagram · interazioni', str(ago(ig['interazioni'])), str(sett(ig['interazioni'])), var(ago(ig['interazioni']), sett(ig['interazioni']))],
                ['Instagram · visite al profilo', str(ago(ig['visite'])), str(sett(ig['visite'])), var(ago(ig['visite']), sett(ig['visite']))],
                ['Instagram · follow', str(ago(ig['follow'])), str(sett(ig['follow'])), var(ago(ig['follow']), sett(ig['follow']))],
                ['Facebook · visualizzazioni', it(ago(fbv)), it(sett(fbv)), var(ago(fbv), sett(fbv))],
                ['Facebook · account raggiunti', str(reach['fb_account_raggiunti_ago']), it(reach['fb_account_raggiunti_set']), var(reach['fb_account_raggiunti_ago'], reach['fb_account_raggiunti_set'])],
                ['Facebook · interazioni', str(ago(fb['interazioni'])), str(sett(fb['interazioni'])), var(ago(fb['interazioni']), sett(fb['interazioni']))],
                ['Facebook · visite alla Pagina', str(ago(fb['visite'])), str(sett(fb['visite'])), var(ago(fb['visite']), sett(fb['visite']))],
                ['Facebook · follow', str(ago(fb['follow'])), str(sett(fb['follow'])), 'n.c.'],
                ['Google · chiamate', str(ch[0]), str(ch[1]), var(ch[0], ch[1])],
                ['Google · indicazioni stradali', str(ind[0]), str(ind[1]), var(ind[0], ind[1])],
                ['Google · clic sul sito', str(sito[0]), str(sito[1]), var(sito[0], sito[1])],
                ['Google · persone che hanno visto il profilo', str(visto[0]), str(visto[1]), var(visto[0], visto[1])],
                ['Post pubblicati', str(n_a), str(n_s), var(n_a, n_s)]],
            'note': [
                'Business Suite conta i giorni sull’ora del Pacifico, nove ore indietro rispetto all’Italia: il post del 1° agosto, uscito a mezzanotte e due minuti, per Business Suite è del 31 luglio. Qui è contato ad agosto.',
                'I totali di ogni mese si fermano all’ultimo giorno del mese; i numeri dei singoli post sono quelli del 30 settembre.',
                'I file da cui vengono i numeri sono nella cartella dati accanto a questo PDF.']},
    }
    riepilogo = {'post': [n_a, n_s], 'migliori': [x['titolo'] for x in migliori], 'reel_media': media(reel, 'ig_v'), 'altri_media': media(altri, 'ig_v'),
                 'fb_top': fb_top['titolo'], 'google': [ch, ind, sito, visto], 'medie_ig': [round(sum(ig_a) / len(ig_a)), round(sum(ig_s) / len(ig_s))]}
    return D, riepilogo


D, R = {'dmr': dmr, 'tdg': tdg}[BRAND]()
open('dati.js', 'w').write('window.DATI = ' + json.dumps(D, ensure_ascii=False, indent=1) + ';\n')
json.dump(R, open('riepilogo.json', 'w'), ensure_ascii=False, indent=1)
print(json.dumps(R, ensure_ascii=False))
