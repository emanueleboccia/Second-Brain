#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Rifà firma.html, firma.php e firma.blade.php, e stampa il blocco con un'altra frase.

Lo stile si legge da firma.css; il segno e il blocco sono scritti qui sotto. Sono
le due sole cose che si cambiano a mano: gli altri tre file portano dentro una
copia stretta dello stile, e si rifanno da qui.

    python3 code/firma/componi.py                        rifà i tre file e dice quanto pesano
    python3 code/firma/componi.py --frase "Sito di"      stampa il blocco pronto, con quella frase
    python3 code/firma/componi.py --variante sola        lo stesso, con una variante
    python3 code/firma/componi.py --frase "Sito di" --senza-stile     solo il link, senza <style>
"""

import argparse
import gzip
import html
import os
import re

QUI = os.path.dirname(os.path.abspath(__file__))

INDIRIZZO = "https://emanueleboccia.it/"
NOME = "Emanuele Boccia"
FRASE = "Costruito da"
CODA = ", apre emanueleboccia.it"      # chiude l'etichetta che legge lo screen reader
VARIANTI = ("quieta", "sola", "stretta")

# Il monogramma, in un riquadro 42 × 42: la corona del cerchio, la E e la B.
# Esce da tracciati.py, che lo ricava dal font Archivo (wdth 125, wght 900).
SEGNO = (
    "M21 .55a20.45 20.45 0 1 0 0 40.9a20.45 20.45 0 1 0 0-40.9z"
    "M21 3.05a17.95 17.95 0 1 1 0 35.9a17.95 17.95 0 1 1 0-35.9z"
    "M8.18 27v-11.01h11.76v2.74h-7.79v1.42h6.72v2.59h-6.72v1.52h7.92v2.74z"
    "M21.62 27v-11.01h9.51q.9 0 1.65.35t1.19.95t.44 1.41q0 .8-.27 1.31t-.73.81t-1 .44v.06"
    "q.62.13 1.13.44t.82.87t.3 1.44q0 .88-.45 1.54t-1.24 1.02t-1.75.37z"
    "M25.58 24.44h4.06q.44 0 .71-.26t.27-.76q0-.24-.13-.44t-.34-.32t-.51-.11h-4.06z"
    "M25.58 20.28h3.8q.31 0 .53-.12t.33-.34t.12-.56q0-.36-.28-.6t-.7-.25h-3.8z"
)

# Il blocco. Quello che sta fra graffe cambia da un file all'altro, il resto è fisso.
# La frase compare due volte, nell'etichetta e nella scritta: per questo non si
# corregge a mano nel blocco, si passa da qui.
FACCIA = '<svg class="firma-eb__faccia{dietro}" viewBox="0 0 42 42"><path d="%s"/></svg>' % SEGNO
BLOCCO = (
    '<a class="{classi}" href="{indirizzo}" target="_blank" rel="noopener" aria-label="{etichetta}">'
    '<span class="firma-eb__testo" aria-hidden="true">'
    '<span class="firma-eb__frase">{frase}</span>'
    '<span class="firma-eb__nome">{nome}</span>'
    '</span>'
    '<span class="firma-eb__scena" aria-hidden="true"><span class="firma-eb__moneta">'
    + FACCIA.replace("{dietro}", "")
    + FACCIA.replace("{dietro}", " firma-eb__faccia--dietro")
    + '</span></span>'
    '</a>'
)


def stringi(css):
    """Toglie commenti e spazi allo stile, senza toccare quello che ha un senso."""
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"\s+", " ", css).strip()
    css = re.sub(r"\s*([{};])\s*", r"\1", css)
    css = css.replace(": ", ":")          # dopo i due punti: mai in un selettore
    css = css.replace(", ", ",")
    css = css.replace(" !important", "!important")
    css = css.replace(";}", "}")
    css = css.replace("@media (", "@media(")
    css = css.replace(" * ", "*")         # solo dentro calc()
    css = re.sub(r"(grid-area:\d+) / (\d+)", r"\1/\2", css)
    return css


def stile_stretto():
    with open(os.path.join(QUI, "firma.css"), encoding="utf-8") as fh:
        stile = stringi(fh.read())
    for vietato in ("'", "\\", "<", "{{", "@verbatim", "@endverbatim"):
        if vietato in stile:
            raise SystemExit("nello stile c'è %r: rompe la copia dentro firma.php o firma.blade.php" % vietato)
    return stile


def classi_di(variante):
    voci = (variante or "").split()
    for v in voci:
        if v not in VARIANTI:
            raise SystemExit("variante sconosciuta: %r. Ci sono: %s" % (v, ", ".join(VARIANTI)))
    return " ".join(["firma-eb"] + ["firma-eb--" + v for v in voci])


def blocco(frase=FRASE, variante=""):
    """Il blocco in HTML semplice, con la frase scritta nei suoi due posti."""
    return BLOCCO.format(
        classi=classi_di(variante), indirizzo=INDIRIZZO, nome=html.escape(NOME),
        frase=html.escape(frase), etichetta=html.escape(frase + " " + NOME + CODA, quote=True))


def scrivi(nome, testo):
    with open(os.path.join(QUI, nome), "w", encoding="utf-8", newline="\n") as fh:
        fh.write(testo)


HTML = """<!-- Firma di Emanuele Boccia. Si incolla nel footer tutto quello che c'è sotto questa nota: lo stile e il link.
     Varianti: una classe in più sul link, firma-eb--quieta, --sola o --stretta. Per un'altra frase il blocco
     lo stampa componi.py, perché la frase sta in due punti: nell'aria-label e in firma-eb__frase. -->
