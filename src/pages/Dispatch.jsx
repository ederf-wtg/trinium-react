import * as React from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

import { useLocalization } from '@progress/kendo-react-intl';

import axios from "axios";

const baseURL = "https://pipeline.trinium4fuel.com/api/trinium-uat/v2";

const Dispatch = () => {
    const localizationService = useLocalization();

    const [data, setData] = React.useState(null);
    const [columns, setColumns] = React.useState(null);

    const token = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYSIsImV4cCI6IjE2NTczODIwMzQiLCJjb20iOiJUcmluaXVtIiwiaW5mIjoiIn0=.DzidZUwIfdNT+v3oclymcgbtsbZQ+BlhILz4FX8Xs5D2Mtgm0gkAYrIqdTfnWYvW+VieK3oAvNbP76ZdMUjTAtds+hTsx/GS1R+R2Bc6UXiIGBln/VAKdTjZHgiFxTZOW1L7vp8PK3YZ8Pp+uKZU3N+vJXjCHgiqJ7yF3XIAB+0=";

    React.useEffect(() => {
        axios.post(`${baseURL}/dnq?columnsOnly=yes&dnqCode=Flexi%20WBCT-TTI&site=LA`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        }).then((response) => {
            console.log("##### columns");
            console.log(response.data);
            setColumns(response.data);
    
            axios.post(`${baseURL}/dnq?dnqCode=Flexi%20WBCT-TTI&site=LA`,{
                headers: {
                    'Authorization': `bearer ${token}`                }
            }).then((response) => {
                console.log(response.data.data);
                setData(response.data.data);
            })
        });
    }, []);

    if (!data) return "No data!"


    return (
        <div id="Info" className="info-page main-content">
            
            <Grid
                style={{
                    height: "800px",
                }}
                resizable= {true}
                data={data}
                >

                {columns.map((item,i) => <GridColumn field={item.data} title={item.label} key={i} />)}

                </Grid>

            <div className="footer"/>
        </div>
    );
}

export default Dispatch;