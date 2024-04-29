const express = require("express");
const pg = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
const moment = require("moment");

const app = express();
var corsOptions = { origin: "http://localhost:4200" };
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE;
const client = new pg.Client(DATABASE_URL);

client.connect().then(function () {
  console.log("Database connected successfully");
});

app.get("/demandes_conges", (req, res) => {
  let sqlSen = `Select * from  DemandesConges d,  Employes e WHERE d.id_employe = e.id_employe; `;
  let dataSql = [];
  client.query(sqlSen, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).send("An error occurred while getting data.");
    }
    res.json(result.rows);
  });
});
// mte3 accepter counger
app.post("/accepter_conge", (req, res) => {
  let { id_demande } = req.body;
  let recupererDemandeSql = `SELECT * FROM demandesconges WHERE id_demande = ${id_demande}`;
  client.query(recupererDemandeSql, [], function (err, response) {
    if (err) return res.status(500).json({ msg: "erreur d'acceptation" });
    let demande = response.rows[0];
    console.log(demande);
    if (!demande)
      return res.status(404).json({ msg: "id de demande invalide" });
    // reduce solde
    let soldeSql = `UPDATE Employes SET solde_conges = solde_conges - ${demande.jours} WHERE id_employe = ${demande.id_employe}`;
    client.query(soldeSql, [], (error, result) => {
      if (err) return res.status(500).json({ msg: "erreur d'acceptation" });
      let ajouterAuHistoriqueSql = `INSERT INTO historique_conges (id_demande, date_action, action, date_demande, date_debut, date_fin, id_employe, jours, nom, prenom, type_conge, motif) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
      client.query(
        ajouterAuHistoriqueSql,
        [
          demande.id_demande,
          new Date(),
          "accepte",
          demande.date_demande,
          demande.datedebut,
          demande.datefin,
          demande.id_employe,
          demande.jours,
          demande.nom,
          demande.prenom,
          demande.typecongeid,
          demande.motif,
        ],
        function (err, response) {
          if (err) {
            console.log(err);
            return res.status(500).json({ msg: "erreur d'acceptation" });
          }
          let effacerDemandeSql = `DELETE FROM demandesconges WHERE id_demande = ${id_demande}`;
          client.query(effacerDemandeSql, [], function (err, response) {
            if (err) {
              console.log(err);
              return res.status(500).json({ msg: "erreur d'acceptation" });
            }
            res.json({ msg: "demande de conge accepté" });
          });
        }
      );
    });
  });
});
//mte3 refuse
app.post("/refuser_conge", (req, res) => {
  let { id_demande } = req.body;
  let recupererDemandeSql = `SELECT * FROM demandesconges WHERE id_demande = ${id_demande}`;
  client.query(recupererDemandeSql, [], function (err, response) {
    if (err) return res.status(500).json({ msg: "erreur d'acceptation" });
    let demande = response.rows[0];
    console.log(demande);
    if (!demande)
      return res.status(404).json({ msg: "id de demande invalide" });
    let ajouterAuHistoriqueSql = `INSERT INTO historique_conges (id_demande, date_action, action, date_demande, date_debut, date_fin, id_employe, jours, nom, prenom, type_conge, motif) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
    client.query(
      ajouterAuHistoriqueSql,
      [
        demande.id_demande,
        new Date(),
        "refuse",
        demande.date_demande,
        demande.datedebut,
        demande.datefin,
        demande.id_employe,
        demande.jours,
        demande.nom,
        demande.prenom,
        demande.typecongeid,
        demande.motif,
      ],
      function (err, response) {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "erreur d'acceptation" });
        }
        let effacerDemandeSql = `DELETE FROM demandesconges WHERE id_demande = ${id_demande}`;
        client.query(effacerDemandeSql, [], function (err, response) {
          if (err) {
            console.log(err);
            return res.status(500).json({ msg: "erreur d'acceptation" });
          }
          res.json({ msg: "demande de conge refusé" });
        });
      }
    );
  });
});

//login
app.post("/login", login);

function login(req, res) {
  const { id, password } = req.body;
  let sqlSen = `Select id_employe, pwd , poste, nom, prenom, genre from Employes WHERE id_employe = ${id};`;
  let dataSql = [];
  client.query(sqlSen, dataSql, function (err, result) {
    if (err || !result.rows[0]) {
      return res.status(404).json({ msg: "id incorrect" });
    }
    if (password != result.rows[0].pwd) {
      return res.status(400).json({ msg: "mot de passe incorrect" });
    }
    return res.status(200).json(result.rows[0]);
  });
}

//insert employee

app.post("/sendData", sendData);
function sendData(req, res) {
  const { id, nom, prenom, email, password, departement, genre } = req.body;
  let sqlSen =
    "INSERT INTO Employes (id_employe, nom , prenom , departement , email , pwd, genre) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  let dataSql = [id, nom, prenom, departement, email, password, genre];
  client.query(sqlSen, dataSql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).send("An error occurred while adding data.");
    }

    res.json({
      msg: "Data received successfully",
    });
  });
}

app.get("/tous-historique", function (req, res) {
  let historiqueSql = `SELECT * FROM historique_conges`;
  client.query(historiqueSql, [], function (err, response) {
    return res.json({
      historique: response.rows,
    });
  });
});

