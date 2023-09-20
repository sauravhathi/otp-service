# OTP Service

The OTP (One-Time Password) Free Service is a Node.js-based service that allows you to generate and verify one-time passwords (OTP) via email. This service is useful for adding an extra layer of security to your applications by enabling two-factor authentication (2FA) or passwordless login.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Generating an OTP](#generating-an-otp)
  - [Verifying an OTP](#verifying-an-otp)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Scheduled OTP Cleanup](#scheduled-otp-cleanup)
- [Donation](#donation)
- [License](#license)

## Features

| Feature                                      | Description                                                                                                                                                           |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Generate numeric, alphanumeric, or alphabet-based OTPs | Generate one-time passwords with various character types: numeric, alphanumeric, or alphabet-based.  |
| Send OTPs via email                          | Send OTPs to users via email for authentication or verification.                                                                                                      |
| Verify OTPs for user authentication           | Verify OTPs provided by users for secure authentication.                                                                                                                |
| Automatic cleanup of expired OTPs            | Automatically remove expired OTPs from the database based on a configured cron schedule.                                                                            |
| Customizable OTP validity period and size     | Adjust the validity period and size (length) of OTPs to match your security requirements.                                                                          |
| Rate limiting for OTP generation              | Implement rate limiting to prevent abuse and ensure the service is used responsibly.                                                                              |
| Multiple email service providers supported   | Choose from multiple email service providers (e.g., Gmail, Outlook) to send OTP emails.                                                                            |
| Flexible configuration via environment variables | Customize the service's behavior by configuring environment variables.                                                                                                  |
| Easy-to-use API with JSON input/output        | Interact with the service through a user-friendly JSON API for OTP generation and verification.                                                                  |

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

| Prerequisite          | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| Node.js and npm       | Install Node.js and npm on your development machine.            |
| MongoDB database     | Set up a MongoDB database (local or cloud-hosted, e.g., MongoDB Atlas) for storing OTP data. |

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/sauravhathi/otp-service.git
   ```

2. Navigate to the project directory:

   ```shell
   cd otp-service
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Configure your environment variables by creating a `.env` file in the project root directory. You can use the provided `.env.example` as a template.

5. Start the service:

   ```shell
   npm start
   ```

The service should now be running on the specified port (default is 3000).

## Usage

### Generating an OTP

To generate an OTP for a user, make a POST request to the `/api/otp/generate` endpoint with the user's email address in the request body. You can also specify the OTP type, organization name, and email subject.

Example request:

```json
POST /api/otp/generate
{
  "email": "user@example.com",
  "type": "numeric",
  "organization": "MyApp",
  "subject": "OTP Verification"
}
```

The service will send an email containing the OTP to the user's email address.

### Verifying an OTP

To verify an OTP for user authentication, make a POST request to the `/api/otp/verify` endpoint with the user's email address and the OTP in the request body.

Example request:

```json
POST /api/otp/verify
{
  "email": "user@example.com",
  "otp": "123456"
}
```

The service will respond with a success message if the OTP is valid.

## Configuration

You can customize the OTP service by modifying the environment variables in the `.env` file. Here are some key configuration options:

### Environment Variables

| Variable                     | Description                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| `PORT`                       | The port on which the service listens.                                                        |
| `MONGODB_URI`                | The MongoDB connection string.                                                                |
| `OTP_VALIDITY_PERIOD_MINUTES` | The validity period of OTPs in minutes.                                                      |
| `OTP_SIZE`                   | The size (length) of OTPs.                                                                    |
| `CRON_SCHEDULE`              | The cron schedule for OTP cleanup.                                                            |
| `ALLOWED_DOMAINS`            | Comma-separated list of allowed email domains.                                                |
| `GMAIL_USER`                 | Gmail username (used for sending emails).                                                     |
| `GMAIL_PASS`                 | Gmail password (used for sending emails).                                                     |

## Scheduled OTP Cleanup

The service automatically clears expired OTPs based on the configured cron schedule. By default, it runs daily at midnight to remove expired OTPs.

## Donation

If you find this project useful and want to support its development, consider buying us a coffee! Your support is greatly appreciated.

<img src="https://github.com/sauravhathi/otp-service/assets/61316762/021a6988-e823-4490-b8f2-ca6a0517ecc5" alt="support" style="width: 200px">

Donate: `saurav.34@paytm`

<a href="https://www.buymeacoffee.com/sauravhathi" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/arial-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/sauravhathi/otp-service/blob/master/LICENSE) file for details.