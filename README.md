# File Upload App

A simple Next.js application with authentication and S3 file upload functionality.

## Features

- **Authentication**: Simple login system using NextAuth.js
- **File Upload**: Upload PDF and image files to AWS S3
- **Drag & Drop**: Modern drag-and-drop interface
- **File Validation**: Type and size validation
- **Responsive Design**: Mobile-friendly interface

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.local` and update the following variables:

```env
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-s3-bucket-name

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# Simple user credentials (for demo purposes)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### 3. AWS S3 Setup

1. Create an S3 bucket in your AWS account
2. Create an IAM user with the following policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

3. Generate access keys for the IAM user
4. Update the environment variables with your credentials

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

1. **Login**: Use the credentials from your environment variables
   - Default: `admin@example.com` / `admin123`

2. **Upload Files**: 
   - Drag and drop files onto the upload area
   - Or click to select files
   - Supported formats: PDF, JPEG, PNG, GIF
   - Maximum file size: 10MB

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth API routes
│   │   └── upload/route.ts              # File upload API
│   ├── dashboard/page.tsx               # Main dashboard
│   ├── login/page.tsx                   # Login page
│   ├── layout.tsx                       # Root layout
│   └── page.tsx                         # Home page (redirects)
├── components/
│   └── SessionProvider.tsx              # NextAuth session provider
└── lib/
    ├── auth.ts                          # NextAuth configuration
    └── s3.ts                            # AWS S3 utilities
```

## Security Notes

- This is a demo application with hardcoded credentials
- For production use, implement proper user management and database storage
- Use environment variables for all sensitive configuration
- Implement proper error handling and logging
- Add rate limiting and file scanning for security

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **NextAuth.js** - Authentication
- **AWS SDK** - S3 integration
- **bcryptjs** - Password hashing
