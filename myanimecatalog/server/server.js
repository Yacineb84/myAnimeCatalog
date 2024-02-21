const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

let users = [];
let logged = false;
let userLogged = {};

app.get("/api", (req, res) => {
  res.json({ numbers: ["one", "two", "three"] });
});

app.get("/mesepisodes", (req, res) => {
  res.json({ numbers: ["ep1", "ep2", "ep3"] });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/monespacee", (req, res) => {
  res.json({ email: userLogged.email, password: userLogged.password });
});
//enregistrer un utilisateur
app.post("/registration", async (req, res) => {
  //si le tableau users est vide on fait le hash du mot de passe et on construit l'objet user
  if (users.length == 0) {
    try {
      const salt = await bcrypt.genSalt();
      const motDePasseHash = await bcrypt.hash(req.body.password, salt);
      const user = {
        prenom: req.body.prenom,
        email: req.body.email,
        password: motDePasseHash,
        preferred: [],
        lastEpisodes: [],
        normalEpisodes: [],
      };
      //on ajoute l'objet user a users
      users.push(user);
      res.status(201).send("utilisateur crée");
    } catch (error) {
      res.status(500).send("l'utilisateur n'a pas été crée");
    }
  } else {
    //si le tableau users n'est pas vide, alors on parcourt users pour bien vérifier si l'utilisateur n'existe pas
    let bii = false;
    users.map((el, i) => {
      if (el.email === req.body.email) bii = true;
    });
    //s'il sagit d'un nouvel utilisateur alors on l'ajoute a users
    if (!bii) {
      try {
        const salt = await bcrypt.genSalt();
        const motDePasseHash = await bcrypt.hash(req.body.password, salt);
        const user = {
          prenom: req.body.prenom,
          email: req.body.email,
          password: motDePasseHash,
          preferred: [],
          lastEpisodes: [],
          normalEpisodes: [],
        };
        users.push(user);
        res.status(201).send("utilisateur crée");
      } catch (error) {
        res.status(500).send("l'utilisateur n'a pas été crée");
      }
    }
  }
});
//ajout épisode qui n'est pas dans les animés préférés
app.put("/registration/add-episode", async (req, res) => {
  //je récupère l'objet user, donc l'utilisateur connecté avec ses info
  const user = users.find((user, i) => user.email === req.body.email);
  if (user == null) {
    return res.status(400).send("utilisateur inexistant");
  }
  console.log(
    req.body.normalEpisodes.name + " - " + req.body.normalEpisodes.episodes
  );
  //si il n'a aucun episode 'simple' donc pas d'un animé préféré, on ajoute un objet qui va contenir le nom de l'animé et un array des épisodes de cet animé
  if (user.normalEpisodes.length === 0) {
    let arr = [];
    arr.push(req.body.normalEpisodes.episodes);
    user.normalEpisodes.push({
      anime: req.body.normalEpisodes.name,
      episodes: arr,
    });
    return res.json(user);
  } else {
    //si l'utilisateur a déjà ajouté des épisodes, je parcours les objets et je vérifie si l'épisode n'est pas déjà dedans
    let boo = false;
    user.normalEpisodes.map((el, i) => {
      if (el.anime === req.body.normalEpisodes.name) {
        boo = true;
        if (
          !user.normalEpisodes[i].episodes.includes(
            req.body.normalEpisodes.episodes
          )
        )
          user.normalEpisodes[i].episodes.push(
            req.body.normalEpisodes.episodes
          );
      }
    });
    //si le nouvel épisode appartient à un animé qui n'existe pas dans normalEpisodes, on ajoute un objet qui va contenir le nom et la liste des épisodes
    if (!boo) {
      let arr = [];
      arr.push(req.body.normalEpisodes.episodes);
      user.normalEpisodes.push({
        anime: req.body.normalEpisodes.name,
        episodes: arr,
      });
    }
  }
  res.json(user);
});

