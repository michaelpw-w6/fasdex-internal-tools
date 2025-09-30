# Vercel Deployment Guide

## Vercel Configuration

### Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected for Next.js)
- **Install Command**: `npm install`
- **Node.js Version**: 18.x or 20.x (recommended)

### Environment Variables
Set these in your Vercel dashboard under Project Settings > Environment Variables:

```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-secure-random-string-here
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-s3-bucket-name
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
```

## Deployment Steps

### Option 1: Deploy via Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel`
4. Follow the prompts to link your project

### Option 2: Deploy via GitHub Integration
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will auto-detect Next.js and configure build settings
4. Add environment variables in Vercel dashboard
5. Deploy

### Option 3: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure environment variables
5. Deploy

## Important Notes

### Security
- Generate a strong `NEXTAUTH_SECRET` (32+ characters)
- Use a secure password for `ADMIN_PASSWORD`
- Never commit `.env.local` to version control

### AWS S3 Setup
1. Create an S3 bucket
2. Create an IAM user with S3 permissions
3. Generate access keys
4. Update environment variables

### CORS Configuration
If you encounter CORS issues, add this to your S3 bucket policy:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

## Troubleshooting

### Build Errors
- Ensure all environment variables are set
- Check Node.js version compatibility
- Verify AWS credentials are correct

### Runtime Errors
- Check Vercel function logs
- Verify S3 bucket permissions
- Ensure NEXTAUTH_URL matches your domain

### File Upload Issues
- Verify S3 bucket exists and is accessible
- Check IAM user permissions
- Ensure file size limits are appropriate
