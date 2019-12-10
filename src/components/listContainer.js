import React from 'react';
import {Grid} from '@material-ui/core';
import Card from './card';

/** Conteneur de la liste de fournitures qui sera affichée */
const ListContainer = (props) =>{
    return (
    <Grid container spacing={3}>
            {/* On map la liste filtrée pour afficher une grille de cards */}        
            {props.listeFournitures.filteredListe.map((lot, i) =>{
                return    (     
                    lot.lignes.map((ligne, k) => {
                        return (
                            /* Pour chaque ligne d'un lot, on affiche un item Grid avec une Card dont les props seront les valeurs de la ligne */
                            <Grid key={i+'grid-list-'+k} item xs={4}>                          
                                <Card key={k+'card-list-'+i} {...ligne} />
                             </Grid>
                        )
                    })
                ) 
            })}     
    </Grid>
    )
}

export default ListContainer;