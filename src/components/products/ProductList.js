import React ,{useEffect , useCallback} from 'react'
import axios from 'axios'
import {Product} from './Product'
import {Grid , Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/'
import { dispatchProductList } from './action'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch} from 'react-redux'


const useStyles = makeStyles((theme) => ({
    cardGrid : {
      paddingTop : theme.spacing(8),
      paddingBottom : theme.spacing(8),
      marginTop: theme.spacing(2),
      backgroundColor:'#C2FFD9'
      
    },
    card: {
      height : '100%',
      display : 'flex',
      flexDirection : 'column'
    },
    cardMedia:{
      paddingTop : '56.25%'
    }
  }))

export const ProductList = () => {
    const classes = useStyles(); 
    // REDUX STATE

  const productsData = useSelector((state) => state.productsReducer)
   const dispatch = useDispatch()
   const actions = bindActionCreators(
     {
       dispatchProductList
     },
     dispatch
   )
    // REACT STATES
    // const [productsData, setProductsData] = useState([])
    // const [isLoading , setIsLoading] = useState(true)

    const getData =  useCallback( async ()=>{
        const res = await axios.get('https://api.jsonbin.io/b/611f4110c5159b35ae01202b') 
        actions.dispatchProductList(res.data)
        //setProductsData(res.data)
        //setIsLoading(false)
    }, [actions]) 

    useEffect(()=>{
        getData()
    },[getData])


    
    return (
        <>
        
        <Container  className={classes.cardGrid} maxWidth="lg" >
                <Grid container spacing={5}>
            {
               productsData.isProductsLoading ? <><center><b><h3>Loading</h3></b></center> </>
                :
                productsData.productsList.map((p) => <Product key={p.id} product={p} /> ) 
            }
                </Grid>
        </Container>
        </>
    )
}
