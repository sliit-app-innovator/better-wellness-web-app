import apiConfig from './config/apiConfig';


export const awsExports = {
    aws_project_region: apiConfig.AWS_REGION,
    aws_cognito_region: apiConfig.AWS_REGION,
    aws_user_pools_id: apiConfig.AWS_USER_POOL_ID,
    aws_user_pools_web_client_id: apiConfig.AWS_CLIENT_ID,
  };

export const awsUserPoolData = {
    UserPoolId: apiConfig.AWS_USER_POOL_ID, // e.g., 'us-east-1_ExaMPle'
    ClientId: apiConfig.AWS_CLIENT_ID, // e.g., '1example23456789'
};