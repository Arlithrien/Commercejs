
import React, {useState, useEffect} from 'react';
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import {Link} from 'react-router-dom';

import FormInput from './CustomTextField';
import {commerce} from '../../lib/commerce';


const AddressForm = ({checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdisivions] = useState([]);
    const [shippingSubdivision, setShippingSubdisivion] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();
    {/*
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}));


    //loops through countries/subdivisions list and creates them as object entries for our selection list
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label:name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));
    */}


    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListCountries(checkoutTokenId);
        

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchShippingSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdisivions(subdivisions);
        setShippingSubdisivion(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const {options} = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});

        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);

    }, []); 

    useEffect(() => {
        if(shippingCountry) fetchShippingSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    },[shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider { ...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput  name='firstName' label='First Name' />
                        <FormInput  name='lastName' label='Last Name' />
                        <FormInput  name='address1' label='Address' />
                        <FormInput  name='email' label='Email' />
                        <FormInput  name='city' label='City' />
                        <FormInput  name='zip' label='Zip / Postal Code' />
                         
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {Object.entries(shippingCountries).map(([code, name]) => ({id: code, label:name})).map((country) => (
                                    <MenuItem key={country.id} value={country.id} > 
                                        {country.label}
                                    </MenuItem> 
                                ))}
                                 
                            </Select>
                        </Grid> 
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdisivion(e.target.value)}>
                                {Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name})).map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id} > 
                                        {subdivision.label}
                                    </MenuItem>
                                ))}  
                            </Select>
                        </Grid> 
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((option) => (
                                    <MenuItem key={option.id} value={option.id} > 
                                    {option.label}
                                    </MenuItem>
                                ))}
                            
                            </Select>
                        </Grid>
                    </Grid>
                    <br/>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                        <Button type="submit" onClick={next} variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm
