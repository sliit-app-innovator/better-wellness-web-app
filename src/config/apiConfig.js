const apiConfig = {
   // USER_SERVICE_API_BASE_URL: 'http://better-wellness-user-service.better-wellness.svc.cluster.local:80/better-wellness/user',
    USER_SERVICE_API_BASE_URL: 'http://localhost:8080/better-wellness/user',
  //  APPOINTMET_SERVICE_API_BASE_URL: 'http://better-wellness-booking-service.better-wellness.svc.cluster.local:80/better-wellness/booking',
    APPOINTMET_SERVICE_API_BASE_URL: 'http://localhost:8081/better-wellness/booking',
//  MESSAGING_SERVICE_API_BASE_URL: 'http://better-wellness-booking-service.better-wellness.svc.cluster.local:80/better-wellness/messaging,
    MESSAGING_SERVICE_API_BASE_URL: 'http://localhost:8081/better-wellness/messaging',
    MESSAGING_SERVICE_WEB_SOCKET_URL: 'http://localhost:8082/ws',
};

export default apiConfig;
