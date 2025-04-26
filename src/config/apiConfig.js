/*
const apiConfig = {
    USER_SERVICE_API_BASE_URL: 'https://hx0a2pq0ze.execute-api.ap-south-1.amazonaws.com/user-service',
    APPOINTMET_SERVICE_API_BASE_URL: 'https://hx0a2pq0ze.execute-api.ap-south-1.amazonaws.com/appointment-service',
    MESSAGING_SERVICE_CHAT_HISTORY_URL: 'https://hx0a2pq0ze.execute-api.ap-south-1.amazonaws.com/messaging-service/history',
    MESSAGING_SERVICE_WEB_SOCKET_URL: 'http://hx0a2pq0ze.execute-api.ap-south-1.amazonaws.com/ws',
    
    AWS_REGION: 'ap-south-1',
    AWS_LOGOUT_URL: 'https://dev.d1z0ebfwofvf1t.amplifyapp.com/',
    AWS_CLIENT_ID: '4jf4c11l04o6ot9sds8f2cd6be',
    AWS_USER_POOL_ID: 'ap-south-1_zbLtEa3L7',
    AWS_COGNITO_DOMAIN: 'https://ap-south-1zbltea3l7.auth.ap-south-1.amazoncognito.com',
    AWS_AUTHORITY : 'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_zbLtEa3L7',
    AWS_REDIRECT_URL : 'https://webhook.site/a93e84eb-60b4-45cc-8bcf-cd778465f90b'

};
*/
/* LOCAL SETUP */
const apiConfig = {
    USER_SERVICE_API_BASE_URL: 'http://localhost:8080/user-service',
    APPOINTMET_SERVICE_API_BASE_URL: 'http://localhost:8081/appointment-service',
    MESSAGING_SERVICE_CHAT_HISTORY_URL: 'http://localhost:8082/messaging-service/history',
    MESSAGING_SERVICE_WEB_SOCKET_URL: 'http://localhost:8082/ws',

    AWS_REGION: 'ap-south-1',
    AWS_LOGOUT_URL: 'https://dev.d1z0ebfwofvf1t.amplifyapp.com/',
    AWS_CLIENT_ID: '4jf4c11l04o6ot9sds8f2cd6be',
    AWS_USER_POOL_ID: 'ap-south-1_zbLtEa3L7',
    AWS_COGNITO_DOMAIN: 'https://ap-south-1zbltea3l7.auth.ap-south-1.amazoncognito.com',
    AWS_AUTHORITY : 'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_zbLtEa3L7',
    AWS_REDIRECT_URL : 'https://webhook.site/a93e84eb-60b4-45cc-8bcf-cd778465f90b'
};

export default apiConfig;