<?php
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
	function eb_firma( $frase = 'Costruito da', $variante = '' ) {
		static $stile_stampato = false;

		$frase  = trim( (string) $frase );
		$classi = array( 'firma-eb' );
		foreach ( preg_split( '/\s+/', (string) $variante, -1, PREG_SPLIT_NO_EMPTY ) as $voce ) {
			if ( in_array( $voce, array( 'quieta', 'sola', 'stretta' ), true ) ) {
				$classi[] = 'firma-eb--' . $voce;
			}
		}
		$etichetta = $frase . ' Emanuele Boccia, apre emanueleboccia.it';

		if ( ! $stile_stampato ) {
			$stile_stampato = true;
			$stile          = '.firma-eb.firma-eb{all:unset;display:inline-flex!important;align-items:center;vertical-align:middle;cursor:pointer;color:inherit!important;text-decoration:none!important;background:none!important;border:0!important;box-shadow:none!important;outline:0!important;opacity:var(--firma-opacita,.7);transition:opacity .3s}.firma-eb::before,.firma-eb::after{content:none!important}.firma-eb .firma-eb__testo{all:unset;position:relative;display:grid;justify-items:end;margin-right:var(--firma-stacco,8px);font-size:var(--firma-testo,12px);font-style:normal;font-weight:500;line-height:1;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}.firma-eb .firma-eb__frase,.firma-eb .firma-eb__nome{all:unset;grid-area:1/1;transition:opacity .3s}.firma-eb .firma-eb__nome{opacity:0}.firma-eb .firma-eb__scena{all:unset;display:block;flex:none;width:var(--firma-misura,22px);height:var(--firma-misura,22px);perspective:calc(var(--firma-misura,22px)*5)}.firma-eb .firma-eb__moneta{all:unset;display:block;position:relative;width:100%;height:100%;transform-style:preserve-3d;rotate:y 0deg;animation:firma-eb-gira 9s linear infinite}.firma-eb .firma-eb__faccia{all:unset;display:block;position:absolute;top:0;left:0;width:100%;height:100%;fill:currentColor;-webkit-backface-visibility:hidden;backface-visibility:hidden}.firma-eb .firma-eb__faccia--dietro{transform:rotateY(180deg)}@keyframes firma-eb-gira{to{transform:rotateY(360deg)}}.firma-eb:is(:hover,:focus-visible){opacity:1}.firma-eb:is(:hover,:focus-visible) .firma-eb__frase{opacity:0}.firma-eb:is(:hover,:focus-visible) .firma-eb__nome{opacity:1}.firma-eb:is(:hover,:focus-visible) .firma-eb__moneta{rotate:y 360deg;transition:rotate .8s ease}.firma-eb:focus-visible{outline:2px solid currentColor!important;outline-offset:4px;border-radius:2px}.firma-eb--quieta .firma-eb__moneta{animation:none}.firma-eb--sola .firma-eb__testo{display:none}.firma-eb--stretta .firma-eb__nome{position:absolute;right:0;pointer-events:none}.firma-eb-posto{display:flex!important;flex:0 0 auto;justify-content:flex-end;align-items:center;margin-left:auto}@media(max-width:767px){.firma-eb-posto{flex:1 0 100%;width:100%;justify-content:center;margin:8px 0 0;order:99}.firma-eb-posto .firma-eb__nome{position:absolute;right:0;pointer-events:none}}@media(prefers-reduced-motion:reduce){.firma-eb .firma-eb__moneta{animation:none!important;transition:none!important}}';
			echo '<style id="firma-eb-stile">' . wp_strip_all_tags( $stile ) . '</style>';
		}
		?>
<a class="<?php echo esc_attr( implode( ' ', $classi ) ); ?>" href="<?php echo esc_url( 'https://emanueleboccia.it/' ); ?>" target="_blank" rel="noopener" aria-label="<?php echo esc_attr( $etichetta ); ?>"><span class="firma-eb__testo" aria-hidden="true"><span class="firma-eb__frase"><?php echo esc_html( $frase ); ?></span><span class="firma-eb__nome"><?php echo esc_html( 'Emanuele Boccia' ); ?></span></span><span class="firma-eb__scena" aria-hidden="true"><span class="firma-eb__moneta"><svg class="firma-eb__faccia" viewBox="0 0 42 42"><path d="M21 .55a20.45 20.45 0 1 0 0 40.9a20.45 20.45 0 1 0 0-40.9zM21 3.05a17.95 17.95 0 1 1 0 35.9a17.95 17.95 0 1 1 0-35.9zM8.18 27v-11.01h11.76v2.74h-7.79v1.42h6.72v2.59h-6.72v1.52h7.92v2.74zM21.62 27v-11.01h9.51q.9 0 1.65.35t1.19.95t.44 1.41q0 .8-.27 1.31t-.73.81t-1 .44v.06q.62.13 1.13.44t.82.87t.3 1.44q0 .88-.45 1.54t-1.24 1.02t-1.75.37zM25.58 24.44h4.06q.44 0 .71-.26t.27-.76q0-.24-.13-.44t-.34-.32t-.51-.11h-4.06zM25.58 20.28h3.8q.31 0 .53-.12t.33-.34t.12-.56q0-.36-.28-.6t-.7-.25h-3.8z"/></svg><svg class="firma-eb__faccia firma-eb__faccia--dietro" viewBox="0 0 42 42"><path d="M21 .55a20.45 20.45 0 1 0 0 40.9a20.45 20.45 0 1 0 0-40.9zM21 3.05a17.95 17.95 0 1 1 0 35.9a17.95 17.95 0 1 1 0-35.9zM8.18 27v-11.01h11.76v2.74h-7.79v1.42h6.72v2.59h-6.72v1.52h7.92v2.74zM21.62 27v-11.01h9.51q.9 0 1.65.35t1.19.95t.44 1.41q0 .8-.27 1.31t-.73.81t-1 .44v.06q.62.13 1.13.44t.82.87t.3 1.44q0 .88-.45 1.54t-1.24 1.02t-1.75.37zM25.58 24.44h4.06q.44 0 .71-.26t.27-.76q0-.24-.13-.44t-.34-.32t-.51-.11h-4.06zM25.58 20.28h3.8q.31 0 .53-.12t.33-.34t.12-.56q0-.36-.28-.6t-.7-.25h-3.8z"/></svg></span></span></a>
		<?php
	}
}
