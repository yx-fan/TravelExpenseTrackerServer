# Changelog
## [1.0.8] - 2024-06-17
### Added
- Use openai to parse the text data after ocr process
- Add receipt and expense functions, controllers and endpoints

### Changed
- Update expense and receipt data structures to better relfect the business needs

## [1.0.7] - 2024-06-16
### Added
- Add models for expense and receipts
- Add language dectetion for pre-ocr process
- Add ocr process to generate text

### Changes
- Organize the documents

### Fixed
- Fix the issue that nodemon can't be used in dev mode

## [1.0.6] - 2024-06-15
### Changed
- Clean up the files that are needed when deploying on production
- Upgrade local docker setting for better development (changes on codes can reflect in the docker in real time)

## [1.0.5] - 2024-06-13
### Added
- Add in app notification model, function and the first notification.
- Add trip module and its endpoints.
- Add receipt recognition function and test.

### Changed
- Change the start of db to the server.js.

### Fixed
- Update swagger url to make it available for testing.


## [1.0.4] - 2024-06-12
### Added
- Add get and patch functions in user services.
- Provide endpoints to get user profile or change it.
- Add response middleware to handle response.
- Add swagger api doc.

### Changed
- Implement notification and profile schema to user model.

## [1.0.3] - 2024-06-10
### Changed
- Recursively connect to RabbitMQ before starting server.
- Encapsulate the app and server to enable step-by-step server initialization.
- Stability increased.

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
