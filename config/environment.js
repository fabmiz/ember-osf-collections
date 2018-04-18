'use strict';

let localConfig;

try {
    localConfig = require('./local'); // eslint-disable-line global-require
} catch (ex) {
    localConfig = {};
}

const {
    GIT_COMMIT: release,
} = { ...process.env, ...localConfig };

module.exports = function(environment) {
    const authorizationType = 'cookie';

    const ENV = {
        modulePrefix: 'ember-osf-collections',
        environment,
        rootURL: '/collections/',
        locationType: 'auto',
        authorizationType,
        sentryDSN: null,
        sentryOptions: {
            release,
            ignoreErrors: [
                // https://github.com/emberjs/ember.js/issues/12505
                'TransitionAborted',
            ],
        },
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            },
            EXTEND_PROTOTYPES: {
                // Prevent Ember Data from overriding Date.parse.
                Date: false,
            },
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },
    };

    if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
    // Testem prefers this...
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
        ENV.APP.autoboot = false;
    }

    if (environment === 'production') {
    // here you can enable a production-specific feature
    }

    return ENV;
};
