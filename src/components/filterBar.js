import React, { useContext } from 'react';
import {Grid, Paper, Select, MenuItem, InputLabel} from '@material-ui/core';
import HemeattContext from '../hemeattContext'

// callback quand on choisi une valeur dans le filtre de lots métier
const handleChangeFiltreLotsMetier = (data, value) =>{
    let filtered = [];
    let lignes = [];
    // On parcours chaque lot de la liste originale qui est dans le store
    data.data.originalListe.forEach((lot) =>{
        // Si la valeur du select qu'on a choisi dans le filtre lots métier est "NO_LOCATION", correspondant au libellé "Autres presatations"
        if(value === "NO_LOCATION"){
            // On parcours chaque ligne d'un lot
            lot.lignes.forEach((ligne) => {
                // Si le tableau contenant les localisations d'une ligne est vide
                if(ligne.locationsDetails.locations.length === 0){
                    // On ajoute la ligne dans le tableau lignes
                    lignes.push(ligne);
                }
            });
        // Sinon, si la valeur est différente de "NO_LOCATION"
        } else {
            // Si le label du lot est égal à la valeur du select qu'on a choisi dans le filtre lots métier
            if(lot.label.localeCompare(value) === 0){
                // On ajoute le lot dans le tableau filtered
                filtered.push(lot);
                // On arrête la boucle car on a le lot qu'on désirait.
                return;
            }                 
        }
    });

    // Si la valeur du select qu'on a choisi dans le filtre lots métier est "NO_LOCATION", le tableau filtered doit être adapté car on a stocker seulement les lignes qui n'ont pas de localisations
    // La listre filtrée doit ressembler à la liste originale au niveau de sa structure soit [{'label' : ... , 'lignes' : [ligne1,ligne2]] mais seul l'attribut lignes nous interesse.
    if(value === "NO_LOCATION"){
        filtered = [{'lignes' : lignes}];
    }  // Sinon on ne touche pas au tableau filtered qui a déjà la bonne structure
    
    // On met à jour le store, avec la nouvelle listre filtrée par un lot métier donné
    data.setData({'originalListe' : data.data.originalListe , 'filteredListe' : filtered});
};

// callback quand on choisi une valeur dans le filtre des pièces
const handleChangeFiltrePieces = (data, value) =>{
    // tableau qui contiendra les lignes qu'on veut afficher en fonction du filtre
    let lignes = [];
    // On parcours chaque lot de la liste originale qui est dans le store
    data.data.originalListe.forEach((lot) =>{
        // On parcours chaque ligne d'un lot
        lot.lignes.forEach((ligne) => {
            // On parcours chaque localisations d'une ligne
            ligne.locationsDetails.locations.forEach((location) =>{
                // Si une des localisations de la ligne est égale à la valeur du select qu'on a choisie dans le filtre des pèces
                if(location.uuid.localeCompare(value) === 0){
                    // On ajoute la ligne au tableau lignes
                    lignes.push(ligne);
                }
            });
        });
    });
    // On met à jour le store, avec la nouvelle listre filtrée par une pièce donnée
    // La listre filtrée doit ressembler à la liste originale au niveau de sa structure soit [{'label' : ... , 'lignes' : [ligne1,ligne2]] mais seul l'attribut lignes nous interesse.
    data.setData({'originalListe' : data.data.originalListe , 'filteredListe' : [{'lignes' : lignes}]});
};

// Barre de filtre qui sera affichée à l'écran
const FilterBar = (props) =>{
    // On récupère l'objet data du store, qui correspond à {data : data, setData:setData} (il contient l'objet avec la liste originale et la liste filtrée "data", ainsi que son setter "setData")
    const data = useContext(HemeattContext);
    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Paper >
                    <InputLabel id="demo-simple-select-label" className="label-filtre">Filtre sur lots métier :</InputLabel>
                    <Select className="select-filtre"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // event onChange, au changement de la valeur du select, on appel une fonction de callback handleChangeFiltreLotsMetier.
                        // A cette fonction, on lui passe la valeur data qui vient du store, et la valeur du champs selectionné dans le select.                  
                        onChange={(evt) => handleChangeFiltreLotsMetier(data, evt.target.value)}
                    >
                    {/* Correspond aux options du select. On map la liste de lots métiers qu'on a réçu des props pour afficher les valeurs */}
                    {props.listeLotsMetier.map(function(item,i){
                        return (
                            <MenuItem key={i+'menu-select-1'} value={item.label}>{item.label}</MenuItem>
                        )
                    })}
                         {/* Option qui correspond aux prestations qui n'ont pas de localisation, on l'ajoute à la main car elle n'existe pas dans la liste listeLotsMetier */}
                        <MenuItem value="NO_LOCATION">Autres prestations</MenuItem>                  
                    </Select>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper >
                    <InputLabel id="demo-simple-select-label" className="label-filtre">Filtre sur pièces :</InputLabel>
                    <Select className="select-filtre"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // event onChange, au changement de la valeur du select, on appel une fonction de callback handleChangeFiltrePieces.
                        // A cette fonction, on lui passe la valeur data qui vient du store, et la valeur du champs selectionné dans le select.   
                        onChange={(evt) => handleChangeFiltrePieces(data, evt.target.value)}
                    >
                    {/* Correspond aux options du select. On map la liste des pièces qu'on a réçu des props pour afficher les valeurs */}
                    {props.listePieces.map(function(item, i){
                        return (
                            <MenuItem key={i+'menu-select-2'} value={item.uuid}>{item.label}</MenuItem>
                        )
                    })}
                    </Select>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default FilterBar;