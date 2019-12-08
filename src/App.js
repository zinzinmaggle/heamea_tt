import React, {useState, useEffect} from 'react';
import { HemeattProvider } from './hemeattContext'
import {AppBar, Toolbar, IconButton, Typography,Container, LinearProgress} from '@material-ui/core';
import FilterBar from './components/filterBar';
import ListContainer from './components/listContainer';
import axios from 'axios';
import './App.css';
function App() {

  /** Initialisation des variables d'état */
  // Je garde dans le state une liste originale des données pour pouvoir toujours appliquer les filtres sur la liste d'origine et sans fetch des datas plusieurs fois.
  const [data, setData] = useState({'originalListe' : [] , 'filteredListe' : []});
  // La liste des lots métier pour le select de la barre de filtre
  const [listeLotsMetier, setListeLotsMetier] = useState([]);
  // La liste des  pièces pour l'autre select de la barre de filtre
  const [listePieces, setlistePieces] = useState([]);
  // Un booleen qui permet d'indiquer si on est en train de charger la liste depuis l'api ou non
  const[loading, setLoading] = useState(true);

  /** Fetch des données */
  // De manière général il vaut mieux pas utiliser useEffect pour fetch les données car d'après la doc, ils vont remanier la manière de fetch les données à l'avenir.
  // Ils préconisent de rester sur une classe qui extends de React.Component et de fetch les données quand le composant se monte mais je ne le fais pas dans le cadre de cette application, car je m'autoforme sur les hooks.
  useEffect(async () => {

    const result = await axios(
      'https://api.travauxlib.com/api/devis-pro/JKusHl8Ba8MABIjdCtLZOe2lxxnUfX',
    );

    // On stock dans le store la liste des fournitures à afficher.
    // Au départ on affiche toutes les données du json reçu car pas de filtre choisi.
    // FilteredList correspond à la liste de fournitures qui sera affichée à l'écran.
    setData({'originalListe' : result.data.lots , 'filteredListe' : result.data.lots});
    // On défini la liste des lots métiers
    setListeLotsMetier(result.data.lots);
    // On défini la liste des pièces
    setlistePieces(result.data.locations);

    // On est plus en train de charger la liste.
    setLoading(false);

  }, []);


  return (
    <div>
      {/* Header de l'application */}
      <AppBar position="static">
          <Toolbar>
              <IconButton edge="start"  color="inherit" aria-label="menu">
              </IconButton>
              <Typography variant="h6" >
                HEMEA  - TEST TECHNIQUE
              </Typography>
          </Toolbar>
      </AppBar>
      {/* Header de l'application */}

      {/* Provider de l'application, on donne au store la variable d'état data ainsi que son setter pour pouvoir mettre à jour le store depuis un enfant. Tous les enfants du provider auront accès au store. */}
      <HemeattProvider value={{data : data, setData:setData}}>

          {/* Conteneur pour la barre de filtre */}
          <Container  className="filterbar" >
              {/* FilterBar reçoit en props la liste de lots métier et la liste de pièces qui viennent du state */}
              <FilterBar listeLotsMetier={listeLotsMetier} listePieces={listePieces} />
          </Container>
          {/* Conteneur pour la barre de filtre */}

          {/* Conteneur pour la liste de Fournitures */}
          <Container>
              {/* ListContainer reçoit en props la liste des fournitures qui vient du state, présente dans le store et qui peut être m-a-j */}
              {/* On affiche ListContainer ssi la variable d'état loading est à faux, sinon on affiche le loader LinearProgress.  */}
              {!loading ? <ListContainer listeFournitures={data} /> : <LinearProgress className="loader"/> }
          </Container>
          {/* Conteneur pour la liste de Fournitures */}

      </HemeattProvider>
      {/* Provider de l'application */}
    </div>
  );
}

export default App;
