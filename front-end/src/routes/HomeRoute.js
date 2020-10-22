import React from 'react';
import { Route } from 'react-router-dom';


const HomeRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            <Layout>
                <Component {...props} />
            </Layout>
        )
        }
    />
);

export default HomeRoute;