app.get("/historique/:id", function (req, res) {
  let userId = req.params.id;
  let historiqueSql = `SELECT * FROM historique_conges WHERE id_employe = '${userId}'`;
  client.query(historiqueSql, [], function (err, response) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        msg: "erreur de recuperation d'historique",
      });
    }

    return res.json({
      historique: response.rows,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//jeeeb list des employes
app.get("/liste", liste);
function liste(req, res) {
  const { id, nom, prenom, email, poste, departement } = req.body;
  let sqlSen = `Select * from Employes;`;
  let dataSql = [];
  client.query(sqlSen, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).send("An error occurred while getting data.");
    }
    res.json(result.rows);
  });
}
// insert  DemandesConges
app.post("/demande", demande);

function demande(req, res) {
  const { id, nom, prenom, datedebut, datefin, motif, typeConge, genre } =
    req.body;

  console.log(genre);

  const dateDemande = new Date().toDateString();

  let dateDebut = moment(datedebut);
  let dateFin = moment(datefin);
  let jours = dateFin.diff(dateDebut, "days");

  if (jours <= 0)
    return res.status(400).json({
      msg: "Date de debut et date de fin invalides",
    });
  else if (typeConge == "repos" && jours > 30)
    return res.status(400).json({
      msg: "Conge de repos ne peut pas depasser 30 jours",
    });
  else if (typeConge == "maladie" && jours > 30)
    return res.status(400).json({
      msg: "Conge de maladie ne peut pas depasser 30 jours",
    });
  else if (typeConge == "administratif" && jours > 7)
    return res.status(400).json({
      msg: "Conge administratif ne peut pas depasser 7 jours",
    });
  else if (typeConge == "accompagnement" && jours > 5)
    return res.status(400).json({
      msg: "Conge d'accompagnement ne peut pas depasser 5 jours",
    });
  else if (typeConge == "mariage" && jours > 5)
    return res.status(400).json({
      msg: "Conge de mariage ne peut pas depasser 5 jours",
    });
  else if (typeConge == "circonsition" && jours > 1)
    return res.status(400).json({
      msg: "Conge de circonsition ne peut pas depasser 1 jour",
    });
  else if (typeConge == "demenagement" && jours > 1)
    return res.status(400).json({
      msg: "Conge de demenagement ne peut pas depasser 1 jour",
    });
  else if (typeConge == "deces" && jours > 5)
    return res.status(400).json({
      msg: "Conge de deces ne peut pas depasser 5 jours",
    });
  else if (typeConge == "naissance enfant" && jours > 3)
    return res.status(400).json({
      msg: "Conge de naissance enfant ne peut pas depasser 3 jours",
    });
  else if (typeConge == "maternite") {
    if (genre != "femme")
      return res.status(400).json({
        msg: "Conge de maternite est disponible pour les femmes seulements",
      });
    else if (jours > 60)
      return res.status(400).json({
        msg: "Conge de maternite ne peut pas depasser 60 jours",
      });
  } else if (typeConge == "conge ss solde" && jours > 92)
    return res.status(400).json({
      msg: "Conge sans solde ne peut pas depasser 3 mois",
    });

  const sqlSolde = `SELECT solde_conges FROM Employes WHERE id_employe = ${id}`;
  client.query(sqlSolde, [], (error, result) => {
    let solde = result.rows[0].solde_conges;
    if (solde < jours) {
      return res.status(400).json({
        msg: "Votre solde de conges est insuffisant",
      });
    }
  });

  let sqlSen =
    "INSERT INTO DemandesConges ( id_employe, datedebut , datefin , motif, nom, prenom, typecongeid, date_demande, jours) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
  let dataSql = [
    id,
    datedebut,
    datefin,
    motif,
    nom,
    prenom,
    typeConge,
    dateDemande,
    jours,
  ];
  client.query(sqlSen, dataSql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).send("An error occurred while adding data.");
    }
    res.json({ msg: "data received" });
  });
}
//supprimer
app.delete("/employe/:id", async (req, res) => {
  const id = req.params.id;
  client.query(
    "DELETE FROM Historique_Conges WHERE id_demande IN (SELECT id_demande FROM DemandesConges WHERE id_employe = $1)",
    [id]
  );
  client.query("DELETE FROM DemandesConges WHERE id_employe = $1", [id]);

  const result = client.query("DELETE FROM employes WHERE id_employe = $1", [
    id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({ msg: "Employé non trouvé" });
  }
  return res.status(200).json({ msg: "Employé supprimé avec succès" });
});
// affiche mte3 employe we7ed
app.get("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let sqlSen = `Select * from Employes WHERE id_employe = ${id};`;
  let dataSql = [];
  client.query(sqlSen, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).send("An error occurred while getting data.");
    }
    res.json(result.rows[0]);
  });
});

app.get("/solde/:id", (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT solde_conges FROM employes WHERE id_employe = ${userId}`;
  client.query(sql, [], function (err, result) {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).send("An error occurred while getting data.");
    }
    res.json(result.rows[0]);
  });
});

app.post("/modifier/:id", (req, res) => {
  const id = req.params.id;
  let { nom, prenom, departement, email, pwd } = req.body;
  let sql = `UPDATE employes SET nom = '${nom}', prenom = '${prenom}', departement = '${departement}', email = '${email}', pwd = '${pwd}' WHERE id_employe = ${id}`;
  client.query(sql, [], function (err, result) {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).send("An error occurred while updating data.");
    }
    res.json({
      message: "employee data updated",
    });
  });
});
