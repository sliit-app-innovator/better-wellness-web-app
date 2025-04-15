const apiConfig = {
    USER_SERVICE_API_BASE_URL: 'https://qsdfifp0q7.execute-api.ap-south-1.amazonaws.com/user-service',
    APPOINTMET_SERVICE_API_BASE_URL: 'https://qsdfifp0q7.execute-api.ap-south-1.amazonaws.com/appointment-service',
    MESSAGING_SERVICE_CHAT_HISTORY_URL: 'https://qsdfifp0q7.execute-api.ap-south-1.amazonaws.com/messaging-service/history',
    MESSAGING_SERVICE_WEB_SOCKET_URL: 'http://a8ebb8d2b454345db8d71828a361c0cf-1913399456.ap-south-1.elb.amazonaws.com/ws',
    
    AWS_REGION: 'ap-south-1',
    AWS_LOGOUT_URL: 'http://www.google.com/',
    AWS_CLIENT_ID: '7u1icmkn6vv97apgrr1du5sbs9',
    AWS_USER_POOL_ID: 'ap-south-1_of6yaS36s',
    AWS_COGNITO_DOMAIN: 'https://ap-south-1of6yas36s.auth.ap-south-1.amazoncognito.com',
};

/*
const apiConfig = {
    USER_SERVICE_API_BASE_URL: 'http://localhost:8082/better-wellness/user',
    APPOINTMET_SERVICE_API_BASE_URL: 'http://localhost:8083/better-wellness/booking',
    MESSAGING_SERVICE_CHAT_HISTORY_URL: 'http://localhost:8084/api/chat/history',
    MESSAGING_SERVICE_WEB_SOCKET_URL: 'http://localhost:8084/ws'
};
*/
export default apiConfig;
//  MESSAGING_SERVICE_API_BASE_URL: 'http://better-wellness-booking-service.better-wellness.svc.cluster.local:80/better-wellness/messaging,