app.put("/registration/add-preferred", async (req,res)=>{
  //on récupère le user
  const user = users.find((user, i) => user.email === req.body.email);
  if (user == null) {
    return res.status(400).send("utilisateur inexistant");
  }
  //on ajoute un animé à la liste des préférés
  if (req.body.preferred != null) {
    //si le user n'a pas de préféré alors on lui ajoute un objet qui contient l'animé et la liste des épisodes déjà vus
    if (user.preferred.length === 0) {
      user.preferred.push(req.body.preferred);
      user.lastEpisodes.push({
        anime: req.body.preferred,
        episodes: [],
      });
      return res.json(user);
    } else {
      //dans le cas où la liste des préférés n'est pas vide on parcourt la liste pour vérifier que le préféré choisi par l'utilisateur n'existe pas dans ses préférés
      //on fait comme ça pour ne pas avoir des doublons dans les préférés
      let bio = true;
      user.preferred.map((el, i) => {
        if (el.title === req.body.preferred.title) {
          bio = false;
        }
      });
      //ici on vérifie le boolean et s'il est true ça veut dire que l'animé n'existe pas dans la liste des préférés
      if (bio) {
        user.preferred.push(req.body.preferred);
        user.lastEpisodes.push({
          anime: req.body.preferred,
          episodes: [],
        });
      }
    }
  }
  //on ajoute les épisodes des préférés dans l'animé correspondant
  if (req.body.lastEpisodes != null) {
    if (user.lastEpisodes.length === 0) {
      //si c'est le premier ajout on lui ajoute les épisodes
      user.lastEpisodes.push(req.body.lastEpisodes);
    } else {
      //si l'utilisateur a déjà des épisodes appartenant à des animés préférés alors on parcourt la liste des objets
      user.lastEpisodes.map((element, i) => {
        //si on est dans le bon animé
        if (element.anime.title === req.body.lastEpisodes.anime.title) {
          if (
            //si l'épisode req.body.lasteEpisode.episodes n'existe pas dans la liste des épisodes de cet animé préféré
            !user.lastEpisodes[i].episodes.includes(
              req.body.lastEpisodes.episodes
            )
          )
          //alors on ajoute l'épisode dans la liste des épisodes de cet animé
            user.lastEpisodes[i].episodes.push(req.body.lastEpisodes.episodes);
          user.lastEpisodes[i].episodes.sort();
        }
      });
    }
  }
  res.json(user);
})
//modifier le mot de passe
app.put("/registration/edit-password", async (req, res) => {
  const user = users.find((user, i) => user.email === req.body.email);
  if (user == null) {
    return res.status(400).send("utilisateur inexistant");
  }

  //on modifie les données
  //if(req.body.prenom !== undefined) user.prenom=req.body.prenom
  if (
    req.body.password !== undefined ||
    req.body.password !== null ||
    req.body.password !== ""
  ) {
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(req.body.password2, salt);
        /*res.status(200).send("mot de passe correcte")
        return*/
      } else {
        //res.send({"errore":"errore"});
        //return
      }
    } catch (error) {
      res.status(500).send("problème de connexion");
    }
    console.log(
      "password: " + req.body.password + "\npassword2: " + req.body.password2
    );
  }
  res.json(user);
});
//pour supprimer le compte
app.delete("/registration/delete-account", async (req, res) => {
  //on recupère l'utilisateur
  const user = users.find((user, i) => user.email === req.body.email);
  if (user == null) {
    return res.status(400).send("utilisateur inexistant");
  }
  //si dans les req on a le paramètre delete on supprime le user du tableau users
  if (req.body.delete === "delete") {
    users.map((el, i) => {
      if (el.email === req.body.email) {
        //pour supprimer l'utilisateur on utilise .filter()
        users = users.filter((e) => e.email !== req.body.email);
      }
    });
  }
  res.json(user);
});
//supprimer un préféré
app.delete("/registration/delete-preferred", async (req, res) => {
  const user = users.find((user, i) => user.email === req.body.email);
  if (user == null) {
    return res.status(400).send("utilisateur inexistant");
  }
  //on supprime un animé à la liste des préférés
  user.preferred.forEach((element, i) => {
    //quand on trouve l'animé on l'enlève du user.preferred avec .filter()
    if (element.title === req.body.preferred) {
      user.preferred = user.preferred.filter(
        (el) => el.title !== req.body.preferred
      );
    }
  });
  //on supprime les épisodes de cet animé préféré
  user.lastEpisodes.forEach((element, i) => {
    //quand on trouve l'animé on enlève ses épisodes du user.lastEpisodes avec .filter()
    if (element.anime.title === req.body.preferred) {
      user.lastEpisodes = user.lastEpisodes.filter(
        (el) => el.anime.title !== req.body.preferred
      );
    }
  });
  res.json(user);
});
//authentification
app.post("/login", async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);
  if (user == null) {
    return res.status(400).send("utilisateur inexistant");
  }
  //on vérifie qu'il s'agit bien du bon utilisateur
  try {
    //bcrypt.compare va vérifier que le mot de passe sauvegarde sous forme de hash, est égal au mot de passe inseré par l'utilisateur
    if (await bcrypt.compare(req.body.password, user.password)) {
      logged = true;
      res.json(user); //on renvoi l'utilisateur
    } else {
      res.send({ errore: "errore" });
    }
  } catch (error) {
    res.status(500).send("problème de connexion");
  }
});

app.listen(5000);