<style>%(stile)s</style>
%(blocco)s
"""

PHP = r"""<?php
/**
 * Firma di Emanuele Boccia, per WordPress.
 *
 * Il file va nella cartella del tema. Nel functions.php:
 *     require_once get_theme_file_path( 'firma.php' );
 * Nel footer.php, nel punto in cui deve comparire, fra i tag di PHP:
 *     eb_firma();
 *     eb_firma( 'Sito di' );
 *     eb_firma( 'Sistema di', 'sola' );
 *
 * Lo rifà componi.py: lo stile si cambia in firma.css, non qui.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'eb_firma' ) ) {
	/**
	 * Stampa la firma. Lo stile esce una volta sola per pagina, anche se la si chiama due volte.
	 *
	 * @param string $frase    La frase prima del monogramma.
	 * @param string $variante Niente, 'quieta', 'sola', 'stretta', o più d'una separate da uno spazio.
	 */
	function eb_firma( $frase = '%(frase)s', $variante = '' ) {
		static $stile_stampato = false;

		$frase  = trim( (string) $frase );
		$classi = array( 'firma-eb' );
		foreach ( preg_split( '/\s+/', (string) $variante, -1, PREG_SPLIT_NO_EMPTY ) as $voce ) {
			if ( in_array( $voce, array( %(varianti)s ), true ) ) {
				$classi[] = 'firma-eb--' . $voce;
			}
		}
		$etichetta = $frase . ' %(nome)s%(coda)s';

		if ( ! $stile_stampato ) {
			$stile_stampato = true;
			$stile          = '%(stile)s';
			echo '<style id="firma-eb-stile">' . wp_strip_all_tags( $stile ) . '</style>';
		}
		?>
%(blocco)s
		<?php
	}
}
"""

BLADE = """{{--
    Firma di Emanuele Boccia, per Laravel.

    Il file va in resources/views/partials/firma.blade.php e si chiama dal layout:
        @include('partials.firma')
        @include('partials.firma', ['frase' => 'Sistema di'])
        @include('partials.firma', ['frase' => 'Sistema di', 'variante' => 'sola'])

    Le varianti sono 'quieta', 'sola' e 'stretta', anche più d'una separate da uno spazio.
    Lo stile esce una volta sola per pagina. Lo rifà componi.py: lo stile si cambia
    in firma.css, non qui.
--}}
@php
    $firmaFrase = trim((string) ($frase ?? '%(frase)s'));
    $firmaClassi = 'firma-eb';
    foreach (preg_split('/\\s+/', (string) ($variante ?? ''), -1, PREG_SPLIT_NO_EMPTY) as $firmaVoce) {
        if (in_array($firmaVoce, [%(varianti)s], true)) {
            $firmaClassi .= ' firma-eb--'.$firmaVoce;
        }
    }
@endphp
@once
@verbatim
<style>%(stile)s</style>
@endverbatim
@endonce
%(blocco)s
"""


def rifai():
    stile = stile_stretto()
    varianti = ", ".join("'%s'" % v for v in VARIANTI)
    comuni = {"stile": stile, "frase": FRASE, "nome": NOME, "coda": CODA, "varianti": varianti}

    scrivi("firma.html", HTML % {"stile": stile, "blocco": blocco()})
    scrivi("firma.php", PHP % dict(comuni, blocco=BLOCCO.format(
        classi="<?php echo esc_attr( implode( ' ', $classi ) ); ?>",
        indirizzo="<?php echo esc_url( '%s' ); ?>" % INDIRIZZO,
        etichetta="<?php echo esc_attr( $etichetta ); ?>",
        frase="<?php echo esc_html( $frase ); ?>",
        nome="<?php echo esc_html( '%s' ); ?>" % NOME,
    )))
    scrivi("firma.blade.php", BLADE % dict(comuni, blocco=BLOCCO.format(
        classi="{{ $firmaClassi }}",
        indirizzo=INDIRIZZO,
        etichetta="{{ $firmaFrase }} %s%s" % (NOME, CODA),
        frase="{{ $firmaFrase }}",
        nome=NOME,
    )))

    incollare = ("<style>%s</style>\n%s\n" % (stile, blocco())).encode("utf-8")
    print("stile stretto        %5d byte" % len(stile.encode("utf-8")))
    print("link senza stile     %5d byte" % len(blocco().encode("utf-8")))
    print("blocco da incollare  %5d byte  (%.2f KB · compresso, com'è servito: %d byte)"
          % (len(incollare), len(incollare) / 1024, len(gzip.compress(incollare, 9))))
    for nome in ("firma.html", "firma.php", "firma.blade.php"):
        print("scritto %-16s %5d byte" % (nome, os.path.getsize(os.path.join(QUI, nome))))


def main():
    p = argparse.ArgumentParser(description="Rifà i file della firma, o stampa il blocco con un'altra frase.")
    p.add_argument("--frase", help="la frase prima del monogramma: «Fatto da», «Sito di», «Sistema di»")
    p.add_argument("--variante", help="quieta, sola, stretta, o più d'una fra virgolette")
    p.add_argument("--senza-stile", action="store_true", help="solo il link, per i siti che hanno firma.css nella build")
    a = p.parse_args()

    if a.frase is None and a.variante is None and not a.senza_stile:
        rifai()
        return
    link = blocco(a.frase if a.frase is not None else FRASE, a.variante or "")
    print(link if a.senza_stile else "<style>%s</style>\n%s" % (stile_stretto(), link))


if __name__ == "__main__":
    main()
