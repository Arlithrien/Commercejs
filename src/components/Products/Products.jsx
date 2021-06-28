import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';

/*const products = [
  {id: 1, name: 'shoes', description: 'running shoes.', price: '$30.00', image: 'https://m.psecn.photoshelter.com/img-get/I0000zPkgm3Nw8QM/s/750/750/That-Tree-in-Fall.jpg'},
  {id: 2, name: 'Macbook', description: 'Apple macbook laptop.', price: '$20.00', image: 'https://m.psecn.photoshelter.com/img-get/I0000Agx4bRK2Bh0/s/750/750/Glowing-Japanese-Maple.jpg'}

];*/

const Products = ({products, onAddToCart}) => {
	const classes = useStyles();

	return (
		<main className={classes.content}>
			<div className={classes.toolbar}/>
			<Grid container justify="center" spacing={4}>
				{products.map((product) => (
					<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
						<Product product={product} onAddToCart={onAddToCart} />
					</Grid>
				))}
			</Grid>
		</main>
	
	);
}
export default Products;