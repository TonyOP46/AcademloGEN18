const express = require('express');
const routesUsers = require('../src/routes/user.routes');
const routesPublications = require('../src/routes/publication.routes');
const routesPublicationsTypes = require('../src/routes/publications_types.routes');
const routesCities = require('../src/routes/city.routes');
const routesVotes = require('../src/routes/vote.routes');
const routesRoles = require('../src/routes/role.routes');
const routesCountries = require('../src/routes/country.routes');
const routesProfiles = require('../src/routes/profile.routes');
const routesStates = require('../src/routes/state.routes');
//const routesAuth = require('../src/auth/auth.routes')
const routesAuth = require('../src/auth/auth.routes');

function routerModels(app) {
  const router = express.Router();

  app.use('/api/v1', router);
  router.use('/users', routesUsers);
  router.use('/publications', routesPublications);
  router.use('/publications-types', routesPublicationsTypes);

  router.use('/cities', routesCities);
  router.use('/votes', routesVotes);
  router.use('/roles', routesRoles);
  router.use('/countries', routesCountries);
  router.use('/profiles', routesProfiles);
  router.use('/states', routesStates);

  router.use('/auth', routesAuth);
  // other models here
}

module.exports = routerModels;