const DBMSboundary = require('./DBMSboundary');

const dbmsboundary = new DBMSboundary();

var main = function(risposta, richiesta, cb) {
    var dati = richiesta.query;
    var action = dati["action"];
    var session_id = dati["session_id"];
    var id_pren = dati["id_pren"];

    //tipo in account: 0 admin, 1 affittuario, 2 locatore.
    if(action == "getTipoAccount") {
        dbmsboundary.cercaSessione(session_id, function (err, result) {
            if(result.length > 0) {
                cb((result[0].tipo).toString());
            }
            else if(result.length == 0)
                cb("NOSESSION"); //NON LOGGATO
            else
                cb("ERR");
        })
    }

    else {
    dbmsboundary.cercaSessione(session_id, function (err, result) {
        if(result.length > 0) { //LOGGATO
            //funzionalità a disposizione dell'affittuario e del locatore
            if(result[0].tipo == 1 || result[0].tipo == 2) {
                if(action == "notificaGestionePrenotazioni") {
                    dbmsboundary.cercaPrenotazioniCliente(result[0].email, function(err, result) {
                        if(err) {
                            cb("ERR");
                        }
                        if(result) {
                            cb(result);
                        }
                    });
                }

                if(action == "notificaEliminaPrenotazione") {
                    dbmsboundary.eliminaPrenotazione(result[0].email, id_pren, function(err, result) {
                        if(result) {
                            cb("OK");
                        }
                        else {
                            cb("ERR");
                        }
                    });	
                }

                //inserire cb di errore anche qui
            }

            //funzionalità a disposizione dell'admin
            else if(result[0].tipo == 0) {
              
                if(action == "notificaGestionePrenotazioni") {
                    dbmsboundary.cercaPrenotazioni(function(err, result) {
                        if(err)
                            cb("ERR");
                        if(result)
                            cb(result);
                    });
                }
            }
        }

        else if(result.length == 0)
            cb("NOSESSION"); //NON LOGGATO
        else
            cb("ERR");
    });
    }
}

module.exports = {
    main:main
};