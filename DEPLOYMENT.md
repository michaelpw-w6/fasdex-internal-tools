# Vercel Deployment Guide - FIXED

## ✅ Build Issues Resolved

The NextAuth compatibility issues with Next.js 15 have been fixed by:
- Using NextAuth v4.24.11 (stable version)
- Simplified TypeScript configuration
- Proper ESLint suppressions for compatibility

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

## Step-by-Step Deployment Process

### 1. Deploy to Vercel
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will auto-detect Next.js and configure build settings
4. **Deploy first** (this will give you the domain)

### 2. Get Your Vercel Domain
After deployment, Vercel will provide you with a domain like:
- `https://your-app-name.vercel.app`

### 3. Set Environment Variables
1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add all the environment variables listed above
4. **Important**: Set `NEXTAUTH_URL` to your actual Vercel domain:
   ```
   NEXTAUTH_URL=https://your-app-name.vercel.app
   ```

### 4. Redeploy
After setting environment variables, trigger a new deployment:
- Go to **Deployments** tab
- Click **Redeploy** on the latest deployment

## Accessing Your Deployed App

Once deployed and environment variables are set:

- **Main App**: `https://your-app-name.vercel.app`
- **Login Page**: `https://your-app-name.vercel.app/login`
- **Dashboard**: `https://your-app-name.vercel.app/dashboard`

### Default Login Credentials
- **Email**: `admin@example.com` (or your custom ADMIN_EMAIL)
- **Password**: `admin123` (or your custom ADMIN_PASSWORD)

## Deployment Options

### Option 1: Deploy via Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel`
4. Follow the prompts to link your project
5. Set environment variables in Vercel dashboard

### Option 2: Deploy via GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Deploy (this gives you the domain)
6. Set environment variables with the correct NEXTAUTH_URL
7. Redeploy

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
- ✅ **FIXED**: NextAuth compatibility issues resolved
- Ensure all environment variables are set
- Check Node.js version compatibility
- Verify AWS credentials are correct

### Runtime Errors
- Check Vercel function logs
- Verify S3 bucket permissions
- Ensure NEXTAUTH_URL matches your domain exactly

### File Upload Issues
- Verify S3 bucket exists and is accessible
- Check IAM user permissions
- Ensure file size limits are appropriate

### Authentication Issues
- Verify NEXTAUTH_URL is set to your exact Vercel domain
- Check NEXTAUTH_SECRET is set
- Ensure environment variables are set for production environment

## ✅ Ready to Deploy!

The application now builds successfully and is ready for Vercel deployment!
