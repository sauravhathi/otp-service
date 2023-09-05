# 📱 OTP Service

This is a free OTP (One-Time Password) service built with Node.js, Express.js, Mongoose, and node-cron for handling OTP generation, verification, and automatic expiration.

## Features

✨ Generate a one-time password (OTP) for a given email.

🔐 Verify an OTP for a given email.

⏰ Automatic OTP expiration and cleanup using cron jobs.

⚙️ Configurable OTP size and validity period.

🚀 Error handling for invalid OTPs and expired OTPs.

## Demo

You can interact with the API using the following endpoints:

| Endpoint                       | Description                               |
| ------------------------------ | ----------------------------------------- |
| `POST https://otp-4e71.onrender.com/api/otp`         | Generate a one-time password (OTP) for a given email. |
| `POST https://otp-4e71.onrender.com/api/otp/verify`   | Verify an OTP for a given email.          |

## Email Integration

To send emails for OTP delivery, you can use the [sauravhathi/mailer](https://github.com/sauravhathi/mailer) repository. It provides a straightforward way to send emails as part of your OTP delivery process.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sauravhathi/otp-service.git
   cd otp-service
   ```

2. Install dependencies:

   ```bash
   npm install

    # or

   yarn
   ```

3. Set up your environment variables by creating a `.env` file in the project root directory and configuring the following variables:

   ```env
   MONGODB_URI=<your-mongodb-connection-uri>
   OTP_VALIDITY_PERIOD_MINUTES=2
   OTP_SIZE=4
   CRON_SCHEDULE=*/2 * * * *
   ```

   - `MONGODB_URI`: MongoDB connection URI.
   - `OTP_VALIDITY_PERIOD_MINUTES`: Validity period for OTPs in minutes.
   - `OTP_SIZE`: Size of the OTP (number of digits).
   - `CRON_SCHEDULE`: Cron schedule for automatic OTP cleanup.

4. Start the server:

   ```bash
   npm dev

   # or

   yarn dev
   ```

## API Endpoints

### Generate OTP 🚀

- **Endpoint**: POST `/api/otp`
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "otp": 1234
  }
  ```

### Verify OTP 🔐

- **Endpoint**: POST `/api/otp/verify`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "otp": 1234
  }
  ```
- **Response**:
  ```json
  {
    "message": "OTP is valid"
  }
  ```

## Scheduled OTP Cleanup ⏰

The service automatically clears expired OTPs based on the configured cron schedule.

## Donate ☕

If you find this project useful and want to support its development, consider buying us a coffee!

<img src="https://github.com/sauravhathi/myperfectice-extension/assets/61316762/274f2172-8dcc-4fe9-aa51-fd3542429c3e" alt="support" style="width: 200px">

Donate: `saurav.34@paytm`

<a href="https://www.buymeacoffee.com/sauravhathi" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/arial-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/sauravhathi/otp-service/blob/master/LICENSE) file for details.
