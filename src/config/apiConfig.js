const apiConfig = {
    USER_SERVICE_API_BASE_URL: 'http://localhost:8080/better-wellness/user',
    APPOINTMET_SERVICE_API_BASE_URL: 'http://localhost:8081/better-wellness/booking',
    MESSAGING_SERVICE_CHAT_HISTORY_URL: 'http://localhost:8082/api/chat/history',
    MESSAGING_SERVICE_WEB_SOCKET_URL: 'http://localhost:8082/ws',

    AWS_LOGOUT_URL: 'http://localhost:3000',
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