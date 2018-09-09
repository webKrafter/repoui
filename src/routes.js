import Repos from './containers/repos';
import Details from './containers/details';
import NotFound from './components/NotFound';

export default {
    routes: [{
        path: '/',
        component: Repos,
        exact: true
    }, {
        path: '/:id([0-9]+)',
        component: Details,  
        exact: true
    }, {
        path: '/not-found',
        component: NotFound
    }],
    redirects: [{
        from: '/(home|index)',
        to: '/',
        status: 301 
    }, {
        from: '/:(^([0-9]+))',
        to: '/not-found',
        status: 404 
    }]
};