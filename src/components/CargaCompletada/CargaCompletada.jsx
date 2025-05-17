import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function CargaCompleta({idCompra}) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">Su Pedido Se Cargo Con Exito!! su id es: {idCompra}</Alert>
    </Stack>
  );
}