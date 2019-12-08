import React from 'react';
import {Card, CardContent, Typography, CardActions, Button} from '@material-ui/core'

/** Card qui sera affichée dans la liste de fournitures */
const CardOr = (props) => {
    // Les props utilisées sont les valeurs d'une ligne.
    return (
        <Card >
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {props.uuid}
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.designation}
                </Typography>
                <Typography color="textSecondary">
                </Typography>
                <Typography variant="body2" component="p">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">€{props.prixHT} HT - €{props.prixTTC} TTC</Button>
            </CardActions>
        </Card>
    )
};

export default CardOr;