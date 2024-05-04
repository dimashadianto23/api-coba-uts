const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

const loginAttempts = {}; // Object to store login attempts
const maxAttempts = 5; // Max login attempts allowed
const attemptWindow = 30 * 60 * 1000; // 30 minutes in milliseconds

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    // Check if login attempts exceeded
    if (loginAttempts[email] && loginAttempts[email].attempts >= maxAttempts) {
      // Check if attempt window has elapsed
      if (Date.now() - loginAttempts[email].lastAttempt < attemptWindow) {
        const remainingTime = Math.ceil(
          (attemptWindow - (Date.now() - loginAttempts[email].lastAttempt)) /
            60000
        ); // Remaining time in minutes
        throw errorResponder(
          errorTypes.FORBIDDEN,
          `Too many failed login attempts. Please try again in ${remainingTime} minutes.`
        );
      } else {
        // Clear attempts if attempt window elapsed
        delete loginAttempts[email];
      }
    }

    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      // Update login attempts
      if (!loginAttempts[email]) {
        loginAttempts[email] = {
          attempts: 1,
          lastAttempt: Date.now(),
        };
      } else {
        loginAttempts[email].attempts++;
        loginAttempts[email].lastAttempt = Date.now();
      }

      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    // Clear login attempts on successful login
    delete loginAttempts[email];

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
