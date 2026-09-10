"""
Bilancia finta.

Serve a far girare tutto il resto senza avere la bilancia vera sul tavolo.
Parla come parlano molte bilance industriali: sta in ascolto su una porta di
rete, tu le mandi un comando, lei risponde con una riga di testo.

    tu mandi:  P\r\n
    lei dice:  ST,GS,+  1.240,kg\r\n

    ST = peso fermo (stable)      US = peso che balla (unstable)
    GS = peso lordo (gross)

Per far vedere il giro completo simula un ciclo che si ripete da solo:
piatto vuoto, qualcosa che viene appoggiato, peso che si assesta, peso fermo,
oggetto tolto. Cosi si vede funzionare anche il blocco anti-ristampa.

Si lancia da sola:   python3 bilancia_finta.py
"""

import random
import socket
import threading
import time

INDIRIZZO = "127.0.0.1"
PORTA = 4001

# stato condiviso fra il ciclo che simula e le connessioni che rispondono
_stato = {"peso": 0.0, "fermo": True}
_lucchetto = threading.Lock()


def ciclo_bilancia():
    """Simula qualcuno che appoggia una vaschetta, la pesa e la toglie."""
    while True:
        # piatto vuoto
        _scrivi(0.0, True)
        time.sleep(3.0)

        # qualcuno appoggia: il peso sale e balla
        obiettivo = round(random.uniform(0.180, 2.400), 3)
        passi = 12
        for i in range(1, passi + 1):
            parziale = obiettivo * (i / passi) + random.uniform(-0.015, 0.015)
            _scrivi(max(0.0, round(parziale, 3)), False)
            time.sleep(0.12)

        # si assesta: da qui il peso e fermo e la stampa si puo fare
        _scrivi(obiettivo, True)
        time.sleep(6.0)

        # tolgono l'oggetto
        _scrivi(0.0, False)
        time.sleep(0.4)


def _scrivi(peso, fermo):
    with _lucchetto:
        _stato["peso"] = peso
        _stato["fermo"] = fermo


def _leggi():
    with _lucchetto:
        return _stato["peso"], _stato["fermo"]


def _riga_risposta():
    peso, fermo = _leggi()
    return "%s,GS,%+8.3f,kg\r\n" % ("ST" if fermo else "US", peso)


def servi(conn, indirizzo):
    conn.settimeout(30)
    try:
        while True:
            dati = conn.recv(64)
            if not dati:
                return
            # qualunque cosa arrivi viene trattata come "dimmi il peso":
            # la bilancia vera vorra un comando preciso, e sara l'unica riga
            # da cambiare quando arriva il manuale.
            conn.sendall(_riga_risposta().encode("ascii"))
    except (socket.timeout, ConnectionResetError, BrokenPipeError):
        return
    finally:
        conn.close()


def main():
    threading.Thread(target=ciclo_bilancia, daemon=True).start()

    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((INDIRIZZO, PORTA))
    server.listen(5)
    print("Bilancia finta in ascolto su %s:%d" % (INDIRIZZO, PORTA))
    print("Manda qualsiasi cosa, risponde col peso. Ctrl+C per fermare.")

    try:
        while True:
            conn, indirizzo = server.accept()
            threading.Thread(target=servi, args=(conn, indirizzo), daemon=True).start()
    except KeyboardInterrupt:
        print("\nFerma.")
    finally:
        server.close()


if __name__ == "__main__":
    main()
