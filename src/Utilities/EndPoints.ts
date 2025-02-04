const isProduction = process.env.NODE_ENV === 'production';

const commonEndpoints = {
  timeTracker: 'TimeTracking',
  timeTrackerTask: 'TimeTrackerTasks',
  deleteTimeTrackerTask: 'TimeTrackerTasks/{id}',
  gmailAccess: 'gmail',
  customerDetails: 'customers',
  register: 'Authentication/protected',
  twilioSms: 'sms',
};

const productionEndpoints = {
  ...commonEndpoints,
  login: 'Authentication/login-prod',
  logout: 'Authentication/logout-prod',
  refreshToken: 'Authentication/refresh-token-prod',
  googleAuth: 'GoogleAuth/login-prod?features=0&features=1&features=2',
};

const developmentEndpoints = {
  ...commonEndpoints,
  login: 'Authentication/login-dev',
  logout: 'Authentication/logout-dev',
  refreshToken: 'Authentication/refresh-token-dev',
  googleAuth: 'GoogleAuth/login-prod?features=0&features=1&features=2',
};

export const EndPoints = isProduction
  ? productionEndpoints
  : developmentEndpoints;
