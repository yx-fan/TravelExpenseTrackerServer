# Changelog

## [1.0.3] - 2024-06-12
### Changed
- Try to recursively connect to RabbitMQ before starting server.
- Encapsulate the app and server to enable step-by-step server initialization.

## [1.0.2] - 2024-06-10
### Added
- Implemented message queue (MQ) to handle sending emails, improving API response speed.

### Changed
- Refactored email verification to use API calls, eliminating the need for users to enter a verification code.
- Restructured the message queue (MQ) architecture for better efficiency and maintainability.

## [1.0.1] - 2024-06-09
### Fixed
- Corrected typo in error messages.
- Fixed issue with user registration endpoint returning a 500 error.

## [1.0.0] - 2024-06-01
### Added
- Initialize the backend project of the TravelExpense APP.
- Setup error, jwt middlewares, add customized error and logger.
- User registration and login functionality.
- Email verification for new users.
