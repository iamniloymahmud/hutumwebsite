import React from 'react'
import {Typography, Box, useMediaQuery} from '@mui/material'

const Header = ({title, subTitle}) => {
    const isMobile = useMediaQuery("(max-width: 500px)");
  return (
    <Box>
        <Typography 
            fontSize= {isMobile ? '1.5rem' : '35px'}
            fontWeight={'bold'}
            sx={{mb: '5px'}}
        >
            {title}
        </Typography>
    </Box>
  )
}

export default Header