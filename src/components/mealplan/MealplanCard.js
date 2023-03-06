import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Button, Grid, Card, CardContent, CardHeader, Container, CardActions } from '@mui/material'
import { getAllMealPlans } from '../Api'
function MealPlanCard (props) {
  let potato = 0
  useEffect(() => {
    if (potato === 0) {
      getAllMealPlans().then((data) => {
        console.log(data)
        potato = 1
      })
    }
  }, [])
  return (
    <Card>
      <CardHeader title={props.month} />
      <CardContent>
        <Grid container className='recipeBox' spacing={0} >
          <Grid item xs={6} direction={'column'}>
            <Container>
              <Typography variant="h3">25</Typography>
            </Container>
            <Typography variant="h5">Recipes</Typography>
          </Grid>
          <Grid item xs={6} direction={'column'}>
            <Container>
              <Typography variant="h3">30</Typography>
            </Container>
            <Typography variant="h5">Ingredients</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Container className='edit_button_container' sx={{ width: 'auto' }}>
          <Button variant="outlined"
            size="large"
            onClick={e => props.setOpenModal(true)}>
            View Monthly Plan
          </Button>
        </Container>

      </CardActions>
    </Card>
  )
}

export default MealPlanCard
