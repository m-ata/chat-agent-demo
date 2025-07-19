export default [
    // 🔐 Authentication
    {
      id: 1,
      title: "Add Forgot Password Functionality",
      description: "Implement forgot password flow with email OTP verification.",
      priority: "High",
      status: "To Do"
    },
    {
      id: 2,
      title: "Add Rate Limiting to Login API",
      description: "Prevent brute-force attacks by limiting login attempts.",
      priority: "Medium",
      status: "In Progress"
    },
    {
      id: 3,
      title: "OAuth Login with Google",
      description: "Enable users to sign in with Google using OAuth 2.0.",
      priority: "High",
      status: "Done"
    },
    {
      id: 4,
      title: "Update JWT Expiration Policy",
      description: "Shorten access token expiry and implement refresh tokens.",
      priority: "Medium",
      status: "In Review"
    },
    {
      id: 5,
      title: "Fix UI Validation for Signup Form",
      description: "Currently allows invalid email format. Add client-side validation.",
      priority: "Low",
      status: "To Do"
    },
    {
      id: 6,
      title: "Add Multi-Factor Authentication (MFA)",
      description: "Enable users to set up TOTP-based 2FA using Google Authenticator.",
      priority: "High",
      status: "To Do"
    },
  
    // 🛠 Backend / Code Refactor
    {
      id: 7,
      title: "Refactor User Controller Logic",
      description: "Break large controller into service-layer functions.",
      priority: "Medium",
      status: "In Progress"
    },
    {
      id: 8,
      title: "Add Unit Tests for Payment Module",
      description: "Improve test coverage for payment service and edge cases.",
      priority: "High",
      status: "To Do"
    },
    {
      id: 9,
      title: "Remove Deprecated API Endpoints",
      description: "Clean up `/v1/users-old` and `/v1/payments-beta` endpoints.",
      priority: "Low",
      status: "Done"
    },
    {
      id: 10,
      title: "Optimize Database Query in Report Service",
      description: "Use batch queries instead of nested loops for better performance.",
      priority: "High",
      status: "In Review"
    },
    {
      id: 11,
      title: "Replace Moment.js with Day.js",
      description: "Reduce bundle size by switching to a lightweight date lib.",
      priority: "Medium",
      status: "To Do"
    },
    {
      id: 12,
      title: "Create Reusable Logger Middleware",
      description: "Implement middleware to capture logs across services consistently.",
      priority: "Medium",
      status: "In Progress"
    },
  
    // 🚀 Deployment / DevOps
    {
      id: 13,
      title: "Set Up Staging Environment",
      description: "Clone production config for staging on AWS.",
      priority: "High",
      status: "In Progress"
    },
    {
      id: 14,
      title: "Enable Auto SSL Renewal via Certbot",
      description: "Add cron job or systemd timer for automatic renewals.",
      priority: "Medium",
      status: "To Do"
    },
    {
      id: 15,
      title: "Configure GitHub Actions for CI/CD",
      description: "Set up build, test, and deployment pipelines.",
      priority: "High",
      status: "Done"
    },
    {
      id: 16,
      title: "Containerize App with Docker",
      description: "Create Dockerfile and docker-compose setup for the app.",
      priority: "High",
      status: "In Review"
    },
    {
      id: 17,
      title: "Add Slack Alerts for Failed Deployments",
      description: "Integrate deployment errors with Slack notifications.",
      priority: "Medium",
      status: "To Do"
    },
    {
      id: 18,
      title: "Create Rollback Strategy for Production Deployments",
      description: "Implement script to revert to previous Docker image on failure.",
      priority: "High",
      status: "To Do"
    },
  
    // 📣 Marketing / Content
    {
      id: 19,
      title: "Publish Product Hunt Launch Post",
      description: "Draft and schedule announcement post on Product Hunt.",
      priority: "High",
      status: "To Do"
    },
    {
      id: 20,
      title: "Update Landing Page Copy",
      description: "Refresh value props to align with latest features.",
      priority: "Medium",
      status: "In Review"
    },
    {
      id: 21,
      title: "Create Blog: “Why AI-Powered Assistants Matter”",
      description: "800-word post explaining value of our AI features.",
      priority: "Low",
      status: "In Progress"
    },
    {
      id: 22,
      title: "Add Testimonials Section to Homepage",
      description: "Embed 3 customer testimonials with photos.",
      priority: "Medium",
      status: "Done"
    },
    {
      id: 23,
      title: "A/B Test Call-to-Action Button Color",
      description: "Test blue vs green CTA button for conversion uplift.",
      priority: "Low",
      status: "To Do"
    },
    {
      id: 24,
      title: "Launch AI Use Case Newsletter Series",
      description: "Create a 3-part email series showcasing how users benefit from the AI features.",
      priority: "Medium",
      status: "To Do"
    }
  ];
  