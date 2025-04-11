const apiConfig = {
    USER_SERVICE_API_BASE_URL: 'http://a73f1f10ad5564188b67b975282c3da6-816602576.ap-south-1.elb.amazonaws.com/better-wellness/user',
    APPOINTMET_SERVICE_API_BASE_URL: 'http://ab226834ef0f346b49a4d80482c8bcc9-431177096.ap-south-1.elb.amazonaws.com/better-wellness/booking',
    MESSAGING_SERVICE_CHAT_HISTORY_URL: 'http://a6a83a49a717946e29f285c16ffa764e-1658463255.ap-south-1.elb.amazonaws.com/api/chat/history',
    MESSAGING_SERVICE_WEB_SOCKET_URL: 'http://a6a83a49a717946e29f285c16ffa764e-1658463255.ap-south-1.elb.amazonaws.com/ws',

    AWS_REGION: 'ap-south-1',
    AWS_LOGOUT_URL: 'https://dev.d32xo3do3h3y4p.amplifyapp.com/',
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