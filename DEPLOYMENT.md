# Vercel Deployment Guide - Updated with Webhook Integration

## ✅ New Features Added

### Webhook Integration
- After file upload to S3, the app automatically calls the webhook API
- Webhook URL: `https://w6w.sit.waresix.ai/webhook/fasdex/update-price-list`
- Sends signed URL and file metadata to the webhook
- Includes error handling - upload succeeds even if webhook fails

### Enhanced Dashboard
- Shows upload status and webhook call confirmation
- Displays signed URL with copy-to-clipboard functionality
- Better user feedback for the entire upload process

### Fixed Signed URL Generation
- ✅ **FIXED**: SignatureDoesNotMatch error resolved
- Now uses `GetObjectCommand` instead of `PutObjectCommand` for signed URLs
- Signed URLs are properly generated for file viewing/downloading

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

## Webhook Integration Details

### What happens when you upload a file:

1. **File Upload**: File is uploaded to S3 bucket
2. **Signed URL Generation**: A signed URL is generated for the uploaded file (using GetObjectCommand)
3. **Webhook Call**: The app calls the webhook API with the following data:
   ```json
   {
     "signedUrl": "https://your-bucket.s3.amazonaws.com/signed-url",
     "fileName": "1234567890-filename.pdf",
     "originalFileName": "filename.pdf",
     "fileType": "application/pdf",
     "fileSize": 1024000,
     "uploadedBy": "admin@example.com",
     "uploadedAt": "2024-01-01T12:00:00.000Z"
   }
   ```
4. **User Feedback**: Dashboard shows success status and signed URL

### Webhook API Endpoint
- **URL**: `https://w6w.sit.waresix.ai/webhook/fasdex/update-price-list`
- **Method**: POST
- **Content-Type**: application/json
- **Error Handling**: Upload succeeds even if webhook fails (logged for debugging)

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
- **Test Webhook**: `https://your-app-name.vercel.app/api/test-webhook` (POST)
- **Test Signed URL**: `https://your-app-name.vercel.app/api/test-signed-url` (POST)

### Default Login Credentials
- **Email**: `admin@example.com` (or your custom ADMIN_EMAIL)
- **Password**: `admin123` (or your custom ADMIN_PASSWORD)

## Testing the Webhook

### Option 1: Upload a file through the dashboard
1. Login to the dashboard
2. Upload a PDF or image file
3. Check the success message and signed URL
4. Click the signed URL to verify it works

### Option 2: Test webhook directly
```bash
curl -X POST https://your-app-name.vercel.app/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

### Option 3: Test signed URL generation
```bash
curl -X POST https://your-app-name.vercel.app/api/test-signed-url \
  -H "Content-Type: application/json" \
  -d '{"fileName": "your-file-name.pdf"}'
```

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

### Webhook Reliability
- The webhook call is made asynchronously
- Upload succeeds even if webhook fails
- Webhook errors are logged for debugging
- Signed URLs expire after 1 hour

### Signed URL Fix
- ✅ **FIXED**: Now uses `GetObjectCommand` for proper signed URL generation
- Signed URLs are valid for viewing/downloading files
- No more SignatureDoesNotMatch errors

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

### Signed URL Issues
- ✅ **FIXED**: SignatureDoesNotMatch error resolved
- Verify S3 bucket permissions include GetObject
- Check AWS credentials are correct
- Ensure file exists in S3 bucket

### Webhook Issues
- Check Vercel function logs for webhook errors
- Verify webhook URL is accessible
- Test webhook endpoint directly
- Check network connectivity from Vercel to webhook

### Authentication Issues
- Verify NEXTAUTH_URL is set to your exact Vercel domain
- Check NEXTAUTH_SECRET is set
- Ensure environment variables are set for production environment

## ✅ Ready to Deploy!

The application now includes webhook integration with fixed signed URL generation and is ready for Vercel deployment!
