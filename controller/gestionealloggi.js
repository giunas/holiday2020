const DBMSboundary = require('./DBMSboundary');

const dbmsboundary = new DBMSboundary();

var main = function(risposta, richiesta, cb) {
    var dati = richiesta.query;
    var action = dati["action"];
    var session_id = dati["session_id"];
    var id_all = dati["id_all"];
    var id_pren = dati["id_pren"];

    //tipo in account: 0 admin, 1 affittuario, 2 locatore.
    //stato prenotazione: 0 in sospeso, 1 accettata, 2 rifiutata o cancellata.
    dbmsboundary.cercaSessione(session_id, function (err, result) {
        if(result.length > 0) { //LOGGATO
            //funzionalità a disposizione del locatore
            if(result[0].tipo == 2) {
                if(action == "notificaGestioneAlloggi") {
                    dbmsboundary.cercaAlloggi(result[0].email, function(err, result) {
                        if(err) {
                            cb("ERR");
                        }
                        if(result) {
                            cb(result);
                        }
                    });
                }

                if(action == "notificaCercaDettagli") {
                    dbmsboundary.cercaPrenotazioniLocatore(result[0].email, id_all, function(err, result) {
                        if(err) {
                            cb("ERR");
                        }
                        if(result) {
                            cb(result);
                        }
                    });
                }

                if(action == "notificaEliminaPrenotazione") {
                    dbmsboundary.eliminaPrenotazioneLocatore(id_pren, function(err, result) {
                        if(err) {
                            cb("ERR");
                        }
                        if(result) {
                            cb(result);
                            //invio email ad affittuario.
                        }
                    });
                } 
                
                if(action == "notificaAccettaPrenotazione") {
                    dbmsboundary.accettaPrenotazione(id_pren, function(err, result) {
                        if(err) {
                            cb("ERR");
                        }
                        if(result) {
                            cb(result);
                            //invio email ad affittuario.
                        }
                    });
                } 

                //inserire cb di errore anche qui
            }
        }

        else if(result.length == 0)
            cb("NOSESSION"); //NON LOGGATO
        else
            cb("ERR");
    });

}

module.exports = {
    main:main
};