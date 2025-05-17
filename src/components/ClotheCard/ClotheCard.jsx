import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const ClotheCard = ({ clothe }) => {
  return (
    <Card sx={{ maxWidth: 3350}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={140}
          image={clothe.img}
          alt={clothe.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {clothe.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Haga Click para una vista mas detallada
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ClotheCard;