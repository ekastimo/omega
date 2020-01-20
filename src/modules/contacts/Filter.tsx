import * as React from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import XTextInput from "../../components/inputs/XTextInput";
import {Form, Formik} from 'formik';
import XSelectInput from "../../components/inputs/XSelectInput";
import {toOptions} from "../../components/inputs/inputHelpers";
import {Box} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

interface IProps {
    onFilter: (data: any) => any
    loading:boolean
}

const Filter = ({onFilter,loading}: IProps) => {
    function handleSubmission(values: any) {
        onFilter(values)
    }


    // return <form>
    //     <Grid spacing={0} container>
    //         <Grid item xs={12}>
    //             <TextField
    //                 label="Name"
    //                 margin="dense"
    //                 variant="outlined"
    //                 fullWidth
    //             />
    //         </Grid>
    //     </Grid>
    // </form>

    return <Formik
        initialValues={{name: '', contactType: '', email: '', phone: '', nin: ''}}
        onSubmit={handleSubmission}
        validateOnBlur
        render={({submitForm, isSubmitting}) => (
            <Form>
                <Grid spacing={0} container>
                    <Grid item xs={12}>
                        <XTextInput
                            name="query"
                            label="Name"
                            type="text"
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <XSelectInput
                            name="categories"
                            label="Categories"
                            options={toOptions(['Company', 'Person'])}
                            variant='outlined'
                            multiple
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <XTextInput
                            name="email"
                            label="Email"
                            type="email"
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <XTextInput
                            name="phone"
                            label="Phone"
                            type="text"
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <XTextInput
                            name="nin"
                            label="NIN"
                            type="text"
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box pt={2} display='flex' alignContent='center' flexDirection='row'>
                            <Button
                                disabled={loading}
                                variant="outlined"
                                color="primary"
                                fullWidth
                                onClick={submitForm}>Excel Export</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Form>
        )}
    />
}

export default Filter
